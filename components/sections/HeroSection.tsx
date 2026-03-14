"use client"

import { ArrowRight, Play } from "lucide-react"
import Image from "next/image"

interface HeroData {
  title: string
  subtitle: string
  description: string
  ctaText: string
  secondaryCTA: string
  imageUrl: string
  imageAlt: string
}

interface HeroSectionProps {
  data: HeroData
  onGetStarted: () => void
}

export default function HeroSection({ data, onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Image de fond */}
      <div className="absolute inset-0">
        <Image src="/images/haiti-hero.jpg" alt="Magnifique paysage d'Haïti" fill className="object-cover" priority />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,63,135,0.85) 0%, rgba(0,63,135,0.65) 40%, rgba(210,16,52,0.80) 100%)' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenu textuel */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white text-sm font-medium">🇭🇹 Mouvman ouvert — Group Mackandal</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">{data.title}</h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-6 font-medium">{data.subtitle}</p>
            <p className="text-lg text-blue-50 mb-8 max-w-2xl">{data.description}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 bg-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                style={{ color: '#003F87' }}
              >
                {data.ctaText}
                <ArrowRight className="w-5 h-5" />
              </button>

              <button className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
                <Play className="w-5 h-5" />
                {data.secondaryCTA}
              </button>
            </div>

            {/* Stats en temps réel */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">12,847</div>
                <div className="text-blue-200 text-sm">Photos partagées</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">3,421</div>
                <div className="text-blue-200 text-sm">Contributeurs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">89</div>
                <div className="text-blue-200 text-sm">Pays touchés</div>
              </div>
            </div>
          </div>

          {/* Galerie preview */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                  <Image src="/images/labadee-beach.jpg" alt="Plage de Labadee" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white text-sm font-medium">Plage de Labadee</div>
                </div>
                <div className="relative h-32 rounded-xl overflow-hidden shadow-lg">
                  <Image src="/images/iron-market.jpg" alt="Marché en Fer" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 text-white text-xs">Marché coloré</div>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="relative h-32 rounded-xl overflow-hidden shadow-lg">
                  <Image src="/images/citadelle-sunrise.jpg" alt="Citadelle Laferrière" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 text-white text-xs">Citadelle</div>
                </div>
                <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                  <Image src="/images/haitian-art.jpg" alt="Art haïtien" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white text-sm font-medium">Art local</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-bounce">
              Nouvelle photo ! 📸
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
