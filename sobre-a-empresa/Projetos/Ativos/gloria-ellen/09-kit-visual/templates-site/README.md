# Template de site — Glória Ellen

> Template de referência da marca Glória Ellen. Página única (`home.html`) que serve tanto de **prova visual do kit** quanto de **ponto de partida** para o site definitivo. Consome os tokens oficiais do kit visual — todo o restante do site herda a paleta, tipografia e textura da marca.

**Versão:** v1.0
**Data:** 2026-07-02
**Autor:** Harmonia (ui-engineer · sistema-de-design · anti-slop)

---

## 1. Estrutura de arquivos

```
09-kit-visual/
├── tokens/
│   ├── tokens.css              ← fonte da paleta e escala (importado)
│   └── tokens.json             ← camada semântica DTCG
├── tipografia/
│   └── type-system.css         ← Google Fonts + classes (importado)
├── logo/
│   ├── logo.svg                ← logotipo mestre
│   ├── logo-ink.svg            ← logo em ink (fundo creme)
│   └── logo-cream.svg          ← logo em creme (fundo escuro)
└── templates-site/             ← você está aqui
    ├── home.html               ← página completa autocontida
    ├── styles.css              ← CSS específico da home (importa tokens + tipografia)
    └── README.md               ← este arquivo
```

O template é **autocontido**: basta um navegador moderno para abrir. Nenhuma dependência de build, framework ou servidor.

---

## 2. Como abrir localmente

**Windows** — duplo-clique em `home.html`. O navegador padrão vai abrir. As fontes do Google Fonts e os SVGs do logo carregam automaticamente por caminhos relativos.

**PowerShell:**

```powershell
Start-Process "C:\Kolden\projects\gloria-ellen\09-kit-visual\templates-site\home.html"
```

**macOS/Linux (se um dia rodar):**

```bash
open home.html      # macOS
xdg-open home.html  # Linux
```

**Servir com servidor local** (opcional, útil pra testar em mobile via IP da rede):

```powershell
# Python 3
cd C:\Kolden\projects\gloria-ellen\09-kit-visual\templates-site
python -m http.server 8080

# Node (npx)
npx serve .
```

Depois abrir `http://localhost:8080` no navegador.

---

## 3. Como substituir os placeholders de foto

Todos os placeholders visuais são `<div>` com gradiente da paleta oficial + comentário HTML apontando o que trocar. A busca é direta:

### 3.1 Hero (foto de amanhecer)

No `home.html`, localizar:

```html
<div class="hero__bg-placeholder" aria-hidden="true"></div>
```

Substituir por:

```html
<img class="hero__bg" src="hero.jpg"
     alt="Amanhecer no litoral catarinense, luz dourada sobre o mar" />
```

E adicionar em `styles.css`, dentro do bloco `.hero`:

```css
.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### 3.2 Sobre (retrato lateral)

Localizar:

```html
<div class="sobre__foto-placeholder" role="img" aria-label="..."></div>
```

Substituir por:

```html
<img class="sobre__foto" src="sobre.jpg" alt="Glória Ellen ao amanhecer" />
```

E acrescentar no CSS:

```css
.sobre__foto {
  aspect-ratio: 4 / 5;
  width: 100%;
  object-fit: cover;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-subtle);
}
```

### 3.3 Portfólio (9 ensaios)

Cada bloco do grid é um `<article class="portfolio-item portfolio-item--N">`. Adicionar uma `<img>` **antes** do `<span class="portfolio-item__label">`:

```html
<article class="portfolio-item portfolio-item--1" ...>
  <img class="portfolio-item__foto" src="ensaio-01.jpg" alt="..." />
  <span class="portfolio-item__label">Ensaio · Praia Central</span>
</article>
```

Adicionar em `styles.css`:

```css
.portfolio-item__foto {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
.portfolio-item__label {
  z-index: 2; /* já é 1, subir para 2 pra ficar sobre a foto */
}
```

Enquanto as fotos não chegam, os gradientes servem como **stubs de composição** — a paleta já está calibrada para o site inteiro.

---

## 4. Como estender para outras páginas

A `home.html` é a **página-mãe**. Novas páginas herdam a mesma base — só o conteúdo central muda.

### 4.1 Sugestão de arquitetura

```
templates-site/
├── home.html          ← já existe (essa)
├── sobre.html         ← manifesto longo + biografia + prêmios
├── portfolio.html     ← galeria completa, filtrável por ensaio
├── ensaio.html        ← página de detalhe de um ensaio (template)
├── contato.html       ← só formulário + WhatsApp + agenda
└── styles.css         ← compartilhado
```

### 4.2 Receita para uma página nova

1. Copiar `home.html` como base.
2. Manter o `<head>` inteiro e a estrutura de `<nav>` (agora sem `.hero`, e com fundo `var(--color-background-default)` em vez de imagem).
3. Substituir o miolo `<main>` pela seção específica da página.
4. Manter o `<footer>` idêntico.
5. **Não criar novo CSS** — se um padrão se repete, adicioná-lo em `styles.css` com uma classe reutilizável (`.pagina-interna`, por exemplo).

### 4.3 Nav em páginas internas

Trocar o item da nav para ancorar em página, não em âncora:

```html
<li><a href="sobre.html">Sobre</a></li>
<li><a href="portfolio.html">Portfólio</a></li>
```

E ajustar o link do logo: `<a href="home.html" class="nav__logo">`.

---

## 5. Deploy sugerido

Ordenados do mais simples ao mais robusto — todos servem para site estático de fotógrafa autônoma.

### 5.1 Vercel (recomendado)

1. Criar conta em [vercel.com](https://vercel.com).
2. Arrastar a pasta `templates-site/` (renomeada para `site/` ou `gloria-ellen/`) sobre a área "Deploy".
3. Vercel gera uma URL `https://gloria-ellen.vercel.app`.
4. Domínio próprio (`gloriaellen.com`): apontar DNS conforme instrução da Vercel.

### 5.2 Netlify

Idêntico à Vercel — [netlify.com](https://app.netlify.com/drop) tem "drag & drop" na home.

### 5.3 GitHub Pages

1. Criar repositório `gloria-ellen-site` no GitHub.
2. Fazer commit dos arquivos.
3. Em Settings → Pages, escolher branch `main` como fonte.
4. URL: `https://<usuario>.github.io/gloria-ellen-site`.

### 5.4 Hospedagem tradicional (cPanel, Hostinger, HostGator)

Fazer upload de `home.html`, `styles.css`, `README.md` e das pastas `tokens/`, `tipografia/`, `logo/` (referenciadas por caminhos relativos) para o diretório `public_html/`. **Manter a estrutura de pastas.** O site fica em `https://seudominio.com`.

---

## 6. O que trocar antes de publicar

Checklist rígido — nada disso deve sair como está:

- [ ] `hero.jpg` — foto real de amanhecer no litoral, alta resolução (≥ 2560px de largura).
- [ ] `sobre.jpg` — retrato ou foto da Glória, proporção 4:5.
- [ ] 9 fotos de portfólio — mesmo padrão 4:5, tratamento igual.
- [ ] E-mail em `mailto:contato@gloriaellen.com` — substituir pelo real.
- [ ] `https://instagram.com/gloriaellen` — substituir pelo perfil correto.
- [ ] Textos do bloco **Sobre** — a Glória revisa a voz (rodar contra `guia-de-estilo-master.md`, filtro §17).
- [ ] Nomes dos 9 ensaios no portfólio — trocar pelos ensaios reais publicados.
- [ ] Data do capítulo **Estreia no Vale** — se a campanha rolar em outra janela, ajustar o `<span class="eyebrow">`.
- [ ] Após 14/07/2026 — remover ou arquivar a seção **Estreia no Vale** (é capítulo temporal, não peça evergreen — ver guia §16).
- [ ] Meta description em `<meta name="description" ...>` — hoje é um resumo neutro; pode ser refinado com foco em SEO local ("Blumenau", "Balneário Camboriú", "SC").
- [ ] Rodar Lighthouse — mirar ≥ 95 em Acessibilidade e ≥ 90 em Performance.

---

## 7. Referência aos tokens

**Ponto de virada mais importante deste template:** ele não tem uma cor sequer hardcoded. Todo hex, toda fonte, todo espaçamento vem de variáveis CSS definidas em `../tokens/tokens.css`.

**Consequência prática:** para mudar a paleta inteira do site — por exemplo, migrar o azul-mar `#3D5A6C` para um azul um pouco mais frio — basta editar UMA linha em `tokens/tokens.css`:

```css
--color-brand-primary: #3D5A6C; /* trocar aqui */
```

E o site inteiro reflete: hero, portfólio, botão, links, foco de formulário, gradientes do portfólio. Mesmo raciocínio vale para tipografia (`--font-family-serif`), escala de espaço (`--space-*`) e textura (`--texture-filmgrain`).

Nunca escrever hex direto no `styles.css`. Se aparecer uma cor nova recorrente, ela vira token — não exceção.

---

## 8. Anti-slop — o que este template NÃO é

Registrado aqui para que o próximo agente/humano que estender o site não introduza:

- Gradientes tipo "aurora borealis" multicolor.
- Botão pill com sombra colorida.
- Card com backdrop-blur exagerado ou glassmorphism performático.
- Hero com pergunta genérica de SaaS ("Ready to transform your photography journey?").
- Padding de "60px 120px" sem tokens.
- Emoji decorativo em CTA (❤️🔥✨).
- Bold pesado em título (700+).
- Cor de link azul-default do browser.
- Formulário só com placeholder e sem label.
- CAPS em título Cormorant (só em eyebrow Inter, sempre).

Se algum dia aparecer, é rejeição na revisão — o brandbook e este template são a régua.

---

## 9. Referências cruzadas

- **Tokens:** `../tokens/tokens.css` · `../tokens/tokens.json`
- **Tipografia:** `../tipografia/type-system.css`
- **Logo:** `../logo/logo-cream.svg` (hero, seções escuras) · `../logo/logo-ink.svg` (rodapé, seções claras)
- **Guidelines:** `../brand-guidelines-de-uso.md` — regras de aplicação
- **Brandbook:** `../../08-brandbook/brandbook.html` — fonte da verdade
- **Voz:** `../../08-brandbook/guia-de-estilo-master.md` — filtro dos textos deste template

---

## 10. Governança

- **v1.0 · 2026-07-02** — versão inicial, feita como prova viva do kit visual e ponto de partida do site.
- Alteração estrutural (nova seção, mudança de layout) exige atualização deste README.
- Alteração de token ou fonte é feita nos arquivos de tokens/tipografia, nunca aqui.
- Cada nova página herda os mesmos arquivos importados no topo do `styles.css`.

---

**Fim do documento · Glória Ellen · Template de site · v1.0 · 2026-07-02**
