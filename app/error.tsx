"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-2xl flex items-center justify-center mx-auto mb-8">
                    <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Oups, une erreur est survenue
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Quelque chose s&apos;est mal passé. Réessayez ou retournez à l&apos;accueil.
                </p>
                <button
                    onClick={() => reset()}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-red-700 transition-colors"
                >
                    <RefreshCw className="w-4 h-4" />
                    Réessayer
                </button>
            </div>
        </div>
    )
}
