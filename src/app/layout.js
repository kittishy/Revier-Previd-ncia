import './globals.css'

export const metadata = {
  title: 'Revier Academy | Treino que vira fechamento',
  description: 'Portal interno de treinamento comercial da Revier Brokers.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
