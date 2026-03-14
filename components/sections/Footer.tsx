import { Github, Twitter, Linkedin, Mail } from "lucide-react"

interface FooterProps {
  data: {
    quickLinks: Array<{ label: string; href: string }>
    socialLinks: Array<{ platform: string; href: string }>
    copyright: string
  }
}

export default function Footer({ data }: FooterProps) {
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <Github className="w-5 h-5" />
      case "twitter":
        return <Twitter className="w-5 h-5" />
      case "linkedin":
        return <Linkedin className="w-5 h-5" />
      case "email":
        return <Mail className="w-5 h-5" />
      default:
        return null
    }
  }

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo et description */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
              RebrandAyiti
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Valorisons ensemble les images positives d'Haïti et construisons un avenir meilleur pour notre pays.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              {data.quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
            <div className="flex gap-4">
              {data.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                  aria-label={`Suivre sur ${social.platform}`}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">{data.copyright.replace("{year}", new Date().getFullYear().toString())}</p>
        </div>
      </div>
    </footer>
  )
}
