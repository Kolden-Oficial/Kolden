---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Fast Path Gate

## Propósito

Escolher o caminho de execução mais rápido e seguro antes de iniciar uma tarefa. Este gate evita edições conversacionais lentas, uma a uma, para trabalho mecânico, como população de YAML, substituições em massa, normalização de dados estruturados e atualizações repetidas por arquivo.

## Elicitação

Ambos os checkpoints abaixo devem ser respondidos antes de prosseguir para a seleção de modo ou invocar delegação externa.

### Antes da seleção de modo

- Esclareça quaisquer detalhes ambíguos de `description`, incluindo a operação repetida exata e o formato de saída esperado.
- Valide a lista `files` pretendida e o `itemCount`; registre se os alvos são independentes e completos.
- Confirme os `acceptanceCriteria`, incluindo verificações de sintaxe, revisão de diff e comandos de validação direcionados.
- Confirme se a tarefa inclui risco de segurança, produção, destrutivo, de migration, arquitetural ou de credenciais.

### Antes da delegação externa

- Solicite explicitamente a permissão do usuário para usar `externalExecutorsEnabled`.
- Confirme o executor permitido, o sandbox, os caminhos graváveis, o timeout, o limite de retry e o fallback de falha.
- Confirme que nenhum segredo, credencial de produção ou dado protegido de cliente será enviado ao executor.
- Registre quaisquer restrições de delegação antes de rodar `aiox-delegate`.

## Entradas

- `description` — resumo da tarefa ou solicitação do usuário
- `files` — arquivos-alvo conhecidos
- `acceptanceCriteria` — resultados esperados
- `itemCount` — número opcional de registros, campos ou arquivos a processar
- `externalExecutorsEnabled` — se a delegação através de `aiox-delegate` é permitida

## Execução

1. Rode o checkpoint de elicitação "Antes da seleção de modo" e registre o escopo, os arquivos pretendidos, o risco de segurança/produção, os critérios de aceite e as restrições do sandbox.
2. Avalie a tarefa com `evaluateFastPath()` de `.aiox-core/core/orchestration/fast-path-gate.js`.
3. Se `evaluateFastPath()` lançar uma exceção, retornar saída inválida ou retornar um modo desconhecido, defina `mode: standard`, registre o erro e a decisão de fallback em evidências/logs e continue com o workflow normal de story/task.
4. Se o gate retornar `mode: standard`, continue com o workflow normal de story/task.
5. Se o gate retornar `mode: deterministic_batch`, extraia o schema e escreva um plano de transformação determinística ou de edição estruturada antes de alterar arquivos.
6. Se o gate retornar `mode: parallel_batch`, mapeie primeiro todos os alvos independentes e, em seguida, aplique edições agrupadas em lotes paralelos.
7. Se o gate retornar `mode: external_executor`, rode o checkpoint de elicitação "Antes da delegação externa", crie um prompt de executor delimitado e rode `aiox-delegate` com o sandbox, o timeout e o limite de retry configurados.
8. Se `aiox-delegate` atingir timeout, esgotar os retries ou falhar, registre o erro do executor, faça fallback para `mode: standard`, retome o workflow normal e exponha a falha na validação direcionada.
9. Sempre revise o diff resultante e rode a validação direcionada antes do fechamento da story ou da issue.

## Critérios de Aceite

- Tarefas mecânicas repetidas não são executadas como longas edições conversacionais sequenciais.
- Tarefas de segurança, produção, destrutivas, de migration e arquiteturais fazem fallback para o workflow padrão, a menos que sejam explicitamente reescopadas.
- As decisões de fast-path incluem confiança, motivos, evidências e próximas ações.
- O uso de executor externo permanece opt-in e isolado em sandbox por configuração.

## Anti-Padrões

- Não use o fast path para decisões ambíguas de arquitetura ou segurança.
- Não pule a validação só porque uma tarefa é mecânica.
- Não delegue externamente quando a tarefa contém segredos ou risco de produção.
- Não altere o estado da story ou da issue até que o diff tenha sido revisado.
