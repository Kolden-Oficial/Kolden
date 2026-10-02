#!/usr/bin/env node
/**
 * nuvemshop-tema.cjs — roda o Nuvemshop CLI (modo FTP) com credenciais vindas do Infisical.
 *
 * O CLI não lê credencial de variável de ambiente: `theme ftp setup` grava tudo em `.nuvem`
 * (ofuscado, NÃO criptografado). Este wrapper recria o `.nuvem` a partir das variáveis que o
 * `infisical run` injeta, executa o comando pedido e apaga o `.nuvem` no fim — inclusive em
 * erro ou Ctrl+C. Nada de credencial fica em disco entre execuções.
 *
 * Uso (sempre via infisical run):
 *   infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- \
 *     node sobre-a-empresa/Ferramentas/Nuvemshop/nuvemshop-tema.cjs <loja> <pull|diff|push|watch> [flags do CLI]
 *
 * Exemplos:
 *   ... nuvemshop-tema.cjs rosie pull
 *   ... nuvemshop-tema.cjs rosie diff
 *   ... nuvemshop-tema.cjs rosie push          (pede confirmação; -y é recusado)
 *   ... nuvemshop-tema.cjs rosie watch --no-browser
 *
 * Variáveis esperadas (prefixo por loja, ver LOJAS):
 *   <PREFIXO>_FTP_USER, <PREFIXO>_FTP_PASSWORD, <PREFIXO>_STORE_URL
 *   <PREFIXO>_FTP_HOST (opcional — padrão ftp.nuvemshop.com.br)
 *
 * Requisitos: Node >= 24.15 (exigência do @tiendanube/cli) e `npm install -g @tiendanube/cli`.
 */
'use strict';
const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Raiz do repositório: este arquivo vive em sobre-a-empresa/Ferramentas/Nuvemshop/
const ROOT = path.resolve(__dirname, '..', '..', '..');

// Uma entrada por loja. `pasta` = diretório de trabalho do CLI (ignorado pelo git).
const LOJAS = {
  rosie: {
    prefixo: 'NUVEMSHOP_ROSIE',
    pasta: 'sobre-a-empresa/Projetos/Ativos/rosie/_tema-recife/codigo',
  },
};

const COMANDOS = ['pull', 'diff', 'push', 'watch'];
const FTP_HOST_PADRAO = 'ftp.nuvemshop.com.br';
const NODE_MINIMO = [24, 15];

function falhar(msg) {
  console.error(`[nuvemshop-tema] ${msg}`);
  process.exit(1);
}

// ------------------------------------------------------------ argumentos
const [loja, comando, ...extras] = process.argv.slice(2);
if (!LOJAS[loja]) falhar(`loja desconhecida: "${loja ?? ''}". Disponíveis: ${Object.keys(LOJAS).join(', ')}`);
if (!COMANDOS.includes(comando)) falhar(`comando inválido: "${comando ?? ''}". Use: ${COMANDOS.join(' | ')}`);
// push via FTP vai direto para a loja em produção e apaga do servidor o que não existe localmente.
if (comando === 'push' && extras.some(a => a === '-y' || a === '--yes')) {
  falhar('push com -y recusado: push FTP é produção imediata. Rode sem -y e confirme no prompt.');
}

// ------------------------------------------------------------ ambiente
const [maior, menor] = process.versions.node.split('.').map(Number);
if (maior < NODE_MINIMO[0] || (maior === NODE_MINIMO[0] && menor < NODE_MINIMO[1])) {
  falhar(`Node ${process.versions.node} — o @tiendanube/cli exige >= ${NODE_MINIMO.join('.')}.`);
}

const { prefixo, pasta } = LOJAS[loja];
const env = process.env;
const faltando = ['FTP_USER', 'FTP_PASSWORD', 'STORE_URL'].map(k => `${prefixo}_${k}`).filter(k => !env[k]);
if (faltando.length) {
  falhar(`variáveis ausentes: ${faltando.join(', ')}. Rodou via "infisical run"? Estão cadastradas no Infisical?`);
}

// Resolve o entrypoint JS do CLI global e executa com o próprio Node — sem shell, então a
// senha não passa por interpolação (e funciona igual no Windows, onde o bin global é .cmd).
function localizarCli() {
  const raizGlobal = execSync('npm root -g', { encoding: 'utf8' }).trim();
  const pkgDir = path.join(raizGlobal, '@tiendanube', 'cli');
  const pkgJson = path.join(pkgDir, 'package.json');
  if (!fs.existsSync(pkgJson)) falhar('@tiendanube/cli não encontrado. Instale com: npm install -g @tiendanube/cli');
  const pkg = JSON.parse(fs.readFileSync(pkgJson, 'utf8'));
  const bin = typeof pkg.bin === 'string' ? pkg.bin : pkg.bin.nuvemshop;
  return path.join(pkgDir, bin);
}
const CLI = localizarCli();

// ------------------------------------------------------------ execução
const cwd = path.join(ROOT, pasta);
fs.mkdirSync(cwd, { recursive: true });
const arquivoConfig = path.join(cwd, '.nuvem');

function limparConfig() {
  try { fs.rmSync(arquivoConfig, { force: true }); } catch { /* best-effort */ }
}

// Telemetria do CLI desligada (soberania de dados).
const envFilho = { ...env, NUVEMSHOP_CLI_TELEMETRY_ENABLED: '0' };

function rodar(args) {
  return new Promise(resolve => {
    const filho = spawn(process.execPath, [CLI, ...args], { cwd, env: envFilho, stdio: 'inherit' });
    filho.on('exit', (code, signal) => resolve(code ?? (signal ? 1 : 0)));
    filho.on('error', err => { console.error(err); resolve(1); });
  });
}

// Ctrl+C chega ao filho pelo terminal; o wrapper espera ele sair e limpa o .nuvem.
for (const sinal of ['SIGINT', 'SIGTERM', 'SIGHUP']) process.on(sinal, () => {});
process.on('exit', limparConfig);

(async () => {
  limparConfig(); // resto de execução anterior interrompida

  const setup = await rodar([
    'theme', 'ftp', 'setup',
    '--ftp-server', env[`${prefixo}_FTP_HOST`] || FTP_HOST_PADRAO,
    '--ftp-username', env[`${prefixo}_FTP_USER`],
    '--ftp-password', env[`${prefixo}_FTP_PASSWORD`],
    '--store-url', env[`${prefixo}_STORE_URL`],
  ]);
  if (setup !== 0) {
    limparConfig();
    falhar('setup FTP falhou — credenciais erradas ou porta 21 bloqueada.');
  }

  // push: mostra o diff antes; a confirmação final fica com o prompt do próprio CLI.
  if (comando === 'push') {
    const diff = await rodar(['theme', 'ftp', 'diff', ...extras.filter(a => a === '--force' || a === '-v')]);
    if (diff !== 0) {
      limparConfig();
      falhar('diff falhou — push abortado.');
    }
  }

  const codigo = await rodar(['theme', 'ftp', comando, ...extras]);
  limparConfig();
  process.exit(codigo);
})();
