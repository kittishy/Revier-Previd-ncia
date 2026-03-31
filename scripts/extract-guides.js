/**
 * Extract guide content from existing HTML files and generate JSON data.
 * Run: node scripts/extract-guides.js
 */
const fs = require('fs')
const path = require('path')

const GUIDES_DIR = path.join(__dirname, '..', 'guias')
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'data', 'guide-content')

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

const slugs = fs.readdirSync(GUIDES_DIR).filter(d =>
  fs.statSync(path.join(GUIDES_DIR, d)).isDirectory()
)

for (const slug of slugs) {
  const htmlPath = path.join(GUIDES_DIR, slug, 'index.html')
  if (!fs.existsSync(htmlPath)) continue

  const html = fs.readFileSync(htmlPath, 'utf-8')

  // Extract title
  const titleMatch = html.match(/<title>([^|<]+)/)
  const title = titleMatch ? titleMatch[1].trim() : slug

  // Extract meta description
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/)
  const description = descMatch ? descMatch[1] : ''

  // Extract hero subtitle (guide-hero-sub)
  const heroSubMatch = html.match(/<p class="guide-hero-sub">([^<]+)<\/p>/)
  const heroSub = heroSubMatch ? heroSubMatch[1].trim() : ''

  // Extract hero title (h1 inside guide-hero)
  const heroH1Match = html.match(/<div class="guide-hero">[\s\S]*?<h1>([\s\S]*?)<\/h1>/)
  const heroTitle = heroH1Match ? heroH1Match[1].replace(/<\/?em>/g, m => m).trim() : title

  // Extract sidebar items
  const sidebarItems = []
  const sidebarRegex = /<a href="#(\w+)"><span class="sidebar-num">(\d+)<\/span>([^<]+)<\/a>/g
  let m
  while ((m = sidebarRegex.exec(html)) !== null) {
    sidebarItems.push({ id: m[1], num: m[2], label: m[3].trim() })
  }

  // Extract quick summary items
  const quickSummary = []
  const summarySection = html.match(/<details class="quick-summary">[\s\S]*?<ul>([\s\S]*?)<\/ul>/)
  if (summarySection) {
    const liRegex = /<li>([\s\S]*?)<\/li>/g
    let li
    while ((li = liRegex.exec(summarySection[1])) !== null) {
      quickSummary.push(li[1].trim())
    }
  }

  // Extract the entire guide-content div (the main content)
  // Use greedy match to capture all nested divs, stopping at the closing </div> before footer
  const contentStart = html.indexOf('<div class="guide-content">')
  const footerStart = html.indexOf('<footer class="guide-footer">')
  let guideContent = ''
  if (contentStart !== -1 && footerStart !== -1) {
    const innerStart = contentStart + '<div class="guide-content">'.length
    // Find the last </div> before the footer
    const beforeFooter = html.substring(innerStart, footerStart)
    const lastDivClose = beforeFooter.lastIndexOf('</div>')
    if (lastDivClose !== -1) {
      guideContent = beforeFooter.substring(0, lastDivClose).trim()
    }
  }

  const data = {
    slug,
    title,
    description,
    heroTitle,
    heroSub,
    sidebarItems,
    quickSummary,
    guideContent,
  }

  fs.writeFileSync(
    path.join(OUTPUT_DIR, `${slug}.json`),
    JSON.stringify(data, null, 2),
    'utf-8'
  )

  console.log(`✅ ${slug} → ${sidebarItems.length} sections`)
}

console.log(`\nDone! ${slugs.length} guides extracted.`)
