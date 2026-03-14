/**
 * Google Service Account OAuth2 token generation using jose (RS256)
 * Used by the crawler to authenticate without a simple API key
 */
import { SignJWT, importPKCS8 } from "jose"

let cachedToken: { token: string; expiresAt: number } | null = null

export async function getGoogleAccessToken(): Promise<string | null> {
  const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL

  if (!privateKeyRaw || !clientEmail) return null

  // Return cached token if still valid (5 min buffer)
  const now = Math.floor(Date.now() / 1000)
  if (cachedToken && cachedToken.expiresAt > now + 300) {
    return cachedToken.token
  }

  try {
    const privateKey = await importPKCS8(
      privateKeyRaw.replace(/\\n/g, "\n"),
      "RS256"
    )

    const jwt = await new SignJWT({
      scope: "https://www.googleapis.com/auth/cse",
    })
      .setProtectedHeader({ alg: "RS256" })
      .setIssuer(clientEmail)
      .setAudience("https://oauth2.googleapis.com/token")
      .setIssuedAt(now)
      .setExpirationTime(now + 3600)
      .sign(privateKey)

    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }),
      signal: AbortSignal.timeout(8000),
    })

    if (!res.ok) {
      const err = await res.json()
      console.error("Google token error:", err)
      return null
    }

    const data = await res.json()
    cachedToken = { token: data.access_token, expiresAt: now + 3600 }
    return data.access_token
  } catch (e) {
    console.error("getGoogleAccessToken error:", e)
    return null
  }
}
