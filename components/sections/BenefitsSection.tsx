import { Check } from "lucide-react"

interface BenefitsSectionProps {
  data: {
    title: string
    subtitle: string
    benefits: string[]
  }
}

export default function BenefitsSection({ data }: BenefitsSectionProps) {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenu textuel */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">{data.title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{data.subtitle}</p>

            {/* Liste des avantages */}
            <div className="space-y-4">
              {data.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image ou graphique */}
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-red-100 dark:from-blue-900 dark:to-red-900 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-600 dark:bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">🇭🇹</span>
                </div>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Valorisons Haïti ensemble</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
