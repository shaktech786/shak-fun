import { NextRequest, NextResponse } from 'next/server'
import { getWordOfDay } from '@/lib/games/hope-daily/words'

// Helper to get letter states server-side
function getLetterStates(guess: string, target: string) {
  const result: Array<{ letter: string; state: 'correct' | 'present' | 'absent' }> = []
  const targetLetters = target.split('')
  const guessLetters = guess.split('')

  // Count letter frequencies in target
  const targetCounts = new Map<string, number>()
  targetLetters.forEach(letter => {
    targetCounts.set(letter, (targetCounts.get(letter) || 0) + 1)
  })

  // First pass: mark correct letters
  guessLetters.forEach((letter, i) => {
    if (letter === targetLetters[i]) {
      result[i] = { letter, state: 'correct' }
      targetCounts.set(letter, (targetCounts.get(letter) || 0) - 1)
    } else {
      result[i] = { letter, state: 'absent' }
    }
  })

  // Second pass: mark present letters
  guessLetters.forEach((letter, i) => {
    if (result[i].state === 'absent' && targetLetters.includes(letter)) {
      const count = targetCounts.get(letter) || 0
      if (count > 0) {
        result[i] = { letter, state: 'present' }
        targetCounts.set(letter, count - 1)
      }
    }
  })

  return result
}

export async function GET() {
  const wordData = getWordOfDay()

  // Only send metadata, NOT the actual word
  return NextResponse.json({
    wordLength: wordData.word.length,
    category: wordData.category
  })
}

export async function POST(request: NextRequest) {
  const { guess } = await request.json()
  const wordData = getWordOfDay()

  if (!guess || typeof guess !== 'string') {
    return NextResponse.json({ error: 'Invalid guess' }, { status: 400 })
  }

  const guessUpper = guess.toUpperCase()

  // Validate guess length
  if (guessUpper.length !== wordData.word.length) {
    return NextResponse.json({
      error: `Word must be ${wordData.word.length} letters`
    }, { status: 400 })
  }

  // Validate only letters
  if (!/^[A-Z]+$/.test(guessUpper)) {
    return NextResponse.json({
      error: 'Word must contain only letters'
    }, { status: 400 })
  }

  // Get letter states
  const letterStates = getLetterStates(guessUpper, wordData.word)

  // Check if correct
  const isCorrect = guessUpper === wordData.word

  // Build response
  const response: {
    letterStates: typeof letterStates
    isCorrect: boolean
    word?: string
    fact?: string
    category?: string
  } = {
    letterStates,
    isCorrect
  }

  // Only reveal word and fact if correct
  if (isCorrect) {
    response.word = wordData.word
    response.fact = wordData.fact
    response.category = wordData.category
  }

  return NextResponse.json(response)
}

// Reveal the word (called when user runs out of guesses)
export async function PUT() {
  const wordData = getWordOfDay()

  return NextResponse.json({
    word: wordData.word,
    fact: wordData.fact,
    category: wordData.category
  })
}
