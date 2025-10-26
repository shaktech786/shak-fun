#!/usr/bin/env node
/**
 * Generate Balatro-style joker card for Hard Choices game
 * Usage: npx tsx scripts/generate-game-card.ts
 */

import Replicate from 'replicate'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import http from 'http'
import { config } from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from .env.local
config({ path: path.join(__dirname, '../.env.local') })

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || '',
})

async function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }

    protocol.get(url, options, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        if (response.headers.location) {
          downloadImage(response.headers.location, filepath).then(resolve).catch(reject)
          return
        }
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`))
        return
      }

      const fileStream = fs.createWriteStream(filepath)
      response.pipe(fileStream)

      fileStream.on('finish', () => {
        fileStream.close()
        resolve()
      })

      fileStream.on('error', reject)
    }).on('error', reject)
  })
}

async function main() {
  console.log(`\n🎨 Generating Hard Choices game card...\n`)

  const outputPath = path.join(__dirname, '../public/games/hard-choices/card.png')

  // Ensure directory exists
  const dir = path.dirname(outputPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  // Prompt inspired by existing Balatro-style cards
  const prompt = `A beautifully ornate vintage playing card in Balatro joker style with a purple and gold color scheme.
The card has an elaborate decorative border with Art Nouveau flourishes and intricate patterns.
In the center top, elegant text reads "THE DILEMMA" in a vintage circus or carnival font.
The main illustration shows golden scales of justice perfectly balanced, surrounded by mystical purple wisps and geometric patterns.
Below the scales, ornate purple watermelon slices with golden seeds are arranged symmetrically.
The bottom has a decorative banner with small text "CRITICAL THINKING THROUGH TOUGH CHOICES".
Rich purple velvet texture background with gold metallic accents throughout.
Vintage carnival poster aesthetic, tarot card style, highly detailed ornamentation.
Aspect ratio: tall portrait card (1024x1792). Centered composition, symmetrical design.
Professional game card artwork, premium quality, mystical and thoughtful mood.`

  console.log(`📝 Prompt: ${prompt}\n`)

  // Generate card with Flux 1.1 Pro
  console.log(`🖼️  Generating card with Flux 1.1 Pro...`)
  const output = await replicate.run(
    'black-forest-labs/flux-1.1-pro',
    {
      input: {
        prompt: prompt,
        aspect_ratio: '9:16', // Closest to 1024x1792
        output_format: 'png',
        output_quality: 100,
        safety_tolerance: 2,
      }
    }
  ) as any

  // Extract URL from output (handle different response formats)
  let imageUrl: string
  if (typeof output === 'string') {
    imageUrl = output
  } else if (Array.isArray(output)) {
    imageUrl = output[0]
  } else if (output?.output) {
    imageUrl = typeof output.output === 'string' ? output.output : output.output[0]
  } else {
    throw new Error(`Unexpected output format: ${JSON.stringify(output)}`)
  }

  console.log(`✓ Card generated: ${imageUrl}`)

  // Download card
  console.log(`\n💾 Saving card...`)
  await downloadImage(imageUrl, outputPath)

  console.log(`\n✅ Card complete!`)
  console.log(`📁 Saved to: ${outputPath}`)
  console.log(`\n🎮 Hard Choices game card is ready to use!`)
}

main().catch(console.error)
