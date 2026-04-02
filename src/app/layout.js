import './globals.css'

const siteUrl = 'https://revier-academy.vercel.app'

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'Universidade Revier',
  title: {
    default: 'Universidade Revier | Formacao interna de corretores',
    template: '%s | Universidade Revier',
  },
  description: 'Universidade interna da Revier para formar corretores, melhorar conversao e aprofundar dominio dos produtos vendidos.',
  keywords: [
    'universidade revier',
    'revier brokers',
    'universidade do corretor',
    'formacao de corretores',
    'conversao de leads em clientes',
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
    title: 'Universidade Revier | Formacao interna de corretores',
    description: 'Universidade interna da Revier para formar corretores, melhorar conversao e aprofundar dominio dos produtos vendidos.',
    siteName: 'Universidade Revier',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Universidade Revier | Formacao interna de corretores',
    description: 'Universidade interna da Revier para formar corretores, melhorar conversao e aprofundar dominio dos produtos vendidos.',
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
