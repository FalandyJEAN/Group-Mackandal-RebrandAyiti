import { ArrowRight } from "lucide-react"

interface CTASectionProps {
  data: {
    title: string
    subtitle: string
    primaryCTA: string
    secondaryCTA: string
  }
  onGetStarted?: () => void
}

export default function CTASection({ data, onGetStarted }: CTASectionProps) {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Fond dégradé */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-red-600 dark:from-blue-800 dark:via-blue-900 dark:to-red-800"></div>

      {/* Motif de fond */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">{data.title}</h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">{data.subtitle}</p>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform">
            {data.primaryCTA}
            <ArrowRight className="w-5 h-5" />
          </button>

          <button className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
            {data.secondaryCTA}
          </button>
        </div>
      </div>
    </section>
  )
}
