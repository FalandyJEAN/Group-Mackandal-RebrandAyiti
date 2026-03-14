"use client"

import Link from "next/link"
import { openAuthModal } from "@/lib/modal-events"

const TOP_CONTRIBUTORS = [
  { name: "Marie Dupont",     city: "Jakmel",         photos: 234, likes: 12847, color: "#D21034" },
  { name: "Jean Baptiste",    city: "Okap",           photos: 189, likes: 9632,  color: "#003F87" },
  { name: "Sophie Morin",     city: "Pòtoprens",      photos: 156, likes: 8421,  color: "#1a5fa8" },
  { name: "Pierre Louis",     city: "Okay",           photos: 143, likes: 7893,  color: "#e63350" },
  { name: "Claudette Jean",   city: "Gonayiv",        photos: 128, likes: 6754,  color: "#003F87" },
  { name: "David Moïse",      city: "Ench",           photos: 112, likes: 5432,  color: "#D21034" },
  { name: "Roseline Pierre",  city: "Jeremi",         photos: 98,  likes: 4876,  color: "#1a5fa8" },
  { name: "Michel Augustin",  city: "Fò-Libète",      photos: 87,  likes: 4123,  color: "#e63350" },
]

const ACTIVITY = [
  { name: "Marie D.",    action: "pataje yon foto",       item: "Kouche solèy nan Jakmel",       time: "2 min" },
  { name: "Jean B.",     action: "renmen",                item: "Festival mizik nan Okap",        time: "5 min" },
  { name: "Sophie M.",   action: "komante",               item: "Art larim Pòtoprens",            time: "8 min" },
  { name: "Pierre L.",   action: "pataje yon foto",       item: "Achitekti kolonyal",             time: "12 min" },
  { name: "Claudette J.",action: "rantre nan",            item: "kominote RebrandAyiti",          time: "15 min" },
  { name: "David M.",    action: "pataje yon foto",       item: "Bassin Bleu Jakmel",             time: "20 min" },
  { name: "Roseline P.", action: "renmen",                item: "Tap-tap koulè",                  time: "25 min" },
  { name: "Michel A.",   action: "komante",               item: "Griot tradisyonèl",              time: "30 min" },
]

const REGIONS = [
  { name: "Pòtoprens",   photos: 3245, contributors: 892 },
  { name: "Okap",        photos: 2187, contributors: 567 },
  { name: "Jakmel",      photos: 1876, contributors: 423 },
  { name: "Okay",        photos: 987,  contributors: 234 },
  { name: "Gonayiv",     photos: 756,  contributors: 189 },
  { name: "Petyonvil",   photos: 654,  contributors: 167 },
]

const STATS = [
  { value: "3 421",  label: "Manm aktif",         sub: "nan kominote a" },
  { value: "847",    label: "Foto semèn sa",       sub: "+23% pase semèn" },
  { value: "45 632", label: "Renmen bay",          sub: "totalman" },
  { value: "89",     label: "Peyi touche",         sub: "sou Google" },
]

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

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">

      {/* Bande drapeau */}
      <div className="flex h-1">
        <div className="flex-1" style={{ backgroundColor: "#003F87" }} />
        <div className="flex-1" style={{ backgroundColor: "#D21034" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 md:py-16">

        {/* En-tête */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start mb-12 md:mb-20">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-gray-400 dark:text-gray-500 mb-4">
              Mouvman an
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              Kominote{" "}
              <span style={{ color: "#003F87" }}>RebrandAyiti</span>
            </h1>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Plis pase 3 400 moun — Ayisyen ak zanmi Ayiti — k ap travay
              ansanm pou chanje sa Google montre lè ou chèche Ayiti.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 mb-12 md:mb-20">
          {STATS.map((s, i) => (
            <div key={i} className="bg-white dark:bg-gray-950 px-4 py-6 md:px-8 md:py-10">
              <div className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">{s.value}</div>
              <div className="text-gray-900 dark:text-white font-semibold text-sm mb-1">{s.label}</div>
              <div className="text-gray-500 text-xs">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* 3 colonnes */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">

          {/* Kontribitè */}
          <div className="lg:col-span-2">
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-6">
              Top kontribitè mwa sa
            </h2>
            <div className="space-y-2">
              {TOP_CONTRIBUTORS.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
                >
                  <span className="text-xs font-black text-gray-300 dark:text-gray-700 w-5 text-right shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Avatar name={c.name} color={c.color} />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 dark:text-white truncate">{c.name}</div>
                    <div className="text-gray-500 text-sm">{c.city}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-gray-900 dark:text-white font-bold">{c.photos}</div>
                    <div className="text-gray-400 text-xs">foto</div>
                  </div>
                  <div className="text-right shrink-0 hidden sm:block">
                    <div className="text-gray-900 dark:text-white font-bold">{c.likes.toLocaleString()}</div>
                    <div className="text-gray-400 text-xs">renmen</div>
                  </div>
                </div>
              ))}
              <button
                onClick={openAuthModal}
                className="w-full mt-2 p-4 border border-dashed border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:border-gray-500 dark:hover:border-gray-400 transition-colors text-sm font-medium"
              >
                + Vin kontribye tou
              </button>
            </div>
          </div>

          {/* Aktivite récente */}
          <div>
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-6">
              Aktivite resan
            </h2>
            <div className="space-y-0 border border-gray-200 dark:border-gray-800">
              {ACTIVITY.map((a, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-800 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D21034] mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">{a.name}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm"> {a.action} </span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">{a.item}</span>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">{a.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Régions */}
        <div className="mb-16">
          <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-6">
            Kontribisyon pa rejyon
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
            {REGIONS.map((r) => (
              <div key={r.name} className="bg-white dark:bg-gray-950 p-5 md:p-6">
                <h3 className="font-black text-gray-900 dark:text-white text-lg mb-3">{r.name}</h3>
                <div className="flex justify-between text-sm text-gray-500 mb-3">
                  <span>{r.photos.toLocaleString()} foto</span>
                  <span>{r.contributors} kontribitè</span>
                </div>
                <div className="w-full h-1 bg-gray-200 dark:bg-gray-800">
                  <div
                    className="h-1"
                    style={{
                      width: `${(r.photos / 3245) * 100}%`,
                      background: "linear-gradient(to right, #003F87, #D21034)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border border-gray-200 dark:border-gray-800 p-5 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-600 mb-1">
              Rantre nan mouvman an
            </p>
            <p className="text-xl font-black text-gray-900 dark:text-white">
              Foto w la ka chanje sa Google montre.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={openAuthModal}
              className="btn-haiti px-6 py-3 font-bold text-sm"
            >
              Kreye kont ou
            </button>
            <Link
              href="/gallery"
              className="border border-gray-900 dark:border-white text-gray-900 dark:text-white px-6 py-3 font-bold text-sm hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
            >
              Wè galri a
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
