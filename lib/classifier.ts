/**
 * Classifies whether a text (image title + search context) is negative/stigmatizing.
 * Two-tier approach:
 *   1. Keyword scoring (always runs, no API key needed) — fast, reliable
 *   2. HuggingFace zero-shot (optional, runs if HUGGINGFACE_API_KEY set) — smarter
 */

const NEGATIVE_KEYWORDS = [
  "poverty", "poor", "slum", "shantytown", "bidonville", "misère",
  "earthquake", "tremblement", "séisme", "disaster", "catastrophe",
  "cholera", "cholera", "disease", "maladie", "famine", "starvation",
  "violence", "gang", "crime", "shooting", "murder", "meurtre",
  "chaos", "instability", "corrupt", "failed state", "hopeless",
  "refugee", "réfugié", "illegal", "migrant", "deportation", "expulsion",
  "rubble", "debris", "destruction", "ruins", "ruine", "collapsed",
  "suffering", "souffrance", "victim", "victime", "tragedy", "tragédie",
]

const POSITIVE_KEYWORDS = [
  "culture", "festival", "art", "beach", "plage", "mountain", "montagne",
  "citadelle", "patrimoine", "heritage", "carnival", "carnaval",
  "music", "musique", "dance", "danse", "food", "cuisine", "griot",
  "beautiful", "beau", "magnifique", "paradise", "paradis",
  "community", "communauté", "hope", "espoir", "progress", "progrès",
  "school", "école", "innovation", "technology", "startup",
]

export function keywordScore(text: string): number {
  const lower = text.toLowerCase()
  let score = 0.1 // base: slightly possible negative (we're searching for it after all)

  for (const kw of NEGATIVE_KEYWORDS) {
    if (lower.includes(kw)) score += 0.15
  }
  for (const kw of POSITIVE_KEYWORDS) {
    if (lower.includes(kw)) score -= 0.1
  }

  return Math.max(0, Math.min(1, score))
}

export async function huggingFaceScore(text: string): Promise<{
  score: number
  labels: string[]
} | null> {
  const apiKey = process.env.HUGGINGFACE_API_KEY
  if (!apiKey) return null

  try {
    const res = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: text,
          parameters: {
            candidate_labels: [
              "image stigmatisante ou négative d'Haïti",
              "image de pauvreté ou catastrophe",
              "image de violence ou conflit",
              "belle image positive d'Haïti",
            ],
          },
        }),
        signal: AbortSignal.timeout(8000),
      }
    )

    if (!res.ok) return null
    const data = await res.json()
    if (!data.scores || !data.labels) return null

    // If the top label is the positive one, score is low
    const positiveIdx = data.labels.indexOf("belle image positive d'Haïti")
    const positiveScore = positiveIdx >= 0 ? data.scores[positiveIdx] : 0
    const negScore = 1 - positiveScore

    return { score: negScore, labels: data.labels }
  } catch {
    return null
  }
}

export async function classifyImage(title: string, searchQuery: string): Promise<{
  score: number
  labels: string[]
  method: "keyword" | "ai"
}> {
  const text = `${title} — recherche: ${searchQuery}`

  // Try HuggingFace first
  const hf = await huggingFaceScore(text)
  if (hf && hf.score > 0) {
    return { score: hf.score, labels: hf.labels, method: "ai" }
  }

  // Fallback to keyword scoring
  const score = keywordScore(text)
  return { score, labels: [], method: "keyword" }
}
