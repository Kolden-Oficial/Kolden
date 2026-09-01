// Monta a pasta ../_vercel-deploy/ com os arquivos prontos pra `vercel deploy`.
// Estrutura resultante:
//   _vercel-deploy/
//     index.html                (galeria)
//     assets/logo-rosie.png
//     emails/rosie-*.html       (19 arquivos, com path da logo absoluto '/assets/logo-rosie.png')

import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT       = resolve(__dirname, '..', '_vercel-deploy');

mkdirSync(join(OUT, 'emails'), { recursive: true });
mkdirSync(join(OUT, 'assets'), { recursive: true });

// Copia logo
copyFileSync(join(__dirname, 'assets', 'logo-rosie.png'), join(OUT, 'assets', 'logo-rosie.png'));

// Metadados dos 19
const MAP = [
  { file: 'rosie-01-boasvindas-01-hello',           subject: 'Oi. Aqui é a Rosie.',                            fluxo: 'Boas-vindas',       timing: 'D+0 · +15min' },
  { file: 'rosie-01-boasvindas-02-canelada',        subject: 'A peça que quase ficou de fora',                fluxo: 'Boas-vindas',       timing: 'D+1 · 10h'    },
  { file: 'rosie-01-boasvindas-03-jeans',           subject: 'Um ano só nesse jeans',                          fluxo: 'Boas-vindas',       timing: 'D+2 · 10h'    },
  { file: 'rosie-01-boasvindas-04-troca',           subject: 'Se não servir, a gente resolve',                 fluxo: 'Boas-vindas',       timing: 'D+3 · 10h'    },
  { file: 'rosie-01-boasvindas-05-mimo',            subject: 'Um mimo pra você',                               fluxo: 'Boas-vindas',       timing: 'D+4 · 10h'    },
  { file: 'rosie-02-nutricao-01-closet-enxuto',     subject: 'O truque do closet enxuto',                      fluxo: 'Nutrição semanal',  timing: 'Terça · 10h'  },
  { file: 'rosie-02-nutricao-02-statement-neon',    subject: 'A peça mais estranha que eu já criei',           fluxo: 'Nutrição semanal',  timing: 'Terça · 10h'  },
  { file: 'rosie-02-nutricao-03-erro-so-basico',    subject: 'O erro do "só básico"',                          fluxo: 'Nutrição semanal',  timing: 'Terça · 10h'  },
  { file: 'rosie-02-nutricao-04-aposentei-peca',    subject: 'Aposentei uma peça essa semana',                 fluxo: 'Nutrição semanal',  timing: 'Terça · 10h'  },
  { file: 'rosie-03-carrinho-01-lembrete',          subject: 'Você deixou uma coisa aqui',                     fluxo: 'Carrinho abandonado', timing: 'D+0 · +1h'  },
  { file: 'rosie-03-carrinho-02-provasocial',       subject: 'Deixa eu te contar quem já tem essa peça',       fluxo: 'Carrinho abandonado', timing: 'D+1 · 10h'  },
  { file: 'rosie-03-carrinho-03-fretegratis',       subject: 'Última coisa que eu queria te dizer',            fluxo: 'Carrinho abandonado', timing: 'D+3 · 15h'  },
  { file: 'rosie-04-poscompra-01-confirmacao',      subject: 'Recebi o seu pedido',                            fluxo: 'Pós-compra',        timing: 'D+0 · imediato' },
  { file: 'rosie-04-poscompra-02-cuidados',         subject: 'Antes de você abrir o pacote',                   fluxo: 'Pós-compra',        timing: 'D+3 · 10h'    },
  { file: 'rosie-04-poscompra-03-ugc',              subject: 'Me manda uma foto?',                             fluxo: 'Pós-compra',        timing: 'D+7 · 11h'    },
  { file: 'rosie-04-poscompra-04-crosssell',        subject: 'Uma peça que combina com o que você já pegou',   fluxo: 'Pós-compra',        timing: 'D+21 · 10h'   },
  { file: 'rosie-05-winback-01-sumiu',              subject: 'Sumiu ou eu que estou chata?',                   fluxo: 'Winback',           timing: 'D+45 · 11h'   },
  { file: 'rosie-05-winback-02-o-que-mudou',        subject: 'O que aconteceu na Rosie desde que você sumiu',  fluxo: 'Winback',           timing: 'D+52 · 10h'   },
  { file: 'rosie-05-winback-03-ultima-chamada',     subject: 'Último e-mail meu',                              fluxo: 'Winback',           timing: 'D+59 · 15h'   },
];

const FLUXO_COLOR = {
  'Boas-vindas':          '#E6D2DC',
  'Nutrição semanal':     '#F8E3E8',
  'Carrinho abandonado':  '#FFE4CE',
  'Pós-compra':           '#E0EFE0',
  'Winback':              '#EBEBEB',
};

// Copia + ajusta path da logo em cada HTML
for (const m of MAP) {
  const src  = readFileSync(join(__dirname, `${m.file}.html`), 'utf8');
  const html = src.replaceAll('./assets/logo-rosie.png', '/assets/logo-rosie.png');
  writeFileSync(join(OUT, 'emails', `${m.file}.html`), html, 'utf8');
}

// Galeria
const grouped = MAP.reduce((acc, m) => { (acc[m.fluxo] ??= []).push(m); return acc; }, {});
const fluxosOrder = ['Boas-vindas', 'Nutrição semanal', 'Carrinho abandonado', 'Pós-compra', 'Winback'];

const grupos = fluxosOrder.map((fluxo, idx) => {
  const items = grouped[fluxo] || [];
  const cor   = FLUXO_COLOR[fluxo];
  const cards = items.map(m => `
      <a class="card" href="/emails/${m.file}.html" target="_blank">
        <div class="card-preview">
          <iframe src="/emails/${m.file}.html" loading="lazy" scrolling="no"></iframe>
        </div>
        <div class="card-body">
          <div class="card-code">${m.file}</div>
          <div class="card-subject">${m.subject}</div>
          <div class="card-timing">${m.timing}</div>
        </div>
      </a>`).join('');
  return `
    <section class="fluxo" id="fluxo-${idx+1}">
      <div class="fluxo-head">
        <span class="fluxo-badge" style="background:${cor}"></span>
        <h2 class="fluxo-title">${idx+1}. ${fluxo}</h2>
        <span class="fluxo-count">${items.length} e-mail${items.length>1?'s':''}</span>
      </div>
      <div class="cards">${cards}</div>
    </section>`;
}).join('');

const indexHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Rosie · Galeria de E-mails · Fluxos RD Station</title>
<link rel="icon" type="image/png" href="/assets/logo-rosie.png">
<style>
  * { box-sizing:border-box; }
  body { margin:0; font-family:'Helvetica Neue',Arial,sans-serif; background:#EBEBEB; color:#14100C; -webkit-font-smoothing:antialiased; }
  .hero { background:#FFFFFF; border-bottom:1px solid #E6D2DC; padding:48px 24px 40px; text-align:center; }
  .hero img { width:220px; height:auto; display:block; margin:0 auto 18px; }
  .hero h1 { margin:0 0 8px; font-family:Georgia,serif; font-size:32px; font-weight:400; letter-spacing:0.03em; }
  .hero p { margin:0 auto; max-width:640px; font-size:15px; line-height:1.55; color:#5a5551; }
  .hero .kpis { display:flex; gap:32px; justify-content:center; margin-top:28px; flex-wrap:wrap; }
  .kpi { text-align:center; }
  .kpi .n { font-family:Georgia,serif; font-size:28px; color:#14100C; }
  .kpi .l { font-size:11px; letter-spacing:0.15em; text-transform:uppercase; color:#a09a94; margin-top:2px; }
  .container { max-width:1280px; margin:0 auto; padding:40px 24px 80px; }
  .fluxo { margin-bottom:56px; }
  .fluxo-head { display:flex; align-items:center; gap:12px; margin-bottom:20px; padding-bottom:12px; border-bottom:1px solid #d9d5cf; }
  .fluxo-badge { display:inline-block; width:14px; height:14px; border-radius:50%; }
  .fluxo-title { margin:0; font-family:Georgia,serif; font-weight:400; font-size:22px; letter-spacing:0.02em; }
  .fluxo-count { margin-left:auto; font-size:11px; letter-spacing:0.15em; text-transform:uppercase; color:#a09a94; }
  .cards { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:24px; }
  .card { background:#FFFFFF; text-decoration:none; color:#14100C; border:1px solid #e5e1db; transition:transform 0.15s ease, box-shadow 0.15s ease; overflow:hidden; display:flex; flex-direction:column; }
  .card:hover { transform:translateY(-3px); box-shadow:0 12px 32px -12px rgba(20,16,12,0.18); }
  .card-preview { position:relative; padding-top:75%; overflow:hidden; background:#FFFFFF; border-bottom:1px solid #e5e1db; }
  .card-preview iframe { position:absolute; top:0; left:0; width:200%; height:200%; border:0; transform:scale(0.5); transform-origin:top left; pointer-events:none; }
  .card-body { padding:16px 18px; }
  .card-code { font-family:'Courier New',monospace; font-size:11px; color:#a09a94; margin-bottom:8px; word-break:break-all; }
  .card-subject { font-family:Georgia,serif; font-size:16px; line-height:1.35; margin-bottom:6px; }
  .card-timing { font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:#a09a94; }
  .footer { max-width:1280px; margin:0 auto; padding:32px 24px; border-top:1px solid #d9d5cf; text-align:center; font-size:12px; color:#a09a94; }
  .footer a { color:#5a5551; }
  @media (max-width:520px) { .hero h1 { font-size:26px; } .hero .kpis { gap:20px; } .kpi .n { font-size:22px; } }
</style>
</head>
<body>

<div class="hero">
  <img src="/assets/logo-rosie.png" alt="Rosie">
  <h1>Galeria de E-mails · Rosie</h1>
  <p>19 e-mails em voz de marca, distribuídos em 5 fluxos RD Station. Clique em qualquer card para abrir o e-mail em tamanho real e revisar antes da subida no RD Station.</p>
  <div class="kpis">
    <div class="kpi"><div class="n">19</div><div class="l">e-mails</div></div>
    <div class="kpi"><div class="n">5</div><div class="l">fluxos</div></div>
    <div class="kpi"><div class="n">100%</div><div class="l">RD-Station-ready</div></div>
  </div>
</div>

<div class="container">
${grupos}
</div>

<div class="footer">
  Rosie · guarda-roupa descomplicado · Kolden Caliope 2026-07-14 · <a href="https://rosieiadoreyou.com.br" target="_blank">rosieiadoreyou.com.br</a>
</div>

</body>
</html>
`;

writeFileSync(join(OUT, 'index.html'), indexHtml, 'utf8');

// vercel.json simples — estática, sem framework
writeFileSync(join(OUT, 'vercel.json'), JSON.stringify({
  cleanUrls: true,
  trailingSlash: false,
}, null, 2), 'utf8');

console.log(`Deploy folder pronto: ${OUT}`);
