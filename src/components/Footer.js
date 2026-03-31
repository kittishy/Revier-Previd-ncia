import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <span className={styles.logo}>REVIER BROKERS</span>
        <p>Revier Corretora de Seguros Ltda. | CNPJ 42.621.875/0001-50</p>
        <p>
          <a href="mailto:contato@reviercorretora.com.br">contato@reviercorretora.com.br</a> ·{' '}
          <a href="tel:+551155559350">(11) 5555-9350</a> ·{' '}
          Santo André, SP
        </p>
        <p>Validação obrigatória antes da proposta: confirme regras vigentes em fontes oficiais (ANS, SUSEP e/ou Banco Central), condições por operadora/administradora e data de atualização comercial.</p>
        <span className={styles.copy}>© 2026 Revier Brokers. Material de uso exclusivo para equipe interna.</span>
      </div>
    </footer>
  )
}
