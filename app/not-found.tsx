import Link from "next/link"
import { Camera, Home } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                    <Camera className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Page non trouvée
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Désolé, la page que vous cherchez n&apos;existe pas. Retournez à l&apos;accueil pour découvrir le vrai visage d&apos;Haïti.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-red-700 transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        Retour à l&apos;accueil
                    </Link>
                    <Link
                        href="/gallery"
                        className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <Camera className="w-4 h-4" />
                        Voir la galerie
                    </Link>
                </div>
            </div>
        </div>
    )
}
