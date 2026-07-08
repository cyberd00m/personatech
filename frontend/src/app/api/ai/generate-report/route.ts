import { NextRequest, NextResponse } from 'next/server'

type Provider = 'OpenAI' | 'Anthropic' | 'Google Gemini' | 'Custom'

type GenerateReportBody = {
  provider?: Provider
  apiKey?: string
  caseData?: {
    id: string
    name: string
    status: string
    profiles: number
    evidence: number
    createdAt: string
    updatedAt: string
    description: string
    priority: string
  }
}

type AIReportContent = {
  executiveSummary: string
  keyFindings: string[]
  recommendations: string[]
  confidence: number
}

const fallbackReport = (caseData: NonNullable<GenerateReportBody['caseData']>): AIReportContent => ({
  executiveSummary: `This intelligence report summarizes the ${caseData.name} case, covering ${caseData.profiles} profiles and ${caseData.evidence} evidence items. The case is currently ${caseData.status} with ${caseData.priority} priority.`,
  keyFindings: [
    `${caseData.profiles} profiles are linked to the selected case.`,
    `${caseData.evidence} evidence items are available for review.`,
    `Case priority is marked as ${caseData.priority}.`,
  ],
  recommendations: [
    'Review profile relationships for stronger attribution.',
    'Validate evidence sources before external reporting.',
    'Update the case timeline as new intelligence becomes available.',
  ],
  confidence: 75,
})

const parseAIContent = (content: string, caseData: NonNullable<GenerateReportBody['caseData']>): AIReportContent => {
  try {
    const parsed = JSON.parse(content) as Partial<AIReportContent>

    return {
      executiveSummary: parsed.executiveSummary || fallbackReport(caseData).executiveSummary,
      keyFindings: Array.isArray(parsed.keyFindings) ? parsed.keyFindings.slice(0, 5) : fallbackReport(caseData).keyFindings,
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations.slice(0, 5) : fallbackReport(caseData).recommendations,
      confidence: typeof parsed.confidence === 'number' ? Math.min(100, Math.max(0, parsed.confidence)) : fallbackReport(caseData).confidence,
    }
  } catch {
    return {
      ...fallbackReport(caseData),
      executiveSummary: content,
    }
  }
}

const buildPrompt = (caseData: NonNullable<GenerateReportBody['caseData']>) => `Generate an intelligence report as JSON only with these fields: executiveSummary string, keyFindings string array, recommendations string array, confidence number from 0 to 100. Case data: ${JSON.stringify(caseData)}`

async function callOpenAI(apiKey: string, prompt: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
    }),
  })

  if (!response.ok) {
    throw new Error(`OpenAI request failed with status ${response.status}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content as string | undefined
}

async function callAnthropic(apiKey: string, prompt: string) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-3-5-haiku-latest',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    throw new Error(`Anthropic request failed with status ${response.status}`)
  }

  const data = await response.json()
  return data.content?.[0]?.text as string | undefined
}

async function callGemini(apiKey: string, prompt: string) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  })

  if (!response.ok) {
    throw new Error(`Gemini request failed with status ${response.status}`)
  }

  const data = await response.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text as string | undefined
}

export async function POST(request: NextRequest) {
  const body = await request.json() as GenerateReportBody
  const { provider = 'OpenAI', apiKey, caseData } = body

  if (!caseData) {
    return NextResponse.json({ error: 'Missing case data' }, { status: 400 })
  }

  if (!apiKey || provider === 'Custom') {
    return NextResponse.json({ report: fallbackReport(caseData), usedAI: false })
  }

  const prompt = buildPrompt(caseData)
  const content = provider === 'Anthropic'
    ? await callAnthropic(apiKey, prompt)
    : provider === 'Google Gemini'
      ? await callGemini(apiKey, prompt)
      : await callOpenAI(apiKey, prompt)

  if (!content) {
    return NextResponse.json({ report: fallbackReport(caseData), usedAI: false })
  }

  return NextResponse.json({ report: parseAIContent(content, caseData), usedAI: true })
}
