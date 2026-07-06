// Gera SVGs do logotipo "Glória Ellen" convertendo cada glifo em <path>
// (text-to-path via opentype.js). Saída = SVG puro, sem dependência de fonte
// em runtime — abre igual em Illustrator, Figma, Inkscape, navegador.
//
// v1.1 (2026-07-02): fonte migrada de Sacramento (cursiva manuscrita) para
// Cormorant Garamond Italic Light 300 (assinatura de livro editorial),
// conforme direção A aprovada no brandbook. viewBox ajustado para 900x200
// porque Cormorant Italic tem métrica horizontal (ratio W/H ~5.66 vs ~3
// da Sacramento). Marca d'água vai em 500x110.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const FONT_PATH = resolve(__dirname, 'CormorantGaramond-LightItalic.ttf');
const fontBuf = readFileSync(FONT_PATH);
const font = opentype.parse(fontBuf.buffer.slice(fontBuf.byteOffset, fontBuf.byteOffset + fontBuf.byteLength));

const TEXTO = 'Glória Ellen';

// --- helpers ------------------------------------------------------------

function medirTexto(texto, fontSize) {
  const path = font.getPath(texto, 0, 0, fontSize);
  const bb = path.getBoundingBox();
  return {
    largura: bb.x2 - bb.x1,
    altura: bb.y2 - bb.y1,
    xMin: bb.x1,
    yMin: bb.y1,
    yMax: bb.y2,
  };
}

function gerarPathD(texto, fontSize, x, y) {
  const path = font.getPath(texto, x, y, fontSize);
  return path.toPathData(3); // 3 casas decimais
}

// gera um SVG mestre no viewBox pedido, com o texto centralizado
function gerarSVG({ viewBoxW, viewBoxH, cor, opacity = 1, comentario, fontSizeFactor = 0.78 }) {
  // Cormorant Italic é editorial: a altura do bbox capta apenas x-height até ascender
  // real; usamos fontSize proporcional ao viewBoxH * fator (default 0.78 mantém
  // compatibilidade com Sacramento; aplicações editoriais pedem 0.72-0.85).
  const fontSize = viewBoxH * fontSizeFactor;
  const medida = medirTexto(TEXTO, fontSize);

  // centraliza horizontal e verticalmente
  const x = (viewBoxW - medida.largura) / 2 - medida.xMin;
  // baseline y: alinhado ao centro visual do glifo
  const y = viewBoxH / 2 - (medida.yMin + medida.yMax) / 2;

  const d = gerarPathD(TEXTO, fontSize, x, y);

  const opacityAttr = opacity < 1 ? ` opacity="${opacity}"` : '';
  const cabecalho = comentario ? `<!-- ${comentario} -->\n` : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
${cabecalho}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewBoxW} ${viewBoxH}" role="img" aria-label="Glória Ellen">
  <title>Glória Ellen</title>
  <path d="${d}" fill="${cor}"${opacityAttr}/>
</svg>
`;
}

// --- outputs ------------------------------------------------------------

const HEADER_V11 = 'Logo Glória Ellen · v1.1 · Cormorant Garamond Italic Light 300 (Google Fonts OFL) · vetorizado via opentype.js text-to-path · brandbook direção A aprovada 2026-07-02';

const alvos = [
  {
    caminho: `${ROOT}/logo/logo.svg`,
    viewBoxW: 900,
    viewBoxH: 200,
    cor: '#2A2B27',
    comentario: HEADER_V11 + ' · mestre em ink sobre transparente. viewBox 900x200.',
  },
  {
    caminho: `${ROOT}/logo/logo-ink.svg`,
    viewBoxW: 900,
    viewBoxH: 200,
    cor: '#2A2B27',
    comentario: HEADER_V11 + ' · versão ink #2A2B27 explícita — uso padrão sobre fundos claros (creme).',
  },
  {
    caminho: `${ROOT}/logo/logo-cream.svg`,
    viewBoxW: 900,
    viewBoxH: 200,
    cor: '#FAF5EC',
    comentario: HEADER_V11 + ' · versão creme #FAF5EC — uso reservado sobre fundos escuros (ink, sea-deep).',
  },
  {
    caminho: `${ROOT}/logo/logo-sea.svg`,
    viewBoxW: 900,
    viewBoxH: 200,
    cor: '#3D5A6C',
    comentario: HEADER_V11 + ' · versão azul-mar #3D5A6C — uso quando o layout pede a paleta praia.',
  },
  {
    caminho: `${ROOT}/logo/marca-dagua/marca-dagua.svg`,
    viewBoxW: 500,
    viewBoxH: 110,
    cor: '#FAF5EC',
    opacity: 0.65,
    comentario: HEADER_V11 + " · marca d'água creme #FAF5EC com opacity 0.65 (aplicar canto inferior direito das fotos, margem 5% do menor lado).",
  },
];

for (const alvo of alvos) {
  mkdirSync(dirname(alvo.caminho), { recursive: true });
  const svg = gerarSVG(alvo);
  writeFileSync(alvo.caminho, svg, 'utf8');
  console.log(`OK  ${alvo.caminho}`);
}

console.log('\nSVGs de logo v1.1 gerados via text-to-path (Cormorant Garamond Italic Light 300).');
