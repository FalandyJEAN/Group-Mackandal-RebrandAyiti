"use client"

import { openAuthModal } from "@/lib/modal-events"

const CITIES = [
  "Port-au-Prince", "Cap-Haïtien", "Jacmel", "Gonaïves",
  "Les Cayes", "Jérémie", "Saint-Marc", "Hinche",
  "Pétion-Ville", "Kenscoff", "Léogâne", "Miragoâne",
]

const IMPACTS = [
  { value: "12 847", label: "Imaj patajé", sub: "depi lansман an" },
  { value: "89", label: "Peyi touche", sub: "Google ap montre yo" },
  { value: "2 341", label: "Imaj signalé", sub: "rapòte sou Google" },
  { value: "100%", label: "Gratis, ouvè", sub: "MIT License" },
]

// Initials avatar — no placeholder.svg
function Avatar({ name, color }: { name: string; color: string }) {
  const initials = name.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase()
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
      style={{ background: color }}
    >
      {initials}
    </div>
  )
}

const CONTRIBUTORS = [
  { name: "Falandy Jean", city: "Port-au-Prince", photos: 47, color: "#003F87" },
  { name: "Marie Estimé", city: "Jacmel", photos: 34, color: "#D21034" },
  { name: "Kerby Lubin", city: "Cap-Haïtien", photos: 28, color: "#1a5fa8" },
  { name: "Sophia Pierre", city: "Les Cayes", photos: 21, color: "#e63350" },
]

export default function CommunitySection() {
  return (
    <section className="py-24 bg-gray-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Titre */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-gray-500 mb-4">
              Mouvman an vivan
            </p>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight">
              Ayisyen <span style={{ color: '#003F87' }}>& zanmi</span> Ayiti<br />
              <span style={{ color: '#D21034' }}>travay ansanm.</span>
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-gray-400 text-lg leading-relaxed">
              Nenpòt moun ki gen foto bèl Ayiti ka kontribye.
              Ou pa bezwen kòd — jis yon foto, yon koub, yon vi ou vle pataje.
            </p>
          </div>
        </div>

        {/* Stats — pas d'icônes, juste des chiffres */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-800 border border-gray-800 mb-20">
          {IMPACTS.map((stat, i) => (
            <div key={i} className="bg-gray-950 px-8 py-10">
              <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-white font-semibold text-sm mb-1">{stat.label}</div>
              <div className="text-gray-500 text-xs">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Layout 2 colonnes : contributeurs + carte villes */}
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Contributeurs */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-6">
              Kèk kontribitè
            </h3>
            <div className="space-y-3">
              {CONTRIBUTORS.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 border border-gray-800 hover:border-gray-600 transition-colors group"
                >
                  <Avatar name={c.name} color={c.color} />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white truncate">{c.name}</div>
                    <div className="text-gray-500 text-sm">{c.city}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{c.photos}</div>
                    <div className="text-gray-500 text-xs">foto</div>
                  </div>
                </div>
              ))}
              <button
                onClick={openAuthModal}
                className="w-full mt-2 p-4 border border-dashed border-gray-700 text-gray-500 hover:text-white hover:border-gray-400 transition-colors text-sm font-medium"
              >
                + Vin kontribye tou
              </button>
            </div>
          </div>

          {/* Villes comme grille de tags */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-6">
              Vil nan Ayiti ki reprezante
            </h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {CITIES.map((city, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-sm border border-gray-700 text-gray-300 hover:border-gray-400 hover:text-white transition-colors cursor-default"
                >
                  {city}
                </span>
              ))}
              <span className="px-3 py-1.5 text-sm border border-dashed border-gray-700 text-gray-600">
                + ou menm...
              </span>
            </div>

            {/* Bloc manifeste */}
            <div
              className="p-8 border-l-4"
              style={{ borderColor: '#D21034', backgroundColor: 'rgba(210,16,52,0.05)' }}
            >
              <p className="text-lg font-semibold text-white leading-relaxed mb-4">
                &ldquo;Haïti pa sèlman tranblemantè ak povrete. Se art, se mizik, se rezistans,
                se bèlte ki pa janm fini.&rdquo;
              </p>
              <p className="text-gray-500 text-sm">— Misyon Group Mackandal</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
