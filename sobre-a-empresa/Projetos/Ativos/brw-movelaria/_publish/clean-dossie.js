#!/usr/bin/env node
// Limpa dossie.md para versão cliente:
// - remove frontmatter YAML
// - resolve wikilinks Obsidian [[...]]
// - remove menções à mecânica interna dos agentes Kolden
// - remove notas de custo e caminhos técnicos internos
// Saída: _publish/dossie-cliente.md

const fs = require('fs');
const path = require('path');

const IN = path.join(__dirname, '..', 'dossie.md');
const OUT = path.join(__dirname, 'dossie-cliente.md');

let md = fs.readFileSync(IN, 'utf8');

// 1) Strip YAML frontmatter
md = md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');

// 2) Resolver wikilinks: [[caminho/arquivo|alias]] -> alias; [[alvo]] -> alvo
md = md.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, alias) => {
  return alias || target.split('/').pop().replace(/\.md$/, '');
});

// 3) Remover linhas que revelam a cozinha interna
const INTERNAL_PATTERNS = [
  /\bArgos( Chief| chief)?\b/i,
  /\bHermes\b/i,
  /\bAletheia( Chief| chief)?\b/i,
  /\bFirecrawl\b/i,
  /\bApify\b/i,
  /\bMCP\s+`?google-drive`?/i,
  /\bffmpeg\b/i,
  /\bimageio-ffmpeg\b/i,
  /\bcoleta-bruta\b/i,
  /\bARGOS-CL-\d+\b/i,
  /output-quality\.md/i,
  /\bcache em\b/i,
  /\.claude\/projects/i,
  /Custo\s+(Apify|Drive|Fase|real|total)/i,
  /US\$\s*[\d.,]+/,
  /Gate de confiabilidade/i,
  /Autoria:.*(?:Argos|Hermes|Aletheia)/i,
  // Referências a arquivos internos de scrape/coleta
  /instagram-top-\d+-posts/i,
  /tiktok-perfil-\d{4}-\d{2}-\d{2}/i,
  /facebook-page-\d{4}-\d{2}-\d{2}/i,
  /drive-\d{4}-\d{2}-\d{2}\.md/i,
  /transcript-\d{4}-\d{2}-\d{2}/i,
  /^Assets locais em/i,
  /anexos\/drive-\d{4}-\d{2}-\d{2}/i,
  /\bAssets locais\b/i,
  /Google Doc\s+`\w+`/i,
  /transcrição Gemini/i,
];

const lines = md.split(/\r?\n/);
const kept = [];
let inBlockquoteMeta = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const isInternal = INTERNAL_PATTERNS.some(rx => rx.test(line));

  // Blocos de metadata iniciam com "> **Versão:**", "> **Autoria:**", etc.
  // Se detectamos, pulamos o bloco inteiro até uma linha em branco.
  if (/^>\s*\*\*(Versão|Autoria|Data da consolidação|Cliente|Método|Gate|Fonte primária Fase|Custo|Assets locais)/i.test(line)) {
    inBlockquoteMeta = true;
    continue;
  }
  if (inBlockquoteMeta) {
    if (/^\s*$/.test(line) || !/^>/.test(line)) {
      inBlockquoteMeta = false;
      // Se linha em branco depois do bloco, ainda descarta a linha em branco redundante
      if (/^\s*$/.test(line) && kept.length && /^\s*$/.test(kept[kept.length - 1])) continue;
      // Fall through — permite processar linha normal
    } else {
      continue;
    }
  }

  if (isInternal) {
    // Se é linha inteira sobre a cozinha interna, pula
    // Mas se é linha com Vereditos/blocos legítimos que só mencionam en passant, tenta limpar
    // Regra simples: pula a linha inteira
    continue;
  }

  kept.push(line);
}

// 4) Colapsar múltiplas linhas em branco e trim inicial
let cleaned = kept.join('\n').replace(/\n{3,}/g, '\n\n').replace(/^\s+/, '');

// 4.5) Sanitizar termos internos remanescentes
const termSubs = [
  [/\bAletheia( Chief| chief)?\b/g, 'time de discovery Kolden'],
  [/\bArgos( Chief| chief)?\b/g, 'time de pesquisa Kolden'],
  [/\bHermes\b/g, 'runtime Kolden'],
  [/\bCaliope\b/g, 'time de copy Kolden'],
  [/\bPheme\b/g, 'time de social Kolden'],
  [/\bPrometeu\b/g, 'time de produto Kolden'],
  [/\bAriadne\b/g, 'time de web Kolden'],
  [/\bMetis\b/g, 'time de analytics Kolden'],
  [/\bAnanke\b/g, 'time de ops Kolden'],
  [/\bAglaia\b/g, 'time de branding Kolden'],
  [/\bDike\b/g, 'verificação Kolden'],
  [/\bPeitho\b/g, 'time de vendas Kolden'],
  [/\bThemis\b/g, 'governança Kolden'],
  [/\bNyx\b/g, 'time de estratégia Kolden'],
  [/\bHarmonia\b/g, 'time de design systems Kolden'],
  [/\bMoira\b/g, 'time Kolden'],
  [/\bIris\b/g, 'time Kolden'],
  [/\bNike\b/g, 'time Kolden'],
  [/\bAthena\b/g, 'time Kolden'],
  [/\bAeolus\b/g, 'time Kolden'],
  [/\bFirecrawl\b/g, 'web search'],
  [/\bApify\b/g, 'scraping'],
  [/\bMCP\s+`?google-drive`?/g, 'integração Drive'],
  [/orquestradora do squad de \w+( & \w+)?( da Kolden)?/gi, 'da Kolden'],
  [/orquestradora do squad/gi, 'da Kolden'],
  [/coleta-bruta/g, 'coleta bruta'],
  [/Contrato\s+`m-\d+-[^`]+`/g, 'contrato de trabalho'],
];
for (const [re, sub] of termSubs) cleaned = cleaned.replace(re, sub);

// 5) Substituir o cabeçalho antigo por um limpo (mata desde "# DOSSIÊ" até o primeiro "##")
cleaned = cleaned.replace(
  /^#\s*DOSSIÊ BRW MOVELARIA[\s\S]*?(?=^##\s)/m,
  `# DOSSIÊ BRW MOVELARIA

**Cliente:** BRW MOVELARIA LTDA — CNPJ 65.898.142/0001-63
**Consolidação:** 2026-07-09
**Fases do trabalho:** mapeamento base + coleta social + auditoria de assets + alinhamento com sócios (reunião 2026-07-07)

---

`
);

fs.writeFileSync(OUT, cleaned, 'utf8');
console.log(`OK: ${OUT}`);
console.log(`Linhas originais: ${lines.length}, linhas finais: ${cleaned.split('\n').length}`);
