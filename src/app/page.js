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
  name: 'Revier Academy',
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
            <span className="label">Portal de Treinamento Interno</span>
            <h1 id="hero-title" className={styles.heroTitle}>
              REVIER ACADEMY<br />
              <em>Treino que vira fechamento</em>
            </h1>
            <p className={styles.heroDesc}>
              Aqui ninguém estuda por estudar. Cada guia foi construído com o que realmente trava e destrava venda no campo — objeção real, argumento que funciona e passo a passo que fecha.
            </p>
            <span className={styles.heroStat}>
              <span style={{ color: 'var(--accent)' }}>●</span> 10 guias completos · Saúde, Vida, Auto, Pet e mais
            </span>
            <div className={styles.heroActions}>
              <Link className="btn btn--primary" href="#trilhas">Abrir Trilhas</Link>
              <Link className="btn btn--outline" href="#como-usar">Como usar</Link>
            </div>
          </div>
        </section>

        <div className="container">
          <hr className="divider" />
        </div>

        <section id="trilhas" className="section" aria-labelledby="trilhas-title">
          <div className="container">
            <span className="label">Trilhas de Venda</span>
            <h2 id="trilhas-title" className={styles.sectionHeading}>
              Escolha a trilha<br /><span className={styles.accentSlash}>/</span> e vai pra venda
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
                    Acessar Guia →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="como-usar" className="section section--dark" aria-labelledby="como-usar-title">
          <div className="container">
            <span className="label label--light">Ritmo de Uso</span>
            <h2 id="como-usar-title" className={styles.sectionHeadingDark}>Estuda, testa, fecha</h2>

            <div className={styles.ritmoGrid}>
              <article className={styles.ritmoStep}>
                <span className={styles.ritmoNum}>01</span>
                <h3 className={styles.ritmoTitle}>Identifica o que trava</h3>
                <p className={styles.ritmoDesc}>Vai direto no guia do produto onde você mais perde fechamento. Não lê tudo — lê o que destrava.</p>
              </article>

              <article className={styles.ritmoStep}>
                <span className={styles.ritmoNum}>02</span>
                <h3 className={styles.ritmoTitle}>Pega o argumento pronto</h3>
                <p className={styles.ritmoDesc}>Cada guia tem objeção real com resposta testada, roteiro de conversa e comparativo que funciona no campo.</p>
              </article>

              <article className={styles.ritmoStep}>
                <span className={styles.ritmoNum}>03</span>
                <h3 className={styles.ritmoTitle}>Aplica e fecha</h3>
                <p className={styles.ritmoDesc}>Leva para a reunião do dia. Quem treina antes de cada atendimento vende mais — simples assim.</p>
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
