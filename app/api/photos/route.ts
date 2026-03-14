import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { sql } from "@/lib/db"
import { verifyToken, getTokenFromRequest } from "@/lib/jwt"

// GET /api/photos — liste publique
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const limit = parseInt(searchParams.get("limit") || "50")
    const offset = parseInt(searchParams.get("offset") || "0")

    let photos
    if (category && category !== "all") {
      photos = await sql`
        SELECT p.*, u.name as author_name
        FROM photos p
        LEFT JOIN users u ON p.author_id = u.id
        WHERE p.category = ${category}
        ORDER BY p.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    } else {
      photos = await sql`
        SELECT p.*, u.name as author_name
        FROM photos p
        LEFT JOIN users u ON p.author_id = u.id
        ORDER BY p.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    }

    return NextResponse.json({ photos })
  } catch (error) {
    console.error("GET photos error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

// POST /api/photos — upload (authentifié)
export async function POST(req: Request) {
  try {
    const token = getTokenFromRequest(req)
    if (!token) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const user = await verifyToken(token)
    if (!user) {
      return NextResponse.json({ error: "Token invalide" }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File
    const title = formData.get("title") as string
    const description = formData.get("description") as string || ""
    const location = formData.get("location") as string
    const category = formData.get("category") as string
    const subcategory = formData.get("subcategory") as string || ""
    const tagsRaw = formData.get("tags") as string || ""

    if (!file || !title || !location || !category) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 })
    }

    // Upload vers Vercel Blob
    const ext = file.name.split(".").pop() || "jpg"
    const filename = `photos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const blob = await put(filename, file, { access: "public" })

    const tags = tagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)

    // Sauvegarde en DB
    const result = await sql`
      INSERT INTO photos (title, description, location, category, subcategory, tags, url, author_id, author_name)
      VALUES (
        ${title}, ${description}, ${location}, ${category}, ${subcategory},
        ${tags}, ${blob.url}, ${user.id}, ${user.name}
      )
      RETURNING *
    `

    return NextResponse.json({ photo: result[0] }, { status: 201 })
  } catch (error) {
    console.error("POST photo error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
