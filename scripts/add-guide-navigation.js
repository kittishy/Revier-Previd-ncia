/**
 * Add "PRÓXIMO PASSO" navigation section to all guide HTML files.
 * Run after modifying guide structures.
 */
const fs = require('fs')
const path = require('path')

// Guide sequence from guides.js
const guidesOrder = [
  'revier-previdencia',
  'planos-saude-pme',
  'seguro-vida',
  'odonto',
  'seguro-auto',
  'consorcio',
  'seguro-residencial',
  'pet',
  'seguro-viagem',
  'seguro-empresarial',
]

// Guide titles for display
const guideTitles = {
  'revier-previdencia': 'Previdência Privada',
  'planos-saude-pme': 'Planos de Saúde PME',
  'seguro-vida': 'Seguro de Vida',
  'odonto': 'Odonto',
  'seguro-auto': 'Seguro Auto',
  'consorcio': 'Consórcio',
  'seguro-residencial': 'Seguro Residencial',
  'pet': 'Pet',
  'seguro-viagem': 'Seguro Viagem',
  'seguro-empresarial': 'Seguro Empresarial',
}

// Guide descriptions for cross-sells
const guideCrossSells = {
  'revier-previdencia': 'Vendeu previdência? O cliente que poupa para o futuro também protege o presente. Puxa seguro de vida logo em seguida.',
  'planos-saude-pme': 'Fechou um plano de saúde? Agora é hora de proteger o patrimônio — complementa com seguro residencial ou auto.',
  'seguro-vida': 'Seguro de vida é proteção, mas também herança. Completa oferecendo previdência para planejamento sucessório.',
  'odonto': 'Odonto é complemento perfeito para saúde. Ofereça logo depois de fechar um plano de saúde.',
  'seguro-auto': 'Auto é proteção do viajante. Se o cliente viaja, ofereça seguro viagem na sequência.',
  'consorcio': 'Consórcio imobiliário é planejamento. Completa com previdência ou seguro residencial.',
  'seguro-residencial': 'Residencial protege a casa. Completa com seguro residencial amplo ou patrimonial para quem tem negócio.',
  'pet': 'Pet é familiar. Se tem pet em casa, também precisa de proteção residencial e de vida.',
  'seguro-viagem': 'Viagem é surpresa. Quando o cliente volta, ofereça previdência ou investimento para próximas viagens.',
  'seguro-empresarial': 'Empresarial é complexo. Quando fecha, referencia aos demais guias para proteção pessoal do sócio.',
}

const GUIDES_DIR = path.join(__dirname, '..', 'guias')

for (let i = 0; i < guidesOrder.length; i++) {
  const currentSlug = guidesOrder[i]
  const nextSlug = guidesOrder[(i + 1) % guidesOrder.length] // Loop to first if last
  const nextTitle = guideTitles[nextSlug]
  const nextCrossSell = guideCrossSells[currentSlug]

  const htmlPath = path.join(GUIDES_DIR, currentSlug, 'index.html')
  if (!fs.existsSync(htmlPath)) {
    console.log(`[SKIP] ${currentSlug} — file not found`)
    continue
  }

  let html = fs.readFileSync(htmlPath, 'utf-8')

  // Find the last </section> before </main>
  const mainEndIndex = html.indexOf('</main>')
  if (mainEndIndex === -1) {
    console.log(`[FAIL] ${currentSlug} — </main> not found`)
    continue
  }

  const beforeMain = html.substring(0, mainEndIndex)
  const lastSectionEnd = beforeMain.lastIndexOf('</section>')

  if (lastSectionEnd === -1) {
    console.log(`[FAIL] ${currentSlug} — no section found`)
    continue
  }

  // Check if navigation already exists
  if (html.includes('class="section-next-guide"')) {
    console.log(`[SKIP] ${currentSlug} — navigation already present`)
    continue
  }

  const insertPos = lastSectionEnd + '</section>'.length

  const nextGuideSection = `

      <!-- ══════════ PRÓXIMO PASSO ══════════ -->
      <section class="section-next-guide">
        <div class="section-meta">
          <span class="section-label">Próximo passo</span>
        </div>
        <p>${nextCrossSell}</p>
        <a href="../${nextSlug}/index.html" class="btn btn--primary">Ver guia ${nextTitle} →</a>
      </section>`

  html = html.slice(0, insertPos) + nextGuideSection + html.slice(insertPos)

  fs.writeFileSync(htmlPath, html, 'utf-8')
  console.log(`[OK] ${currentSlug} → ${nextSlug}`)
}

console.log('\nDone! Run: node scripts/extract-guides.js')
