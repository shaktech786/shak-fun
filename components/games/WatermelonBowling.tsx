'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import type { Ball, Pin } from '@/lib/games/bowling/physics'
import {
  updateBall,
  updatePin,
  checkCollision,
  resolveBallPinCollision,
  resolvePinPinCollision,
  initializePins
} from '@/lib/games/bowling/physics'
import {
  drawLane,
  drawWatermelonBall,
  drawPin,
  drawAimingLine,
  drawScore,
  drawMessage
} from '@/lib/games/bowling/graphics'
import { soundManager } from '@/lib/games/bowling/sounds'

type GameState = 'aiming' | 'rolling' | 'settling' | 'finished'

export default function WatermelonBowling() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)
  const [gameState, setGameState] = useState<GameState>('aiming')
  const [score, setScore] = useState(0)
  const [ball, setBall] = useState<Ball | null>(null)
  const [pins, setPins] = useState<Pin[]>([])
  const [aimStart, setAimStart] = useState<{ x: number; y: number } | null>(null)
  const [aimEnd, setAimEnd] = useState<{ x: number; y: number } | null>(null)
  const [message, setMessage] = useState<string>('')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 })

  const BALL_RADIUS = 20
  const BALL_START_Y_RATIO = 0.9

  // Handle responsive canvas sizing
  useEffect(() => {
    const updateCanvasSize = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.clientWidth
      const maxWidth = 800
      const width = Math.min(containerWidth - 32, maxWidth) // 32px for padding
      const height = (width / 4) * 3 // 4:3 aspect ratio

      setCanvasSize({ width, height })
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    return () => window.removeEventListener('resize', updateCanvasSize)
  }, [])

  // Initialize game
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Initialize pins
    const newPins = initializePins(canvasSize.width / 2, canvasSize.height * 0.2, 40)
    setPins(newPins)

    // Initialize ball at starting position
    const newBall: Ball = {
      x: canvasSize.width / 2,
      y: canvasSize.height * BALL_START_Y_RATIO,
      vx: 0,
      vy: 0,
      radius: BALL_RADIUS,
      rotation: 0
    }
    setBall(newBall)

    soundManager.setEnabled(soundEnabled)
  }, [soundEnabled, canvasSize])

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !ball) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let lastTime = Date.now()

    const gameLoop = () => {
      const currentTime = Date.now()
      const deltaTime = Math.min((currentTime - lastTime) / 16.67, 2)
      lastTime = currentTime

      // Clear canvas
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)

      // Draw lane
      drawLane(ctx, canvasSize.width, canvasSize.height)

      // Draw pins
      pins.forEach(pin => drawPin(ctx, pin))

      // Draw ball
      if (ball) {
        drawWatermelonBall(ctx, ball)
      }

      // Draw aiming line when aiming
      if (gameState === 'aiming' && aimStart && aimEnd) {
        const dx = aimEnd.x - aimStart.x
        const dy = aimEnd.y - aimStart.y
        const power = Math.sqrt(dx * dx + dy * dy)
        drawAimingLine(ctx, ball.x, ball.y, aimEnd.x, aimEnd.y, power)
      }

      // Draw score
      drawScore(ctx, score, canvasSize.width / 2, 20)

      // Draw message
      if (message) {
        drawMessage(ctx, message, canvasSize.width / 2, canvasSize.height / 2)
      }

      // Update game state
      if (gameState === 'rolling' || gameState === 'settling') {
        // Update ball
        const newBall = updateBall(ball, deltaTime)
        setBall(newBall)

        // Update pins
        let newPins = [...pins]

        // Check ball-pin collisions
        newPins = newPins.map(pin => {
          if (checkCollision(newBall, pin)) {
            const result = resolveBallPinCollision(newBall, pin)
            setBall(result.ball)
            soundManager.play('pin-hit')
            return result.pin
          }
          return updatePin(pin, deltaTime)
        })

        // Check pin-pin collisions
        for (let i = 0; i < newPins.length; i++) {
          for (let j = i + 1; j < newPins.length; j++) {
            if (checkCollision(newPins[i], newPins[j])) {
              const result = resolvePinPinCollision(newPins[i], newPins[j])
              newPins[i] = result.pin1
              newPins[j] = result.pin2
            }
          }
        }

        setPins(newPins)

        // Check if ball has stopped or gone off screen
        const ballSpeed = Math.sqrt(newBall.vx * newBall.vx + newBall.vy * newBall.vy)
        const ballOffScreen = newBall.y < -100 || newBall.y > canvasSize.height + 100

        if (gameState === 'rolling' && (ballSpeed < 0.1 || ballOffScreen)) {
          setGameState('settling')

          // Wait for pins to settle
          setTimeout(() => {
            calculateScore()
            setGameState('finished')
          }, 2000)
        }
      }

      animationRef.current = requestAnimationFrame(gameLoop)
    }

    animationRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [ball, pins, gameState, aimStart, aimEnd, message, score, canvasSize])

  const calculateScore = useCallback(() => {
    const fallenPins = pins.filter(p => p.fallen).length
    const newScore = score + fallenPins * 10

    setScore(newScore)

    if (fallenPins === 10) {
      setMessage('STRIKE! 🍉')
      soundManager.play('strike')
    } else if (fallenPins > 0) {
      setMessage(`${fallenPins} pins!`)
      soundManager.play('spare')
    } else {
      setMessage('Gutter ball!')
      soundManager.play('gutter')
    }

    setTimeout(() => setMessage(''), 2000)
  }, [pins, score])

  const getCanvasCoordinates = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const rect = canvas.getBoundingClientRect()
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    }
  }

  const handlePointerStart = (clientX: number, clientY: number) => {
    if (gameState !== 'aiming' || !ball) return

    const coords = getCanvasCoordinates(clientX, clientY)
    if (!coords) return

    setAimStart({ x: ball.x, y: ball.y })
    setAimEnd(coords)
  }

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (gameState !== 'aiming' || !aimStart) return

    const coords = getCanvasCoordinates(clientX, clientY)
    if (!coords) return

    setAimEnd(coords)
  }

  const handlePointerEnd = () => {
    if (gameState !== 'aiming' || !aimStart || !aimEnd || !ball) return

    // Calculate velocity based on drag
    const dx = aimEnd.x - aimStart.x
    const dy = aimEnd.y - aimStart.y

    const power = Math.min(Math.sqrt(dx * dx + dy * dy) / 10, 20)
    const angle = Math.atan2(dy, dx)

    setBall({
      ...ball,
      vx: Math.cos(angle) * power,
      vy: Math.sin(angle) * power
    })

    setGameState('rolling')
    setAimStart(null)
    setAimEnd(null)

    soundManager.play('roll')
  }

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    handlePointerStart(e.clientX, e.clientY)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    handlePointerMove(e.clientX, e.clientY)
  }

  const handleMouseUp = () => {
    handlePointerEnd()
  }

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (e.touches.length > 0) {
      handlePointerStart(e.touches[0].clientX, e.touches[0].clientY)
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)
    }
  }

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    handlePointerEnd()
  }

  const handleReset = () => {
    // Reset pins
    const newPins = initializePins(canvasSize.width / 2, canvasSize.height * 0.2, 40)
    setPins(newPins)

    // Reset ball
    const newBall: Ball = {
      x: canvasSize.width / 2,
      y: canvasSize.height * BALL_START_Y_RATIO,
      vx: 0,
      vy: 0,
      radius: BALL_RADIUS,
      rotation: 0
    }
    setBall(newBall)

    setGameState('aiming')
    setMessage('')
  }

  const toggleSound = () => {
    const newState = !soundEnabled
    setSoundEnabled(newState)
    soundManager.setEnabled(newState)
  }

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-4 sm:gap-6 w-full">
      <div className="relative w-full max-w-4xl">
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className="border-2 border-accent rounded-lg cursor-crosshair pixelated w-full touch-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            setAimStart(null)
            setAimEnd(null)
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          aria-label="Watermelon bowling game canvas"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center w-full max-w-md px-4">
        <button
          onClick={handleReset}
          className="w-full sm:w-auto px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
          aria-label="Reset game"
        >
          New Game
        </button>

        <button
          onClick={toggleSound}
          className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
        >
          Sound: {soundEnabled ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="text-sm text-foreground/60 text-center max-w-md px-4">
        <p className="mb-2">
          <strong>How to play:</strong> Drag to aim, release to bowl!
        </p>
        <p>
          Knock down all 10 pins for a STRIKE! Each pin is worth 10 points.
        </p>
      </div>
    </div>
  )
}
