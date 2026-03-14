"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import {
  AlertTriangle, Search, Flag, ExternalLink, CheckCircle,
  X, Camera, Shield, RefreshCw, Brain, TrendingUp
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { openAuthModal } from "@/lib/modal-events"

interface NegativeImage {
  id: number
  image_url: string
  page_url: string
  search_query: string
  title: string
  negativity_score: number
  ai_labels: { labels: string[]; method: string }
  report_count: number
  status: "pending" | "reported" | "resolved"
  found_at: string
}

interface Stats {
  pending: string
  reported: string
  resolved: string
  total_reports: string
}

const REPORT_REASONS = [
  "Image obsolète (plus de 5 ans)",
  "Hors contexte / manipulation",
  "Stéréotype négatif",
  "Photo non représentative",
  "Image stigmatisante",
  "Contenu offensant pour Haïti",
  "Autre",
]

export default function ReportPage() {
  const { token } = useAuth()
  const [images, setImages] = useState<NegativeImage[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set())
  const [reportReason, setReportReason] = useState("")
  const [reporting, setReporting] = useState<number | null>(null)
  const [reportedIds, setReportedIds] = useState<Set<number>>(new Set())
  const [isRunningCrawler, setIsRunningCrawler] = useState(false)
  const [crawlerResult, setCrawlerResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [googleReportUrl, setGoogleReportUrl] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/crawler/results?limit=20")
      const data = await res.json()
      setImages(data.images || [])
      setStats(data.stats || null)
    } catch {
      setImages([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleReport = async (imageId: number, reason: string) => {
    setReporting(imageId)
    try {
      const res = await fetch(`/api/crawler/${imageId}/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ reason }),
      })
      const data = await res.json()
      if (res.ok) {
        setReportedIds((prev) => new Set([...prev, imageId]))
        setImages((prev) =>
          prev.map((img) =>
            img.id === imageId ? { ...img, report_count: data.report_count } : img
          )
        )
        if (data.google_report_url) {
          setGoogleReportUrl(data.google_report_url)
          window.open(data.google_report_url, "_blank")
        }
      }
    } finally {
      setReporting(null)
      setSelectedImages(new Set())
      setReportReason("")
    }
  }

  const handleBulkReport = async () => {
    if (!reportReason || selectedImages.size === 0) return
    if (!token) { openAuthModal(); return }
    for (const id of selectedImages) {
      await handleReport(id, reportReason)
    }
  }

  const runCrawler = async () => {
    setIsRunningCrawler(true)
    setCrawlerResult(null)
    try {
      const res = await fetch("/api/crawler", {
        headers: { Authorization: `Bearer dev_cron_secret` },
      })
      const data = await res.json()
      setCrawlerResult(
        `Crawler terminé : ${data.scanned} images scannées, ${data.stored} nouvelles images négatives trouvées (requête : "${data.query}")`
      )
      await loadData()
    } catch {
      setCrawlerResult("Erreur lors du crawl. Vérifiez les clés API dans .env.local")
    } finally {
      setIsRunningCrawler(false)
    }
  }

  const filteredImages = images.filter(
    (img) =>
      img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.search_query.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const scoreColor = (score: number) => {
    if (score >= 0.7) return "text-red-600 bg-red-100 dark:bg-red-900/30"
    if (score >= 0.4) return "text-orange-600 bg-orange-100 dark:bg-orange-900/30"
    return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30"
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Shield className="w-7 h-7 text-red-600" />
                Signalement d&apos;Images Négatives
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Notre IA scanne Google Images et détecte les représentations négatives d&apos;Haïti
              </p>
            </div>
            <button
              onClick={runCrawler}
              disabled={isRunningCrawler}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-red-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-red-700 transition-colors disabled:opacity-60"
            >
              {isRunningCrawler ? (
                <><RefreshCw className="w-4 h-4 animate-spin" /> Scan en cours...</>
              ) : (
                <><Brain className="w-4 h-4" /> Lancer le scan IA</>
              )}
            </button>
          </div>

          {crawlerResult && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3 text-sm text-blue-800 dark:text-blue-200 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              {crawlerResult}
            </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 text-center shadow-sm">
            <div className="text-3xl font-bold text-red-600 mb-1">{stats?.pending ?? "—"}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Images détectées</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 text-center shadow-sm">
            <div className="text-3xl font-bold text-orange-600 mb-1">{stats?.reported ?? "—"}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">En cours</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 text-center shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-1">{stats?.resolved ?? "—"}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Résolues</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 text-center shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-1">{stats?.total_reports ?? "—"}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Signalements totaux</div>
          </div>
        </div>

        {/* Comment ça marche */}
        <div className="bg-gradient-to-r from-blue-50 to-red-50 dark:from-blue-900/20 dark:to-red-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-5 mb-8">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600" />
            Comment fonctionne notre IA ?
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0 font-bold text-xs">1</div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Scan Google Images</div>
                <div className="text-gray-600 dark:text-gray-400">On cherche &quot;Haiti poverty&quot;, &quot;Haiti earthquake&quot;, etc. — les requêtes les plus dommageables</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0 font-bold text-xs">2</div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Classification IA</div>
                <div className="text-gray-600 dark:text-gray-400">Chaque image est analysée (score 0→1) par HuggingFace BART pour mesurer sa toxicité</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center shrink-0 font-bold text-xs">3</div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Signalement communautaire</div>
                <div className="text-gray-600 dark:text-gray-400">La communauté confirme et signale massivement à Google — l&apos;algorithme finit par les déclasser</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recherche */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher dans les images détectées..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Action groupée */}
        {selectedImages.size > 0 && (
          <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <span className="font-semibold text-blue-900 dark:text-blue-100">
                {selectedImages.size} image{selectedImages.size > 1 ? "s" : ""} sélectionnée{selectedImages.size > 1 ? "s" : ""}
              </span>
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="flex-1 md:max-w-xs px-3 py-2 border border-blue-300 dark:border-blue-600 rounded-lg dark:bg-gray-800 dark:text-white"
              >
                <option value="">Choisir une raison...</option>
                {REPORT_REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              <div className="flex gap-2">
                <button
                  onClick={handleBulkReport}
                  disabled={!reportReason}
                  className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50"
                >
                  <Flag className="w-4 h-4" />
                  Signaler à Google
                </button>
                <button
                  onClick={() => setSelectedImages(new Set())}
                  className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Grille d'images */}
        {isLoading ? (
          <div className="text-center py-16">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400">Chargement des données...</p>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl">
            <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Aucune image détectée</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Lance le scan IA pour que le crawler commence à chercher les images négatives sur Google.
            </p>
            <button
              onClick={runCrawler}
              disabled={isRunningCrawler}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              <Brain className="w-4 h-4" />
              Lancer le premier scan
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-2 transition-all ${
                  selectedImages.has(image.id)
                    ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                    : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                {/* Image */}
                <div className="relative h-52">
                  <Image
                    src={image.image_url || "/placeholder.svg?height=208&width=400"}
                    alt={image.title || "Image négative détectée"}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement
                      t.src = "/placeholder.svg?height=208&width=400"
                    }}
                  />
                  {/* Checkbox overlay */}
                  <div
                    className="absolute inset-0 bg-black/20 cursor-pointer flex items-start justify-end p-3"
                    onClick={() =>
                      setSelectedImages((prev) => {
                        const next = new Set(prev)
                        next.has(image.id) ? next.delete(image.id) : next.add(image.id)
                        return next
                      })
                    }
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedImages.has(image.id) ? "bg-blue-600 border-blue-600" : "bg-white/80 border-white"
                    }`}>
                      {selectedImages.has(image.id) && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                  {/* Score badge */}
                  <div className="absolute bottom-2 left-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${scoreColor(image.negativity_score)}`}>
                      Toxicité {Math.round(image.negativity_score * 100)}%
                      {image.ai_labels?.method === "ai" && " 🤖"}
                    </span>
                  </div>
                  {/* Status */}
                  <div className="absolute top-2 left-2">
                    <div className="bg-red-600 text-white p-1.5 rounded-full">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">
                    {image.title || "Sans titre"}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Requête : <span className="font-medium text-red-600">&quot;{image.search_query}&quot;</span>
                  </div>
                  <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mb-3 ${
                    image.status === "resolved" ? "bg-green-100 text-green-800" :
                    image.status === "reported" ? "bg-orange-100 text-orange-800" :
                    "bg-yellow-100 text-yellow-800"
                  }`}>
                    {image.status === "pending" ? "En attente" : image.status === "reported" ? "Signalée" : "Résolue"}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <TrendingUp className="w-3 h-3" />
                      <span className="font-semibold text-red-600">{image.report_count}</span> signalements
                    </div>
                    <div className="flex gap-1.5">
                      {image.page_url && (
                        <a
                          href={image.page_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors"
                          title="Voir la page source"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {reportedIds.has(image.id) ? (
                        <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                          <CheckCircle className="w-4 h-4" /> Signalée
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            if (!token) { openAuthModal(); return }
                            handleReport(image.id, "Stéréotype négatif")
                          }}
                          disabled={reporting === image.id}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 disabled:opacity-50"
                        >
                          {reporting === image.id ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : (
                            <Flag className="w-3 h-3" />
                          )}
                          Signaler
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Ajouter des alternatives */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-red-600 rounded-2xl p-6 md:p-8 text-white text-center">
          <Camera className="w-10 h-10 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">La meilleure défense : l&apos;offensive</h3>
          <p className="text-blue-100 mb-5 max-w-xl mx-auto text-sm">
            Signaler ne suffit pas. Chaque belle photo que vous uploadez sur RebrandAyiti crée une alternative
            positive que Google peut indexer à la place.
          </p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("openUploadModal"))}
            className="bg-white text-blue-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Ajouter une photo positive
          </button>
        </div>
      </div>
    </div>
  )
}
