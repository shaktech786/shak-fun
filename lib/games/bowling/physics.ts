// Bowling game physics engine

export interface Vector2D {
  x: number
  y: number
}

export interface Ball {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  rotation: number
}

export interface Pin {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  rotation: number
  fallen: boolean
}

const FRICTION = 0.985
const GRAVITY = 0.5
const BOUNCE_DAMPING = 0.7
const ROTATION_SPEED = 0.05

export function updateBall(ball: Ball, deltaTime: number): Ball {
  // Normalize deltaTime for consistent physics (target 60fps)
  const dt = deltaTime / 60

  // Apply friction (per frame)
  const frictionFactor = Math.pow(FRICTION, dt)
  const newVx = ball.vx * frictionFactor
  const newVy = ball.vy * frictionFactor

  // Update position
  const newX = ball.x + newVx * dt
  const newY = ball.y + newVy * dt

  // Update rotation based on velocity
  const speed = Math.sqrt(newVx * newVx + newVy * newVy)
  const newRotation = ball.rotation + speed * ROTATION_SPEED * dt

  return {
    ...ball,
    x: newX,
    y: newY,
    vx: newVx,
    vy: newVy,
    rotation: newRotation
  }
}

export function updatePin(pin: Pin, deltaTime: number): Pin {
  if (!pin.fallen) {
    return pin
  }

  // Normalize deltaTime for consistent physics
  const dt = deltaTime / 60

  // Apply friction to fallen pins
  const frictionFactor = Math.pow(FRICTION, dt)
  const newVx = pin.vx * frictionFactor
  const newVy = pin.vy * frictionFactor

  // Update position
  const newX = pin.x + newVx * dt
  const newY = pin.y + newVy * dt

  // Update rotation
  const speed = Math.sqrt(newVx * newVx + newVy * newVy)
  const newRotation = pin.rotation + speed * ROTATION_SPEED * 2 * dt

  return {
    ...pin,
    x: newX,
    y: newY,
    vx: newVx,
    vy: newVy,
    rotation: newRotation
  }
}

export function checkCollision(
  obj1: { x: number; y: number; radius: number },
  obj2: { x: number; y: number; radius: number }
): boolean {
  const dx = obj2.x - obj1.x
  const dy = obj2.y - obj1.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  return distance < obj1.radius + obj2.radius
}

export function resolveBallPinCollision(ball: Ball, pin: Pin): { ball: Ball; pin: Pin } {
  const dx = pin.x - ball.x
  const dy = pin.y - ball.y
  const distance = Math.sqrt(dx * dx + dy * dy)

  if (distance === 0) return { ball, pin }

  // Normalize collision vector
  const nx = dx / distance
  const ny = dy / distance

  // Separate overlapping objects
  const overlap = (ball.radius + pin.radius) - distance
  const separationX = nx * overlap * 0.5
  const separationY = ny * overlap * 0.5

  const newBallX = ball.x - separationX
  const newBallY = ball.y - separationY
  const newPinX = pin.x + separationX
  const newPinY = pin.y + separationY

  // Relative velocity
  const dvx = ball.vx - pin.vx
  const dvy = ball.vy - pin.vy

  // Relative velocity in collision normal direction
  const dotProduct = dvx * nx + dvy * ny

  // Do not resolve if velocities are separating
  if (dotProduct > 0) return { ball, pin }

  // Restitution (bounciness)
  const restitution = 0.5

  // Calculate impulse (ball is heavier)
  const ballMass = 2.0
  const pinMass = 0.5
  const impulse = -(1 + restitution) * dotProduct / (1/ballMass + 1/pinMass)

  // Apply impulse
  const newBallVx = ball.vx + (impulse * nx) / ballMass
  const newBallVy = ball.vy + (impulse * ny) / ballMass
  const newPinVx = pin.vx - (impulse * nx) / pinMass
  const newPinVy = pin.vy - (impulse * ny) / pinMass

  // Check if pin should fall
  const pinSpeed = Math.sqrt(newPinVx * newPinVx + newPinVy * newPinVy)
  const shouldFall = pinSpeed > 1.5 || pin.fallen

  return {
    ball: {
      ...ball,
      x: newBallX,
      y: newBallY,
      vx: newBallVx,
      vy: newBallVy
    },
    pin: {
      ...pin,
      x: newPinX,
      y: newPinY,
      vx: newPinVx,
      vy: newPinVy,
      fallen: shouldFall
    }
  }
}

export function resolvePinPinCollision(pin1: Pin, pin2: Pin): { pin1: Pin; pin2: Pin } {
  const dx = pin2.x - pin1.x
  const dy = pin2.y - pin1.y
  const distance = Math.sqrt(dx * dx + dy * dy)

  if (distance === 0) return { pin1, pin2 }

  // Normalize collision vector
  const nx = dx / distance
  const ny = dy / distance

  // Separate overlapping objects
  const overlap = (pin1.radius + pin2.radius) - distance
  const separationX = nx * overlap * 0.5
  const separationY = ny * overlap * 0.5

  const newPin1X = pin1.x - separationX
  const newPin1Y = pin1.y - separationY
  const newPin2X = pin2.x + separationX
  const newPin2Y = pin2.y + separationY

  // Relative velocity
  const dvx = pin1.vx - pin2.vx
  const dvy = pin1.vy - pin2.vy

  // Relative velocity in collision normal direction
  const dotProduct = dvx * nx + dvy * ny

  // Do not resolve if velocities are separating
  if (dotProduct > 0) return { pin1, pin2 }

  // Restitution and impulse (equal mass)
  const restitution = 0.4
  const impulse = -(1 + restitution) * dotProduct / 2

  // Apply impulse
  const newPin1Vx = pin1.vx + impulse * nx
  const newPin1Vy = pin1.vy + impulse * ny
  const newPin2Vx = pin2.vx - impulse * nx
  const newPin2Vy = pin2.vy - impulse * ny

  // Check if pins should fall
  const pin1Speed = Math.sqrt(newPin1Vx * newPin1Vx + newPin1Vy * newPin1Vy)
  const pin2Speed = Math.sqrt(newPin2Vx * newPin2Vx + newPin2Vy * newPin2Vy)

  return {
    pin1: {
      ...pin1,
      x: newPin1X,
      y: newPin1Y,
      vx: newPin1Vx,
      vy: newPin1Vy,
      fallen: pin1Speed > 1.0 || pin1.fallen
    },
    pin2: {
      ...pin2,
      x: newPin2X,
      y: newPin2Y,
      vx: newPin2Vx,
      vy: newPin2Vy,
      fallen: pin2Speed > 1.0 || pin2.fallen
    }
  }
}

export function initializePins(centerX: number, centerY: number, spacing: number): Pin[] {
  // Standard 10-pin triangle formation
  const pins: Pin[] = []
  const pinRadius = spacing * 0.3

  // Row 1 (1 pin)
  pins.push({ x: centerX, y: centerY, vx: 0, vy: 0, radius: pinRadius, rotation: 0, fallen: false })

  // Row 2 (2 pins)
  pins.push({ x: centerX - spacing / 2, y: centerY + spacing * 0.866, vx: 0, vy: 0, radius: pinRadius, rotation: 0, fallen: false })
  pins.push({ x: centerX + spacing / 2, y: centerY + spacing * 0.866, vx: 0, vy: 0, radius: pinRadius, rotation: 0, fallen: false })

  // Row 3 (3 pins)
  pins.push({ x: centerX - spacing, y: centerY + spacing * 0.866 * 2, vx: 0, vy: 0, radius: pinRadius, rotation: 0, fallen: false })
  pins.push({ x: centerX, y: centerY + spacing * 0.866 * 2, vx: 0, vy: 0, radius: pinRadius, rotation: 0, fallen: false })
  pins.push({ x: centerX + spacing, y: centerY + spacing * 0.866 * 2, vx: 0, vy: 0, radius: pinRadius, rotation: 0, fallen: false })

  // Row 4 (4 pins)
  pins.push({ x: centerX - spacing * 1.5, y: centerY + spacing * 0.866 * 3, vx: 0, vy: 0, radius: pinRadius, rotation: 0, fallen: false })
  pins.push({ x: centerX - spacing / 2, y: centerY + spacing * 0.866 * 3, vx: 0, vy: 0, radius: pinRadius, rotation: 0, fallen: false })
  pins.push({ x: centerX + spacing / 2, y: centerY + spacing * 0.866 * 3, vx: 0, vy: 0, radius: pinRadius, rotation: 0, fallen: false })
  pins.push({ x: centerX + spacing * 1.5, y: centerY + spacing * 0.866 * 3, vx: 0, vy: 0, radius: pinRadius, rotation: 0, fallen: false })

  return pins
}
