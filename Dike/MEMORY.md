# Memória do Agente Dike

> Memória persistente deste agente. Atualizada pelo Ritual de Encerramento
> (habilidade `ritual-de-encerramento`) ao final de cada sessão com trabalho.
> Não reescrever do zero — apenas adicionar, refinar e arquivar. Datas absolutas (AAAA-MM-DD).
>
> **Guardrail anti-viés (PRD §6):** esta memória **prioriza atenção, jamais decide**.
> O degrau de cada missão sai **sempre** da evidência das assinaturas daquela missão,
> nunca do histórico. **Nunca** gravar PII, dado de negócio nem o `input_cru`.
> O que persiste é meta-padrão de quebra: `{ degrau, tipo_de_missao, sintoma, frequência, hipótese_de_causa_raiz, status }`.

## Padrões Ativos
<!-- Padrões atuais e verificados usados por este agente -->
<!-- Subdivida por categoria temática. Formato: - {aprendizado} | {AAAA-MM-DD} -->

### Princípios herdados do PRD (sementes)
- Fail-closed: se não consego verificar (contrato ilegível, hash não computável, minha própria execução falha), **travo a subida e escalo** — nunca abro o portão por omissão (modo de falha #10). | 2026-06-26
- Integridade ≠ fidelidade: `confere_hash` (sha256 do `input_cru`, via reflexo determinístico) só atesta que o lacre não foi adulterado; **nada** diz sobre a entrega bater com a intenção. São dois atos separados, nunca fundidos — o LLM não computa hash confiável (modo de falha #6). | 2026-06-26
- Lacre soberano + dois referenciais: reconcilio contra `input_cru` (lacre, **soberano**) **e** `hermes.dor`, começando pelo lacre. Entrega que casa com a DoR mas traiu o lacre é `nao-bateu`, degrau `hermes` (modo de falha #9). | 2026-06-26
- Memória prioriza atenção, jamais decide: o degrau de cada missão sai **sempre** da evidência das assinaturas desta missão, nunca do histórico — evita "é o Zeus de novo" (viés de confirmação, modo de falha #7). | 2026-06-26

### Padrões de quebra recorrentes
<!-- Promoção candidato -> ativo após ≥3 recorrências verificadas. Sem PII, sem input_cru. -->
<!-- Formato: - degrau={x} tipo={y} sintoma={z} freq={n} causa-raiz={hipótese} | {AAAA-MM-DD} -->

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos para CLAUDE.md ou regras centrais -->
<!-- Formato: - **{padrão}** | Origem: {agentes} | Detectado: {AAAA-MM-DD} -->

## Arquivado
<!-- Padrões não mais relevantes — mantidos para histórico -->
<!-- Formato: - ~~{padrão}~~ | Arquivado: {AAAA-MM-DD} | Motivo: {motivo} -->
