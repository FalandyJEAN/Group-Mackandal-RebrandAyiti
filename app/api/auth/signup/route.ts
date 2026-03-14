import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { sql } from "@/lib/db"
import { signToken } from "@/lib/jwt"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Le mot de passe doit contenir au moins 6 caractères" }, { status: 400 })
    }

    // Check if email already exists
    const existing = await sql`SELECT id FROM users WHERE email = ${email}`
    if (existing.length > 0) {
      return NextResponse.json({ error: "Cet email est déjà utilisé" }, { status: 409 })
    }

    const password_hash = await bcrypt.hash(password, 10)
    const result = await sql`
      INSERT INTO users (name, email, password_hash)
      VALUES (${name}, ${email}, ${password_hash})
      RETURNING id, name, email, created_at
    `

    const user = result[0]
    const token = await signToken({ id: user.id, email: user.email, name: user.name })

    return NextResponse.json({ token, user: { id: user.id, name: user.name, email: user.email } })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
