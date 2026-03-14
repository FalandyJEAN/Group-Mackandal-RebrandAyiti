import { type MetadataRoute } from "next"
import { sql } from "@/lib/db"

const baseUrl = "https://rebrandayiti.org"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/community`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/report`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ]

  try {
    const photos = await sql`SELECT id, created_at FROM photos ORDER BY created_at DESC LIMIT 1000`
    const photoRoutes: MetadataRoute.Sitemap = photos.map((photo) => ({
      url: `${baseUrl}/photos/${photo.id}`,
      lastModified: new Date(photo.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
    return [...staticRoutes, ...photoRoutes]
  } catch {
    return staticRoutes
  }
}
