"use client"

import { realData } from "@/data/realData"
import HeroSection from "@/components/sections/HeroSection"
import FeaturesSection from "@/components/sections/FeaturesSection"
import LiveGallerySection from "@/components/sections/LiveGallerySection"
import CommunitySection from "@/components/sections/CommunitySection"
import CTASection from "@/components/sections/CTASection"
import Footer from "@/components/sections/Footer"
import { openAuthModal } from "@/lib/modal-events"

export default function ClientPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <HeroSection data={realData.hero} onGetStarted={openAuthModal} />
      <LiveGallerySection />
      <FeaturesSection data={realData.features} />
      <CommunitySection />
      <CTASection data={realData.cta} onGetStarted={openAuthModal} />
      <Footer data={realData.footer} />
    </div>
  )
}
