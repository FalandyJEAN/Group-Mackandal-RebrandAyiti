"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Upload, Search, Grid, List, Heart, MessageCircle, Share2, MapPin, Calendar, User } from "lucide-react"
import { openUploadModal } from "@/lib/modal-events"

interface Photo {
  id: string
  url: string
  title: string
  description: string
  location: string
  author: string
  authorAvatar: string
  likes: number
  comments: number
  timestamp: string
  tags: string[]
  category: string
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set())

  useEffect(() => {
    const loadPhotos = () => {
      const mockPhotos: Photo[] = [
      {
        id: "1",
        url: "/images/haiti-citadelle.jpg",
        title: "Citadelle Laferrière au lever du soleil",
        description:
          "Vue majestueuse de la Citadelle Laferrière, symbole de la résistance haïtienne, baignée dans la lumière dorée du matin.",
        location: "Milot, Nord",
        author: "Marie Dupont",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        likes: 342,
        comments: 28,
        timestamp: "2024-01-15T08:30:00Z",
        tags: ["citadelle", "patrimoine", "unesco", "histoire"],
        category: "patrimoine",
      },
      {
        id: "2",
        url: "/images/haiti-jacmel-beach.jpg",
        title: "Plage de sable noir à Jacmel",
        description:
          "Les magnifiques plages de sable volcanique de Jacmel offrent un contraste saisissant avec les eaux turquoise des Caraïbes.",
        location: "Jacmel, Sud-Est",
        author: "Jean Baptiste",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        likes: 289,
        comments: 19,
        timestamp: "2024-01-14T16:45:00Z",
        tags: ["plage", "jacmel", "nature", "caraïbes"],
        category: "nature",
      },
      {
        id: "3",
        url: "/images/haiti-carnival.jpg",
        title: "Carnaval de Port-au-Prince",
        description:
          "L'explosion de couleurs et de joie du carnaval haïtien, célébration de notre culture vibrante et de notre créativité.",
        location: "Port-au-Prince, Ouest",
        author: "Sophie Morin",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        likes: 456,
        comments: 67,
        timestamp: "2024-01-13T14:20:00Z",
        tags: ["carnaval", "culture", "fête", "tradition"],
        category: "culture",
      },
      {
        id: "4",
        url: "/images/haiti-market.jpg",
        title: "Marché de Pétion-Ville",
        description:
          "L'effervescence colorée du marché de Pétion-Ville, où se mélangent saveurs, couleurs et traditions locales.",
        location: "Pétion-Ville, Ouest",
        author: "Pierre Louis",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        likes: 198,
        comments: 15,
        timestamp: "2024-01-12T11:15:00Z",
        tags: ["marché", "commerce", "local", "couleurs"],
        category: "vie-quotidienne",
      },
      {
        id: "5",
        url: "/images/haitian-art.jpg",
        title: "Art mural dans les rues de Cap-Haïtien",
        description:
          "L'art de rue haïtien raconte notre histoire et nos espoirs à travers des fresques murales impressionnantes.",
        location: "Cap-Haïtien, Nord",
        author: "Claudette Jean",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        likes: 234,
        comments: 31,
        timestamp: "2024-01-11T09:30:00Z",
        tags: ["art", "street-art", "culture", "expression"],
        category: "art",
      },
      {
        id: "6",
        url: "/images/haiti-mountains.jpg",
        title: "Montagnes de la Selle",
        description:
          "Les sommets verdoyants du Pic de la Selle, point culminant d'Haïti, offrent des panoramas à couper le souffle.",
        location: "Massif de la Selle, Sud-Est",
        author: "Michel Augustin",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        likes: 167,
        comments: 12,
        timestamp: "2024-01-10T07:45:00Z",
        tags: ["montagne", "nature", "randonnée", "panorama"],
        category: "nature",
      },
      ]

      // Merge user-uploaded photos from localStorage
      const userPhotos: Photo[] = JSON.parse(localStorage.getItem("rebrand_photos") || "[]").map(
        (p: Photo & { description?: string; authorAvatar?: string }) => ({
          ...p,
          description: p.description || "",
          authorAvatar: "/placeholder.svg?height=40&width=40",
          timestamp: p.timestamp || new Date().toISOString(),
        })
      )

      setPhotos([...userPhotos, ...mockPhotos])
    }

    loadPhotos()
    window.addEventListener("photosUpdated", loadPhotos)
    return () => window.removeEventListener("photosUpdated", loadPhotos)
  }, [])

  const categories = [
    { id: "all", label: "Toutes les photos", count: photos.length },
    { id: "nature", label: "Nature", count: photos.filter((p) => p.category === "nature").length },
    { id: "culture", label: "Culture", count: photos.filter((p) => p.category === "culture").length },
    { id: "art", label: "Art", count: photos.filter((p) => p.category === "art").length },
    { id: "patrimoine", label: "Patrimoine", count: photos.filter((p) => p.category === "patrimoine").length },
    {
      id: "vie-quotidienne",
      label: "Vie quotidienne",
      count: photos.filter((p) => p.category === "vie-quotidienne").length,
    },
  ]

  const filteredPhotos = photos.filter((photo) => {
    const matchesSearch =
      photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || photo.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Galerie RebrandAyiti</h1>
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                {photos.length} photos
              </span>
            </div>
            <button
              onClick={openUploadModal}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-red-700 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Partager une photo
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtres et recherche */}
        <div className="mb-8 space-y-4">
          {/* Barre de recherche */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher des photos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Filtres et options d'affichage */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400"}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400"}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Galerie */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64">
                  <Image
                    src={photo.url || "/placeholder.svg?height=256&width=400"}
                    alt={photo.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{photo.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{photo.description}</p>

                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm mb-3">
                    <MapPin className="w-4 h-4" />
                    {photo.location}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {photo.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{photo.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{photo.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image
                        src={photo.authorAvatar || "/placeholder.svg"}
                        alt={photo.author}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-sm text-gray-500 dark:text-gray-400">{photo.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="relative h-64 md:h-full">
                      <Image
                        src={photo.url || "/placeholder.svg?height=256&width=400"}
                        alt={photo.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{photo.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {photo.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(photo.timestamp)}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {photo.author}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4">{photo.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {photo.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors">
                          <Heart className="w-5 h-5" />
                          <span>{photo.likes} likes</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span>{photo.comments} commentaires</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors">
                          <Share2 className="w-5 h-5" />
                          <span>Partager</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredPhotos.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Aucune photo trouvée</h3>
            <p className="text-gray-600 dark:text-gray-400">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>
    </div>
  )
}
