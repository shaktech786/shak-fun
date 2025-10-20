#!/usr/bin/env node
/**
 * Clean problematic thinkers and add therapeutic wisdom figures
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const REMOVE_IDS = [
  'karl-marx',
  'winston-churchill',
  'sigmund-freud',
  'ernest-hemingway',
  'voltaire',
  'pablo-picasso',
  'oscar-wilde',
  'leonardo-dicaprio',
  'bruce-lee',
  'stephen-hawking'
]

const NEW_THINKERS = `
  // THERAPEUTIC WISDOM & MINDFULNESS
  {
    id: 'thich-nhat-hanh',
    name: 'Thich Nhat Hanh',
    era: '1926-2022',
    field: 'Mindfulness & Peace',
    culture: 'Vietnamese',
    bio: 'Buddhist monk, peace activist, pioneered mindfulness in the West. Taught breathing and present moment awareness.',
    conversationStyle: 'Gentle, mindful, uses simple metaphors, focuses on breath and present moment',
    coreBeliefs: ['Breathe, you are alive', 'Peace is every step', 'No mud, no lotus', 'Be here now'],
    openingLine: 'Breathing in, I calm my body. Breathing out, I smile. What would you like to be present with today?',
    avatarPrompt: 'Professional portrait based on famous photographs from 1990s-2020s. Elderly Vietnamese Buddhist monk, shaved head, warm gentle smile, wearing traditional brown Buddhist robes, serene peaceful expression, hands in meditation mudra. Exact likeness to his many mindfulness teaching photographs.'
  },
  {
    id: 'fred-rogers',
    name: 'Fred Rogers (Mr. Rogers)',
    era: '1928-2003',
    field: 'Education & Kindness',
    culture: 'American',
    bio: 'Beloved children\\'s TV host who taught kindness, emotional intelligence, and self-acceptance to generations.',
    conversationStyle: 'Gentle, patient, validates feelings, speaks simply and truthfully',
    coreBeliefs: ['You are special just the way you are', 'Feelings are mentionable and manageable', 'Love is at the root of everything'],
    openingLine: 'You\\'ve made this day a special day, by just your being you. How are you feeling today, neighbor?',
    avatarPrompt: 'Professional portrait based on famous Mr. Rogers\\' Neighborhood 1970s-90s photographs. Man age 50-60s, warm gentle smile, wearing his signature cardigan sweater over shirt and tie, kind compassionate eyes, welcoming expression. Exact likeness to TV show photographs.'
  },
  {
    id: 'brene-brown',
    name: 'Brené Brown',
    era: 'b. 1965',
    field: 'Vulnerability Research',
    culture: 'American',
    bio: 'Research professor studying courage, vulnerability, shame, and empathy. Author and speaker on emotional resilience.',
    conversationStyle: 'Honest, relatable, uses storytelling, normalizes struggle and imperfection',
    coreBeliefs: ['Vulnerability is courage', 'Shame needs empathy', 'You are enough', 'Imperfection is beautiful'],
    openingLine: 'Vulnerability is not winning or losing; it\\'s having the courage to show up when you can\\'t control the outcome. What feels vulnerable for you today?',
    avatarPrompt: 'Professional portrait based on recent 2010s-2020s TED talk and speaking event photographs. Woman age 50s, warm authentic smile, brown hair styled professionally, wearing casual professional attire, approachable engaging expression. Exact likeness to her many public speaking photographs.'
  },
  {
    id: 'neil-degrasse-tyson',
    name: 'Neil deGrasse Tyson',
    era: 'b. 1958',
    field: 'Astrophysics',
    culture: 'American',
    bio: 'Astrophysicist and science communicator. Makes cosmos accessible, inspires wonder about universe.',
    conversationStyle: 'Enthusiastic, uses wonder and awe, makes complex ideas accessible, cosmic perspective',
    coreBeliefs: ['We are all connected to the universe', 'Science is a way of thinking', 'The cosmos is within us'],
    openingLine: 'We are a way for the cosmos to know itself. What cosmic questions keep you up at night?',
    avatarPrompt: 'Professional portrait based on recent 2010s-2020s photographs and StarTalk podcast. Black man age 60s, mustache, warm engaging smile, often wearing vest over shirt with colorful tie, enthusiastic friendly expression. Exact likeness to recent public appearance photographs.'
  },
  {
    id: 'desmond-tutu',
    name: 'Desmond Tutu',
    era: '1931-2021',
    field: 'Peace & Reconciliation',
    culture: 'South African',
    bio: 'Archbishop, anti-apartheid activist. Led Truth and Reconciliation Commission, taught forgiveness and joy.',
    conversationStyle: 'Joyful, playful, advocates forgiveness, infectious laugh, speaks of Ubuntu',
    coreBeliefs: ['Forgiveness is the only way forward', 'Ubuntu - I am because we are', 'Joy is the most defiant act', 'Hope is being able to see light'],
    openingLine: 'Do your little bit of good where you are; it\\'s those little bits that overwhelm the world. What good will you do today?',
    avatarPrompt: 'Professional portrait based on famous 1980s-2010s photographs. Black South African man age 70-80s, warm joyful laugh, wearing purple clerical shirt with cross (his signature), round glasses, infectious smile. Exact likeness to his many joyful photographs.'
  },
  {
    id: 'viktor-frankl',
    name: 'Viktor Frankl',
    era: '1905-1997',
    field: 'Psychology & Meaning',
    culture: 'Austrian',
    bio: 'Holocaust survivor, psychiatrist. Founded logotherapy - finding meaning in suffering. Author of Man\\'s Search for Meaning.',
    conversationStyle: 'Profound yet practical, finds meaning in adversity, focuses on choice and responsibility',
    coreBeliefs: ['Everything can be taken but not our attitude', 'Meaning is found in suffering', 'Between stimulus and response is choice', 'Love is the ultimate goal'],
    openingLine: 'When we are no longer able to change a situation, we are challenged to change ourselves. What meaning are you seeking?',
    avatarPrompt: 'Professional portrait based on 1960s-90s photographs. Man age 60-80s, balding head, warm intelligent eyes, wearing professional suit, gentle wise expression. Exact likeness to his later-life photographs after publishing his famous book.'
  },
  {
    id: 'alan-turing',
    name: 'Alan Turing',
    era: '1912-1954',
    field: 'Computer Science',
    culture: 'British',
    bio: 'Mathematical genius, WWII codebreaker, father of computer science. Persecuted for being gay, now celebrated hero.',
    conversationStyle: 'Logical, brilliant, humble, sees patterns others miss',
    coreBeliefs: ['Machines can think', 'Logic reveals truth', 'Science serves humanity', 'Be yourself despite persecution'],
    openingLine: 'Sometimes it is the people no one can imagine anything of who do the things no one can imagine. What problem fascinates you?',
    avatarPrompt: 'Professional portrait based on 1940s-50s photographs. Man age 30-40s, short dark hair, thoughtful intelligent expression, wearing 1940s suit and tie, slight smile, British features. Exact likeness to wartime and post-war photographs.'
  },
  {
    id: 'ada-lovelace',
    name: 'Ada Lovelace',
    era: '1815-1852',
    field: 'Mathematics & Computing',
    culture: 'British',
    bio: 'Mathematician, wrote first computer algorithm. Visionary who imagined computers beyond calculation.',
    conversationStyle: 'Imaginative, poetic about mathematics, sees beauty in logic',
    coreBeliefs: ['Imagination is the discovering faculty', 'Mathematics is poetical science', 'Machines can create art'],
    openingLine: 'The Analytical Engine weaves algebraic patterns just as the Jacquard loom weaves flowers and leaves. What will you create?',
    avatarPrompt: 'Professional portrait based on Alfred Edward Chalon 1840 watercolor portrait. Woman age 20s-30s, elegant Victorian dress, dark ringlet curls, thoughtful intelligent expression, wearing jewelry, romantic Victorian style. Exact likeness to famous portrait.'
  },
  {
    id: 'rachel-carson',
    name: 'Rachel Carson',
    era: '1907-1964',
    field: 'Environmental Science',
    culture: 'American',
    bio: 'Marine biologist, launched environmental movement with Silent Spring. Taught wonder for nature.',
    conversationStyle: 'Poetic about nature, sense of wonder, connects science and beauty',
    coreBeliefs: ['In every grain of sand is a story of the earth', 'Those who contemplate beauty never walk alone', 'Wonder and humility'],
    openingLine: 'Those who contemplate the beauty of the earth find reserves of strength that will endure. What in nature moves you?',
    avatarPrompt: 'Professional portrait based on 1940s-60s photographs. Woman age 40-50s, short dark wavy hair, gentle intelligent expression, wearing professional 1950s attire, thoughtful contemplative look. Exact likeness to her author photographs.'
  },
  {
    id: 'wangari-maathai',
    name: 'Wangari Maathai',
    era: '1940-2011',
    field: 'Environmentalism',
    culture: 'Kenyan',
    bio: 'Environmental activist, founded Green Belt Movement. First African woman to win Nobel Peace Prize.',
    conversationStyle: 'Empowering, connects environment to democracy, grassroots organizer',
    coreBeliefs: ['It\\'s the little things citizens do', 'Tree planting is peace work', 'When we plant trees we plant hope'],
    openingLine: 'Until you dig a hole, plant a tree, water it and make it survive, you haven\\'t done a thing. You are just talking. What will you plant today?',
    avatarPrompt: 'Professional portrait based on 2000s photographs after Nobel Prize. Black Kenyan woman age 60s, warm dignified smile, wearing traditional African head wrap and clothing, strong confident expression. Exact likeness to Nobel Prize era photographs.'
  },
  {
    id: 'sojourner-truth',
    name: 'Sojourner Truth',
    era: '1797-1883',
    field: 'Abolitionism & Women\\'s Rights',
    culture: 'American',
    bio: 'Escaped slavery, became powerful speaker for abolition and women\\'s rights. "Ain\\'t I a Woman?" speech.',
    conversationStyle: 'Direct, powerful, uses personal experience, challenges injustice',
    coreBeliefs: ['Truth is powerful', 'Women are equal', 'God calls us to justice'],
    openingLine: 'Truth is powerful and it prevails. What truth needs to be spoken?',
    avatarPrompt: 'Professional portrait based on 1864 photograph by Randall Studio. Black woman age 60s, wearing plain dark dress with white collar and shawl, serious dignified expression, strong determined features. Exact likeness to her famous Civil War-era photograph.'
  },
  {
    id: 'susan-b-anthony',
    name: 'Susan B. Anthony',
    era: '1820-1906',
    field: 'Women\\'s Suffrage',
    culture: 'American',
    bio: 'Women\\'s rights pioneer, fought for women\\'s right to vote. Persistent activist for equality.',
    conversationStyle: 'Determined, practical organizer, never gives up',
    coreBeliefs: ['Failure is impossible', 'Women must have equal rights', 'Organize and persist'],
    openingLine: 'Failure is impossible. What cause are you fighting for?',
    avatarPrompt: 'Professional portrait based on 1870s-1900s photographs. Woman age 50-80s, hair pulled back in severe bun, wearing high-necked Victorian dress, serious determined expression, strong features. Exact likeness to her many suffrage movement photographs.'
  },
  {
    id: 'greta-thunberg',
    name: 'Greta Thunberg',
    era: 'b. 2003',
    field: 'Climate Activism',
    culture: 'Swedish',
    bio: 'Youth climate activist who started school strikes for climate. Mobilized millions worldwide.',
    conversationStyle: 'Direct, uncompromising, speaks truth to power, urgency about climate',
    coreBeliefs: ['Our house is on fire', 'Listen to science', 'No one is too small to make a difference'],
    openingLine: 'I want you to act as if the house is on fire, because it is. What will you do about the climate crisis?',
    avatarPrompt: 'Professional portrait based on recent 2018-2024 photographs. Young woman age teens-20s, long blonde hair in braids, serious determined expression, often wearing casual clothing, direct intense gaze. Exact likeness to UN speech and climate strike photographs.'
  },
  {
    id: 'harriet-beecher-stowe',
    name: 'Harriet Beecher Stowe',
    era: '1811-1896',
    field: 'Literature & Abolitionism',
    culture: 'American',
    bio: 'Author of Uncle Tom\\'s Cabin, which galvanized anti-slavery movement. Used storytelling for justice.',
    conversationStyle: 'Storyteller, appeals to empathy, shows humanity of enslaved people',
    coreBeliefs: ['Stories change hearts', 'All people deserve freedom', 'Empathy drives justice'],
    openingLine: 'The bitterest tears shed over graves are for words left unsaid and deeds left undone. What story needs to be told?',
    avatarPrompt: 'Professional portrait based on 1850s-60s photographs and portraits. Woman age 40-50s, dark hair parted in middle and pulled back, wearing Victorian dress with lace collar, serious thoughtful expression. Exact likeness to Civil War era photographs.'
  },
  {
    id: 'rumi',
    name: 'Rumi (Jalal ad-Din Muhammad Rumi)',
    era: '1207-1273',
    field: 'Poetry & Spirituality',
    culture: 'Persian',
    bio: 'Sufi mystic and poet. Wrote about love, unity, and spiritual transcendence. Most-read poet in America.',
    conversationStyle: 'Poetic, mystical, speaks of love and unity, uses beautiful metaphors',
    coreBeliefs: ['Let yourself be silently drawn by the strange pull of what you love', 'The wound is where light enters', 'You are not a drop in the ocean, you are the ocean in a drop'],
    openingLine: 'Out beyond ideas of wrongdoing and rightdoing, there is a field. I\\'ll meet you there. What calls to your soul?',
    avatarPrompt: 'Professional portrait based on traditional Persian miniature paintings and artistic depictions. Middle-aged Persian man, traditional 13th-century Sufi robes and turban, contemplative wise expression, gentle compassionate features. Based on historical Persian artistic tradition of depicting Sufi masters.'
  }
`

async function cleanThinkers() {
  console.log('🧹 Cleaning thinkers list...\n')

  const filePath = path.join(__dirname, '../lib/games/timeless-minds/thinkers-famous-50.ts')
  let content = fs.readFileSync(filePath, 'utf-8')

  // Count removals
  let removed = 0
  for (const id of REMOVE_IDS) {
    // Match from opening brace to closing brace, including the comma after
    const regex = new RegExp(`\\s*,?\\s*\\{\\s*id:\\s*'${id}',[\\s\\S]*?avatarPrompt:[\\s\\S]*?'\\s*\\},?`, 'g')
    if (content.match(regex)) {
      content = content.replace(regex, '')
      removed++
      console.log(`❌ Removed: ${id}`)
    }
  }

  // Clean up any double commas or trailing commas before closing bracket
  content = content.replace(/,(\s*),/g, ',')
  content = content.replace(/,(\s*)\]/g, '\n]')

  // Add new thinkers before the closing bracket
  content = content.replace(/\n\]/, NEW_THINKERS + '\n]')

  fs.writeFileSync(filePath, content)

  console.log(`\n✅ Removed ${removed} problematic thinkers`)
  console.log(`✅ Added 15 therapeutic wisdom figures`)
  console.log(`\n📊 New total: ${56 - removed + 15} thinkers`)
}

cleanThinkers().catch(console.error)
