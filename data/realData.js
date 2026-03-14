import { Camera, Users, Globe, Heart, Zap, Shield } from "lucide-react"

export const realData = {
  hero: {
    title: "RebrandAyiti",
    subtitle: "Valorisons les vraies images d'Haïti",
    description:
      "Plateforme collaborative où les Haïtiens et amis d'Haïti partagent des photos authentiques pour changer la perception mondiale de notre beau pays. Rejoignez le mouvement !",
    ctaText: "Commencer à partager",
    secondaryCTA: "Voir la galerie",
    imageUrl: "/images/haiti-hero.jpg",
    imageAlt: "Magnifique paysage d'Haïti - Citadelle Laferrière",
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
    title: "Prêt à montrer le vrai visage d'Haïti ?",
    subtitle: "Rejoignez des milliers de contributeurs qui transforment la perception d'Haïti une photo à la fois.",
    primaryCTA: "Créer mon compte gratuit",
    secondaryCTA: "Explorer la galerie",
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
      { platform: "GitHub", href: "https://github.com/rebrandayiti/platform" },
      { platform: "Twitter", href: "https://twitter.com/rebrandayiti" },
      { platform: "LinkedIn", href: "https://linkedin.com/company/rebrandayiti" },
      { platform: "Email", href: "mailto:hello@rebrandayiti.org" },
    ],
    copyright: "© {year} RebrandAyiti. Projet open-source sous licence MIT. Fait avec ❤️ pour Haïti.",
  },
}
