"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Camera, Flag, Home, Users, LogOut, User, Sun, Moon, Plus } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import AuthModal from "@/components/auth/AuthModal"
import UploadModal from "@/components/upload/UploadModal"

export default function NavBar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleOpenAuth = () => setShowAuthModal(true)
    const handleOpenUpload = () => setShowUploadModal(true)

    window.addEventListener("openAuthModal", handleOpenAuth)
    window.addEventListener("openUploadModal", handleOpenUpload)

    return () => {
      window.removeEventListener("openAuthModal", handleOpenAuth)
      window.removeEventListener("openUploadModal", handleOpenUpload)
    }
  }, [])

  const toggleDarkMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const navLink = (href: string, label: string, activeColor = "text-blue-600 dark:text-blue-400") =>
    `font-medium transition-colors ${
      pathname === href
        ? activeColor
        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
    }`

  const mobileNavLink = (href: string, activeColor = "text-blue-600 dark:text-blue-400") =>
    `flex flex-col items-center gap-1 p-2 transition-colors ${
      pathname === href ? activeColor : "text-gray-600 dark:text-gray-400 hover:text-blue-600"
    }`

  return (
    <>
      {/* Navigation mobile bas */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-30 md:hidden">
        <div className="flex items-center justify-around py-2">
          <Link href="/" className={mobileNavLink("/")}>
            <Home className="w-5 h-5" />
            <span className="text-xs">Accueil</span>
          </Link>
          <Link href="/gallery" className={mobileNavLink("/gallery")}>
            <Camera className="w-5 h-5" />
            <span className="text-xs">Galerie</span>
          </Link>
          <button
            onClick={() => user ? setShowUploadModal(true) : setShowAuthModal(true)}
            className="flex flex-col items-center gap-1 p-2 text-white"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center -mt-5 shadow-lg">
              <Plus className="w-5 h-5" />
            </div>
          </button>
          <Link href="/report" className={mobileNavLink("/report", "text-red-600 dark:text-red-400")}>
            <Flag className="w-5 h-5" />
            <span className="text-xs">Signaler</span>
          </Link>
          <Link href="/community" className={mobileNavLink("/community", "text-green-600 dark:text-green-400")}>
            <Users className="w-5 h-5" />
            <span className="text-xs">Communauté</span>
          </Link>
        </div>
      </nav>

      {/* Navigation desktop haut */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-red-600 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">RebrandAyiti</span>
            </Link>

            <div className="flex items-center gap-6">
              <Link href="/" className={navLink("/", "Accueil")}>Accueil</Link>
              <Link href="/gallery" className={navLink("/gallery", "Galerie")}>Galerie</Link>
              <Link href="/report" className={navLink("/report", "Signaler", "text-red-600 dark:text-red-400")}>Signaler</Link>
              <Link href="/community" className={navLink("/community", "Communauté", "text-green-600 dark:text-green-400")}>Communauté</Link>

              {/* Dark mode toggle */}
              {mounted && (
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {resolvedTheme === "dark" ? (
                    <Sun className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              )}

              {/* Upload button */}
              <button
                onClick={() => user ? setShowUploadModal(true) : setShowAuthModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-red-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Partager
              </button>

              {/* Auth state */}
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">{user.name.split(" ")[0]}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
                >
                  Se connecter
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Modals globaux */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showUploadModal && <UploadModal onClose={() => setShowUploadModal(false)} />}
    </>
  )
}
