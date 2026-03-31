import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getGuideData, getAllGuideSlugs } from '@/data/guide-loader'
import { guides } from '@/data/guides'
import SidebarObserver from '@/components/SidebarObserver'
import GuideEffects from '@/components/GuideEffects'
import '@/app/guide-content.css'
import styles from './guide.module.css'

function normalizeGuideTitle(title) {
  return title.replace(/\s*[|·]\s*Revier Academy$/i, '').trim()
}

function getGuideMeta(slug, data) {
  const guide = guides.find((item) => item.slug === slug)
  return {
    title: guide?.title || normalizeGuideTitle(data.title),
    description: guide?.desc || data.description || `Guia interno Revier sobre ${normalizeGuideTitle(data.title)}.`,
  }
}

export async function generateStaticParams() {
  return getAllGuideSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const data = getGuideData(slug)
  if (!data) return {}
  const meta = getGuideMeta(slug, data)
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/guias/${slug}`,
    },
    openGraph: {
      type: 'article',
      url: `/guias/${slug}`,
      title: meta.title,
      description: meta.description,
      locale: 'pt_BR',
      siteName: 'Revier Academy',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
  }
}

export default async function GuidePage({ params }) {
  const { slug } = await params
  const data = getGuideData(slug)
  if (!data) notFound()
  const meta = getGuideMeta(slug, data)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.description,
    inLanguage: 'pt-BR',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Revier Academy',
      url: 'https://revier-academy.vercel.app',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Revier Corretora de Seguros Ltda.',
      url: 'https://revier-academy.vercel.app',
    },
    mainEntityOfPage: `https://revier-academy.vercel.app/guias/${slug}`,
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Portal',
        item: 'https://revier-academy.vercel.app/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: meta.title,
        item: `https://revier-academy.vercel.app/guias/${slug}`,
      },
    ],
  }

  return (
    <div className={styles.guidePage}>
      <nav className={styles.guideNav} aria-label="Navegacao do guia">
        <span className={styles.guideNavLogo}>REVIER BROKERS</span>
        <Link href="/" className={styles.guideNavBack}>← Portal</Link>
      </nav>

      <aside className={styles.guideSidebar} aria-label="Indice do guia">
        <span className={styles.sidebarLabel}>Neste guia</span>
        <ul className={styles.sidebarNav}>
          {data.sidebarItems.map(item => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={styles.sidebarLink}>
                <span className={styles.sidebarNum}>{item.num}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <main id="main-content" className={styles.guideMain}>
        <div className={styles.guideHero}>
          <p className={styles.guideHeroLabel}>Guia Interno · Material Exclusivo · Equipe Revier</p>
          <h1
            className={styles.guideHeroTitle}
            dangerouslySetInnerHTML={{ __html: data.heroTitle }}
          />
          <p className={styles.guideHeroSub}>{data.heroSub}</p>
          <div className={styles.guideHeroActions}>
            <a href={`#${data.sidebarItems[0]?.id || 'fundamentos'}`} className="btn btn--primary">
              Abrir o guia →
            </a>
            <a href="#checklist" className="btn btn--outline">Ver checklist</a>
          </div>
        </div>

        {data.quickSummary.length > 0 && (
          <details className={styles.quickSummary}>
            <summary>
              Resumo Rápido — 30 segundos
              <span className={styles.summaryToggle}>+</span>
            </summary>
            <ul className={styles.summaryList}>
              {data.quickSummary.map((item, i) => (
                <li key={i} className={styles.summaryItem}>{item}</li>
              ))}
            </ul>
          </details>
        )}

        <div
          className="guide-content"
          dangerouslySetInnerHTML={{ __html: data.guideContent }}
        />

        <footer className={styles.guideFooter}>
          <div>
            <div className={styles.guideFooterLogo}>REVIER BROKERS</div>
          </div>
          <div>
            <div className={styles.guideFooterInfo}>
              Revier Corretora de Seguros Ltda.<br />
              CNPJ 42.621.875/0001-50<br />
              contato@reviercorretora.com.br<br />
              Santo André, SP
            </div>
            <div className={styles.guideFooterInfo}>
              Validação obrigatória antes da proposta: confirme regras vigentes em fontes oficiais (ANS, SUSEP e/ou Banco Central), condições por operadora/administradora e data de atualização comercial.
            </div>
            <div className={styles.guideFooterCopy}>
              © 2026 Revier Brokers. Material de uso exclusivo para equipe interna.
            </div>
          </div>
        </footer>

        <SidebarObserver />
        <GuideEffects />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </main>
    </div>
  )
}
