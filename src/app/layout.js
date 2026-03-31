import './globals.css'

const siteUrl = 'https://revier-academy.vercel.app'

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'Revier Academy',
  title: {
    default: 'Revier Academy | Treino que vira fechamento',
    template: '%s | Revier Academy',
  },
  description: 'Portal interno de treinamento comercial da Revier Brokers.',
  keywords: [
    'revier academy',
    'revier brokers',
    'treinamento comercial',
    'seguros',
    'planos de saude',
    'previdencia privada',
    'guia interno de vendas',
  ],
  authors: [{ name: 'Revier Brokers' }],
  creator: 'Revier Brokers',
  publisher: 'Revier Brokers',
  category: 'business',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Revier Academy | Treino que vira fechamento',
    description: 'Portal interno de treinamento comercial da Revier Brokers.',
    siteName: 'Revier Academy',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Revier Academy | Treino que vira fechamento',
    description: 'Portal interno de treinamento comercial da Revier Brokers.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip-link" href="#main-content">Pular para o conteudo principal</a>
        {children}
      </body>
    </html>
  )
}
