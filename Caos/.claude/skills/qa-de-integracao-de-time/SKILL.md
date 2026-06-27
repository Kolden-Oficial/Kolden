---
name: qa-de-integracao-de-time
description: Use ao verificar um squad/time recém-construído (ou um software gerado por um time de agentes) onde cada componente está "certo" sozinho mas a junção pode estar quebrada — agents que apontam para skills inexistentes, CLAUDE.md fora de sincronia com agents/, ou, em código, resposta de API que não casa com o tipo do hook. Foca em descasamento de contrato entre componentes, não na correção isolada de cada um.
---

# QA de coerência de integração

O defeito mais frequente em sistema montado por partes não está **dentro** de um componente —
está na **junção** entre dois que foram validados isoladamente. Esta habilidade dá ao revisor
(do Caos ou do `qa-loop` do Prometeu) o método de **comparação cruzada**: ler os dois lados de
cada fronteira e conferir se o contrato bate. Aplica-se a dois alvos:
1. **Time de agentes do Kolden** — `agents/` ↔ `.claude/skills/` ↔ `CLAUDE.md`/roster ↔
   `routing-catalog.yaml`. Reforça `verificacao-de-alinhamento` e `auditoria-de-squad`.
2. **Software gerado por um time de agentes** — API ↔ hook, rota ↔ href, mapa de estado ↔ código.

## Por que a revisão isolada não pega
- **Verificar existência ≠ verificar conexão.** "A skill X existe?" é diferente de "o agente que a
  cita está realmente ligado a ela e o gatilho casa?".
- **Build passar ≠ funcionar.** Em código, cast genérico/`any` faz o compilador aprovar um
  contrato que falha em runtime. Em time de agente, um `roster:` declarado não prova que cada
  membro existe em `agents/` com o nome certo.
- Cada lado, lido sozinho, parece correto. O defeito só aparece **comparando os dois**.

## Princípio central: leia os DOIS lados, junto
Para pegar bug de fronteira, nunca leia um lado só. Sempre:
- a definição do agente **e** a habilidade que ele invoca, juntas;
- o `roster:` do orquestrador **e** os arquivos reais em `agents/`, juntos;
- o `routing-catalog.yaml` **e** as `description` das habilidades que ele roteia, juntos;
- (código) a rota da API **e** o hook que a consome, juntos.

## Catálogo de descasamentos de fronteira (boundary mismatch)
Tipos recorrentes e como cada um escapa — tabela completa, com a versão "time de agentes" de cada
linha, em **`references/checklist-de-coerencia.md`**. Resumo:

| Fronteira | Descasamento típico | Por que escapa |
|---|---|---|
| `roster:` → `agents/` | orquestrador cita membro que não existe como arquivo | conferir só que o roster está preenchido, não 1:1 com os arquivos |
| agente → habilidade | agente referencia skill cujo nome/diretório não bate | skill existe em outro nome; "existe alguma skill?" passa |
| `routing-catalog` → `description` | keyword roteia para skill cuja `description` não cobre o caso | listas conferidas em separado |
| habilidade → habilidade relacionada | "ver `cro`" aponta para skill renomeada/ausente | cross-ref nunca testado |
| (código) resposta API → tipo do hook | API devolve `{ projects: [...] }`, hook espera `Project[]` | cast genérico engana o compilador |
| (código) caminho de arquivo → href | página em `/dashboard/create`, link para `/create` | estrutura e href não cruzados |

## Verificação por comparação cruzada (passo a passo)
Para cada fronteira do alvo:
1. **Extraia o lado A** (ex.: liste todo `name:` em `agents/*.md`; ou todo `NextResponse.json()`).
2. **Extraia o lado B** (ex.: todo membro citado no `roster:`; ou todo `fetchJson<T>`).
3. **Compare 1:1.** Cada item de A tem par em B? O formato/contrato bate?
4. **Sinalize os órfãos** dos dois lados: item em A sem uso em B (morto/esquecido?) e item em B
   sem origem em A (referência quebrada). Decida se é intencional ou defeito.

## Como rodar o QA (design do agente revisor)
- **Tipo `general-purpose`, não `Explore`.** QA eficaz precisa de Grep para varrer padrões e, às
  vezes, corrigir — `Explore` só lê. Protocolo do agente: **verificar → reportar → pedir correção**.
- **Checklist forte > checklist fraco.** Prefira "o contrato de A casa com a expectativa de B?" a
  "A existe?". Comparação cruzada antes de existência.
- **QA incremental, não só no fim.** Rode a coerência **a cada módulo/camada concluída**, não só
  na entrega — bug de fronteira cedo se propaga e encarece. No Ritual, encaixa entre as etapas da
  cascata 5.x, não só na Fase 6.

## Saída
Relatório por fronteira: `lado A | lado B | casa? | evidência | ação`. Órfãos listados
explicitamente (nada some). Severidade: crítico (referência quebrada que impede operar) /
importante (drift que confunde) / menor (limpeza). Sem alegar "coerente" sem ter lido os dois
lados de cada fronteira.

## Habilidades relacionadas
- Pontas soltas dentro de UM agente (refs, ferramentas sem prompt, credenciais): `verificacao-de-alinhamento`.
- Diff arquivo-a-arquivo contra benchmark/padrão-ouro: `auditoria-de-squad`.
- Escolher a topologia que está sendo verificada: `topologias-de-time`.
- Validar uma habilidade individual (A/B, trigger): `validacao-de-skill`.

---
*Fonte absorvida (princípio extraído, reescrito em PT-BR e re-mapeado para o domínio "time de
agentes", sem cópia literal): `revfactory--harness@cceac68e` —
`skills/harness/references/qa-agent-guide.md` (boundary mismatch, verificação de coerência de
integração, "ler os dois lados", QA incremental, design do agente QA). Original em coreano.
Apache-2.0. Uso interno Kolden.*
