// Gera PDF de leitura da copy da landing do Guia do Pró-Labore (BVB).
// Uso: node build-pdf-landing-pro-labore.mjs
// Saída: BVB_Landing_Pro-Labore_v1.pdf na mesma pasta.

import { writeFileSync, existsSync, unlinkSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const htmlPath = join(__dirname, "_tmp-landing-pro-labore.html");
const pdfPath = join(__dirname, "BVB_Landing_Pro-Labore_v1.pdf");

const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<title>BVB Finanças — Landing do Guia do Pró-Labore (rascunho de copy)</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Spectral:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  :root{
    --verde:#1C3A30;
    --verde-salvia:#335848;
    --cobre:#B5683C;
    --areia:#F2EEE6;
    --grafite:#44423D;
    --linha:#D8D2C4;
  }
  @page { size: A4; margin: 22mm 20mm 22mm 20mm; }
  html,body{ background: var(--areia); color: var(--verde); }
  body{
    font-family: "Inter", -apple-system, "Segoe UI", sans-serif;
    font-size: 11.5pt;
    line-height: 1.55;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .capa{
    page-break-after: always;
    text-align: center;
    padding: 60mm 8mm 0 8mm;
  }
  .capa .marca{
    font-family: "Spectral", Georgia, serif;
    font-weight: 600;
    font-size: 22pt;
    letter-spacing: 0.5px;
    color: var(--verde);
  }
  .capa .marca .financas{
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 11pt;
    letter-spacing: 6px;
    display: block;
    color: var(--verde-salvia);
    margin-top: 4px;
  }
  .capa .selo{
    color: var(--cobre);
    font-size: 10pt;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin: 40mm 0 8mm 0;
  }
  .capa h1{
    font-family: "Spectral", Georgia, serif;
    font-weight: 500;
    font-size: 26pt;
    line-height: 1.2;
    color: var(--verde);
    margin: 0 0 6mm 0;
  }
  .capa .sub{
    font-family: "Inter", sans-serif;
    color: var(--grafite);
    font-size: 11pt;
    max-width: 130mm;
    margin: 0 auto;
    line-height: 1.55;
  }
  .capa .divisor{
    width: 30mm;
    height: 1px;
    background: var(--cobre);
    margin: 10mm auto;
  }
  .capa .rodape{
    position: absolute;
    bottom: 22mm;
    left: 0; right: 0;
    color: var(--grafite);
    font-size: 9.5pt;
    letter-spacing: 1px;
  }
  .nota-editor{
    background: transparent;
    border-left: 2px solid var(--cobre);
    padding: 4mm 6mm;
    margin: 0 0 10mm 0;
    color: var(--grafite);
    font-size: 10pt;
    font-style: italic;
    line-height: 1.55;
  }
  main{ padding: 4mm 6mm; max-width: 165mm; margin: 0 auto; }
  section{
    padding: 6mm 0;
    border-top: 1px solid var(--linha);
  }
  section:first-of-type{ border-top: 0; }
  section .tag{
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 9pt;
    color: var(--cobre);
    margin-bottom: 3mm;
    font-weight: 500;
  }
  h2{
    font-family: "Spectral", Georgia, serif;
    font-weight: 500;
    font-size: 16.5pt;
    line-height: 1.25;
    color: var(--verde);
    margin: 0 0 5mm 0;
  }
  h3{
    font-family: "Spectral", Georgia, serif;
    font-weight: 500;
    font-size: 12.5pt;
    color: var(--verde);
    margin: 5mm 0 2mm 0;
  }
  p{ margin: 0 0 3.5mm 0; color: var(--verde); }
  p.leve{ color: var(--grafite); }
  ul{ margin: 0 0 3.5mm 0; padding-left: 5mm; }
  li{ margin-bottom: 2mm; color: var(--verde); }
  li::marker{ color: var(--cobre); }
  strong{ color: var(--verde); font-weight: 600; }
  em{ color: var(--verde-salvia); font-style: italic; }
  .hero-headline{
    font-family: "Spectral", Georgia, serif;
    font-weight: 500;
    font-size: 20pt;
    line-height: 1.2;
    color: var(--verde);
    margin: 2mm 0 4mm 0;
  }
  .sub-hero{
    color: var(--grafite);
    font-size: 12pt;
    margin-bottom: 5mm;
  }
  .cta{
    display: inline-block;
    padding: 4mm 8mm;
    background: var(--cobre);
    color: var(--areia);
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 11pt;
    letter-spacing: 0.5px;
    text-decoration: none;
    margin-top: 2mm;
  }
  .cta-legenda{
    font-size: 9.5pt;
    color: var(--grafite);
    margin-top: 3mm;
  }
  .duas-colunas{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8mm;
  }
  .col-titulo{
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 10.5pt;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 3mm;
  }
  .col-pra-voce .col-titulo{ color: var(--verde); }
  .col-nao-pra-voce .col-titulo{ color: var(--grafite); }
  .col-nao-pra-voce li{ color: var(--grafite); }
  .col-nao-pra-voce li::marker{ color: var(--grafite); }
  .tese{
    background: transparent;
    border-top: 1px solid var(--cobre);
    border-bottom: 1px solid var(--cobre);
    padding: 6mm 0;
    margin: 3mm 0;
  }
  .oferta{
    text-align: center;
    padding: 6mm 4mm;
    border: 1px solid var(--cobre);
    margin: 3mm 0;
  }
  .preco{
    font-family: "Spectral", Georgia, serif;
    font-weight: 600;
    font-size: 28pt;
    color: var(--verde);
    margin: 4mm 0 2mm 0;
    line-height: 1;
  }
  .preco-legenda{
    color: var(--grafite);
    font-size: 10pt;
    margin-bottom: 5mm;
  }
  .disclaimer{
    background: transparent;
    border-top: 1px dashed var(--linha);
    padding-top: 3mm;
    margin-top: 5mm;
    color: var(--grafite);
    font-size: 9.5pt;
    font-style: italic;
  }
  .faq-item{
    margin-bottom: 5mm;
  }
  .faq-item .pergunta{
    font-family: "Spectral", Georgia, serif;
    font-weight: 500;
    color: var(--verde);
    font-size: 12pt;
    margin-bottom: 2mm;
  }
  .ps{
    border-top: 1px solid var(--cobre);
    padding-top: 4mm;
    margin-top: 6mm;
    font-family: "Spectral", Georgia, serif;
    font-style: italic;
    font-size: 11.5pt;
    color: var(--verde-salvia);
  }
  .ps::before{
    content: "P.S. ";
    font-weight: 600;
    color: var(--cobre);
    font-style: normal;
    font-family: "Inter", sans-serif;
    letter-spacing: 2px;
    font-size: 9pt;
    text-transform: uppercase;
    display: inline-block;
    margin-right: 3mm;
  }
  .rodape-doc{
    margin-top: 12mm;
    padding-top: 4mm;
    border-top: 1px solid var(--linha);
    color: var(--grafite);
    font-size: 9pt;
    letter-spacing: 0.5px;
    text-align: center;
  }
</style>
</head>
<body>

<div class="capa">
  <div class="marca">BVB<span class="financas">FINANÇAS</span></div>
  <div class="selo">Rascunho de copy · v1</div>
  <h1>Landing Page — Guia do Pró-Labore e Distribuição de Lucros</h1>
  <div class="divisor"></div>
  <div class="sub">Copy da página de vendas para o funil direto do ebook. Este documento traz apenas o texto que o leitor final vai ler — as marcações técnicas, testes A/B e anotações de design ficaram no rascunho de trabalho da equipe.</div>
  <div class="rodape">Preparado para leitura dos sócios · 06 de julho de 2026</div>
</div>

<main>

<div class="nota-editor">
Este é o rascunho v1 da copy da landing. Não é o design, não é o site final — é o texto corrido, na ordem em que aparecerá na página, com um único headline escolhido como controle e uma única variação de botão para simplificar a leitura. As decisões de layout, teste A/B e prova social vêm depois.
</div>

<section>
  <div class="tag">Hero · abertura da página</div>
  <div class="hero-headline">Você fatura R$ 30, R$ 50 mil por mês na empresa — e no fim do mês sobra pouco no seu bolso.</div>
  <p class="sub-hero">Este guia mostra, em passo a passo, quanto retirar de pró-labore (salário que o dono paga a si mesmo) e de distribuição de lucros dentro das regras de 2026, sem se sabotar no imposto nem no seu futuro.</p>
  <div class="cta">Quero o guia por R$ 37,90</div>
  <div class="cta-legenda">Ebook em PDF, entrega imediata. Material educativo — não substitui orientação do seu contador.</div>
</section>

<section>
  <div class="tag">A dor · três sintomas que o dono reconhece</div>
  <h2>Você conhece pelo menos um destes três sintomas.</h2>
  <h3>1. A conta da empresa e a conta do dono se confundem.</h3>
  <p>O cartão da empresa paga o supermercado de casa. A conta pessoal cobre o fornecedor no aperto. No fim do mês, ninguém sabe quanto o negócio deu de fato — nem quanto sobrou para você.</p>
  <h3>2. O pró-labore é definido no chute.</h3>
  <p>"Um salário mínimo para pagar menos INSS." Ou "R$ 5 mil, porque parece razoável." Nenhuma das duas contas passou por lápis e papel. E o INSS que você paga hoje pode virar um problema silencioso quando o dia de se aposentar chegar.</p>
  <h3>3. Você tira lucro quando pode — sem saber se pode.</h3>
  <p>Faturou bem no mês, transferiu para a conta pessoal. Distribuiu como lucro? Ou como pró-labore? Tinha lastro contábil? Se cair na malha da Receita — ou se a Receita mudar a régua, como fez em 2026 — a resposta importa.</p>
  <p><em>Nenhum destes três sintomas se resolve com mais faturamento. Se resolve com método.</em></p>
</section>

<section>
  <div class="tag">Filtro · para quem esta página fala</div>
  <div class="duas-colunas">
    <div class="col-pra-voce">
      <div class="col-titulo">Isso é para você se…</div>
      <ul>
        <li>Você é dono de MEI, ME ou EPP e tira dinheiro do negócio hoje — no chute ou por convenção com o contador — e desconfia que isso pode estar errado.</li>
        <li>Você fatura entre R$ 3 mil e R$ 50 mil por mês na PJ e quer entender, em português claro, como as regras de 2026 afetam a sua retirada.</li>
        <li>Você já tem contador, mas nunca conseguiu ter uma conversa técnica com ele sobre pró-labore, distribuição de lucros e INSS — porque não sabia o que perguntar.</li>
        <li>Você prefere um material curto, direto e com números, em vez de um curso de dez horas.</li>
        <li>Você quer parar de misturar caixa da empresa com caixa pessoal e começar a tratar a PJ como veículo do seu patrimônio pessoal.</li>
      </ul>
    </div>
    <div class="col-nao-pra-voce">
      <div class="col-titulo">Não é para você se…</div>
      <ul>
        <li>Você quer promessa de enriquecer rápido, "faixa mágica de imposto" ou "brecha secreta". Este guia é sobre método, não sobre truque.</li>
        <li>Você é sócio de empresa de Lucro Real com estrutura societária complexa (holdings, offshore, múltiplas participações). O guia cobre o caso comum — Simples e Lucro Presumido — não o caso corporativo.</li>
        <li>Você quer que alguém decida por você. O guia ensina a decidir — a decisão continua sua, idealmente com seu contador ao lado.</li>
      </ul>
    </div>
  </div>
</section>

<section class="tese">
  <div class="tag">A tese · o mecanismo BVB</div>
  <h2>A empresa é o meio. Você é o fim.</h2>
  <p>A maioria dos donos passa a vida inteira trabalhando para a empresa. Reinveste no negócio, aperta a retirada, adia a vida pessoal — e chega aos cinquenta com um CNPJ valioso e um patrimônio pessoal magro.</p>
  <p><strong>Na BVB, ensinamos o contrário.</strong></p>
  <p>A empresa é o instrumento. O patrimônio de quem trabalha nela — você — é o resultado. Isso muda tudo: o pró-labore deixa de ser "um número no contrato" e vira a decisão mais estratégica do ano. A distribuição de lucros deixa de ser "o que sobrou" e vira o principal canal de transferência de patrimônio da sua empresa para a sua vida.</p>
  <p>Este guia é a primeira peça desse método. Ele não fala de investimento, de holding, de sucessão. Fala de uma coisa só: <strong>quanto tirar da empresa, como tirar, dentro das regras de 2026 — e por quê.</strong></p>
  <p><em>É por onde começa.</em></p>
</section>

<section>
  <div class="tag">O que tem dentro do ebook</div>
  <h2>Você vai encontrar, em cerca de 40 páginas objetivas:</h2>
  <ul>
    <li>A diferença jurídica, tributária e previdenciária entre <strong>pró-labore</strong> (o salário que o dono paga a si mesmo) e <strong>distribuição de lucros</strong> (o repasse do resultado da empresa) — e por que confundi-las custa caro na hora da Receita.</li>
    <li>As <strong>regras de 2026 depois da Reforma da Renda</strong>: a nova isenção de IRRF (Imposto de Renda Retido na Fonte) até R$ 5.000 de pró-labore, o redutor entre R$ 5.000 e R$ 7.350, e o que aconteceu com quem tira acima disso.</li>
    <li>Como o teto de INSS de R$ 8.475,55 muda a matemática do pró-labore — e por que retirar acima do teto raramente compensa.</li>
    <li>A retenção de 10% que passou a incidir sobre distribuição de lucros acima de R$ 50 mil por mês para um mesmo beneficiário, e o <strong>IRPFM</strong> (Imposto de Renda da Pessoa Física Mínimo) que aparece na declaração anual acima de R$ 600 mil recebidos no ano.</li>
    <li>Por que o <strong>regime tributário da sua empresa</strong> — Simples com Fator R, Lucro Presumido ou Lucro Real — muda tanto o cálculo que a mesma pessoa, com o mesmo faturamento, pode ter pró-labores muito diferentes.</li>
    <li>O <strong>Fator R do Simples Nacional</strong> explicado sem jargão: quando o pró-labore deixa de ser custo tributário e vira aliado do seu enquadramento.</li>
    <li>Os <strong>7 passos</strong> para calcular a retirada ideal do próximo mês — passíveis de replicar todo trimestre.</li>
    <li>Um <strong>caso prático completo</strong>: prestador de serviço no Simples, faturamento de R$ 50 mil por mês, Fator R aplicado. Onde entra pró-labore, onde entra lucro, quanto pesa em imposto, quanto sobra na conta do dono.</li>
    <li>Os <strong>4 riscos silenciosos</strong> de fazer errado: pró-labore zero, distribuição sem lastro contábil, falta de contabilidade regular, confusão de caixa. Cada um com o que acontece na prática se a Receita bater.</li>
  </ul>
  <p><em>Nenhum destes tópicos é opinião. Todos partem da legislação vigente em 2026 e da prática contábil corrente. É material educativo, denso e direto — como material técnico deve ser.</em></p>
</section>

<section>
  <div class="tag">Autoridade · quem escreveu</div>
  <h2>Quem escreveu este guia.</h2>
  <p>O guia é assinado por <strong>Bruno Vilas Boas</strong>, fundador da BVB Finanças.</p>
  <p>O trabalho da BVB é um só: mostrar, com números na tela, que a empresa é o meio para o patrimônio do dono — nunca o contrário. Bruno publica análises com planilhas abertas sobre temas que a maioria dos canais evita por darem trabalho: TIR (Taxa Interna de Retorno) de consórcio, marcação a mercado de títulos públicos, previdência bancária linha a linha, viés do presente descrito com Thaler e economia comportamental.</p>
  <p>O tom é sempre o mesmo: sereno, técnico, com evidência. Não há promessa de retorno, não há indicação de ativo, não há motivação vazia. Há método.</p>
  <p>Este ebook é uma peça pequena desse trabalho — a mais prática de todas. É a que responde a pergunta que quase todo dono de negócio faz cedo ou tarde: <strong>quanto eu tiro do meu próprio negócio, e como faço isso do jeito certo em 2026?</strong></p>
</section>

<section>
  <div class="tag">A oferta</div>
  <div class="oferta">
    <h3 style="margin-top:0">O que você leva.</h3>
    <ul style="text-align:left; display:inline-block; margin: 0 auto 5mm auto;">
      <li><strong>Ebook em PDF, entrega imediata por e-mail depois da confirmação do pagamento.</strong></li>
      <li>Cerca de 40 páginas objetivas, atualizadas com as regras vigentes em 2026 (Reforma da Renda incluída).</li>
      <li>Caso prático completo, planilha mental dos 7 passos e checklist dos 4 riscos.</li>
      <li>Leitura em uma tarde. Aplicação a partir do mês seguinte.</li>
    </ul>
    <p class="leve" style="max-width: 110mm; margin: 4mm auto;">Uma consulta pontual com um contador ou tributarista para tratar do mesmo tema costuma custar entre R$ 400 e R$ 1.500 no Brasil, variando conforme a praça e o profissional. O objetivo do guia é diferente: te preparar para essa conversa — ou para tomar a decisão com clareza se você ainda não tem contador especializado.</p>
    <div class="preco">R$ 37,90</div>
    <div class="preco-legenda">Pagamento único, via cartão ou PIX.</div>
    <div class="cta">Quero o guia por R$ 37,90</div>
  </div>
</section>

<section>
  <div class="tag">Garantia · sete dias</div>
  <h2>Sete dias para decidir sem pressa.</h2>
  <p>Compre, leia com calma, aplique a lógica ao seu caso. Se em até 7 dias você concluir que o material não te ajudou — por qualquer motivo, sem precisar explicar — pedimos o reembolso integral e encerramos a operação de forma cordial. É o padrão do Código de Defesa do Consumidor para produto digital, e é como preferimos fazer negócio.</p>
  <p><em>Não é pressão. É a nossa confiança em você e no material.</em></p>
  <div class="disclaimer">Este é um material educativo e informativo. Ele não substitui — em nenhuma hipótese — a orientação de um contador ou advogado tributarista qualificado para o seu caso concreto.</div>
</section>

<section>
  <div class="tag">Objeções · duas dúvidas honestas</div>
  <h2>Duas dúvidas que a gente já ouviu.</h2>
  <h3>"E se eu comprar mais um ebook que não funcionar comigo?"</h3>
  <p>Faz sentido. Se você já comprou material que era pura motivação, é natural desconfiar. Duas coisas: primeiro, este guia é curto de propósito — quarenta páginas com números, planilha mental e caso prático. Não é um manual de mil páginas nem um curso de dez horas. Segundo, existe a devolução de 7 dias, sem pergunta. Se depois de ler você achar que perdeu tempo, o dinheiro volta. Preferimos assim.</p>
  <h3>"Será que o autor entende mesmo disso, ou é mais um influenciador?"</h3>
  <p>Justo. O jeito mais rápido de conferir é olhar o trabalho antes de comprar: as análises do Bruno estão públicas, com planilhas abertas e cálculo linha a linha. Se você abrir um vídeo qualquer e não reconhecer profundidade técnica, não compre. É verdade que o guia é uma peça pequena desse trabalho — mas é a mais aplicável do que a BVB publica.</p>
</section>

<section>
  <div class="tag">Perguntas</div>
  <h2>Perguntas.</h2>

  <div class="faq-item">
    <div class="pergunta">Eu sou MEI. Isso serve pra mim?</div>
    <p>Serve — com um alerta. O MEI tem uma dinâmica própria (DAS único, INSS embutido, teto anual de faturamento). O guia inclui um trecho específico sobre o momento de sair do MEI e virar ME, que é quando a decisão de pró-labore passa a existir. Se você já ultrapassou o teto do MEI, ou está perto, o guia é diretamente aplicável ao seu caso.</p>
  </div>

  <div class="faq-item">
    <div class="pergunta">E se eu ainda não tiro pró-labore hoje?</div>
    <p>É provavelmente o principal público deste guia. Muitos donos operam por anos com "pró-labore zero" — um dos 4 riscos silenciosos que o material detalha. O guia mostra o custo real dessa decisão (previdenciário, tributário e patrimonial) e como corrigir sem sustos.</p>
  </div>

  <div class="faq-item">
    <div class="pergunta">Meu contador já cuida disso. Preciso?</div>
    <p>Talvez sim, talvez não. O guia foi escrito para te dar linguagem técnica para conversar com o seu contador — perguntar por que o pró-labore está no valor X, por que a distribuição é feita daquele jeito, se a empresa está no melhor regime tributário para a sua realidade. Contador bom gosta de dono informado. Contador que trata a conversa como interferência é sinal.</p>
  </div>

  <div class="faq-item">
    <div class="pergunta">Isso conta como recomendação contábil ou tributária?</div>
    <p>Não. Este material é <strong>educativo e informativo</strong>. Ele explica conceitos, mostra as regras vigentes e apresenta um caso prático — mas não substitui a análise de um contador ou advogado tributarista para o seu caso concreto. Toda decisão deve ser confirmada com o profissional que conhece a sua empresa.</p>
  </div>

  <div class="faq-item">
    <div class="pergunta">Como recebo o guia depois de comprar?</div>
    <p>Assim que o pagamento é confirmado (cartão ou PIX), o link do PDF chega automaticamente no e-mail que você usou na compra. Se não aparecer em até 15 minutos, escreva para o suporte e resolvemos.</p>
  </div>

  <div class="faq-item">
    <div class="pergunta">Como funciona a devolução?</div>
    <p>Em até 7 dias corridos a partir da compra, você escreve para o suporte, pede o reembolso, e o valor volta integralmente pelo mesmo meio de pagamento. Sem formulário longo, sem justificativa obrigatória.</p>
  </div>
</section>

<section>
  <div class="tag">Fechamento</div>
  <h2>Quanto tirar da própria empresa é uma das poucas decisões que o dono não pode terceirizar por completo.</h2>
  <p>Você pode ter o melhor contador, o melhor planejamento, o melhor sistema. No fim, o número da retirada mensal atravessa a sua vida — a hipoteca, a escola dos filhos, o INSS que você paga hoje, o patrimônio que você monta em vinte anos. É a única decisão financeira em que a empresa e a pessoa se encontram todo mês.</p>
  <p>Este guia foi feito para você tomar essa decisão com método, dentro das regras de 2026, sem gritaria e sem promessa vazia.</p>
  <div class="cta">Quero o guia por R$ 37,90</div>
  <div class="ps">A empresa é o meio; você é o fim. Este guia trata só de uma parte pequena desse caminho — a mais prática — e o faz na forma que preferimos: material educativo, sereno, com número na tela. A decisão final continua sua, idealmente com o seu contador ao lado.</div>
</section>

<div class="rodape-doc">
  BVB Finanças · Guia do Pró-Labore 2026 · rascunho de copy v1 · 06 jul 2026
</div>

</main>
</body>
</html>`;

writeFileSync(htmlPath, html, "utf8");

const fileUrl = "file:///" + htmlPath.replace(/\\/g, "/");
const args = [
  "--headless=new",
  "--disable-gpu",
  "--no-sandbox",
  "--no-pdf-header-footer",
  "--virtual-time-budget=10000",
  `--print-to-pdf=${pdfPath}`,
  fileUrl,
];

console.log("Chamando Chrome headless…");
const r = spawnSync(CHROME, args, { stdio: "inherit" });
if (r.status !== 0) {
  console.error("Chrome falhou. Status:", r.status);
  process.exit(1);
}

if (existsSync(htmlPath)) unlinkSync(htmlPath);

console.log("\nPDF gerado:");
console.log(pdfPath);
