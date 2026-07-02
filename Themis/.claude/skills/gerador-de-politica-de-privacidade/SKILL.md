---
name: gerador-de-politica-de-privacidade
description: Use quando o pedido for gerar, revisar ou atualizar uma política de privacidade multi-jurisdicional (GDPR/LGPD/CCPA-CPRA) ou termos de uso relacionados. Cobre identificação do controlador, finalidades declaradas, bases legais das 10 do Art. 7 LGPD, compartilhamento, retenção, direitos do titular, canal do DPO e matriz de aplicação por jurisdição. Gatilhos "política de privacidade", "privacy policy", "termos de uso relativos a dado", "cookie policy", "revisar política existente", "adaptar política para CCPA", "matriz de jurisdições". NÃO substitui parecer de advogado — é gerador operacional. Dono operacional exclusivo desta habilidade — `analista-de-compliance-regulatorio` (Themis).
---

# Gerador de Política de Privacidade Multi-Jurisdicional

> **Nota de sintonia com Themis:** habilidade operacional transversal SOB a chancela do board consultivo. Não cria persona conselheira nova.

## Escopo

Gera uma política de privacidade que atende **simultaneamente** LGPD, GDPR e CCPA/CPRA — com sub-blocos condicionais por jurisdição quando as leis divergem.

## Regra dura

**Nenhuma política é publicada sem os 9 blocos obrigatórios.** Se faltar um, o gerador PARA e reporta gap.

## Blocos obrigatórios

### Bloco 1 — Identificação do controlador

- Razão social + CNPJ (BR) ou VAT (UE) ou entidade legal (US).
- Endereço físico + eletrônico.
- Representante em cada jurisdição (Art. 27 GDPR exige representante UE se controlador é extraterritorial).

**Fonte legal:** LGPD Art. 9 I; GDPR Art. 13(1)(a); CCPA §1798.130.

### Bloco 2 — Finalidades declaradas

Lista taxativa. Cada finalidade tem:
- Descrição em linguagem clara (LGPD Art. 6 VI — transparência).
- Base legal correspondente (das 10 do Art. 7 LGPD / 6 do Art. 6 GDPR — ver skill `framework-gdpr-lgpd`).
- Categoria de dado usada.
- Prazo de retenção.

**Anti-padrão:** finalidade genérica tipo "melhorar nossos serviços" — inválida. Precisa ser específica.

### Bloco 3 — Bases legais (matriz)

Tabela obrigatória vinculando **finalidade × base legal × categoria de dado**. Sem essa matriz, a política falha no teste de accountability (LGPD Art. 6 X).

| Finalidade | Categoria | Base LGPD | Base GDPR | Base CCPA |
|---|---|---|---|---|
| Cadastro para acesso ao produto | Dado comum | Art. 7 V (contrato) | Art. 6(1)(b) | Business purpose |
| Marketing por email | Dado comum | Art. 7 IX (legítimo interesse + LIA) | Art. 6(1)(f) + opt-out | Sale/share disclosure |
| Análise de comportamento no site | Dado comum | Art. 7 IX + cookie consent | Art. 6(1)(a) — ePrivacy | Do Not Sell/Share |

### Bloco 4 — Compartilhamento com terceiros

Lista taxativa de operadores/processadores + países + finalidade. Cada terceiro exige contrato Art. 39 LGPD / Art. 28 GDPR (DPA — Data Processing Agreement).

**CCPA-específico:** distinguir "sale" vs "share" vs "service provider" (§1798.140). Cada categoria tem regra de opt-out diferente.

### Bloco 5 — Retenção

Prazo por finalidade + critério de eliminação. LGPD Art. 15 lista causas de término (fim da finalidade, revogação de consentimento, determinação da ANPD, direito do titular).

**Anti-padrão:** "guardaremos enquanto for necessário" — inválido, precisa prazo objetivo.

### Bloco 6 — Direitos do titular

Enumera os direitos (Art. 18 LGPD, Cap. III GDPR, §1798.100+ CCPA) e o canal de exercício. Prazos de resposta: LGPD 15 dias (Art. 19); GDPR 1 mês (Art. 12(3)); CCPA 45 dias (§1798.130).

### Bloco 7 — Canal do DPO / Privacy Officer

Nome + email + endereço postal. LGPD Art. 41 §1º exige divulgação pública. GDPR Art. 37(7) idem. CCPA exige contato para exercer direitos (§1798.130(a)(1)(A)).

### Bloco 8 — Transferência internacional

Se há: declarar países + base legal (ver skill `framework-gdpr-lgpd`, seção Transferência internacional). Se não há: declarar explicitamente que não transfere.

### Bloco 9 — Data e histórico de mudanças

- Data da última atualização (obrigatório GDPR/LGPD).
- Log de mudanças materiais dos últimos 24 meses (recomendação: exigência CCPA §1798.130(a)(5)(A)).
- Regra: mudança material em base legal ou finalidade exige aviso proativo ao titular (não silente).

## Matriz de jurisdições — quando aplicar

| Jurisdição | Aplica se | Sub-bloco condicional |
|---|---|---|
| **LGPD** | Kolden brasileira OU tratamento no BR OU oferta a titular BR | 100% dos blocos + linguagem PT-BR obrigatória |
| **GDPR** | Titular UE OU oferta bens/serviços UE OU monitoramento UE | Bloco de representante UE (Art. 27) + linguagem clara (Art. 12) |
| **CCPA/CPRA** | Empresa que atende residente CA + receita anual ≥ $25M OU vende/compartilha dado de ≥100k consumidores CA | Bloco "Do Not Sell/Share" + "Right to Limit Sensitive PI" (CPRA) + link no rodapé |
| **CO/UT/VA/CT/etc.** | Idem CCPA para outros estados US | Roadmap: cobrir com bloco "State Privacy Rights" genérico |

## Fluxo do gerador

1. **Diagnóstica** jurisdições aplicáveis (usar decisão do Bloco 1 da skill `framework-gdpr-lgpd`).
2. **Preenche** os 9 blocos com base nos insumos do controlador.
3. **Ativa sub-blocos condicionais** por jurisdição.
4. **Valida** contra checklist de gap (abaixo).
5. **Sinaliza** riscos residuais e handoffs (contrato de DPA precisa ser assinado com cada operador).

## Checklist de gap (10 pontos)

- [ ] Todos os 9 blocos preenchidos, nenhum vazio.
- [ ] Matriz finalidade × base legal × categoria fechada (nenhuma linha órfã).
- [ ] Todas as finalidades específicas (nenhuma "para melhorar serviços").
- [ ] Todos os prazos de retenção objetivos (nenhum "enquanto necessário").
- [ ] Todos os operadores listados + país + finalidade.
- [ ] DPO/Privacy Officer com email verificável.
- [ ] Canal de exercício de direitos funcional (testado).
- [ ] Linguagem clara + PT-BR quando LGPD aplica (não "juridiquês").
- [ ] Data de atualização visível.
- [ ] Log de mudanças materiais.

## Anti-padrões que reprovam

- Copy-paste de template genérico sem adaptar ao produto real.
- Consentimento como base legal universal ("aceite ou saia") — abusivo, inválido.
- Menção a "compartilhamos com parceiros" sem lista taxativa.
- Cláusula "podemos mudar esta política a qualquer momento sem aviso" — inválida em GDPR/LGPD.
- Cookie banner sem opção real de recusa (dark pattern — sancionado EDPB Guidelines 03/2022).

## Handoff obrigatório com Égide

Ver `framework-gdpr-lgpd` — nota pendente para O5 sobre bloco de escalação no `cyber-chief` (Égide).

## Referências

- Lei nº 13.709/2018 (LGPD) — planalto.gov.br
- Regulamento UE 2016/679 (GDPR) — eur-lex.europa.eu
- California Consumer Privacy Act (CCPA) 2018 + CPRA 2020 — oag.ca.gov/privacy/ccpa
- EDPB Guidelines 03/2022 on dark patterns in social media — edpb.europa.eu
- Resolução CD/ANPD nº 2/2022 (encarregado) — gov.br/anpd
- Bioni, B.R. *Proteção de Dados Pessoais* (Forense, 2019)
- Cavoukian, A. *Privacy by Design* (IPC-Ontario, 2011)

---

*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B10/support — capacidade G18.*
