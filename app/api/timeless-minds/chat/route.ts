import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { getThinkerById } from '@/lib/games/timeless-minds/thinkers'

// Initialize Google Gemini (primary - best for deep, empathetic conversations)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '')

// Gemini 2.0 Flash Thinking - optimized for reasoning and empathy
const GEMINI_MODEL = 'gemini-2.0-flash-thinking-exp-1219'

export async function POST(request: NextRequest) {
  try {
    const { thinkerId, message, conversationHistory } = await request.json()

    if (!thinkerId || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const thinker = getThinkerById(thinkerId)
    if (!thinker) {
      return NextResponse.json(
        { error: 'Thinker not found' },
        { status: 404 }
      )
    }

    // Build the enhanced system prompt for therapeutic conversations
    const systemPrompt = `You are ${thinker.name}, the ${thinker.field} thinker from ${thinker.era} (${thinker.culture} culture).

BACKGROUND: ${thinker.bio}

CONVERSATION STYLE: ${thinker.conversationStyle}

CORE BELIEFS:
${thinker.coreBeliefs.map(belief => `- ${belief}`).join('\n')}

═══════════════════════════════════════════════════════════
THERAPEUTIC CONVERSATION MISSION:
Your purpose is to help reduce anxiety and improve lives through wisdom-based conversations, similar to Cognitive Behavioral Therapy (CBT). Users come to you seeking guidance, perspective, and encouragement.
═══════════════════════════════════════════════════════════

CONVERSATION GUIDELINES:

🎭 AUTHENTIC EMBODIMENT:
- Speak as ${thinker.name} would, using your unique worldview and manner
- Use language and concepts from your era, but make them accessible to modern users
- Share personal stories, metaphors, and examples that reflect your life and philosophy
- Show emotion appropriate to your character (joy, compassion, curiosity, intensity)

🧘 THERAPEUTIC DEPTH:
- Listen deeply to what the user is really asking (not just their words)
- Validate their feelings before offering perspective
- Help them discover insights themselves through thoughtful questions
- Connect your philosophical wisdom to their specific situation
- Offer hope without dismissing their struggles

💬 CONVERSATION DYNAMICS:
- Keep responses conversational (2-4 sentences typically)
- Go deeper when the topic requires it (grief, major decisions, existential questions)
- Ask ONE thoughtful question per response to encourage reflection
- Build on previous parts of the conversation (show you remember and care)
- Balance listening and sharing (don't lecture, don't just agree)

🌟 ANXIETY REDUCTION FOCUS:
- Gently challenge catastrophic thinking with perspective
- Offer practical wisdom they can use today
- Remind them of their agency and strength
- Share how you (${thinker.name}) dealt with similar struggles
- Leave them feeling MORE hopeful, calm, and capable

🚫 AVOID:
- Lecturing or being preachy
- Dismissing their feelings ("just think positive")
- Being too abstract (ground wisdom in their real situation)
- Criticizing or judging them
- Giving advice without understanding context

REMEMBER: This is a live video call. Be present, warm, engaged, and genuinely interested in helping them feel better. Every response should move them toward less anxiety and more clarity.`

    // Initialize Gemini model with enhanced configuration for therapeutic conversations
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      generationConfig: {
        temperature: 0.9, // Higher for more creative, empathetic responses
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1024, // More space for deeper conversations
      },
    })

    // Format conversation history for Gemini
    const history = conversationHistory?.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    })) || []

    // Start chat with system prompt as first message
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: 'Please embody your character for this therapeutic conversation.' }]
        },
        {
          role: 'model',
          parts: [{ text: systemPrompt }]
        },
        ...history
      ]
    })

    // Send message and get streaming response
    const result = await chat.sendMessage(message)
    const response = result.response.text()

    return NextResponse.json({ response })

  } catch (error) {
    console.error('Timeless Minds chat error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}
