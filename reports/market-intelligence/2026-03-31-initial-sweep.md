# Market Intelligence Update

Date: 2026-03-31
Scope: Initial baseline sweep for Revier insurance and health-plan domain.
Method: Direct HTTP checks to official/regulatory portals (fallback mode).

## Summary

- Official regulator pages (ANS and SUSEP news hubs) are reachable and current.
- Major operator portals (Amil, Porto, Hapvida) are reachable.
- One secondary sector source (FenaSaude) failed TLS validation in this environment.
- No deep-crawl evidence yet because Firecrawl CLI is not installed in this machine.

## Evidence Collected

### Regulator and Official Sources

- https://www.gov.br/ans/pt-br/assuntos/noticias
  - status: 200
  - page title: Noticias - Agencia Nacional de Saude Suplementar
  - checked: 2026-03-31T14:14:10
- https://www.gov.br/susep/pt-br/assuntos/noticias
  - status: 200
  - page title: Noticias
  - checked: 2026-03-31T14:14:11

### Sector and Market Sources

- https://cnseg.org.br/
  - status: 200
  - checked: 2026-03-31T14:14:11
- https://www.fenasaude.org.br/
  - status: error
  - reason: TLS trust relationship failure in local environment
  - checked: 2026-03-31T14:14:11

### Operator Portals

- https://www.amil.com.br/
  - status: 200
  - page title: HomePage | Amil
  - last-modified header: Tue, 31 Mar 2026 11:09:57 GMT
  - checked: 2026-03-31T14:14:11
- https://www.portoseguro.com.br/
  - status: 200
  - page title: Cartao de Credito, Seguro Auto, Seguro de Vida | Porto Seguro
  - checked: 2026-03-31T14:14:12
- https://www.hapvida.com.br/
  - status: 200
  - page title: Planos de Saude e Odontologico
  - checked: 2026-03-31T14:14:12

## Headline Signals Captured (ANS)

- ANS lanca Central de Perguntas e Respostas em seu portal
- Diretora de Fiscalizacao da ANS organiza livro sobre saude suplementar
- ANS promove oficina sobre o envio de dados para o IDSS 2026
- Novo episodio do podcast ANS em Pauta destaca indicadores de qualidade
- ANS realiza 121a reuniao da Camara de Saude Suplementar

Note: headline extraction from SUSEP list page needs a dedicated parser for current markup.

## Impact on Revier

- Keep ANS and SUSEP links as first-reference citations in market-sensitive pages.
- Prioritize updating copy where ANS operational updates may affect sales script confidence.
- For pricing or underwriting claims, enforce source+date in content blocks.

## Recommended Actions

1. Install and authenticate Firecrawl CLI to unlock deep-crawl mode.
2. Run weekly sweep script and save outputs under reports/market-intelligence.
3. Add source/date badges in all guide sections that contain volatile claims.

## Sources Checked

- https://www.gov.br/ans/pt-br/assuntos/noticias - checked 2026-03-31
- https://www.gov.br/susep/pt-br/assuntos/noticias - checked 2026-03-31
- https://cnseg.org.br/ - checked 2026-03-31
- https://www.fenasaude.org.br/ - checked 2026-03-31 (TLS issue)
- https://www.amil.com.br/ - checked 2026-03-31
- https://www.portoseguro.com.br/ - checked 2026-03-31
- https://www.hapvida.com.br/ - checked 2026-03-31

## Confidence

- medium
- Reason: official pages were validated, but deep-crawl and structured extraction are pending Firecrawl setup.
