export interface Subcategory {
    id: string
    label: string
}

export interface Category {
    id: string
    label: string
    count?: number
    subcategories: Subcategory[]
}

export const categories: Category[] = [
    {
        id: "all",
        label: "Toutes",
        count: 247,
        subcategories: [],
    },
    {
        id: "patrimoine",
        label: "Patrimoine & Histoire",
        count: 45,
        subcategories: [
            { id: "citadelle", label: "Citadelle Laferrière" },
            { id: "palais-sans-souci", label: "Palais Sans-Souci" },
            { id: "fort-jacques", label: "Fort Jacques" },
            { id: "cathédrale", label: "Cathédrales" },
            { id: "monuments", label: "Monuments historiques" },
            { id: "musées", label: "Musées" },
            { id: "sites-archéologiques", label: "Sites archéologiques" },
        ],
    },
    {
        id: "nature",
        label: "Nature & Paysages",
        count: 89,
        subcategories: [
            { id: "plages", label: "Plages" },
            { id: "montagnes", label: "Montagnes" },
            { id: "cascades", label: "Cascades" },
            { id: "rivières", label: "Rivières" },
            { id: "forêts", label: "Forêts" },
            { id: "grottes", label: "Grottes" },
            { id: "parcs-nationaux", label: "Parcs nationaux" },
            { id: "couchers-soleil", label: "Couchers de soleil" },
            { id: "faune", label: "Faune" },
            { id: "flore", label: "Flore" },
        ],
    },
    {
        id: "culture",
        label: "Culture & Traditions",
        count: 67,
        subcategories: [
            { id: "carnaval", label: "Carnaval" },
            { id: "rara", label: "Rara" },
            { id: "vodou", label: "Vodou" },
            { id: "musique", label: "Musique" },
            { id: "danse", label: "Danse" },
            { id: "festivals", label: "Festivals" },
            { id: "cérémonies", label: "Cérémonies" },
            { id: "costumes-traditionnels", label: "Costumes traditionnels" },
        ],
    },
    {
        id: "art",
        label: "Art & Créativité",
        count: 54,
        subcategories: [
            { id: "peinture", label: "Peinture" },
            { id: "sculpture", label: "Sculpture" },
            { id: "street-art", label: "Street Art" },
            { id: "artisanat", label: "Artisanat" },
            { id: "ferronnerie", label: "Ferronnerie d'art" },
            { id: "poterie", label: "Poterie" },
            { id: "bijoux", label: "Bijoux" },
            { id: "tapisserie", label: "Tapisserie" },
        ],
    },
    {
        id: "architecture",
        label: "Architecture",
        count: 32,
        subcategories: [
            { id: "coloniale", label: "Architecture coloniale" },
            { id: "créole", label: "Architecture créole" },
            { id: "moderne", label: "Architecture moderne" },
            { id: "religieuse", label: "Architecture religieuse" },
            { id: "maisons-gingerbread", label: "Maisons Gingerbread" },
            { id: "fortifications", label: "Fortifications" },
        ],
    },
    {
        id: "gastronomie",
        label: "Gastronomie",
        count: 41,
        subcategories: [
            { id: "plats-traditionnels", label: "Plats traditionnels" },
            { id: "street-food", label: "Street Food" },
            { id: "fruits-tropicaux", label: "Fruits tropicaux" },
            { id: "boissons", label: "Boissons" },
            { id: "épices", label: "Épices" },
            { id: "marchés-alimentaires", label: "Marchés alimentaires" },
            { id: "restaurants", label: "Restaurants" },
        ],
    },
    {
        id: "vie-quotidienne",
        label: "Vie Quotidienne",
        count: 78,
        subcategories: [
            { id: "marchés", label: "Marchés" },
            { id: "transport", label: "Transport" },
            { id: "éducation", label: "Éducation" },
            { id: "travail", label: "Travail" },
            { id: "famille", label: "Famille" },
            { id: "enfants", label: "Enfants" },
            { id: "communauté", label: "Communauté" },
            { id: "sports", label: "Sports" },
        ],
    },
    {
        id: "villes",
        label: "Villes & Régions",
        count: 95,
        subcategories: [
            { id: "port-au-prince", label: "Port-au-Prince" },
            { id: "cap-haitien", label: "Cap-Haïtien" },
            { id: "jacmel", label: "Jacmel" },
            { id: "les-cayes", label: "Les Cayes" },
            { id: "gonaives", label: "Gonaïves" },
            { id: "petionville", label: "Pétion-Ville" },
            { id: "hinche", label: "Hinche" },
            { id: "jeremie", label: "Jérémie" },
            { id: "fort-dauphin", label: "Fort-Dauphin" },
        ],
    },
    {
        id: "événements",
        label: "Événements",
        count: 29,
        subcategories: [
            { id: "concerts", label: "Concerts" },
            { id: "expositions", label: "Expositions" },
            { id: "conférences", label: "Conférences" },
            { id: "graduations", label: "Graduations" },
            { id: "mariages", label: "Mariages" },
            { id: "baptêmes", label: "Baptêmes" },
            { id: "funérailles", label: "Funérailles" },
        ],
    },
    {
        id: "développement",
        label: "Développement & Innovation",
        count: 18,
        subcategories: [
            { id: "technologie", label: "Technologie" },
            { id: "startups", label: "Startups" },
            { id: "infrastructure", label: "Infrastructure" },
            { id: "énergie-renouvelable", label: "Énergie renouvelable" },
            { id: "agriculture-moderne", label: "Agriculture moderne" },
            { id: "éducation-numérique", label: "Éducation numérique" },
        ],
    },
    {
        id: "diaspora",
        label: "Diaspora Haïtienne",
        count: 15,
        subcategories: [
            { id: "communautés-usa", label: "Communautés USA" },
            { id: "communautés-canada", label: "Communautés Canada" },
            { id: "communautés-france", label: "Communautés France" },
            { id: "événements-diaspora", label: "Événements diaspora" },
            { id: "réussites-diaspora", label: "Réussites diaspora" },
            { id: "retour-pays", label: "Retour au pays" },
        ],
    },
    {
        id: "personnalités",
        label: "Personnalités",
        count: 12,
        subcategories: [
            { id: "artistes", label: "Artistes" },
            { id: "écrivains", label: "Écrivains" },
            { id: "sportifs", label: "Sportifs" },
            { id: "entrepreneurs", label: "Entrepreneurs" },
            { id: "leaders-communautaires", label: "Leaders communautaires" },
            { id: "scientifiques", label: "Scientifiques" },
        ],
    },
]

/** Categories for gallery filtering (without "all") */
export const uploadCategories = categories.filter((cat) => cat.id !== "all")
