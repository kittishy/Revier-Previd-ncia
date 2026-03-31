/**
 * Fix relative guide links in JSON content.
 * Convert ../guide-name/index.html to /guias/guide-name
 * Run: node scripts/fix-guide-links.js
 */
const fs = require('fs')
const path = require('path')

const CONTENT_DIR = path.join(__dirname, '..', 'src', 'data', 'guide-content')

// Map of old guide names to new slugs (in case they differ)
const guideMappings = {
  'seguro-vida': 'seguro-vida',
  'odonto': 'odonto',
  'consorcio': 'consorcio',
  'pet': 'pet',
  'seguro-residencial': 'seguro-residencial',
  'seguro-auto': 'seguro-auto',
  'seguro-empresarial': 'seguro-empresarial',
  'seguro-viagem': 'seguro-viagem',
  'revier-previdencia': 'revier-previdencia',
  'planos-saude-pme': 'planos-saude-pme',
}

const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json'))

for (const file of files) {
  const filePath = path.join(CONTENT_DIR, file)
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

  // Replace relative guide links with Next.js routes
  let updated = false
  for (const [oldPath, newSlug] of Object.entries(guideMappings)) {
    const oldHref = `../${oldPath}/index.html`
    const newHref = `/guias/${newSlug}`
    
    if (data.guideContent.includes(oldHref)) {
      data.guideContent = data.guideContent.replace(
        new RegExp(oldHref, 'g'),
        newHref
      )
      updated = true
    }
  }

  if (updated) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
    console.log(`[FIXED] ${file}`)
  }
}

console.log('\nDone! All relative guide links converted to Next.js routes.')
