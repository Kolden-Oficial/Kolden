// Renderiza os SVGs em PNGs multi-resolução usando sharp.
// 16 PNGs de logo + 2 de marca d'água.
//
// v1.1 (2026-07-02): proporção do logo mudou de 800x260 (Sacramento) para
// 900x200 (Cormorant Garamond Italic Light 300 — direção A do brandbook).
// Marca d'água mudou de 400x130 para 500x110.

import { readFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_LOGO = resolve(ROOT, 'logo/png');
const OUT_WATERMARK = resolve(ROOT, 'logo/marca-dagua');

mkdirSync(OUT_LOGO, { recursive: true });

const TAMANHOS = [256, 512, 1024, 2048];

const CREAM = '#FAF5EC';
const INK = '#2A2B27';

// Proporção do logo v1.1: 900x200 (Cormorant Italic).
const LOGO_W = 900;
const LOGO_H = 200;
const RATIO_LOGO = LOGO_H / LOGO_W;

// Marca d'água v1.1: 500x110.
const WM_W = 500;
const WM_H = 110;
const RATIO_WM = WM_H / WM_W;

// helper: cria SVG background sólido com o logo sobreposto (mantém proporção 900x200)
function fundoComLogoSVG(corFundo, svgLogo, largura) {
  const altura = Math.round(largura * RATIO_LOGO);
  // remove a linha <?xml e o comentário; embute o <svg> interno inline
  const inner = svgLogo
    .replace(/<\?xml[^?]*\?>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim();
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LOGO_W} ${LOGO_H}" width="${largura}" height="${altura}">
    <rect width="100%" height="100%" fill="${corFundo}"/>
    ${inner.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')}
  </svg>`;
}

async function renderTransparente(svgPath, saidaPath, largura) {
  const altura = Math.round(largura * RATIO_LOGO);
  await sharp(svgPath, { density: 300 })
    .resize(largura, altura, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(saidaPath);
  console.log(`OK  ${saidaPath}`);
}

async function renderComFundo(svgLogoPath, corFundo, saidaPath, largura) {
  const svgLogo = readFileSync(svgLogoPath, 'utf8');
  const svgComposto = fundoComLogoSVG(corFundo, svgLogo, largura);
  const altura = Math.round(largura * RATIO_LOGO);
  await sharp(Buffer.from(svgComposto), { density: 300 })
    .resize(largura, altura)
    .png()
    .toFile(saidaPath);
  console.log(`OK  ${saidaPath}`);
}

async function renderMarcaDagua(svgPath, saidaPath, largura) {
  const altura = Math.round(largura * RATIO_WM);
  await sharp(svgPath, { density: 300 })
    .resize(largura, altura, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(saidaPath);
  console.log(`OK  ${saidaPath}`);
}

// --- executa ------------------------------------------------------------

const LOGO_INK = resolve(ROOT, 'logo/logo-ink.svg');
const LOGO_CREAM = resolve(ROOT, 'logo/logo-cream.svg');
const WATERMARK = resolve(OUT_WATERMARK, 'marca-dagua.svg');

for (const t of TAMANHOS) {
  await renderTransparente(LOGO_INK, resolve(OUT_LOGO, `logo-ink-transparente-${t}.png`), t);
  await renderTransparente(LOGO_CREAM, resolve(OUT_LOGO, `logo-cream-transparente-${t}.png`), t);
  await renderComFundo(LOGO_INK, CREAM, resolve(OUT_LOGO, `logo-ink-sobre-creme-${t}.png`), t);
  await renderComFundo(LOGO_CREAM, INK, resolve(OUT_LOGO, `logo-cream-sobre-ink-${t}.png`), t);
}

await renderMarcaDagua(WATERMARK, resolve(OUT_WATERMARK, 'marca-dagua-1024.png'), 1024);
await renderMarcaDagua(WATERMARK, resolve(OUT_WATERMARK, 'marca-dagua-2048.png'), 2048);

console.log('\nPNGs v1.1 gerados.');
