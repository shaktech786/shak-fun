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

const FRICTION = 0.98
const GRAVITY = 0.5
const BOUNCE_DAMPING = 0.7
const ROTATION_SPEED = 0.1

export function updateBall(ball: Ball, deltaTime: number): Ball {
  // Apply friction
  const newVx = ball.vx * FRICTION
  const newVy = ball.vy * FRICTION

  // Update position
  const newX = ball.x + newVx * deltaTime
  const newY = ball.y + newVy * deltaTime

  // Update rotation based on velocity
  const speed = Math.sqrt(newVx * newVx + newVy * newVy)
  const newRotation = ball.rotation + speed * ROTATION_SPEED

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

  // Apply friction to fallen pins
  const newVx = pin.vx * FRICTION
  const newVy = pin.vy * FRICTION

  // Update position
  const newX = pin.x + newVx * deltaTime
  const newY = pin.y + newVy * deltaTime

  // Update rotation
  const speed = Math.sqrt(newVx * newVx + newVy * newVy)
  const newRotation = pin.rotation + speed * ROTATION_SPEED * 2

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

  // Relative velocity
  const dvx = ball.vx - pin.vx
  const dvy = ball.vy - pin.vy

  // Relative velocity in collision normal direction
  const dotProduct = dvx * nx + dvy * ny

  // Do not resolve if velocities are separating
  if (dotProduct > 0) return { ball, pin }

  // Calculate impulse
  const impulse = 2 * dotProduct / 2 // Equal mass assumption

  // Apply impulse to ball (lighter impact on ball)
  const newBallVx = ball.vx - impulse * nx * 0.3
  const newBallVy = ball.vy - impulse * ny * 0.3

  // Apply impulse to pin (heavier impact on pin)
  const newPinVx = pin.vx + impulse * nx * 0.7
  const newPinVy = pin.vy + impulse * ny * 0.7

  // Check if pin should fall
  const pinSpeed = Math.sqrt(newPinVx * newPinVx + newPinVy * newPinVy)
  const shouldFall = pinSpeed > 0.5 || pin.fallen

  return {
    ball: {
      ...ball,
      vx: newBallVx,
      vy: newBallVy
    },
    pin: {
      ...pin,
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

  // Relative velocity
  const dvx = pin1.vx - pin2.vx
  const dvy = pin1.vy - pin2.vy

  // Relative velocity in collision normal direction
  const dotProduct = dvx * nx + dvy * ny

  // Do not resolve if velocities are separating
  if (dotProduct > 0) return { pin1, pin2 }

  // Calculate impulse (equal mass)
  const impulse = dotProduct

  // Apply impulse
  const newPin1Vx = pin1.vx - impulse * nx
  const newPin1Vy = pin1.vy - impulse * ny
  const newPin2Vx = pin2.vx + impulse * nx
  const newPin2Vy = pin2.vy + impulse * ny

  // Check if pins should fall
  const pin1Speed = Math.sqrt(newPin1Vx * newPin1Vx + newPin1Vy * newPin1Vy)
  const pin2Speed = Math.sqrt(newPin2Vx * newPin2Vx + newPin2Vy * newPin2Vy)

  return {
    pin1: {
      ...pin1,
      vx: newPin1Vx,
      vy: newPin1Vy,
      fallen: pin1Speed > 0.3 || pin1.fallen
    },
    pin2: {
      ...pin2,
      vx: newPin2Vx,
      vy: newPin2Vy,
      fallen: pin2Speed > 0.3 || pin2.fallen
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
