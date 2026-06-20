import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Termos() {
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
          <h1>Termos de Uso</h1>
          <p>
            Ao se cadastrar e acessar o canal Alertas Catalogo, você concorda
            com estes Termos de Uso. Leia com atenção antes de prosseguir.
          </p>
          <h2>Objeto</h2>
          <p>
            O serviço consiste no envio de alertas, cupons e ofertas verificadas
            por meio de canal oficial no Telegram, sem qualquer custo para o
            usuário.
          </p>
          <h2>Cadastro</h2>
          <p>
            Você se compromete a fornecer informações verdadeiras, atualizadas e
            completas. O uso indevido pode acarretar a suspensão do acesso.
          </p>
          <h2>Conteúdo</h2>
          <p>
            Os links e ofertas divulgados podem conter parcerias comerciais. As
            condições de cada oferta são de responsabilidade exclusiva do
            anunciante.
          </p>
          <h2>Limitação de responsabilidade</h2>
          <p>
            Não nos responsabilizamos por indisponibilidades de terceiros,
            alteração de preços fora do nosso controle ou divergências de
            estoque por parte das lojas parceiras.
          </p>
          <h2>Alterações</h2>
          <p>
            Podemos atualizar estes termos periodicamente. A versão vigente
            estará sempre disponível nesta página.
          </p>
          <h2>Foro</h2>
          <p>
            Fica eleito o foro do domicílio do usuário para dirimir eventuais
            controvérsias.
          </p>
        </article>
      </div>
    </main>
  );
}
