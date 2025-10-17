// Bowling game graphics rendering

import type { Ball, Pin } from './physics'

export function drawLane(ctx: CanvasRenderingContext2D, width: number, height: number) {
  // Background
  ctx.fillStyle = '#2d3748'
  ctx.fillRect(0, 0, width, height)

  // Lane
  const laneWidth = width * 0.4
  const laneX = (width - laneWidth) / 2

  // Lane gradient for depth
  const gradient = ctx.createLinearGradient(laneX, 0, laneX, height)
  gradient.addColorStop(0, '#8b6f47')
  gradient.addColorStop(1, '#654321')

  ctx.fillStyle = gradient
  ctx.fillRect(laneX, 0, laneWidth, height)

  // Lane markers (arrows)
  ctx.strokeStyle = '#ffffff33'
  ctx.lineWidth = 2

  const arrowY = height * 0.75
  const arrowSize = 30

  // Center arrow
  ctx.beginPath()
  ctx.moveTo(width / 2, arrowY)
  ctx.lineTo(width / 2 - arrowSize / 2, arrowY + arrowSize)
  ctx.lineTo(width / 2 + arrowSize / 2, arrowY + arrowSize)
  ctx.closePath()
  ctx.stroke()

  // Gutter lines
  ctx.strokeStyle = '#1a1a1a'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(laneX, 0)
  ctx.lineTo(laneX, height)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(laneX + laneWidth, 0)
  ctx.lineTo(laneX + laneWidth, height)
  ctx.stroke()

  // Foul line
  ctx.strokeStyle = '#e63946'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(laneX, height * 0.85)
  ctx.lineTo(laneX + laneWidth, height * 0.85)
  ctx.stroke()
}

export function drawWatermelonBall(
  ctx: CanvasRenderingContext2D,
  ball: Ball
) {
  ctx.save()
  ctx.translate(ball.x, ball.y)
  ctx.rotate(ball.rotation)

  // Watermelon sphere with gradient
  const gradient = ctx.createRadialGradient(
    -ball.radius * 0.3,
    -ball.radius * 0.3,
    ball.radius * 0.1,
    0,
    0,
    ball.radius
  )
  gradient.addColorStop(0, '#ff6b7a')
  gradient.addColorStop(0.7, '#e63946')
  gradient.addColorStop(1, '#c41e2a')

  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(0, 0, ball.radius, 0, Math.PI * 2)
  ctx.fill()

  // Dark green stripes
  ctx.strokeStyle = '#1a4d2e'
  ctx.lineWidth = ball.radius * 0.15
  ctx.lineCap = 'round'

  for (let i = -2; i <= 2; i++) {
    const offset = i * ball.radius * 0.4
    ctx.beginPath()
    ctx.moveTo(offset, -ball.radius)
    ctx.lineTo(offset, ball.radius)
    ctx.stroke()
  }

  // Highlight for shine
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
  ctx.beginPath()
  ctx.arc(-ball.radius * 0.3, -ball.radius * 0.3, ball.radius * 0.3, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()

  // Shadow
  ctx.save()
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
  ctx.beginPath()
  ctx.ellipse(ball.x, ball.y + ball.radius + 5, ball.radius * 0.8, ball.radius * 0.2, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

export function drawPin(ctx: CanvasRenderingContext2D, pin: Pin) {
  ctx.save()
  ctx.translate(pin.x, pin.y)

  if (pin.fallen) {
    ctx.rotate(pin.rotation)
  }

  // Pin body
  const pinHeight = pin.radius * 3
  const pinWidth = pin.radius * 2

  if (pin.fallen) {
    // Draw fallen pin horizontally
    const gradient = ctx.createLinearGradient(-pinHeight / 2, 0, pinHeight / 2, 0)
    gradient.addColorStop(0, '#ffffff')
    gradient.addColorStop(0.5, '#f0f0f0')
    gradient.addColorStop(1, '#e0e0e0')

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.ellipse(0, 0, pinHeight / 2, pinWidth / 2, 0, 0, Math.PI * 2)
    ctx.fill()

    // Red stripes
    ctx.fillStyle = '#e63946'
    ctx.fillRect(-pinHeight * 0.2, -pinWidth / 2, pinHeight * 0.1, pinWidth)
    ctx.fillRect(pinHeight * 0.1, -pinWidth / 2, pinHeight * 0.1, pinWidth)
  } else {
    // Draw standing pin
    const gradient = ctx.createLinearGradient(0, -pinHeight / 2, 0, pinHeight / 2)
    gradient.addColorStop(0, '#ffffff')
    gradient.addColorStop(0.5, '#f0f0f0')
    gradient.addColorStop(1, '#e0e0e0')

    ctx.fillStyle = gradient

    // Pin shape (simplified)
    ctx.beginPath()
    ctx.ellipse(0, -pinHeight * 0.3, pinWidth * 0.3, pinWidth * 0.3, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillRect(-pinWidth / 2, -pinHeight * 0.3, pinWidth, pinHeight * 0.6)

    ctx.beginPath()
    ctx.ellipse(0, pinHeight * 0.3, pinWidth * 0.4, pinWidth * 0.2, 0, 0, Math.PI * 2)
    ctx.fill()

    // Red stripes
    ctx.fillStyle = '#e63946'
    ctx.fillRect(-pinWidth / 2, -pinHeight * 0.1, pinWidth, pinHeight * 0.08)
    ctx.fillRect(-pinWidth / 2, pinHeight * 0.05, pinWidth, pinHeight * 0.08)
  }

  ctx.restore()

  // Shadow for standing pins
  if (!pin.fallen) {
    ctx.save()
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
    ctx.beginPath()
    ctx.ellipse(pin.x, pin.y + pinHeight / 2 + 3, pin.radius * 0.6, pin.radius * 0.15, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

export function drawAimingLine(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  power: number
) {
  const dx = endX - startX
  const dy = endY - startY
  const distance = Math.sqrt(dx * dx + dy * dy)

  // Power indicator
  ctx.strokeStyle = `rgba(230, 57, 70, ${Math.min(power / 100, 0.8)})`
  ctx.lineWidth = 4
  ctx.setLineDash([10, 5])

  ctx.beginPath()
  ctx.moveTo(startX, startY)
  ctx.lineTo(endX, endY)
  ctx.stroke()

  ctx.setLineDash([])

  // Arrow at end
  const angle = Math.atan2(dy, dx)
  const arrowSize = 15

  ctx.fillStyle = ctx.strokeStyle
  ctx.beginPath()
  ctx.moveTo(endX, endY)
  ctx.lineTo(
    endX - arrowSize * Math.cos(angle - Math.PI / 6),
    endY - arrowSize * Math.sin(angle - Math.PI / 6)
  )
  ctx.lineTo(
    endX - arrowSize * Math.cos(angle + Math.PI / 6),
    endY - arrowSize * Math.sin(angle + Math.PI / 6)
  )
  ctx.closePath()
  ctx.fill()
}

export function drawScore(
  ctx: CanvasRenderingContext2D,
  score: number,
  x: number,
  y: number
) {
  ctx.save()
  ctx.font = 'bold 32px system-ui'
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'

  ctx.fillText(`Score: ${score}`, x, y)
  ctx.restore()
}

export function drawMessage(
  ctx: CanvasRenderingContext2D,
  message: string,
  x: number,
  y: number,
  size: number = 48
) {
  ctx.save()
  ctx.font = `bold ${size}px system-ui`
  ctx.fillStyle = '#e63946'
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 3
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.strokeText(message, x, y)
  ctx.fillText(message, x, y)
  ctx.restore()
}
