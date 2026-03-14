"use client"

import { useState } from "react"
import { Users, Award, TrendingUp, Globe, Camera, Heart } from "lucide-react"
import Image from "next/image"

export default function CommunitySection() {
  const [activeTab, setActiveTab] = useState("contributors")

  const topContributors = [
    {
      name: "Marie Dupont",
      photos: 234,
      likes: 12847,
      location: "Jacmel",
      avatar: "/placeholder.svg?height=48&width=48",
    },
    {
      name: "Jean Baptiste",
      photos: 189,
      likes: 9632,
      location: "Cap-Haïtien",
      avatar: "/placeholder.svg?height=48&width=48",
    },
    {
      name: "Sophie Morin",
      photos: 156,
      likes: 8421,
      location: "Port-au-Prince",
      avatar: "/placeholder.svg?height=48&width=48",
    },
    {
      name: "Pierre Louis",
      photos: 143,
      likes: 7893,
      location: "Les Cayes",
      avatar: "/placeholder.svg?height=48&width=48",
    },
    {
      name: "Claudette Jean",
      photos: 128,
      likes: 6754,
      location: "Gonaïves",
      avatar: "/placeholder.svg?height=48&width=48",
    },
  ]

  const recentActivity = [
    {
      user: "Marie D.",
      action: "a partagé une photo",
      item: "Coucher de soleil à Jacmel",
      time: "2 min",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      user: "Jean B.",
      action: "a aimé",
      item: "Festival de musique à Cap-Haïtien",
      time: "5 min",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      user: "Sophie M.",
      action: "a commenté",
      item: "Art de rue à Port-au-Prince",
      time: "8 min",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      user: "Pierre L.",
      action: "a partagé une photo",
      item: "Architecture coloniale",
      time: "12 min",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      user: "Claudette J.",
      action: "a rejoint",
      item: "la communauté RebrandAyiti",
      time: "15 min",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const stats = [
    { icon: Users, label: "Membres actifs", value: "3,421", change: "+12%" },
    { icon: Camera, label: "Photos cette semaine", value: "847", change: "+23%" },
    { icon: Heart, label: "Likes donnés", value: "45,632", change: "+18%" },
    { icon: Globe, label: "Pays touchés", value: "89", change: "+5%" },
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Notre communauté en action
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Découvrez les passionnés qui contribuent chaque jour à valoriser l'image d'Haïti
          </p>
        </div>

        {/* Stats en temps réel */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
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
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === "contributors"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              Top contributeurs
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === "activity"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              Activité récente
            </button>
          </div>
        </div>

        {/* Contenu des onglets */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Top contributeurs */}
          {activeTab === "contributors" && (
            <div className="lg:col-span-2">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Contributeurs du mois
                </h3>
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-700 rounded-xl">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="relative">
                          <Image
                            src={contributor.avatar || "/placeholder.svg"}
                            alt={contributor.name}
                            width={48}
                            height={48}
                            className="rounded-full"
                          />
                          {index < 3 && (
                            <div
                              className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                                index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-500"
                              }`}
                            >
                              {index + 1}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">{contributor.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{contributor.location}</div>
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
            </div>
          )}

          {/* Activité récente */}
          {activeTab === "activity" && (
            <div className="lg:col-span-2">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Activité en temps réel
                </h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors"
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
            </div>
          )}
        </div>

        {/* CTA pour rejoindre */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 to-red-600 rounded-2xl p-8 text-white">
            <Users className="w-12 h-12" />
            <div className="text-left">
              <h3 className="text-xl font-bold mb-2">Rejoignez notre communauté</h3>
              <p className="text-blue-100 mb-4">Plus de 3,400 passionnés partagent déjà leur vision d'Haïti</p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Devenir membre
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
