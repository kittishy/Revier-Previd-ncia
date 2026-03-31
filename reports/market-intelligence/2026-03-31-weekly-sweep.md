# Weekly Market Intelligence Sweep

Date: 2026-03-31
Generated: 2026-03-31T14-15-34

## Source Checks

- https://www.gov.br/ans/pt-br/assuntos/noticias
  - status: 200
  - title: Notícias — Agência Nacional de Saúde Suplementar
  - checked: 2026-03-31T14:15:35
- https://www.gov.br/susep/pt-br/assuntos/noticias
  - status: 200
  - title: Notícias
  - checked: 2026-03-31T14:15:35
- https://cnseg.org.br/
  - status: 200
  - title: N/A
  - checked: 2026-03-31T14:15:36
- https://www.fenasaude.org.br/
  - status: ERROR
  - title: N/A
  - checked: 2026-03-31T14:15:36
  - error: The underlying connection was closed: Could not establish trust relationship for the SSL/TLS secure channel.
- https://www.amil.com.br/
  - status: 200
  - title: HomePage | Amil
  - last-modified: Tue, 31 Mar 2026 11:09:57 GMT
  - checked: 2026-03-31T14:15:37
- https://www.portoseguro.com.br/
  - status: 200
  - title: Cartão de Crédito, Seguro Auto, Seguro de Vida | Porto Seguro
  - checked: 2026-03-31T14:15:37
- https://www.hapvida.com.br/
  - status: 200
  - title: Planos de Saúde e Odontológico
  - checked: 2026-03-31T14:15:38

## Firecrawl Mode

- enabled: no
- note: install/authenticate Firecrawl CLI to unlock deep-crawl evidence mode.

## Action Checklist

1. Review regulator pages first (ANS, SUSEP).
2. Validate operator page updates (Amil, Porto, Hapvida).
3. Mark any volatile claim in guides with source URL + date.
4. Open content update PR only after evidence is attached.
