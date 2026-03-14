import { Camera } from "lucide-react"

export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Camera className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Chargement...</p>
            </div>
        </div>
    )
}
