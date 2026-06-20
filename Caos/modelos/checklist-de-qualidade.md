# Checklist de qualidade do Kolden

Todo agente precisa passar em 100% dos itens bloqueantes (B) antes da
entrega. Itens recomendados (R) geram observação, não reprovação.
Itens **B equivalem a CRITICAL**: um único B não atendido reprova a entrega.

## Constituição e governança
- [ ] B — compliance com os 7 artigos da Constituição (`constituicao.md`)
- [ ] B — PRD foi aprovado pelo usuário antes da construção (Art. III)
- [ ] B — nenhuma credencial em texto puro em nenhum arquivo (Art. VII)
- [ ] B — Fase 0 registrada: decisão REUSE/ADAPT/CREATE consta
- [ ] B — entidade registrada em `dados/registro-de-entidades.yaml` (na Fase 8)

## Modos de falha / pré-morte (eixo anti-falha)
- [ ] B — seção 10 (Modos de falha) do PRD preenchida, vinda do Bloco 9 do diagnóstico
- [ ] B — cada modo de falha tem uma mitigação real na arquitetura/hooks
- [ ] B — cada modo de falha tem um teste adversarial na Fase 7
- [ ] B — ao menos 1 KPI anti-falha em "Resultados de sucesso"

## Teste de comportamento (Fase 7)
- [ ] B — roteiro de teste executado pelo `testador`
- [ ] B — maturity score ≥ 7.0 E todo modo de falha protegido
- [ ] B — testes de abuso (injeção/coerção/extração de segredo) resistidos
- [ ] B — todo guardrail NÃO-NEGOCIÁVEL segurou em execução (não só no texto)
- [ ] B — toda ferramenta crítica verificada como alcançável

## Documentação
- [ ] B — prd-de-ia.md existe, completo, com status "aprovado"
- [ ] B — diagnostico.md existe com os blocos preenchidos
- [ ] B — instalacao.md explica como ativar o agente do zero
- [ ] B — perfil.md presente (persona + soft/hard skills)
- [ ] R — historico de versões iniciado no PRD

## System prompt
- [ ] B — os 5 blocos presentes: persona, objetivo, restrições, formato, exemplos
- [ ] B — mínimo 3 exemplos (caso feliz + recusa/escalação + caso de borda/falha)
- [ ] B — soft skills descritas como comportamento ("quando X, faça Y"), não adjetivos
- [ ] B — agnóstico de modelo (sem recurso exclusivo de um LLM)
- [ ] B — toda restrição rastreia para um guardrail ou modo de falha do PRD
- [ ] B — o prompt define o comportamento do agente em cada modo de falha do PRD
- [ ] R — entre 80 e 200 linhas

## Ferramentas
- [ ] B — toda ferramenta citada no prompt existe em ferramentas.md
- [ ] B — cada ferramenta tem: função, forma de acesso e credencial (Infisical)
- [ ] B — nenhuma credencial em texto puro em nenhum arquivo
- [ ] R — comportamento de falha definido para cada ferramenta

## Habilidades
- [ ] B — toda habilidade tem frontmatter com name e description
- [ ] B — descrições específicas com gatilhos de invocação
- [ ] B — nenhuma habilidade duplica conteúdo do CLAUDE.md
- [ ] B — catálogo de habilidades (`.claude/skills/catalogo.md`) atualizado com a nova habilidade
- [ ] R — habilidades com menos de 150 linhas

## Reflexos
- [ ] B — toda proibição absoluta do PRD virou reflexo PreToolUse
- [ ] B — reflexo de auditoria PostToolUse presente
- [ ] B — scripts com permissão de execução (chmod +x)
- [ ] B — caminhos usam $CLAUDE_PROJECT_DIR
- [ ] B — reflexo verificacao-diaria.sh presente e configurado no settings.json (SessionStart)

## Especialistas
- [ ] B — campo tools restrito ao necessário (nunca omitido)
- [ ] B — formato de retorno ao agente principal definido
- [ ] R — máximo 3 especialistas sem justificativa no blueprint

## Consistência
- [ ] B — tudo em português do Brasil
- [ ] B — nomes em kebab-case, minúsculas
- [ ] B — toda referência cruzada aponta para arquivo que existe
- [ ] B — agente registrado em registros/historico.md
