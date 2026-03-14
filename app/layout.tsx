import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import NavBar from "@/components/NavBar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RebrandAyiti - Valorisons les vraies images d'Haïti",
  description:
    "Plateforme collaborative pour partager des photos authentiques d'Haïti et combattre les stéréotypes négatifs. Rejoignez le mouvement pour changer la perception mondiale de notre beau pays.",
  keywords: ["Haïti", "culture", "photographie", "open-source", "communauté", "patrimoine", "tourisme"],
  authors: [{ name: "RebrandAyiti Team" }],
  openGraph: {
    title: "RebrandAyiti - Valorisons les vraies images d'Haïti",
    description:
      "Plateforme collaborative pour partager des photos authentiques d'Haïti et combattre les stéréotypes négatifs.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "RebrandAyiti - Valorisons les vraies images d'Haïti",
    description:
      "Plateforme collaborative pour partager des photos authentiques d'Haïti et combattre les stéréotypes négatifs.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <NavBar />
            <main className="pt-0 md:pt-16 pb-16 md:pb-0">{children}</main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
