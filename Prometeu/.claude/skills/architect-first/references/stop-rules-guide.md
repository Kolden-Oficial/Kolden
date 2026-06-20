# Guia de Remediação das Stop Rules

Quando uma stop rule for disparada, PARE imediatamente e siga os passos de remediação abaixo.

## Stop Rule 1: Perda de Capacidade Detectada

**Disparo**: O novo design/implementação perde funcionalidade em relação ao baseline.

### Sintomas
- Contagem de funcionalidades diminuiu
- Workflow de usuário não é mais suportado
- Granularidade de dados/saída reduzida
- Capacidade de integração removida

### Passos de Remediação

1. **Documente a perda**
   - Liste as capacidades específicas perdidas
   - Compare com o baseline (Gold Standard)
   - Quantifique o impacto (usuários afetados, casos de uso quebrados)

2. **Analise a causa raiz**
   - Por que a capacidade foi perdida?
   - Foi intencional ou acidental?
   - Qual decisão de design causou a perda?

3. **Escolha o caminho de remediação**

   **Opção A: Restaurar a capacidade**
   - Reprojete para incluir a funcionalidade perdida
   - Estenda a arquitetura para suportar tanto o antigo quanto o novo
   - Mantenha a compatibilidade retroativa

   **Opção B: Justificar e migrar**
   - Documente justificativa explícita para a remoção
   - Obtenha aprovação de múltiplos stakeholders
   - Crie um caminho de migração para os usuários afetados
   - Comunique a mudança claramente

   **Opção C: Reverter o design**
   - Faça rollback para a arquitetura anterior
   - Reinicie o processo de design com a preservação de capacidade em mente

4. **Valide a restauração**
   - A tabela de comparação de funcionalidades mostra paridade
   - Todas as capacidades do baseline presentes
   - Nenhum workflow de usuário quebrado

---

## Stop Rule 2: Decisão Estrutural Sem Validação Multiagente

**Disparo**: Mudança arquitetural proposta/implementada sem validação de PO/Arquiteto/Usuário.

### Sintomas
- Documento de design criado unilateralmente
- Implementação de código iniciada antes da aprovação
- Refatoração importante sem revisão dos stakeholders
- Fronteiras de módulos alteradas sem validação

### Passos de Remediação

1. **PARE a implementação**
   - Pare toda a codificação imediatamente
   - Preserve o trabalho atual em uma feature branch
   - Documente o estado atual

2. **Prepare o pacote de validação**
   - Crie o documento de arquitetura
   - Apresente opções A/B/C com trade-offs
   - Documente a justificativa da decisão
   - Inclua análise de impacto

3. **Sequência de validação multiagente**
   - **Product Owner**: Alinhamento de negócio, valor para o usuário, prioridade
   - **Arquiteto**: Solidez técnica, escalabilidade, segurança
   - **Usuário/Stakeholder**: Decisão final e aprovação

4. **Documente a decisão**
   - Crie um Architecture Decision Record (ADR)
   - Use o template: `assets/adr-template.md`
   - Registre o contexto, a decisão, as consequências
   - Arquive na documentação do projeto

5. **Prossiga somente após a aprovação**
   - Todos os stakeholders assinaram
   - Decisão documentada
   - Equipe alinhada quanto à abordagem

---

## Stop Rule 3: Acoplamento Entre Módulos

**Disparo**: Dependências detectadas entre módulos que deveriam ser independentes.

### Sintomas
- Caminhos de import hardcoded para outros módulos
- Referências diretas ao sistema de arquivos entre módulos
- Estado compartilhado entre expansion packs
- O Módulo A não consegue rodar sem o Módulo B

### Passos de Remediação

1. **Rode a verificação de acoplamento**
   ```bash
   python scripts/check_coupling.py
   ```
   - Identifique todas as violações de acoplamento
   - Documente o grafo de dependências
   - Classifique o tipo de acoplamento (forte/fraco)

2. **Projete a estratégia de desacoplamento**
   - Defina interfaces limpas
   - Externalize as referências cruzadas entre módulos para YAML
   - Implemente injeção de dependência
   - Crie padrões adapter/bridge se necessário

3. **Implemente acoplamento zero**
   - Remova dependências hardcoded
   - Use descoberta baseada em configuração
   - Implemente arquitetura de plugins se apropriado
   - Cada módulo deve ser executável de forma independente

4. **Valide a independência**
   - Teste cada módulo isoladamente
   - Verifique a integração baseada em configuração
   - Rode novamente o script de verificação de acoplamento
   - Documente os pontos de integração

---

## Stop Rule 4: Documentação Arquitetural Ausente

**Disparo**: Implementação iniciada sem documentação arquitetural completa.

### Sintomas
- Sem diagramas de arquitetura
- Interações entre componentes pouco claras
- Fluxos de dados não documentados
- Pontos de integração não especificados

### Passos de Remediação

1. **PARE a implementação**
   - Pare toda a codificação
   - Preserve o trabalho em andamento
   - Mude para o modo de documentação

2. **Complete a documentação de arquitetura**
   - Use o template: `assets/architecture-template.md`
   - Crie os diagramas necessários:
     - Diagrama de arquitetura do sistema
     - Diagrama de interação entre componentes
     - Diagrama de fluxo de dados
     - Diagrama de deploy (se aplicável)

3. **Documente os detalhes**
   - Responsabilidades dos componentes
   - Contratos de API
   - Schemas de dados
   - Requisitos de configuração
   - Pontos de integração

4. **Revise e valide**
   - Validação multiagente da arquitetura
   - Verificação de completude da documentação
   - Entendimento da equipe verificado

5. **Retome a implementação**
   - Somente após a documentação completa
   - Somente após a validação aprovada
   - Com orientação arquitetural clara

---

## Stop Rule 5: Código Rápido & Sujo Sem Plano de Testes

**Disparo**: Código "feio" ou apressado escrito sem cobertura de testes ou logging.

### Sintomas
- Código escrito rapidamente sem testes
- Sem logging ou pontos de observação
- Sem hooks de debugging
- Escape hatch de qualidade abusado

### Passos de Remediação

1. **Reconheça as regras do escape hatch**
   - Código rápido SÓ é aceitável COM testes
   - Código "feio" exige cobertura de testes abrangente
   - Imperfeição temporária precisa de rede de segurança

2. **Defina o plano de testes**
   - Identifique os casos de teste para o código atual
   - Escreva testes unitários para os caminhos críticos
   - Adicione testes de integração para os workflows
   - Estabeleça metas de cobertura

3. **Adicione logging/observação**
   - Identifique os pontos-chave de decisão
   - Adicione declarações de log estratégicas
   - Inclua contexto de erro nos logs
   - Adicione hooks de debugging

4. **Implemente os testes ANTES de continuar**
   - Escreva primeiro os testes para o código existente
   - Verifique se os testes passam
   - Atinja a cobertura mínima
   - Só então continue a implementação

5. **Opcional: Refatorar**
   - Se os testes fornecem rede de segurança, pode refatorar
   - Melhore a qualidade do código incrementalmente
   - Mantenha a cobertura de testes durante a refatoração

---

## Stop Rule 6: Configuração Mutável Hardcoded

**Disparo**: Valores de configuração hardcoded no código-fonte em vez de externalizados para YAML.

### Sintomas
- Caminhos hardcoded em arquivos-fonte
- Limiares como números mágicos
- Endpoints de API como literais de string
- Nomes de módulos hardcoded em imports

### Passos de Remediação

1. **Identifique todos os valores hardcoded**
   - Escaneie o código em busca de literais
   - Liste todos os pontos de configuração
   - Classifique por mutabilidade (isto vai mudar?)

2. **Crie o schema de configuração YAML**
   - Use o template: `assets/config-template.yaml`
   - Defina a estrutura para todos os valores de config
   - Especifique os padrões
   - Documente cada opção de configuração

3. **Refatore para usar a configuração**
   - Substitua os valores hardcoded por consultas à config
   - Implemente um carregador de configuração
   - Adicione validação de configuração
   - Teste com diferentes configurações

4. **Documente a configuração**
   - Crie um guia de configuração
   - Forneça exemplos de configuração
   - Documente os mecanismos de sobrescrita
   - Inclua as regras de validação

---

## Processo Geral de Remediação

Para qualquer violação de stop rule:

1. **PARE**: Pare toda a implementação imediatamente
2. **AVALIE**: Entenda a violação e seu escopo
3. **PLANEJE**: Escolha a estratégia de remediação
4. **VALIDE**: Obtenha aprovação para a abordagem de remediação
5. **EXECUTE**: Implemente a remediação
6. **VERIFIQUE**: Confirme que a stop rule não dispara mais
7. **DOCUMENTE**: Registre o que aconteceu e como foi corrigido
8. **RETOME**: Continue com a abordagem validada

---

## Prevenção

Para evitar disparos de stop rules:

- **Use checklists**: `pre-implementation-checklist.md` e `architecture-checklist.md`
- **Valide cedo**: Revisão multiagente antes de codar
- **Rode scripts**: `check_coupling.py`, `validate_risk_mitigation.py`
- **Documente primeiro**: Arquitetura antes da implementação
- **Teste sempre**: Defina o plano de testes antes de codar
- **Configure tudo**: YAML para todos os valores mutáveis

---

## Escalonamento

Se a remediação for pouco clara ou complexa:

1. Documente a situação completamente
2. Apresente à equipe/stakeholders
3. Solicite orientação sobre o caminho de remediação
4. NÃO prossiga sem uma resolução clara
5. Atualize este guia com novos padrões de remediação
