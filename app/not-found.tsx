import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-6 transition-colors">
      <div className="max-w-lg w-full">

        {/* Bande drapeau */}
        <div className="flex h-1 mb-12">
          <div className="flex-1" style={{ backgroundColor: '#003F87' }} />
          <div className="flex-1" style={{ backgroundColor: '#D21034' }} />
        </div>

        {/* 404 typographique */}
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 dark:text-gray-600 mb-4">
          Erè 404
        </p>
        <h1
          className="text-8xl font-black leading-none mb-6"
          style={{ color: '#D21034' }}
        >
          404
        </h1>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
          Paj sa a pa egziste.
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
          Petèt li te efase, oswa lyen an pa bon.
          Tounen sou paj prensipal la pou jwenn bèl foto Ayiti.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="btn-haiti inline-flex items-center gap-2 px-8 py-3 font-bold text-sm"
          >
            Tounen akèy
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-600 dark:hover:border-gray-400 hover:text-gray-900 dark:hover:text-white px-8 py-3 font-bold text-sm transition-colors"
          >
            Gade galri a
          </Link>
        </div>

        {/* Bande drapeau bas */}
        <div className="flex h-1 mt-12">
          <div className="flex-1" style={{ backgroundColor: '#D21034' }} />
          <div className="flex-1" style={{ backgroundColor: '#003F87' }} />
        </div>

      </div>
    </div>
  )
}
