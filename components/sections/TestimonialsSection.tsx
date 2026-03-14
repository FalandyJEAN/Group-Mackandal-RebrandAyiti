"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
}

interface TestimonialsSectionProps {
  data: {
    title: string
    testimonials: Testimonial[]
  }
}

export default function TestimonialsSection({ data }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % data.testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + data.testimonials.length) % data.testimonials.length)
  }

  const currentTestimonial = data.testimonials[currentIndex]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">{data.title}</h2>
        </div>

        {/* Témoignage actuel */}
        <div className="relative">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 md:p-12">
            {/* Étoiles */}
            <div className="flex justify-center mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>

            {/* Contenu du témoignage */}
            <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 text-center mb-8 leading-relaxed">
              "{currentTestimonial.content}"
            </blockquote>

            {/* Informations de l'auteur */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">{currentTestimonial.name.charAt(0)}</span>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{currentTestimonial.name}</h4>
              <p className="text-gray-600 dark:text-gray-400">
                {currentTestimonial.role} • {currentTestimonial.company}
              </p>
            </div>
          </div>

          {/* Boutons de navigation */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Indicateurs */}
        <div className="flex justify-center mt-8 gap-2">
          {data.testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-blue-600 dark:bg-blue-400" : "bg-gray-300 dark:bg-gray-600"
              }`}
              aria-label={`Aller au témoignage ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
