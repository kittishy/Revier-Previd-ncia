import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { guides } from '@/data/guides'
import styles from './page.module.css'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Revier Corretora de Seguros Ltda.',
  legalName: 'Revier Corretora de Seguros Ltda.',
  url: 'https://revier-academy.vercel.app',
  email: 'contato@reviercorretora.com.br',
  telephone: '+55-11-5555-9350',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Santo Andre',
    addressRegion: 'SP',
    addressCountry: 'BR',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Universidade Revier',
  url: 'https://revier-academy.vercel.app',
  inLanguage: 'pt-BR',
}

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="main-content">
        <section id="hero" className={styles.heroSection} aria-labelledby="hero-title">
          <div className="container">
            <span className="label">Universidade Interna de Corretores</span>
            <h1 id="hero-title" className={styles.heroTitle}>
              UNIVERSIDADE REVIER<br />
              <em>Formacao que transforma lead em cliente</em>
            </h1>
            <p className={styles.heroDesc}>
              A plataforma interna da Revier para formar corretores em duas frentes: dominar os produtos vendidos e aplicar metodo comercial que aumenta conversao com consistencia.
            </p>
            <span className={styles.heroStat}>
              <span style={{ color: 'var(--accent)' }}>●</span> 10 guias práticos · Produtos, argumentação e fechamento
            </span>
            <div className={styles.heroActions}>
              <Link className="btn btn--primary" href="#trilhas">Entrar nas trilhas</Link>
              <Link className="btn btn--outline" href="#como-usar">Como funciona a formacao</Link>
            </div>
          </div>
        </section>

        <div className="container">
          <hr className="divider" />
        </div>

        <section id="trilhas" className="section" aria-labelledby="trilhas-title">
          <div className="container">
            <span className="label">Trilhas de Formacao</span>
            <h2 id="trilhas-title" className={styles.sectionHeading}>
              Forme-se por produto<br /><span className={styles.accentSlash}>/</span> e por etapa da venda
            </h2>

            <div className={styles.trilhasGrid}>
              {guides.map((guide) => (
                <article key={guide.slug} className={styles.trilhaCard} data-category={guide.category}>
                  <div className={styles.cardBadges}>
                    {guide.badges.map((b, i) => (
                      <span key={i} className={`badge ${i === 0 ? 'badge--accent' : ''}`}>{b}</span>
                    ))}
                  </div>
                  <h3 className={styles.cardTitle}>{guide.title}</h3>
                  <p className={styles.cardDesc}>{guide.desc}</p>
                  <Link className={styles.cardLink} href={`/guias/${guide.slug}`}>
                    Acessar guia 
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="como-usar" className="section section--dark" aria-labelledby="como-usar-title">
          <div className="container">
            <span className="label label--light">Metodo da Universidade</span>
            <h2 id="como-usar-title" className={styles.sectionHeadingDark}>Aprende, aplica, evolui</h2>

            <div className={styles.ritmoGrid}>
              <article className={styles.ritmoStep}>
                <span className={styles.ritmoNum}>01</span>
                <h3 className={styles.ritmoTitle}>Domine o produto</h3>
                <p className={styles.ritmoDesc}>Comece pelo guia do produto que mais gera duvida no atendimento e absorva o essencial para orientar com seguranca.</p>
              </article>

              <article className={styles.ritmoStep}>
                <span className={styles.ritmoNum}>02</span>
                <h3 className={styles.ritmoTitle}>Treine a conversao</h3>
                <p className={styles.ritmoDesc}>Use os argumentos e roteiros para conduzir a conversa, tratar objecoes e aproximar o lead da decisao.</p>
              </article>

              <article className={styles.ritmoStep}>
                <span className={styles.ritmoNum}>03</span>
                <h3 className={styles.ritmoTitle}>Transforme em fechamento</h3>
                <p className={styles.ritmoDesc}>Aplique no atendimento real, acompanhe resultado e avance de nivel como corretor da Revier.</p>
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
    </>
  )
}

