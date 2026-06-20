# KOLDEN — Guia de instalação e uso

> "No princípio era o Caos." Tudo que existe neste repositório nasce dele.

## O que é isto
O Kolden é a sua fábrica de agentes. O **Caos** é o meta-agente que vive
aqui: você descreve o agente que quer, ele conduz o diagnóstico por 7 faculdades,
pesquisa as melhores práticas, desenha a arquitetura, gera o PRD de IA e constrói
o agente completo — tudo em português, com nome da mitologia grega.

Cada agente criado nasce como uma pasta irmã do Caos em `C:\Kolden\<NomeMitológico>\`
e é um projeto Claude Code independente — abrir essa pasta no Claude Code significa
operar o agente.

## Instalação (5 minutos)

1. Coloque a pasta `C:\Kolden\Caos\` onde preferir no seu computador.

2. Dê permissão de execução aos reflexos (uma vez só):
   ```bash
   chmod +x C:\Kolden\Caos\.claude\reflexos\*.sh
   ```

3. Inicie o versionamento:
   ```bash
   cd C:\Kolden\Caos
   git init
   git add .
   git commit -m "Kolden v3.0 — nasce o Caos"
   ```

4. Abra o Claude Code dentro da pasta:
   ```bash
   claude
   ```
   Você verá a mensagem "KOLDEN ATIVO — Caos pronto" (reflexo de sessão).

## Como criar um agente

Basta falar com o Caos em linguagem natural:

```
Caos, quero criar um agente gestor de tráfego pago
```

Ou usar o comando slash:

```
/caos gestor de tráfego pago
```

O Caos então conduz o **Ritual de Criação** em 9 fases:

| Fase | O que acontece | Quem executa |
|---|---|---|
| 0. Consulta ao Registro | Reusar antes de criar (REUSE > ADAPT > CREATE) | especialista curador |
| 1. Diagnóstico | 7 rodadas por faculdade + nome mitológico + modos de falha | habilidade + especialista diagnosticador |
| 2. Pesquisa | Estado da arte ao vivo + benchmarking de referências | especialista pesquisador |
| 3. Arquitetura | Decide solo vs squad + camadas | especialista arquiteto |
| 4. PRD de IA | Documento formal — **VOCÊ aprova** | habilidade geracao-de-prd |
| 5. Construção | Arquivos em `C:\Kolden\<NomeMitológico>\` | habilidades de criação |
| 6. Revisão | Auditoria contra checklist + Constituição | especialista revisor |
| 7. Teste de Comportamento | Smoke tests + maturity score ≥ 7.0 | especialista testador |
| 8. Entrega + Registro | Resumo + registra entidade e padrões | Caos + curador |

## Mapa do repositório

```
C:\Kolden\
├── Caos\                       ← este projeto (o meta-agente)
│   ├── CLAUDE.md               ← identidade e operação do Caos
│   ├── constituicao.md         ← 7 princípios inegociáveis com gates por fase
│   ├── leia-me.md              ← este arquivo
│   ├── glossario.md            ← glossário de termos do Kolden
│   ├── .claude/
│   │   ├── settings.json       ← configuração dos reflexos
│   │   ├── reflexos/           ← scripts de proteção, auditoria e sessão
│   │   ├── commands/           ← /caos, /squad, /vigia
│   │   ├── agents/             ← especialistas do Caos (curador, revisor, etc.)
│   │   └── skills/             ← habilidades do Caos + catalogo.md
│   ├── modelos/                ← templates reutilizáveis
│   ├── dados/                  ← registry, padrões aprendidos, estado da arte
│   ├── referencias/            ← achados validados pelo vigia (score ≥8)
│   │   ├── agentes/            ← exemplos de agentes aprovados
│   │   ├── prompts/            ← coleções de prompts aprovadas
│   │   ├── artigos/            ← papers e posts salvos
│   │   └── ferramentas/        ← docs de ferramentas/MCPs relevantes
│   └── registros/              ← auditoria, histórico e digests do vigia
├── <NomeMitológico>\           ← agentes criados nascem aqui
└── <NomeMitológico>\           ← cada pasta é um projeto Claude Code independente
```

## Dicas de operação

- **Mantenha o estado da arte fresco.** Rode `/vigia` periodicamente: ele varre MCPs,
  ferramentas, modelos, comunidade e GitHub, gera um digest em `registros/vigia/` e atualiza
  `dados/estado-da-arte.md` — que o pesquisador lê para construir agentes sobre o que há de mais novo.
  Achados com score ≥8 são salvos automaticamente em `referencias/`.
- **O PRD é a fonte da verdade.** Quer mudar um agente? Mude o PRD
  primeiro e peça ao Caos para propagar.
- **Reflexos são lei.** Se o Caos for bloqueado tentando algo, é o guardrail
  funcionando — ajuste o reflexo conscientemente se precisar.
- **Verificação diária:** ao abrir o Caos (ou qualquer agente criado), o reflexo de sessão
  verifica automaticamente se os documentos estão alinhados (se passaram >24h).
- **Sessões longas:** o Ritual completo pode levar horas em agentes complexos. Use
  `/compact` se o contexto crescer demais; o estado vive nos arquivos, não na conversa.
- **Evolução do Kolden:** o próprio Kolden é um agente — melhore o CLAUDE.md, as
  habilidades e os especialistas conforme aprender. Versione tudo.

## Roadmap

### Versão atual
- **v3.1** (2026-06-17) — KPIs do Caos, glossário centralizado, roadmap expandido e pontas abertas
- **v3.0** (2026-06-12) — fundação: terminologia PT, arquitetura de irmãos, Constituição v2.1.0, verificação diária

### Próximas versões
- **v3.2** — primeiro agente real criado; validação end-to-end do Ritual + refinamento das rodadas de diagnóstico
- **v3.3** — feedback loop: curador captura lições após Fase 7 e atualiza `dados/catalogo-de-padroes.yaml` automaticamente
- **v3.4** — relatório de saúde: dashboard textual com entidades criadas, scores médios, taxa de reuso

### Visão de longo prazo
- **v4.0** — Caos como runtime portável: desamarrar do Claude Code, executar sobre qualquer modelo via OpenRouter (ver `nucleo/ARQUITETURA.md`)
- **v5.0** — multi-tenant: Caos como fábrica compartilhada para times, cada time com seu registry e Constituição

## Pontas abertas

Decisões pendentes que precisam ser resolvidas conforme o Kolden evolui.

| # | Decisão | Impacto | Status |
|---|---|---|---|
| 1 | Runtime model-agnostic (núcleo Python) | Portabilidade do Caos para além do Claude Code | Esboço em `nucleo/ARQUITETURA.md` |
| 2 | Ferramenta de transcrição de mídia (VSL/TSL) | Capacidade de análise de vídeo para agentes copy | A definir |
| 3 | Tecnologia de swipe store | Memória de peças de copy coletadas entre sessões | A definir |
| 4 | Estratégia multi-tenant | Distribuir a fábrica para times | Roadmap v5.0 |
| 5 | Primeiro agente real criado | Validação end-to-end do Ritual | Roadmap v3.2 |
