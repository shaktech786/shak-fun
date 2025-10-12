export function calculatePointsReward(
  baseReward: number,
  score: number,
  maxScore: number
): number {
  const scorePercentage = Math.min(score / maxScore, 1)
  const multiplier = 1 + scorePercentage * 2 // 1x to 3x multiplier
  return Math.floor(baseReward * multiplier)
}

export function canAffordGame(userPoints: number, gameCost: number): boolean {
  return userPoints >= gameCost
}

export function formatPoints(points: number): string {
  if (points >= 1000000) {
    return `${(points / 1000000).toFixed(1)}M`
  }
  if (points >= 1000) {
    return `${(points / 1000).toFixed(1)}K`
  }
  return points.toString()
}
