import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Privacidade() {
  return (
    <main className="min-h-screen bg-white px-6 py-10 text-brand-navy">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/lp/a"
          className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-navy/70 hover:text-brand-navy"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>
        <article className="prose prose-slate max-w-none">
          <h1>Política de Privacidade</h1>
          <p>
            Última atualização: 20 de abril de 2026. Esta política descreve como
            tratamos seus dados pessoais ao utilizar a Alertas Catalogo, em
            conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018).
          </p>
          <h2>Dados que coletamos</h2>
          <p>
            Coletamos nome, sobrenome, e-mail, telefone e data de nascimento
            informados voluntariamente no formulário de cadastro, além de dados
            de navegação (UTMs, identificadores de campanha, IP e user-agent)
            para fins de atribuição e melhoria contínua.
          </p>
          <h2>Finalidade</h2>
          <p>
            Os dados são utilizados para liberar seu acesso ao canal oficial no
            Telegram, enviar ofertas, cupons, alertas e uma seleção especial no
            mês do seu aniversário, além de mensurar a performance das
            campanhas.
          </p>
          <h2>Compartilhamento</h2>
          <p>
            Compartilhamos dados com operadores estritamente necessários
            (provedores de hospedagem, CRM e plataformas de anúncios) sob
            obrigações contratuais de sigilo e segurança.
          </p>
          <h2>Retenção</h2>
          <p>
            Mantemos seus dados enquanto durar o relacionamento ou pelo prazo
            exigido por lei. Você pode solicitar exclusão a qualquer momento.
          </p>
          <h2>Seus direitos</h2>
          <p>
            Você pode acessar, corrigir, portar, anonimizar ou excluir seus
            dados, além de revogar o consentimento, mediante solicitação ao
            nosso encarregado.
          </p>
          <h2>Contato</h2>
          <p>
            Para exercer seus direitos ou esclarecer dúvidas, entre em contato
            pelo e-mail informado no canal oficial.
          </p>
        </article>
      </div>
    </main>
  );
}
