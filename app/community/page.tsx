"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Users, Award, TrendingUp, Globe, Camera, Heart, ArrowRight, MapPin } from "lucide-react"

export default function CommunityPage() {
    const [activeTab, setActiveTab] = useState("contributors")

    const topContributors = [
        {
            name: "Marie Dupont",
            photos: 234,
            likes: 12847,
            location: "Jacmel",
            avatar: "/placeholder.svg?height=48&width=48",
            rank: 1,
        },
        {
            name: "Jean Baptiste",
            photos: 189,
            likes: 9632,
            location: "Cap-Haïtien",
            avatar: "/placeholder.svg?height=48&width=48",
            rank: 2,
        },
        {
            name: "Sophie Morin",
            photos: 156,
            likes: 8421,
            location: "Port-au-Prince",
            avatar: "/placeholder.svg?height=48&width=48",
            rank: 3,
        },
        {
            name: "Pierre Louis",
            photos: 143,
            likes: 7893,
            location: "Les Cayes",
            avatar: "/placeholder.svg?height=48&width=48",
            rank: 4,
        },
        {
            name: "Claudette Jean",
            photos: 128,
            likes: 6754,
            location: "Gonaïves",
            avatar: "/placeholder.svg?height=48&width=48",
            rank: 5,
        },
        {
            name: "David Moïse",
            photos: 112,
            likes: 5432,
            location: "Hinche",
            avatar: "/placeholder.svg?height=48&width=48",
            rank: 6,
        },
        {
            name: "Roseline Pierre",
            photos: 98,
            likes: 4876,
            location: "Jérémie",
            avatar: "/placeholder.svg?height=48&width=48",
            rank: 7,
        },
        {
            name: "Michel Augustin",
            photos: 87,
            likes: 4123,
            location: "Fort-Liberté",
            avatar: "/placeholder.svg?height=48&width=48",
            rank: 8,
        },
    ]

    const recentActivity = [
        { user: "Marie D.", action: "a partagé une photo", item: "Coucher de soleil à Jacmel", time: "2 min", avatar: "/placeholder.svg?height=32&width=32" },
        { user: "Jean B.", action: "a aimé", item: "Festival de musique à Cap-Haïtien", time: "5 min", avatar: "/placeholder.svg?height=32&width=32" },
        { user: "Sophie M.", action: "a commenté", item: "Art de rue à Port-au-Prince", time: "8 min", avatar: "/placeholder.svg?height=32&width=32" },
        { user: "Pierre L.", action: "a partagé une photo", item: "Architecture coloniale", time: "12 min", avatar: "/placeholder.svg?height=32&width=32" },
        { user: "Claudette J.", action: "a rejoint", item: "la communauté RebrandAyiti", time: "15 min", avatar: "/placeholder.svg?height=32&width=32" },
        { user: "David M.", action: "a partagé une photo", item: "Bassin Bleu de Jacmel", time: "20 min", avatar: "/placeholder.svg?height=32&width=32" },
        { user: "Roseline P.", action: "a aimé", item: "Tap-tap coloré", time: "25 min", avatar: "/placeholder.svg?height=32&width=32" },
        { user: "Michel A.", action: "a commenté", item: "Griot traditionnel", time: "30 min", avatar: "/placeholder.svg?height=32&width=32" },
    ]

    const stats = [
        { icon: Users, label: "Membres actifs", value: "3,421", change: "+12%" },
        { icon: Camera, label: "Photos cette semaine", value: "847", change: "+23%" },
        { icon: Heart, label: "Likes donnés", value: "45,632", change: "+18%" },
        { icon: Globe, label: "Pays touchés", value: "89", change: "+5%" },
    ]

    const topRegions = [
        { name: "Port-au-Prince", photos: 3245, contributors: 892 },
        { name: "Cap-Haïtien", photos: 2187, contributors: 567 },
        { name: "Jacmel", photos: 1876, contributors: 423 },
        { name: "Les Cayes", photos: 987, contributors: 234 },
        { name: "Gonaïves", photos: 756, contributors: 189 },
        { name: "Pétion-Ville", photos: 654, contributors: 167 },
    ]

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Header */}
            <header className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-red-600 py-16 md:py-24">
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-white text-sm font-medium">3,421 membres actifs</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Notre Communauté
                    </h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                        Découvrez les passionnés qui contribuent chaque jour à valoriser l&apos;image d&apos;Haïti à travers le monde
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">
                            Devenir membre
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <Link
                            href="/gallery"
                            className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                        >
                            Voir la galerie
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {/* Stats en temps réel */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                            <div className="text-gray-600 dark:text-gray-400 text-sm mb-2">{stat.label}</div>
                            <div className="text-green-600 dark:text-green-400 text-xs font-medium">{stat.change} cette semaine</div>
                        </div>
                    ))}
                </div>

                {/* Onglets */}
                <div className="flex justify-center mb-8">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                        <button
                            onClick={() => setActiveTab("contributors")}
                            className={`px-6 py-2 rounded-md font-medium transition-colors ${activeTab === "contributors"
                                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                                    : "text-gray-600 dark:text-gray-400"
                                }`}
                        >
                            Top contributeurs
                        </button>
                        <button
                            onClick={() => setActiveTab("activity")}
                            className={`px-6 py-2 rounded-md font-medium transition-colors ${activeTab === "activity"
                                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                                    : "text-gray-600 dark:text-gray-400"
                                }`}
                        >
                            Activité récente
                        </button>
                        <button
                            onClick={() => setActiveTab("regions")}
                            className={`px-6 py-2 rounded-md font-medium transition-colors ${activeTab === "regions"
                                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                                    : "text-gray-600 dark:text-gray-400"
                                }`}
                        >
                            Par région
                        </button>
                    </div>
                </div>

                {/* Contenu des onglets */}
                {activeTab === "contributors" && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <Award className="w-5 h-5 text-yellow-500" />
                            Contributeurs du mois
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {topContributors.map((contributor) => (
                                <div key={contributor.rank} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="relative">
                                            <Image
                                                src={contributor.avatar || "/placeholder.svg"}
                                                alt={contributor.name}
                                                width={48}
                                                height={48}
                                                className="rounded-full"
                                            />
                                            {contributor.rank <= 3 && (
                                                <div
                                                    className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${contributor.rank === 1 ? "bg-yellow-500" : contributor.rank === 2 ? "bg-gray-400" : "bg-orange-500"
                                                        }`}
                                                >
                                                    {contributor.rank}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">{contributor.name}</div>
                                            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                                <MapPin className="w-3 h-3" />
                                                {contributor.location}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-semibold text-gray-900 dark:text-white">{contributor.photos} photos</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            {contributor.likes.toLocaleString()} likes
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "activity" && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                            Activité en temps réel
                        </h3>
                        <div className="space-y-3">
                            {recentActivity.map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    <Image
                                        src={activity.avatar || "/placeholder.svg"}
                                        alt={activity.user}
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                    <div className="flex-1">
                                        <span className="font-medium text-gray-900 dark:text-white">{activity.user}</span>
                                        <span className="text-gray-600 dark:text-gray-400"> {activity.action} </span>
                                        <span className="font-medium text-blue-600 dark:text-blue-400">{activity.item}</span>
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "regions" && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-blue-500" />
                            Contributions par région
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {topRegions.map((region) => (
                                <div key={region.name} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{region.name}</h4>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">{region.photos.toLocaleString()} photos</span>
                                        <span className="text-gray-600 dark:text-gray-400">{region.contributors} contributeurs</span>
                                    </div>
                                    <div className="mt-3 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-blue-600 to-red-600 h-2 rounded-full"
                                            style={{ width: `${(region.photos / 3245) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="text-center mt-12">
                    <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 to-red-600 rounded-2xl p-8 text-white">
                        <Users className="w-12 h-12" />
                        <div className="text-left">
                            <h3 className="text-xl font-bold mb-2">Rejoignez notre communauté</h3>
                            <p className="text-blue-100 mb-4">Plus de 3,400 passionnés partagent déjà leur vision d&apos;Haïti</p>
                            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                                Devenir membre
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
