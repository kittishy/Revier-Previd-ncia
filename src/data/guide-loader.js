import fs from 'fs'
import path from 'path'

const CONTENT_DIR = path.join(process.cwd(), 'src', 'data', 'guide-content')

export function getGuideData(slug) {
  const filePath = path.join(CONTENT_DIR, `${slug}.json`)
  if (!fs.existsSync(filePath)) return null
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

export function getAllGuideSlugs() {
  return fs.readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''))
}
