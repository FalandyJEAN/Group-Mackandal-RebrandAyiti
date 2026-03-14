-- Script pour mettre à jour les catégories étendues dans la base de données

-- Ajouter les nouvelles colonnes si elles n'existent pas
ALTER TABLE public.photos 
ADD COLUMN IF NOT EXISTS subcategory TEXT,
ADD COLUMN IF NOT EXISTS region TEXT,
ADD COLUMN IF NOT EXISTS photographer_type TEXT DEFAULT 'amateur',
ADD COLUMN IF NOT EXISTS camera_info JSONB,
ADD COLUMN IF NOT EXISTS gps_coordinates POINT;

-- Créer un index pour les coordonnées GPS
CREATE INDEX IF NOT EXISTS idx_photos_gps ON public.photos USING GIST(gps_coordinates);

-- Créer un index pour les sous-catégories
CREATE INDEX IF NOT EXISTS idx_photos_subcategory ON public.photos(subcategory);

-- Créer un index pour les régions
CREATE INDEX IF NOT EXISTS idx_photos_region ON public.photos(region);

-- Table pour les catégories et sous-catégories
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT DEFAULT '#3B82F6',
  parent_id UUID REFERENCES public.categories(id),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insérer les catégories principales
INSERT INTO public.categories (name, label, description, icon, color, sort_order) VALUES
('patrimoine', 'Patrimoine & Histoire', 'Sites historiques et patrimoine culturel d''Haïti', 'monument', '#8B5CF6', 1),
('nature', 'Nature & Paysages', 'Beautés naturelles et paysages d''Haïti', 'mountain', '#10B981', 2),
('culture', 'Culture & Traditions', 'Traditions, festivals et culture haïtienne', 'music', '#F59E0B', 3),
('art', 'Art & Créativité', 'Art, artisanat et créativité haïtienne', 'palette', '#EF4444', 4),
('architecture', 'Architecture', 'Architecture traditionnelle et moderne', 'building', '#6B7280', 5),
('gastronomie', 'Gastronomie', 'Cuisine et gastronomie haïtienne', 'utensils', '#F97316', 6),
('vie-quotidienne', 'Vie Quotidienne', 'Scènes de la vie quotidienne', 'users', '#06B6D4', 7),
('villes', 'Villes & Régions', 'Villes et régions d''Haïti', 'map-pin', '#8B5CF6', 8),
('événements', 'Événements', 'Événements et célébrations', 'calendar', '#EC4899', 9),
('développement', 'Développement & Innovation', 'Progrès et innovation en Haïti', 'trending-up', '#3B82F6', 10),
('diaspora', 'Diaspora Haïtienne', 'Communautés haïtiennes à l''étranger', 'globe', '#6366F1', 11),
('personnalités', 'Personnalités', 'Personnalités haïtiennes remarquables', 'user-check', '#84CC16', 12)
ON CONFLICT (name) DO NOTHING;

-- Insérer les sous-catégories pour le patrimoine
INSERT INTO public.categories (name, label, parent_id, sort_order) 
SELECT 
  subcategory.name,
  subcategory.label,
  parent.id,
  subcategory.sort_order
FROM (VALUES
  ('citadelle', 'Citadelle Laferrière', 1),
  ('palais-sans-souci', 'Palais Sans-Souci', 2),
  ('fort-jacques', 'Fort Jacques', 3),
  ('cathédrale', 'Cathédrales', 4),
  ('monuments', 'Monuments historiques', 5),
  ('musées', 'Musées', 6),
  ('sites-archéologiques', 'Sites archéologiques', 7)
) AS subcategory(name, label, sort_order)
CROSS JOIN public.categories parent
WHERE parent.name = 'patrimoine'
ON CONFLICT (name) DO NOTHING;

-- Table pour les signalements d'images négatives
CREATE TABLE IF NOT EXISTS public.negative_image_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  source_url TEXT,
  search_term TEXT,
  description TEXT,
  reason TEXT NOT NULL,
  reporter_id UUID REFERENCES public.profiles(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'investigating', 'reported', 'resolved', 'rejected')),
  google_report_id TEXT,
  resolution_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour les signalements
CREATE INDEX IF NOT EXISTS idx_negative_reports_status ON public.negative_image_reports(status);
CREATE INDEX IF NOT EXISTS idx_negative_reports_created_at ON public.negative_image_reports(created_at DESC);

-- Table pour les alternatives positives proposées
CREATE TABLE IF NOT EXISTS public.positive_alternatives (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  negative_report_id UUID REFERENCES public.negative_image_reports(id) ON DELETE CASCADE,
  photo_id UUID REFERENCES public.photos(id) ON DELETE CASCADE,
  suggested_by UUID REFERENCES public.profiles(id),
  reason TEXT,
  votes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fonction pour mettre à jour les compteurs de votes
CREATE OR REPLACE FUNCTION update_alternative_votes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.positive_alternatives 
    SET votes_count = votes_count + 1 
    WHERE id = NEW.alternative_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.positive_alternatives 
    SET votes_count = votes_count - 1 
    WHERE id = OLD.alternative_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Table pour les votes sur les alternatives
CREATE TABLE IF NOT EXISTS public.alternative_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  alternative_id UUID REFERENCES public.positive_alternatives(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(alternative_id, user_id)
);

-- Trigger pour les votes d'alternatives
DROP TRIGGER IF EXISTS trigger_update_alternative_votes_count ON public.alternative_votes;
CREATE TRIGGER trigger_update_alternative_votes_count
  AFTER INSERT OR DELETE ON public.alternative_votes
  FOR EACH ROW EXECUTE FUNCTION update_alternative_votes_count();

-- RLS pour les nouvelles tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.negative_image_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.positive_alternatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alternative_votes ENABLE ROW LEVEL SECURITY;

-- Policies pour les catégories (lecture publique)
CREATE POLICY "Catégories publiques en lecture" ON public.categories
  FOR SELECT USING (true);

-- Policies pour les signalements
CREATE POLICY "Signalements publics en lecture" ON public.negative_image_reports
  FOR SELECT USING (true);

CREATE POLICY "Utilisateurs connectés peuvent signaler" ON public.negative_image_reports
  FOR INSERT WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Utilisateurs peuvent modifier leurs signalements" ON public.negative_image_reports
  FOR UPDATE USING (auth.uid() = reporter_id);

-- Policies pour les alternatives
CREATE POLICY "Alternatives publiques en lecture" ON public.positive_alternatives
  FOR SELECT USING (true);

CREATE POLICY "Utilisateurs connectés peuvent proposer des alternatives" ON public.positive_alternatives
  FOR INSERT WITH CHECK (auth.uid() = suggested_by);

-- Policies pour les votes d'alternatives
CREATE POLICY "Votes publics en lecture" ON public.alternative_votes
  FOR SELECT USING (true);

CREATE POLICY "Utilisateurs connectés peuvent voter" ON public.alternative_votes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Utilisateurs peuvent supprimer leurs votes" ON public.alternative_votes
  FOR DELETE USING (auth.uid() = user_id);
