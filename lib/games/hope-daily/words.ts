export interface WordData {
  word: string
  fact: string
  category: string
}

/**
 * Curated list of words (5-15 letters) related to global progress and solutions.
 * Each word comes with an educational fact about positive change.
 *
 * Categories:
 * - Energy: Renewable energy and climate solutions
 * - Health: Medical advances and healthcare
 * - Rights: Human rights and equality progress
 * - Peace: Conflict resolution and cooperation
 * - Tech: Technology improving lives
 * - Nature: Environmental protection
 */
export const wordList: WordData[] = [
  // Energy & Climate
  {
    word: 'SOLAR',
    fact: 'Solar power costs have dropped 90% since 2010, making clean energy accessible worldwide.',
    category: 'Energy'
  },
  {
    word: 'CLEAN',
    fact: 'Over 90% of new power capacity added globally in 2023 came from renewable sources.',
    category: 'Energy'
  },
  {
    word: 'GREEN',
    fact: 'Global forest area is stabilizing as reforestation efforts gain momentum in 63 countries.',
    category: 'Nature'
  },

  // Health & Medicine
  {
    word: 'CURES',
    fact: 'Child mortality has dropped by 50% since 1990, saving millions of young lives.',
    category: 'Health'
  },
  {
    word: 'HEALS',
    fact: 'HIV/AIDS deaths have fallen by 61% since 2004 thanks to accessible treatment.',
    category: 'Health'
  },
  {
    word: 'SAVED',
    fact: 'Vaccines prevent 4-5 million deaths every year across all age groups worldwide.',
    category: 'Health'
  },

  // Human Rights & Equality
  {
    word: 'EQUAL',
    fact: 'Gender parity in primary education has been achieved in 2/3 of countries worldwide.',
    category: 'Rights'
  },
  {
    word: 'UNITY',
    fact: 'Extreme poverty has fallen from 36% (1990) to under 10% of the global population.',
    category: 'Rights'
  },
  {
    word: 'VOICE',
    fact: 'Women now hold 26% of parliamentary seats globally, up from 12% in 1995.',
    category: 'Rights'
  },
  {
    word: 'PRIDE',
    fact: 'Same-sex marriage is now legal in 35+ countries, protecting millions of relationships.',
    category: 'Rights'
  },

  // Peace & Cooperation
  {
    word: 'PEACE',
    fact: 'Global homicide rates have decreased by 20% since 2000 in most regions.',
    category: 'Peace'
  },
  {
    word: 'UNITY',
    fact: 'International aid has helped 1.3 billion people gain access to electricity since 2010.',
    category: 'Peace'
  },
  {
    word: 'BONDS',
    fact: 'Cross-border cooperation stopped 2 billion metric tons of CO2 through the Montreal Protocol.',
    category: 'Peace'
  },

  // Technology & Access
  {
    word: 'LEARN',
    fact: 'Global literacy rates reached 87%, with 4 billion more literate people than in 1950.',
    category: 'Tech'
  },
  {
    word: 'SHARE',
    fact: 'Open-source software powers 90% of cloud infrastructure, democratizing technology.',
    category: 'Tech'
  },
  {
    word: 'LINKS',
    fact: '5.3 billion people now have internet access, connecting half the developing world.',
    category: 'Tech'
  },

  // Food & Water
  {
    word: 'WATER',
    fact: '2.3 billion people gained access to safe drinking water between 2000-2020.',
    category: 'Health'
  },
  {
    word: 'GRAIN',
    fact: 'Global hunger has decreased from 15% (2000) to 9% despite population growth.',
    category: 'Health'
  },
  {
    word: 'FRESH',
    fact: 'Ocean conservation areas have tripled since 2010, protecting marine ecosystems.',
    category: 'Nature'
  },

  // Nature & Conservation
  {
    word: 'TREES',
    fact: 'India planted 220 million trees in a single day, the largest reforestation effort ever.',
    category: 'Nature'
  },
  {
    word: 'OZONE',
    fact: 'The ozone hole is healing and expected to fully recover by 2070.',
    category: 'Nature'
  },
  {
    word: 'WHALE',
    fact: 'Humpback whale populations recovered from 450 to over 25,000 after hunting bans.',
    category: 'Nature'
  },

  // Progress & Innovation
  {
    word: 'HOPES',
    fact: 'Life expectancy increased globally by 7 years since 2000, from 67 to 74 years.',
    category: 'Health'
  },
  {
    word: 'BUILDS',
    fact: 'Renewable energy now employs 13.7 million people globally, creating green jobs.',
    category: 'Energy'
  },
  {
    word: 'GROWS',
    fact: 'Access to electricity reached 90% of the global population, up from 73% in 2000.',
    category: 'Energy'
  },
  {
    word: 'RISES',
    fact: 'Female labor force participation increased to 47%, empowering economic independence.',
    category: 'Rights'
  },
  {
    word: 'HELPS',
    fact: 'Global volunteer hours contribute over $400 billion in value annually to communities.',
    category: 'Peace'
  },

  // Longer words (6-8 letters)
  {
    word: 'VACCINE',
    fact: 'Smallpox was eradicated globally in 1980 through vaccination - the first human disease ever eliminated.',
    category: 'Health'
  },
  {
    word: 'LITERACY',
    fact: 'Global literacy jumped from 12% (1820) to 87% today - more people can read than ever in history.',
    category: 'Tech'
  },
  {
    word: 'KINDNESS',
    fact: 'Studies show acts of kindness increase both giver and receiver happiness, creating ripple effects.',
    category: 'Peace'
  },
  {
    word: 'PROGRESS',
    fact: 'In 1950, 72% lived in extreme poverty. Today, under 10% do - the fastest poverty reduction in history.',
    category: 'Rights'
  },
  {
    word: 'COMPASSION',
    fact: 'Charitable giving reached $557 billion in 2023, with 64% of Americans donating to causes.',
    category: 'Peace'
  },
  {
    word: 'RENEWABLE',
    fact: 'Renewable energy now cheaper than fossil fuels in most places, accelerating the green transition.',
    category: 'Energy'
  },
  {
    word: 'EDUCATION',
    fact: 'Girls\' enrollment in primary school increased from 68% (1970) to 94% today globally.',
    category: 'Rights'
  },
  {
    word: 'INNOVATION',
    fact: 'Patent applications reached 3.4 million in 2021, showing humanity\'s accelerating creativity.',
    category: 'Tech'
  },

  // Even longer words (10-15 letters)
  {
    word: 'EMPOWERMENT',
    fact: 'Women now hold leadership roles in 152 countries, up from just 12 countries in 1960.',
    category: 'Rights'
  },
  {
    word: 'BREAKTHROUGH',
    fact: 'CRISPR gene editing could cure genetic diseases affecting millions worldwide.',
    category: 'Health'
  },
  {
    word: 'CONSERVATION',
    fact: 'Protected areas now cover 17% of land and 8% of oceans, up from 3% in 1970.',
    category: 'Nature'
  },
  {
    word: 'SUSTAINABILITY',
    fact: 'Electric vehicle sales grew 55% in 2023, marking fastest adoption of clean transport ever.',
    category: 'Energy'
  },
  {
    word: 'COLLABORATION',
    fact: 'The Human Genome Project united scientists from 6 countries to map all human genes.',
    category: 'Tech'
  },
  {
    word: 'REFORESTATION',
    fact: 'China planted 66 billion trees since 1978, creating forests the size of Ireland.',
    category: 'Nature'
  }
]

/**
 * Get the word of the day based on current date.
 * Changes daily at midnight UTC.
 */
export function getWordOfDay(): WordData {
  const startDate = new Date('2025-01-01') // Epoch start
  const now = new Date()

  // Calculate days since epoch
  const diffTime = Math.abs(now.getTime() - startDate.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  // Cycle through word list
  const index = diffDays % wordList.length
  return wordList[index]
}

/**
 * Check if a guess is a valid English word.
 * In a production app, this would check against a dictionary API.
 * For now, we'll be permissive and only check length matches target.
 */
export function isValidWord(guess: string, targetLength: number): boolean {
  // Must match target length
  if (guess.length !== targetLength) return false

  // Must be all letters
  return /^[A-Z]+$/.test(guess)
}
