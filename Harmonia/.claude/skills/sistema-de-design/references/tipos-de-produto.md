# Tipos de produto (chave primária da decisão)

O tipo de produto restringe estilo, paleta, densidade e tom antes de qualquer
escolha estética. A base original cataloga 161 tipos com regras de raciocínio
(`ui-ux-pro-max/data/products.csv` + `ui-reasoning.csv`, MIT). Famílias principais:

- **SaaS (General)** e **Micro SaaS** — confiança + CTA contrastante; azul/índigo
  primário, laranja/esmeralda como acento de ação.
- **E-commerce** / **E-commerce Luxury** — foco em produto e conversão; luxo pede
  paleta sóbria e tipografia editorial.
- **B2B Service** — sério, credível, baixa variância visual.
- **Financial Dashboard** / **Analytics Dashboard** / **Fintech/Crypto** —
  densidade alta, tokens semânticos por estado (alta/baixa, lucro/perda).
- **Healthcare App** — calma, acessibilidade crítica, contraste reforçado.
- **Educational App** — clareza, hierarquia, baixa carga cognitiva.
- **Creative Agency** / **Portfolio/Personal** — alta expressão, espaço para
  risco estético (calibrar com `julgamento-estetico-anti-slop`).
- **Gaming** — imersivo, dark, motion intenso.
- **Government/Public Service** — confiança máxima, padrões oficiais (GOV.UK /
  USWDS), variância baixíssima.
- **Social Media App** / **Creator Economy Platform** — feed, denso, mobile-first.
- **Productivity Tool** — eficiência, atalhos, densidade média-alta.
- **Design System/Component Library** — neutralidade, documentação, tokens à mostra.
- **AI/Chatbot Platform** — conversacional, estados de carregamento/streaming.
- **NFT/Web3 Platform** — vibrante, dark, alto contraste.

**Regra de ouro:** quando o tipo de produto e a vibe do briefing conflitam (ex.:
"governo divertido"), o tipo de produto e suas restrições de confiança/acesso
vencem. Estética nunca derruba acessibilidade.
