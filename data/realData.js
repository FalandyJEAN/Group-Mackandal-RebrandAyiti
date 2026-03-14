import { Camera, Users, Globe, Heart, Zap, Shield } from "lucide-react"

export const realData = {
  hero: {
    title: "Chanje Imaj Ayiti",
    subtitle: "Nou pap kite Google defini nou",
    description:
      "Plateforme kominotè pou ranplase imaj negatif Ayiti ak bèl foto ki montre richès kiltirèl, kapasite ak bèlte peyi a. Chak foto ou pataje se yon aksyon pou chanje naratif dijital la.",
    ctaText: "Pataje yon foto",
    secondaryCTA: "Gade galri a",
    imageUrl: "/images/haiti-hero.jpg",
    imageAlt: "Bèl peyizaj Ayiti — Citadelle Laferrière",
  },

  features: {
    title: "Une plateforme complète",
    subtitle: "Tous les outils pour valoriser et partager la beauté authentique d'Haïti",
    features: [
      {
        icon: Camera,
        title: "Upload et partage facile",
        description:
          "Partagez vos photos en quelques clics avec géolocalisation automatique et tags intelligents pour une meilleure découvrabilité.",
      },
      {
        icon: Users,
        title: "Communauté active",
        description:
          "Plus de 3,400 contributeurs actifs partagent quotidiennement leurs perspectives uniques d'Haïti à travers le pays.",
      },
      {
        icon: Globe,
        title: "Impact mondial mesurable",
        description:
          "Vos photos sont vues dans 89 pays. Suivez l'impact de vos contributions avec des analytics détaillés.",
      },
      {
        icon: Heart,
        title: "Modération communautaire",
        description:
          "Système de votes et de modération par la communauté pour garantir la qualité et l'authenticité du contenu.",
      },
      {
        icon: Zap,
        title: "Recherche intelligente",
        description:
          "Trouvez facilement des photos par localisation, tags, auteur ou contenu grâce à notre moteur de recherche avancé.",
      },
      {
        icon: Shield,
        title: "Droits d'auteur protégés",
        description:
          "Vos photos restent votre propriété. Licences Creative Commons disponibles pour encourager le partage responsable.",
      },
    ],
  },

  cta: {
    title: "Ou pare pou montre vrè Ayiti ?",
    subtitle: "Rejwenn milye kontribitè ki ap chanje pèsepsyon Ayiti yon foto alafwa. Gratis, ouvè, pou tout moun.",
    primaryCTA: "Kreye kont gratis",
    secondaryCTA: "Eksplore galri a",
  },

  footer: {
    quickLinks: [
      { label: "Galerie", href: "/gallery" },
      { label: "Communauté", href: "/community" },
      { label: "Signaler", href: "/report" },
      { label: "À propos", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    socialLinks: [
      { platform: "GitHub", href: "https://github.com/FalandyJEAN/Group-Mackandal-RebrandAyiti" },
      { platform: "Twitter", href: "https://twitter.com/rebrandayiti" },
      { platform: "LinkedIn", href: "https://linkedin.com/company/rebrandayiti" },
      { platform: "Email", href: "mailto:rebrandayiti@groupmackandal.org" },
    ],
    copyright: "© {year} Group Mackandal — RebrandAyiti. MIT License. Fèt ak ❤️ pou Ayiti.",
  },
}
