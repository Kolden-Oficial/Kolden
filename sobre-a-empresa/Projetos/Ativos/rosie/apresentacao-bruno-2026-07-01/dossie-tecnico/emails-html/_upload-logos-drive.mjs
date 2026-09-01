// Sobe os arquivos de logo da Rosie pro Google Drive.
// Estratégia: cria a pasta na mesma conta OAuth usada pelo script (google-drive-mcp local).

import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const OAUTH_DIR = join(homedir(), '.config', 'google-drive-mcp');

// -------------------------------------------------------------------------
// Credenciais
// -------------------------------------------------------------------------
const oauthKeys   = JSON.parse(readFileSync(join(OAUTH_DIR, 'gcp-oauth.keys.json'), 'utf8'));
const tokensFile  = JSON.parse(readFileSync(join(OAUTH_DIR, 'tokens.json'), 'utf8'));

const CLIENT_ID     = oauthKeys.installed?.client_id     ?? oauthKeys.web?.client_id;
const CLIENT_SECRET = oauthKeys.installed?.client_secret ?? oauthKeys.web?.client_secret;

const account = tokensFile.accounts?.[tokensFile.defaultAccount ?? 'default'];
const CACHED_ACCESS_TOKEN = account?.accessToken;
const REFRESH_TOKEN       = account?.refreshToken;

async function refreshAccessToken() {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    refresh_token: REFRESH_TOKEN,
    grant_type: 'refresh_token',
  });
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  if (!res.ok) throw new Error(`Refresh falhou: ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}

async function getAccessToken() {
  if (CACHED_ACCESS_TOKEN) {
    const test = await fetch('https://www.googleapis.com/drive/v3/about?fields=user', {
      headers: { Authorization: `Bearer ${CACHED_ACCESS_TOKEN}` },
    });
    if (test.ok) return CACHED_ACCESS_TOKEN;
  }
  return await refreshAccessToken();
}

async function whoami(token) {
  const res = await fetch('https://www.googleapis.com/drive/v3/about?fields=user', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return (await res.json()).user;
}

async function findFolder(token, name, parentId) {
  const q = encodeURIComponent(
    `name = '${name.replaceAll("'", "\\'")}' and mimeType = 'application/vnd.google-apps.folder'` +
    (parentId ? ` and '${parentId}' in parents` : '') +
    ` and trashed = false`
  );
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,parents,webViewLink)&pageSize=5`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) throw new Error(`Search falhou: ${res.status} ${await res.text()}`);
  const { files } = await res.json();
  return files?.[0] ?? null;
}

async function createFolder(token, name, parentId) {
  const metadata = { name, mimeType: 'application/vnd.google-apps.folder' };
  if (parentId) metadata.parents = [parentId];
  const res = await fetch(
    'https://www.googleapis.com/drive/v3/files?fields=id,name,webViewLink,parents',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(metadata),
    }
  );
  if (!res.ok) throw new Error(`Create folder falhou: ${res.status} ${await res.text()}`);
  return await res.json();
}

async function uploadFile(token, filePath, displayName, mimeType, parentId) {
  const bytes = readFileSync(filePath);
  const metadata = { name: displayName, parents: [parentId] };

  const boundary = '-------rosie-logo-upload-' + Math.random().toString(36).slice(2);
  const CRLF = '\r\n';
  const head =
    `--${boundary}${CRLF}Content-Type: application/json; charset=UTF-8${CRLF}${CRLF}` +
    JSON.stringify(metadata) + CRLF +
    `--${boundary}${CRLF}Content-Type: ${mimeType}${CRLF}${CRLF}`;
  const tail = `${CRLF}--${boundary}--${CRLF}`;

  const body = Buffer.concat([
    Buffer.from(head, 'utf8'),
    bytes,
    Buffer.from(tail, 'utf8'),
  ]);

  const res = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink,mimeType,size',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body,
    }
  );
  if (!res.ok) throw new Error(`Upload ${displayName} falhou: ${res.status} ${await res.text()}`);
  return await res.json();
}

// -------------------------------------------------------------------------
// Executa
// -------------------------------------------------------------------------
const token = await getAccessToken();
const user  = await whoami(token);
console.log(`Autenticado como: ${user?.emailAddress ?? user?.displayName ?? '?'}\n`);

// Procura pasta pai "06 | Rosie"; se não achar na conta, cria "Rosie" na raiz
let rosieFolder = await findFolder(token, '06 | Rosie', null);
if (!rosieFolder) {
  console.log('Não achei "06 | Rosie" nesta conta. Procurando "Rosie"...');
  rosieFolder = await findFolder(token, 'Rosie', null);
}
if (!rosieFolder) {
  console.log('Criando pasta "Rosie" na raiz...');
  rosieFolder = await createFolder(token, 'Rosie', null);
}
console.log(`Pasta pai: ${rosieFolder.name} → ${rosieFolder.webViewLink}`);

// Procura ou cria subpasta "Logo"
let logoFolder = await findFolder(token, 'Logo', rosieFolder.id);
if (!logoFolder) {
  logoFolder = await createFolder(token, 'Logo', rosieFolder.id);
  console.log(`Criada subpasta: Logo → ${logoFolder.webViewLink}`);
} else {
  console.log(`Subpasta existente: Logo → ${logoFolder.webViewLink}`);
}
console.log('');

// -------------------------------------------------------------------------
// Upload
// -------------------------------------------------------------------------
const ROSIE = 'C:\\Kolden\\sobre-a-empresa\\Projetos\\Ativos\\rosie';
const FILES = [
  { path: join(ROSIE, 'assets', 'logo', 'logotipo-preferencial.png'),
    name: '01-logotipo-preferencial.png', mime: 'image/png' },
  { path: join(ROSIE, 'assets', 'logo', 'logotipo-monocromatico.png'),
    name: '02-logotipo-monocromatico.png', mime: 'image/png' },
  { path: join(ROSIE, 'assets', 'logo', 'reducao-e-area-de-protecao.png'),
    name: '03-guia-reducao-e-area-de-protecao.png', mime: 'image/png' },
  { path: join(ROSIE, 'assets', 'logo', 'usos-incorretos.png'),
    name: '04-guia-usos-incorretos.png', mime: 'image/png' },
  { path: join(ROSIE, 'apresentacao-bruno-2026-07-01', 'dossie-tecnico', 'emails-html', 'assets', 'logo-rosie.png'),
    name: '05-logo-rosie-email-600px-limpa.png', mime: 'image/png' },
  { path: join(ROSIE, 'Manual da Marca Rosie.pdf'),
    name: '06-Manual-da-Marca-Rosie-completo.pdf', mime: 'application/pdf' },
];

const results = [];
for (const f of FILES) {
  try {
    const info = await uploadFile(token, f.path, f.name, f.mime, logoFolder.id);
    const sizeKB = info.size ? Math.round(info.size / 1024) : '?';
    console.log(`  ✓ ${info.name}  (${sizeKB} KB)`);
    console.log(`      ${info.webViewLink}`);
    results.push({ ok: true, ...info });
  } catch (err) {
    console.error(`  ✗ ${f.name}: ${err.message.slice(0, 200)}`);
    results.push({ ok: false, name: f.name, error: err.message });
  }
}

console.log(`\n📁 PASTA: ${logoFolder.webViewLink}`);
console.log(`Concluídos: ${results.filter(r => r.ok).length}/${results.length}`);
