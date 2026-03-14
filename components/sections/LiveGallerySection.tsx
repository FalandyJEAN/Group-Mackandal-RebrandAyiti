"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { categories } from "@/data/categories"
import { useAuth } from "@/lib/auth-context"
import { openUploadModal, openAuthModal } from "@/lib/modal-events"

interface Photo {
  id: string
  url: string
  title: string
  location: string
  author: string
  likes: number
  comments: number
  timestamp: string
  tags: string[]
  category: string
  subcategory?: string
}

const MOCK_PHOTOS: Photo[] = [
  {
    id: "1",
    url: "/images/citadelle-sunrise.jpg",
    title: "Citadelle Laferrière au lever du soleil",
    location: "Milot, Nord",
    author: "Marie Dupont",
    likes: 342,
    comments: 28,
    timestamp: "Il y a 2 minutes",
    tags: ["citadelle", "patrimoine", "unesco"],
    category: "patrimoine",
    subcategory: "citadelle",
  },
  {
    id: "2",
    url: "/images/jacmel-carnival.jpg",
    title: "Masques colorés du Carnaval de Jacmel",
    location: "Jacmel, Sud-Est",
    author: "Jean Baptiste",
    likes: 456,
    comments: 67,
    timestamp: "Il y a 15 minutes",
    tags: ["carnaval", "jacmel", "masques"],
    category: "culture",
    subcategory: "carnaval",
  },
  {
    id: "3",
    url: "/images/labadee-beach.jpg",
    title: "Plage paradisiaque de Labadee",
    location: "Labadee, Nord",
    author: "Sophie Morin",
    likes: 289,
    comments: 19,
    timestamp: "Il y a 1 heure",
    tags: ["plage", "labadee", "turquoise"],
    category: "nature",
    subcategory: "plages",
  },
  {
    id: "4",
    url: "/images/iron-market.jpg",
    title: "Marché en Fer de Port-au-Prince",
    location: "Port-au-Prince, Ouest",
    author: "Pierre Louis",
    likes: 198,
    comments: 15,
    timestamp: "Il y a 2 heures",
    tags: ["marché", "architecture", "fer"],
    category: "architecture",
    subcategory: "coloniale",
  },
  {
    id: "5",
    url: "/images/haitian-art.jpg",
    title: "Peinture naïve haïtienne",
    location: "Pétion-Ville, Ouest",
    author: "Claudette Jean",
    likes: 234,
    comments: 31,
    timestamp: "Il y a 3 heures",
    tags: ["peinture", "art-naïf", "couleurs"],
    category: "art",
    subcategory: "peinture",
  },
  {
    id: "6",
    url: "/images/haiti-culture.jpg",
    title: "Griot ak banann boukannen",
    location: "Cap-Haïtien, Nord",
    author: "Michel Augustin",
    likes: 167,
    comments: 12,
    timestamp: "Il y a 4 heures",
    tags: ["griot", "cuisine", "tradisyon"],
    category: "gastronomie",
    subcategory: "plats-traditionnels",
  },
  {
    id: "7",
    url: "/images/tap-tap.jpg",
    title: "Tap-tap coloré dans les rues",
    location: "Port-au-Prince, Ouest",
    author: "Roseline Pierre",
    likes: 145,
    comments: 8,
    timestamp: "Il y a 5 heures",
    tags: ["tap-tap", "couleurs", "art"],
    category: "vie-quotidienne",
    subcategory: "transport",
  },
  {
    id: "8",
    url: "/images/bassin-bleu.jpg",
    title: "Bassin Bleu — Piscine naturelle",
    location: "Jacmel, Sud-Est",
    author: "David Moïse",
    likes: 312,
    comments: 24,
    timestamp: "Il y a 6 heures",
    tags: ["bassin-bleu", "nature", "turquoise"],
    category: "nature",
    subcategory: "rivières",
  },
]

export default function LiveGallerySection() {
  const { token } = useAuth()
  const [photos, setPhotos] = useState<Photo[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set())

  const loadPhotos = async () => {
    try {
      const res = await fetch("/api/photos?limit=20")
      const data = await res.json()
      const apiPhotos = (data.photos || []).map((p: Photo & { likes_count?: number; created_at?: string }) => ({
        ...p,
        likes: p.likes_count ?? p.likes ?? 0,
        timestamp: p.created_at ? new Date(p.created_at).toLocaleDateString("fr-FR") : "Récent",
        tags: p.tags || [],
      }))
      setPhotos([...apiPhotos, ...MOCK_PHOTOS])
    } catch {
      setPhotos(MOCK_PHOTOS)
    }
  }

  useEffect(() => {
    loadPhotos()
    window.addEventListener("photosUpdated", loadPhotos)
    return () => window.removeEventListener("photosUpdated", loadPhotos)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleLike = async (photoId: string) => {
    if (!token) {
      openAuthModal()
      return
    }
    if (!isNaN(Number(photoId))) {
      try {
        await fetch(`/api/photos/${photoId}/like`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        })
      } catch {}
    }
    setLikedPhotos((prev) => {
      const next = new Set(prev)
      next.has(photoId) ? next.delete(photoId) : next.add(photoId)
      return next
    })
  }

  const filteredPhotos = photos.filter(
    (p) => selectedCategory === "all" || p.category === selectedCategory
  )

  const NAV_CATS = [{ id: "all", label: "Tout" }, ...categories.slice(0, 8).map(c => ({ id: c.id, label: c.label }))]

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* En-tête éditorial */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-gray-400 dark:text-gray-500 mb-3">
              RebrandStock
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white leading-none">
              Vrè Ayiti.
              <br />
              <span style={{ color: '#D21034' }}>Pa filtre.</span>
            </h2>
          </div>
          <button
            onClick={openUploadModal}
            className="btn-haiti inline-flex items-center gap-2 px-6 py-3 font-bold text-sm self-start sm:self-auto"
          >
            + Ajoute yon foto
          </button>
        </div>

        {/* Filtres — texte flat, underline active */}
        <div className="flex flex-wrap gap-0 border-b border-gray-200 dark:border-gray-800 mb-10 overflow-x-auto">
          {NAV_CATS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px ${
                selectedCategory === cat.id
                  ? "border-[#003F87] text-[#003F87] dark:text-white dark:border-white"
                  : "border-transparent text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grille masonry — 4 colonnes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-gray-200 dark:bg-gray-800 mb-12">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group bg-white dark:bg-gray-950 overflow-hidden"
            >
              <Link href={!isNaN(Number(photo.id)) ? `/photos/${photo.id}` : "#"}>
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={photo.url || "/images/haiti-hero.jpg"}
                    alt={photo.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized={photo.url?.startsWith("data:")}
                  />
                  {/* Overlay au hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                  {/* Location badge */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-xs font-medium truncate">{photo.location}</p>
                  </div>
                </div>
              </Link>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1 mb-2">
                  {photo.title}
                </h3>

                {/* Tags flat */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {photo.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => toggleLike(photo.id)}
                    className={`flex items-center gap-1.5 text-sm transition-colors ${
                      likedPhotos.has(photo.id)
                        ? "text-[#D21034]"
                        : "text-gray-400 hover:text-[#D21034]"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedPhotos.has(photo.id) ? "fill-current" : ""}`} />
                    <span>{photo.likes + (likedPhotos.has(photo.id) ? 1 : 0)}</span>
                  </button>
                  <span className="text-xs text-gray-400 dark:text-gray-600 truncate max-w-[8rem]">
                    {photo.author}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA — style éditorial */}
        <div className="border border-gray-200 dark:border-gray-800 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-600 mb-1">
              Tu gen yon foto?
            </p>
            <p className="text-xl font-black text-gray-900 dark:text-white">
              Chak foto ou ajoute se yon vwa pou Ayiti.
            </p>
          </div>
          <button
            onClick={openUploadModal}
            className="btn-haiti px-8 py-3 font-bold text-sm whitespace-nowrap"
          >
            Pataje kounye a
          </button>
        </div>

      </div>
    </section>
  )
}
