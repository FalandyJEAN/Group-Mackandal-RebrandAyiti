import { SignJWT, jwtVerify } from "jose"

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback_dev_secret_change_in_prod"
)

export interface TokenPayload {
  id: number
  email: string
  name: string
}

export async function signToken(payload: TokenPayload): Promise<string> {
  return await new SignJWT({ id: payload.id, email: payload.email, name: payload.name })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(secret)
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as unknown as TokenPayload
  } catch {
    return null
  }
}

export function getTokenFromRequest(req: Request): string | null {
  const auth = req.headers.get("authorization")
  if (auth?.startsWith("Bearer ")) return auth.slice(7)
  return null
}
