/**
 * Inject real pricing data from simulação scrape into guide JSON content.
 * Generates an HTML table with the best plan per operadora and inserts it
 * into the planos-saude-pme guide's "operadoras" section.
 *
 * Run: node scripts/inject-pricing.js
 */
const fs = require('fs')
const path = require('path')

const PLANS_FILE = path.join(__dirname, '..', 'reports', 'market-intelligence', 'simulacao-data', 'all-plans-2026-03-31.json')
const GUIDE_FILE = path.join(__dirname, '..', 'src', 'data', 'guide-content', 'planos-saude-pme.json')

const plans = JSON.parse(fs.readFileSync(PLANS_FILE, 'utf-8'))

// Pick cheapest plan per operadora (by valor_19_23)
const bestByOp = {}
for (const p of plans) {
  const key = p.operadora
  if (!bestByOp[key] || p.valor_19_23 < bestByOp[key].valor_19_23) {
    bestByOp[key] = p
  }
}

const sorted = Object.values(bestByOp).sort((a, b) => a.valor_19_23 - b.valor_19_23)

// Format currency
const fmt = v => `R$\u00a0${v.toFixed(2).replace('.', ',')}`

// Build HTML table
const rows = sorted.map((p, i) => {
  const rank = i < 3 ? `<span class="badge badge--${i === 0 ? 'green' : 'blue'}">${i + 1}º</span> ` : `${i + 1}º `
  const copart = p.coparticipacao ? `${p.coparticipacao_tipo}` : 'Sem'
  const acom = p.acomodacao || '—'
  const obs = p.obstetricia ? 'Sim' : 'Não'
  return `              <tr>
                <td>${rank}${p.operadora}</td>
                <td>${p.plano_nome}</td>
                <td>${acom}</td>
                <td>${copart}</td>
                <td>${obs}</td>
                <td><strong>${fmt(p.valor_19_23)}</strong></td>
                <td>${fmt(p.valores_por_faixa['59-+'])}</td>
              </tr>`
}).join('\n')

const tableHtml = `
        <div class="tip-card tip-card--accent">
          <span class="tip-label">📊 Tabela de preços atualizada — Santo André/SP</span>
          <p>Valores reais para <strong>Saúde PF</strong>, simulação de <strong>31/mar/2026</strong>. Menor preço por operadora, faixa 19-23 anos. Use como referência de mercado — confirme valores vigentes antes da proposta.</p>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Operadora</th>
                <th>Plano</th>
                <th>Acomodação</th>
                <th>Coparticipação</th>
                <th>Obstetrícia</th>
                <th>19-23 anos</th>
                <th>59+ anos</th>
              </tr>
            </thead>
            <tbody>
${rows}
            </tbody>
          </table>
        </div>

        <div class="tip-card">
          <span class="tip-label">⚠️ Aviso obrigatório</span>
          <p>Valores sujeitos a alteração sem aviso prévio. Fonte: simulador Moderno/AgenciaLink (31/mar/2026). Confirme preço vigente com a operadora ou no simulador antes de montar proposta. Essa tabela é <strong>referência interna</strong>, não material de venda para o cliente.</p>
        </div>`

// Inject into guide JSON
const guide = JSON.parse(fs.readFileSync(GUIDE_FILE, 'utf-8'))
const content = guide.guideContent

// Find the operadoras section and inject after the section heading
const marker = 'id="operadoras"'
const markerIdx = content.indexOf(marker)

if (markerIdx === -1) {
  console.error('Could not find operadoras section in PME guide!')
  process.exit(1)
}

// Find the closing </h2> after the section marker — inject after the first <p> block
const h2Close = content.indexOf('</h2>', markerIdx)
const firstParagraph = content.indexOf('</p>', h2Close)
const insertIdx = firstParagraph + '</p>'.length

const newContent = content.slice(0, insertIdx) + '\n\n' + tableHtml + '\n' + content.slice(insertIdx)
guide.guideContent = newContent

fs.writeFileSync(GUIDE_FILE, JSON.stringify(guide, null, 2), 'utf-8')
console.log(`Injected pricing table with ${sorted.length} operadoras into PME guide.`)
console.log(`Cheapest: ${sorted[0].operadora} at ${fmt(sorted[0].valor_19_23)}`)
console.log(`Most expensive: ${sorted[sorted.length - 1].operadora} at ${fmt(sorted[sorted.length - 1].valor_19_23)}`)
