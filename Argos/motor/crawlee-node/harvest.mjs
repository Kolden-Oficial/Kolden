// Camada JS do motor Argos — runner Crawlee (PlaywrightCrawler) para páginas com JS pesado.
// Invocado pela fachada: `node harvest.mjs <URL>`. Emite JSON em stdout com fonte + timestamp.
// Opera em ZONA VERDE (sem login). A zona ToS-cinza vive em ../../modulo-cinza/.
import { PlaywrightCrawler } from 'crawlee';

const url = process.argv[2];
if (!url) {
  console.error('uso: node harvest.mjs <URL>');
  process.exit(2);
}

const resultado = { fonte: url, timestamp_coleta: new Date().toISOString(), modo: 'verde', dados: null, erro: null };

const crawler = new PlaywrightCrawler({
  maxRequestsPerCrawl: 1,
  headless: true,
  async requestHandler({ page, request }) {
    const titulo = await page.title();
    // Extração exaustiva de links da página renderizada, deduplicada.
    const links = await page.$$eval('a[href]', (as) => Array.from(new Set(as.map((a) => a.href))));
    resultado.dados = { titulo, url_final: request.loadedUrl, links_total: links.length, links };
  },
  failedRequestHandler({ request }) {
    resultado.erro = `falha ao carregar ${request.url}`;
  },
});

try {
  await crawler.run([url]);
} catch (e) {
  resultado.erro = String(e);
}
console.log(JSON.stringify(resultado));
process.exit(resultado.erro ? 1 : 0);
