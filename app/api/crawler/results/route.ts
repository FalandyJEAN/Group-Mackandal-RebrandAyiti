import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status") || "pending"
    const limit = parseInt(searchParams.get("limit") || "20")

    const images = await sql`
      SELECT * FROM negative_images
      WHERE status = ${status}
      ORDER BY report_count DESC, negativity_score DESC, found_at DESC
      LIMIT ${limit}
    `

    const stats = await sql`
      SELECT
        COUNT(*) FILTER (WHERE status = 'pending') as pending,
        COUNT(*) FILTER (WHERE status = 'reported') as reported,
        COUNT(*) FILTER (WHERE status = 'resolved') as resolved,
        COALESCE(SUM(report_count), 0) as total_reports
      FROM negative_images
    `

    return NextResponse.json({ images, stats: stats[0] })
  } catch (error) {
    console.error("GET crawler results error:", error)
    return NextResponse.json({ images: [], stats: {} }, { status: 500 })
  }
}
