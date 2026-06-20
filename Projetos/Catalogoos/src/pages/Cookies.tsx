import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Cookies() {
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
          <h1>Aviso de Cookies</h1>
          <p>
            Utilizamos cookies e tecnologias semelhantes para garantir o
            funcionamento das páginas, mensurar audiência e personalizar a
            comunicação.
          </p>
          <h2>Cookies essenciais</h2>
          <p>
            Necessários para o funcionamento do site. Sem eles, o formulário e
            navegação básica podem não funcionar corretamente.
          </p>
          <h2>Cookies de medição e marketing</h2>
          <p>
            Utilizamos pixels do Meta (Facebook/Instagram) e Google Tag Manager
            para entender de onde vêm os visitantes e otimizar nossas
            campanhas. Esses cookies podem ser desativados nas configurações do
            seu navegador.
          </p>
          <h2>Cookies de terceiros</h2>
          <p>
            Algumas integrações (Telegram, plataformas de mídia) podem definir
            cookies próprios sob suas respectivas políticas.
          </p>
          <h2>Como gerenciar</h2>
          <p>
            Você pode bloquear ou apagar cookies a qualquer momento pelas
            preferências do seu navegador. Ao continuar navegando, você
            concorda com esta política.
          </p>
        </article>
      </div>
    </main>
  );
}
