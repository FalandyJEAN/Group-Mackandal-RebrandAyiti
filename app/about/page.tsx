import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const team = [
    { name: "Jean-Pierre Moreau", role: "Fondateur & Dev", location: "Port-au-Prince" },
    { name: "Marie-Claire Beaubrun", role: "Design & UX", location: "Jacmel" },
    { name: "Réginald François", role: "Communauté", location: "Cap-Haïtien" },
    { name: "Sabrina Désir", role: "Contenu & SEO", location: "Miami, USA" },
  ]

  const values = [
    { title: "Authenticité", description: "Chaque photo doit représenter la vraie Haïti, sans filtre ni manipulation." },
    { title: "Communauté", description: "Le projet appartient à tous les Haïtiens et amis d'Haïti." },
    { title: "Open Source", description: "Code et données ouverts pour un impact maximal et transparent." },
    { title: "Dignité", description: "Haïti mérite d'être représentée avec fierté et respect." },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-red-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Notre mission</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            RebrandAyiti est un mouvement citoyen pour changer la perception mondiale d&apos;Haïti,
            une photo authentique à la fois.
          </p>
        </div>
      </section>

      {/* Pourquoi */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Pourquoi RebrandAyiti ?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Quand vous tapez &quot;Haïti&quot; sur Google Images, vous voyez principalement des images de pauvreté, de catastrophes et de violence. Ces images ne représentent pas la richesse culturelle, la beauté naturelle et la résilience du peuple haïtien.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              RebrandAyiti est né d&apos;une conviction simple : si nous remplissons Internet de belles images authentiques d&apos;Haïti, les algorithmes de Google vont naturellement les mettre en avant.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Chaque photo partagée est une action concrète pour changer le narratif.
            </p>
          </div>
          <div className="relative h-72 rounded-2xl overflow-hidden shadow-xl">
            <Image src="/images/haiti-hero.jpg" alt="Haïti" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Nos valeurs</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">L&apos;équipe</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">{member.name[0]}</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{member.name}</h3>
              <p className="text-blue-600 dark:text-blue-400 text-sm">{member.role}</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{member.location}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-red-600">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Rejoignez le mouvement</h2>
          <p className="text-blue-100 mb-8">Chaque contributeur compte. Ensemble, changeons le narratif.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/gallery" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Voir la galerie
            </Link>
            <Link href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
