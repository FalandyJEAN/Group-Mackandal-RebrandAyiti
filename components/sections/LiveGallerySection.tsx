"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, MessageCircle, Share2, MapPin, Camera, Filter, Grid, List } from "lucide-react"
import { categories } from "@/data/categories"
import { useAuth } from "@/lib/auth-context"

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
    tags: ["citadelle", "patrimoine", "unesco", "lever-soleil"],
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
    tags: ["carnaval", "jacmel", "masques", "tradition"],
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
    tags: ["plage", "labadee", "turquoise", "paradis"],
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
    tags: ["marché", "architecture", "port-au-prince", "fer"],
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
    tags: ["peinture", "art-naïf", "couleurs", "tradition"],
    category: "art",
    subcategory: "peinture",
  },
  {
    id: "6",
    url: "/images/haiti-culture.jpg",
    title: "Griot avec banann boukannen",
    location: "Cap-Haïtien, Nord",
    author: "Michel Augustin",
    likes: 167,
    comments: 12,
    timestamp: "Il y a 4 heures",
    tags: ["griot", "cuisine", "traditionnel", "délicieux"],
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
    tags: ["tap-tap", "transport", "couleurs", "art"],
    category: "vie-quotidienne",
    subcategory: "transport",
  },
  {
    id: "8",
    url: "/images/bassin-bleu.jpg",
    title: "Bassin Bleu - Piscine naturelle",
    location: "Jacmel, Sud-Est",
    author: "David Moïse",
    likes: 312,
    comments: 24,
    timestamp: "Il y a 6 heures",
    tags: ["bassin-bleu", "nature", "eau", "turquoise"],
    category: "nature",
    subcategory: "rivières",
  },
]

export default function LiveGallerySection() {
  const { token } = useAuth()
  const [photos, setPhotos] = useState<Photo[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSubcategory, setSelectedSubcategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
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
      window.dispatchEvent(new CustomEvent("openAuthModal"))
      return
    }
    const isNumericId = !isNaN(Number(photoId))
    if (isNumericId) {
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

  const currentCategory = categories.find((cat) => cat.id === selectedCategory)
  const subcategories = currentCategory?.subcategories || []

  const filteredPhotos = photos.filter((photo) => {
    const matchesCategory = selectedCategory === "all" || photo.category === selectedCategory
    const matchesSubcategory = selectedSubcategory === "all" || photo.subcategory === selectedSubcategory
    return matchesCategory && matchesSubcategory
  })

  return (
    <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 md:px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs md:text-sm font-medium">Galerie en direct</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Découvrez le vrai Haïti
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6 md:mb-8">
            Photos authentiques partagées par notre communauté à travers tout le pays
          </p>
        </div>

        {/* Filtres par catégorie */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="font-medium text-gray-900 dark:text-white">Catégories</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 mb-4">
            {categories.slice(0, 10).map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id)
                  setSelectedSubcategory("all")
                }}
                className={`p-2 md:p-3 rounded-lg font-medium transition-colors text-sm md:text-base ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
              >
                <div className="truncate">{category.label}</div>
                <div className="text-xs opacity-75">({category.count})</div>
              </button>
            ))}
          </div>

          {subcategories.length > 0 && (
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSubcategory("all")}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedSubcategory === "all"
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  Toutes
                </button>
                {subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubcategory(sub.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedSubcategory === sub.id
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Options d'affichage */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {filteredPhotos.length} photo{filteredPhotos.length > 1 ? "s" : ""} trouvée{filteredPhotos.length > 1 ? "s" : ""}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Grille de photos */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <Link href={!isNaN(Number(photo.id)) ? `/photos/${photo.id}` : "#"} className="block">
                <div className="relative h-48 md:h-64">
                  <Image
                    src={photo.url || "/placeholder.svg?height=256&width=400"}
                    alt={photo.title}
                    fill
                    className="object-cover"
                    unoptimized={photo.url.startsWith("data:")}
                  />
                  <div className="absolute top-2 md:top-3 right-2 md:right-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
                    {photo.timestamp}
                  </div>
                </div>
                </Link>

                <div className="p-4 md:p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm md:text-base line-clamp-2">
                    {photo.title}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-3">
                    <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="truncate">{photo.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3 md:mb-4">
                    {photo.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 md:gap-4">
                      <button
                        onClick={() => toggleLike(photo.id)}
                        className={`flex items-center gap-1 transition-colors ${likedPhotos.has(photo.id) ? "text-red-500" : "text-gray-600 dark:text-gray-400 hover:text-red-500"}`}
                      >
                        <Heart className={`w-3 h-3 md:w-4 md:h-4 ${likedPhotos.has(photo.id) ? "fill-current" : ""}`} />
                        <span className="text-xs md:text-sm">{photo.likes + (likedPhotos.has(photo.id) ? 1 : 0)}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="text-xs md:text-sm">{photo.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors">
                        <Share2 className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    </div>
                    <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 truncate max-w-20">
                      par {photo.author}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <div className="relative h-48 md:h-full min-h-[12rem]">
                      <Image
                        src={photo.url || "/placeholder.svg?height=256&width=400"}
                        alt={photo.title}
                        fill
                        className="object-cover"
                        unoptimized={photo.url.startsWith("data:")}
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3 p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">{photo.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                        {photo.location}
                      </div>
                      <div>{photo.timestamp}</div>
                      <div>par {photo.author}</div>
                    </div>
                    <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                      {photo.tags.map((tag) => (
                        <span key={tag} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 md:gap-6">
                      <button
                        onClick={() => toggleLike(photo.id)}
                        className={`flex items-center gap-1 md:gap-2 transition-colors ${likedPhotos.has(photo.id) ? "text-red-500" : "text-gray-600 dark:text-gray-400 hover:text-red-500"}`}
                      >
                        <Heart className={`w-4 h-4 md:w-5 md:h-5 ${likedPhotos.has(photo.id) ? "fill-current" : ""}`} />
                        <span className="text-sm md:text-base">{photo.likes + (likedPhotos.has(photo.id) ? 1 : 0)} likes</span>
                      </button>
                      <button className="flex items-center gap-1 md:gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-sm md:text-base">{photo.comments} commentaires</span>
                      </button>
                      <button className="flex items-center gap-1 md:gap-2 text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors">
                        <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-red-600 rounded-2xl p-6 md:p-8 text-white">
            <Camera className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-4" />
            <h3 className="text-xl md:text-2xl font-bold mb-4">Partagez votre vision d&apos;Haïti</h3>
            <p className="text-blue-100 mb-4 md:mb-6 max-w-2xl mx-auto text-sm md:text-base">
              Rejoignez notre communauté et contribuez à montrer la beauté authentique d&apos;Haïti au monde entier
            </p>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("openUploadModal"))}
              className="bg-white text-blue-600 px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm md:text-base"
            >
              Commencer à partager
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
