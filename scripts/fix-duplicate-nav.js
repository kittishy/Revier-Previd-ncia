/**
 * Remove duplicate "Próximo Passo" sections from guide JSON files.
 * Keeps the original tip-card version, removes script-added section-next-guide
 * when both exist in the same guide.
 *
 * Run: node scripts/fix-duplicate-nav.js
 */
const fs = require('fs')
const path = require('path')

const CONTENT_DIR = path.join(__dirname, '..', 'src', 'data', 'guide-content')
const HTML_DIR = path.join(__dirname, '..', 'guias')

let fixed = 0

// Fix JSON files
fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json')).forEach(f => {
  const fp = path.join(CONTENT_DIR, f)
  const data = JSON.parse(fs.readFileSync(fp, 'utf8'))

  // Check if guide has BOTH a tip-card "Próximo passo" AND a section-next-guide
  const hasTipCard = /tip-label[^>]*>Pr\u00f3ximo passo/.test(data.guideContent)
  const hasSectionNext = /section-next-guide/.test(data.guideContent)

  if (hasTipCard && hasSectionNext) {
    // Remove the section-next-guide block (keep original tip-card)
    const before = data.guideContent.length
    data.guideContent = data.guideContent.replace(
      /\s*<!--\s*[\u2550═]*\s*PR[OÓ]XIMO PASSO\s*[\u2550═]*\s*-->\s*<section class="section-next-guide">[\s\S]*?<\/section>/,
      ''
    )
    if (data.guideContent.length < before) {
      fs.writeFileSync(fp, JSON.stringify(data, null, 2), 'utf8')
      console.log(`[FIX] ${f}: removed duplicate section-next-guide (had original tip-card)`)
      fixed++
    }
  } else {
    console.log(`[OK]  ${f}: tip=${hasTipCard} section=${hasSectionNext}`)
  }
})

// Also fix HTML source files
fs.readdirSync(HTML_DIR).filter(d => {
  return fs.statSync(path.join(HTML_DIR, d)).isDirectory()
}).forEach(d => {
  const htmlPath = path.join(HTML_DIR, d, 'index.html')
  if (!fs.existsSync(htmlPath)) return

  const html = fs.readFileSync(htmlPath, 'utf8')
  const hasTipCard = /tip-label[^>]*>Pr\u00f3ximo passo/.test(html)
  const hasSectionNext = /section-next-guide/.test(html)

  if (hasTipCard && hasSectionNext) {
    const newHtml = html.replace(
      /\s*<!--\s*[═]*\s*PR[OÓ]XIMO PASSO\s*[═]*\s*-->\s*<section class="section-next-guide">[\s\S]*?<\/section>/,
      ''
    )
    if (newHtml.length < html.length) {
      fs.writeFileSync(htmlPath, newHtml, 'utf8')
      console.log(`[FIX] ${d}/index.html: removed duplicate section-next-guide`)
    }
  }
})

console.log(`\nDone! Fixed ${fixed} JSON file(s).`)
