'use client'

import { useState, useEffect, useCallback } from 'react'

type LetterState = 'correct' | 'present' | 'absent' | 'empty'

interface LetterTile {
  letter: string
  state: LetterState
}

interface GameMetadata {
  wordLength: number
  category: string
}

const MAX_GUESSES = 6
const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK']
]

export default function HopeDaily() {
  const [metadata, setMetadata] = useState<GameMetadata | null>(null)
  const [guesses, setGuesses] = useState<LetterTile[][]>([])
  const [currentGuess, setCurrentGuess] = useState<string>('')
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing')
  const [message, setMessage] = useState<string>('')
  const [shake, setShake] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [keyboardStates, setKeyboardStates] = useState<Map<string, LetterState>>(new Map())
  const [revealedData, setRevealedData] = useState<{ word: string; fact: string; category: string } | null>(null)
  const [commentary, setCommentary] = useState<string>('')
  const [showCommentary, setShowCommentary] = useState(false)

  // Initialize game
  useEffect(() => {
    const initGame = async () => {
      try {
        const response = await fetch('/api/hope-daily')
        const data = await response.json()
        setMetadata(data)

        // Check if already played today
        const today = new Date().toDateString()
        const savedState = localStorage.getItem('hope-daily-state')

        if (savedState) {
          try {
            const state = JSON.parse(savedState)
            if (state.date === today) {
              // Restore saved game
              setGuesses(state.guesses)
              setGameState(state.gameState)

              // Rebuild keyboard states
              const newKeyboardStates = new Map<string, LetterState>()
              state.guesses.forEach((guess: LetterTile[]) => {
                guess.forEach((tile: LetterTile) => {
                  const currentState = newKeyboardStates.get(tile.letter)
                  // Priority: correct > present > absent
                  if (tile.state === 'correct' ||
                      (tile.state === 'present' && currentState !== 'correct') ||
                      (tile.state === 'absent' && !currentState)) {
                    newKeyboardStates.set(tile.letter, tile.state)
                  }
                })
              })
              setKeyboardStates(newKeyboardStates)

              if (state.gameState !== 'playing' && state.revealedData) {
                setRevealedData(state.revealedData)
                setRevealed(true)
              }
            } else {
              // New day, clear old state
              localStorage.removeItem('hope-daily-state')
            }
          } catch {
            localStorage.removeItem('hope-daily-state')
          }
        }
      } catch (error) {
        console.error('Failed to initialize game:', error)
        setMessage('Failed to load game. Please refresh.')
      }
    }

    initGame()
  }, [])

  // Save game state
  const saveState = useCallback(() => {
    const state = {
      date: new Date().toDateString(),
      guesses,
      gameState,
      revealedData
    }
    localStorage.setItem('hope-daily-state', JSON.stringify(state))
  }, [guesses, gameState, revealedData])

  useEffect(() => {
    if (guesses.length > 0 || gameState !== 'playing') {
      saveState()
    }
  }, [guesses, gameState, saveState])

  // Update keyboard states based on guesses
  const updateKeyboardStates = useCallback((letterStates: LetterTile[]) => {
    setKeyboardStates(prev => {
      const newStates = new Map(prev)
      letterStates.forEach(tile => {
        const currentState = newStates.get(tile.letter)
        // Priority: correct > present > absent
        if (tile.state === 'correct' ||
            (tile.state === 'present' && currentState !== 'correct') ||
            (tile.state === 'absent' && !currentState)) {
          newStates.set(tile.letter, tile.state)
        }
      })
      return newStates
    })
  }, [])

  // Fetch and display AI commentary
  const showCommentaryBubble = useCallback(async (
    guess: string,
    letterStates?: LetterTile[],
    isCorrect = false,
    isInvalid = false
  ) => {
    try {
      const response = await fetch('/api/hope-daily/commentary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guess,
          letterStates,
          isCorrect,
          isInvalid
        })
      })

      const data = await response.json()
      if (data.commentary) {
        setCommentary(data.commentary)
        setShowCommentary(true)
        // Commentary stays visible - will be replaced by next guess
      }
    } catch (error) {
      console.error('Failed to fetch commentary:', error)
    }
  }, [])

  // Submit guess to server
  const submitGuess = useCallback(async () => {
    if (!currentGuess.trim() || !metadata) return

    try {
      const response = await fetch('/api/hope-daily', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guess: currentGuess })
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage(data.error || 'Invalid guess')
        setShake(true)
        setTimeout(() => setShake(false), 500)
        // Show commentary for invalid guess
        showCommentaryBubble(currentGuess, undefined, false, true)
        return
      }

      // Process response
      const letterStates: LetterTile[] = data.letterStates.map((state: { letter: string; state: LetterState }) => ({
        letter: state.letter,
        state: state.state
      }))

      updateKeyboardStates(letterStates)

      const newGuesses = [...guesses, letterStates]
      const guessWord = currentGuess // Save before clearing
      setGuesses(newGuesses)
      setCurrentGuess('')
      setMessage('')

      // Check win
      if (data.isCorrect) {
        setGameState('won')
        setRevealedData({ word: data.word, fact: data.fact, category: data.category })
        setTimeout(() => setRevealed(true), 1500)

        const encouragements = [
          'Amazing!',
          'Brilliant!',
          'Fantastic!',
          'Excellent!',
          'Perfect!'
        ]
        setMessage(encouragements[Math.floor(Math.random() * encouragements.length)])

        // Show victory commentary
        showCommentaryBubble(guessWord, letterStates, true, false)
      } else if (newGuesses.length >= MAX_GUESSES) {
        // Lost - fetch the word
        setGameState('lost')
        const revealResponse = await fetch('/api/hope-daily', { method: 'PUT' })
        const revealData = await revealResponse.json()
        setRevealedData(revealData)
        setMessage(`The word was ${revealData.word}`)
        setTimeout(() => setRevealed(true), 1500)
      } else {
        // Show commentary for regular guess
        showCommentaryBubble(guessWord, letterStates, false, false)
      }
    } catch (error) {
      console.error('Failed to submit guess:', error)
      setMessage('Failed to submit guess. Please try again.')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }, [currentGuess, metadata, guesses, showCommentaryBubble, updateKeyboardStates])

  // Handle key press
  const handleKeyPress = useCallback((key: string, hasModifier = false) => {
    if (gameState !== 'playing' || !metadata) return

    // Don't allow typing if modifier keys are pressed
    if (hasModifier && /^[A-Za-z]$/.test(key)) return

    if (key === 'Backspace' || key === 'BACK') {
      setCurrentGuess(prev => prev.slice(0, -1))
      setMessage('')
    } else if (key === 'Enter' || key === 'ENTER') {
      submitGuess()
    } else if (/^[A-Za-z]$/.test(key) && currentGuess.length < metadata.wordLength) {
      setCurrentGuess(prev => prev + key.toUpperCase())
      setMessage('')
    }
  }, [gameState, metadata, currentGuess, submitGuess])

  const handleStartOver = () => {
    // Clear saved state
    localStorage.removeItem('hope-daily-state')

    // Reset all game state
    setGuesses([])
    setCurrentGuess('')
    setGameState('playing')
    setMessage('')
    setShake(false)
    setRevealed(false)
    setKeyboardStates(new Map())
    setRevealedData(null)
    setCommentary('')
    setShowCommentary(false)
  }

  // Keyboard event listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Check for modifier keys
      const hasModifier = e.ctrlKey || e.metaKey || e.altKey || e.shiftKey
      handleKeyPress(e.key, hasModifier)
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleKeyPress])

  if (!metadata) {
    return (
      <div className="text-center text-foreground/70 py-12">
        Loading today&apos;s word...
      </div>
    )
  }

  // Render empty tiles for remaining guesses
  const remainingGuesses = MAX_GUESSES - guesses.length - (currentGuess ? 1 : 0)
  const emptyRows = Array.from({ length: remainingGuesses }, () =>
    Array.from({ length: metadata.wordLength }, () => ({ letter: '', state: 'empty' as LetterState }))
  )

  // Current guess tiles
  const currentGuessTiles: LetterTile[] = Array.from({ length: metadata.wordLength }, (_, i) => ({
    letter: currentGuess[i] || '',
    state: 'empty' as LetterState
  }))

  const allRows = [
    ...guesses,
    ...(gameState === 'playing' && currentGuess ? [currentGuessTiles] : []),
    ...emptyRows
  ]

  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-0">
      {/* Game Board */}
      <div
        className="mb-2 sm:mb-3 flex flex-col gap-1 sm:gap-1.5"
        role="application"
        aria-label="Hope Daily Word Game"
      >
        {allRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex gap-1 sm:gap-1 justify-center ${
              shake && rowIndex === guesses.length ? 'animate-shake' : ''
            }`}
          >
            {row.map((tile, colIndex) => (
              <div
                key={colIndex}
                className={`
                  w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 rounded flex items-center justify-center
                  text-base sm:text-lg md:text-xl font-bold transition-all duration-300
                  ${tile.state === 'correct' ? 'bg-[#74c69d] border-[#74c69d] text-white' : ''}
                  ${tile.state === 'present' ? 'bg-[#f59e0b] border-[#f59e0b] text-white' : ''}
                  ${tile.state === 'absent' ? 'bg-foreground/20 border-foreground/20 text-white' : ''}
                  ${tile.state === 'empty' ? 'border-foreground/20' : ''}
                  ${tile.letter && tile.state === 'empty' ? 'border-foreground/40 scale-105' : ''}
                `}
                role="gridcell"
                aria-label={
                  tile.letter
                    ? `${tile.letter}${tile.state !== 'empty' ? ` - ${tile.state}` : ''}`
                    : 'empty'
                }
              >
                {tile.letter}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Message */}
      {message && (
        <div
          className="text-center mb-2 text-base sm:text-lg font-medium animate-fade"
          role="status"
          aria-live="polite"
        >
          {message}
        </div>
      )}

      {/* AI Commentary Bubble */}
      {showCommentary && commentary && (
        <div
          className="flex justify-center mb-2 animate-fade"
          role="status"
          aria-live="polite"
        >
          <div className="relative max-w-sm">
            <div className="bg-gradient-to-r from-accent/10 to-success/10 border-2 border-accent/30 rounded-2xl px-3 py-2 shadow-lg backdrop-blur-sm">
              <p className="text-xs sm:text-sm text-foreground font-medium text-center">
                {commentary}
              </p>
            </div>
            {/* Speech bubble tail */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-accent/30"></div>
          </div>
        </div>
      )}

      {/* Visual Keyboard */}
      <div className="mb-2 sm:mb-3 space-y-0.5 sm:space-y-1">
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-0.5 sm:gap-1">
            {row.map((key) => {
              const keyState = keyboardStates.get(key)
              const isSpecialKey = key === 'ENTER' || key === 'BACK'

              return (
                <button
                  key={key}
                  onClick={() => handleKeyPress(key === 'BACK' ? 'Backspace' : key === 'ENTER' ? 'Enter' : key)}
                  disabled={gameState !== 'playing'}
                  className={`
                    ${isSpecialKey ? 'px-1.5 sm:px-2 text-[10px] sm:text-xs' : 'w-6 sm:w-8 md:w-9'}
                    h-8 sm:h-10 md:h-12 rounded font-bold text-[10px] sm:text-xs md:text-sm
                    transition-all duration-200
                    ${keyState === 'correct' ? 'bg-[#74c69d] text-white border-[#74c69d]' : ''}
                    ${keyState === 'present' ? 'bg-[#f59e0b] text-white border-[#f59e0b]' : ''}
                    ${keyState === 'absent' ? 'bg-foreground/30 text-white border-foreground/30' : ''}
                    ${!keyState ? 'bg-foreground/10 hover:bg-foreground/20 border-foreground/20' : ''}
                    border-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                    active:scale-95
                  `}
                  aria-label={key === 'BACK' ? 'Backspace' : key}
                >
                  {key === 'BACK' ? '⌫' : key}
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {/* Color Legend and Start Over */}
      <div className="mb-2 sm:mb-3 px-2">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs mb-2">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#74c69d] rounded border-2 border-[#74c69d]"></div>
            <span className="whitespace-nowrap">Growth</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#f59e0b] rounded border-2 border-[#f59e0b]"></div>
            <span className="whitespace-nowrap">Hope</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-foreground/20 rounded border-2 border-foreground/20"></div>
            <span className="whitespace-nowrap">Absent</span>
          </div>
        </div>

        {/* Start Over Button */}
        {(guesses.length > 0 || gameState !== 'playing') && (
          <div className="flex justify-center">
            <button
              onClick={handleStartOver}
              className="px-4 py-1.5 text-xs sm:text-sm bg-foreground/10 hover:bg-foreground/20 text-foreground rounded-lg transition-colors border border-foreground/20"
              aria-label="Start over"
            >
              Start Over
            </button>
          </div>
        )}
      </div>

      {/* Educational Fact - Revealed after winning */}
      {revealed && revealedData && gameState === 'won' && (
        <div
          className="mt-4 p-4 bg-[#74c69d]/10 border-2 border-[#74c69d] rounded-xl animate-fade"
          role="region"
          aria-label="Educational fact"
        >
          <div className="text-xs font-semibold text-[#74c69d] mb-1 uppercase tracking-wide">
            {revealedData.category}
          </div>
          <p className="text-sm leading-relaxed text-foreground">
            {revealedData.fact}
          </p>
        </div>
      )}

      {/* Loss state - show fact too */}
      {revealed && revealedData && gameState === 'lost' && (
        <div
          className="mt-4 p-4 bg-foreground/5 border-2 border-foreground/20 rounded-xl animate-fade"
          role="region"
          aria-label="Educational fact"
        >
          <div className="text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
            {revealedData.category}
          </div>
          <p className="text-sm leading-relaxed text-foreground">
            {revealedData.fact}
          </p>
        </div>
      )}

      {/* Instructions */}
      {guesses.length === 0 && !currentGuess && (
        <div className="mt-3 text-center text-xs sm:text-sm text-foreground/70 space-y-1">
          <p>Guess the {metadata.wordLength}-letter word about global progress</p>
          <p className="text-[10px] sm:text-xs">
            Use your keyboard or tap the letters below
          </p>
        </div>
      )}

      {/* Game state info */}
      {gameState !== 'playing' && (
        <div className="mt-3 text-center text-xs sm:text-sm text-foreground/70">
          <p>Come back tomorrow for a new word!</p>
        </div>
      )}

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
    </div>
  )
}
