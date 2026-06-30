import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { load as parseYaml } from "js-yaml";
import { arquivoCatalogoAusente } from "./erros.js";
import { log } from "./log.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// dist/lib/catalogo.js → vscode-coach/data
const DATA_DIR = resolve(__dirname, "..", "..", "data");

export interface ExtensaoCurada {
  id: string;
  motivo: string;
  configuracao_minima?: Record<string, unknown>;
  condicao?: string;
  verificado_em: string;
}

export interface ExtensoesPorStack {
  essenciais: ExtensaoCurada[];
  recomendadas: ExtensaoCurada[];
  evitar?: Array<{ id: string; motivo: string }>;
  settings_base?: Record<string, unknown>;
  launch_base?: Record<string, unknown>;
  tasks_base?: Record<string, unknown>;
}

export interface CatalogoExtensoes {
  [stack: string]: ExtensoesPorStack;
}

export interface DiagnosticoCurado {
  id: string;
  sintomas: string[];
  hipoteses: Array<{
    titulo: string;
    verificacao: string;
    correcao: string;
    link_doc?: string;
  }>;
}

export interface CatalogoDiagnosticos {
  diagnosticos: DiagnosticoCurado[];
}

export interface PerfilPersona {
  persona: string;
  keybindings_top: Array<{ tecla: string; comando: string; quando?: string; nota: string }>;
  snippets_destaque: Array<{ linguagem: string; prefixo: string; nota: string }>;
  perfil_sugerido: string;
  extensoes_de_perfil?: string[];
}

export interface CatalogoPerfis {
  personas: PerfilPersona[];
}

async function carregarYaml<T>(arquivo: string): Promise<T> {
  const path = join(DATA_DIR, arquivo);
  try {
    const conteudo = await readFile(path, "utf-8");
    return parseYaml(conteudo) as T;
  } catch (err) {
    log.error(`Falha ao carregar catálogo ${arquivo}`, { erro: String(err), path });
    throw arquivoCatalogoAusente(arquivo);
  }
}

let cache_extensoes: CatalogoExtensoes | undefined;
let cache_essenciais: ExtensoesPorStack | undefined;
let cache_diagnosticos: CatalogoDiagnosticos | undefined;
let cache_perfis: CatalogoPerfis | undefined;

export async function carregarExtensoesPorStack(): Promise<CatalogoExtensoes> {
  if (!cache_extensoes) {
    cache_extensoes = await carregarYaml<CatalogoExtensoes>("extensoes-por-stack.yaml");
  }
  return cache_extensoes;
}

export async function carregarExtensoesEssenciais(): Promise<ExtensoesPorStack> {
  if (!cache_essenciais) {
    cache_essenciais = await carregarYaml<ExtensoesPorStack>("extensoes-essenciais.yaml");
  }
  return cache_essenciais;
}

export async function carregarDiagnosticos(): Promise<CatalogoDiagnosticos> {
  if (!cache_diagnosticos) {
    cache_diagnosticos = await carregarYaml<CatalogoDiagnosticos>("diagnosticos.yaml");
  }
  return cache_diagnosticos;
}

export async function carregarPerfis(): Promise<CatalogoPerfis> {
  if (!cache_perfis) {
    cache_perfis = await carregarYaml<CatalogoPerfis>("perfis.yaml");
  }
  return cache_perfis;
}

export async function stacksSuportadas(): Promise<string[]> {
  const cat = await carregarExtensoesPorStack();
  return Object.keys(cat).sort();
}

/** Distância Levenshtein simplificada para sugerir stacks próximas. */
function distanciaSimples(a: string, b: string): number {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i]![0] = i;
  for (let j = 0; j <= n; j++) dp[0]![j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const custo = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i]![j] = Math.min(
        dp[i - 1]![j]! + 1,
        dp[i]![j - 1]! + 1,
        dp[i - 1]![j - 1]! + custo,
      );
    }
  }
  return dp[m]![n]!;
}

export async function stacksProximas(pedida: string, limite = 3): Promise<string[]> {
  const todas = await stacksSuportadas();
  const pedida_lc = pedida.toLowerCase();
  return todas
    .map((s) => ({ s, d: distanciaSimples(s, pedida_lc) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, limite)
    .map((x) => x.s);
}

/** Match fuzzy simples por palavras-chave entre sintoma livre e diagnósticos. */
export interface MatchDiagnostico {
  diagnostico: DiagnosticoCurado;
  score: number;
}

export async function casarSintoma(sintoma: string): Promise<MatchDiagnostico[]> {
  const cat = await carregarDiagnosticos();
  const sintoma_lc = sintoma.toLowerCase();
  const tokens_sintoma = sintoma_lc.split(/\s+/).filter((t) => t.length > 2);

  return cat.diagnosticos
    .map((d) => {
      const padroes = d.sintomas.map((s) => s.toLowerCase());
      let score = 0;
      for (const p of padroes) {
        if (sintoma_lc.includes(p)) score += 1.0;
        else {
          const tokens_p = p.split(/\s+/);
          const intersec = tokens_p.filter((t) => tokens_sintoma.includes(t)).length;
          if (intersec > 0) score += intersec / Math.max(tokens_p.length, 1) * 0.5;
        }
      }
      return { diagnostico: d, score };
    })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score);
}
