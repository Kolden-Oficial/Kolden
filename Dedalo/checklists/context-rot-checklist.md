---
tipo: checklist
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/checklists/_indice|_indice]]"
---

# Checklist de Apodrecimento de Contexto

**Checklist ID:** CCM-CL-007
**Referenced by:** project-integrator
**Purpose:** Detectar obsolescência, inchaço e referências desatualizadas no CLAUDE.md e nos arquivos de rules. Produz um Rot Score (0-100, quanto menor = mais apodrecimento) para quantificar a saúde do contexto e priorizar a limpeza.

[[LLM: INSTRUÇÕES DE INICIALIZAÇÃO - DETECÇÃO DE APODRECIMENTO DE CONTEXTO

O apodrecimento de contexto ocorre quando o CLAUDE.md, as rules e os arquivos de memória
acumulam referências obsoletas, instruções desatualizadas e conteúdo redundante ao longo do tempo.
Isso degrada a precisão do agente e desperdiça o orçamento de contexto.

ABORDAGEM DE EXECUÇÃO:
1. Meça o tamanho do CLAUDE.md em relação aos limites de orçamento
2. Valide cada caminho de arquivo e referência mencionados nos arquivos de contexto
3. Verifique as instruções em relação à realidade atual da base de código
4. Verifique se as rules correspondem à estrutura de diretórios atual
5. Audite os arquivos de memória quanto à relevância
6. Verifique se há redundância entre todas as fontes de contexto
7. Calcule o Rot Score a partir das constatações

O apodrecimento de contexto é gradual e invisível até que o comportamento do agente se degrade.
Auditorias regulares previnem o acúmulo.]]

---

## 1. Verificação de Tamanho

- [ ] O CLAUDE.md tem menos de 200 linhas (para projetos com auto-memory)
- [ ] O CLAUDE.md tem menos de 500 linhas no total (máximo absoluto)
- [ ] Nenhum arquivo de rule isolado excede 200 linhas
- [ ] O conteúdo total de rules sempre carregadas está abaixo de 1000 linhas combinadas
- [ ] Sem blocos de código desnecessários ou exemplos verbosos (poderiam estar em rules)
- [ ] As seções gerenciadas são concisas (tabelas preferíveis a prosa)

## 2. Validade das Referências

- [ ] Todos os caminhos de arquivos mencionados no CLAUDE.md resolvem para arquivos existentes (CRITICAL)
- [ ] Todos os caminhos de diretórios mencionados no CLAUDE.md resolvem para diretórios existentes
- [ ] Todos os exemplos de comandos referenciam scripts ou binários válidos
- [ ] Todos os nomes de agentes referenciados no CLAUDE.md correspondem a definições de agentes reais
- [ ] Todas as referências a checklists resolvem para arquivos de checklist existentes
- [ ] Todas as referências a tasks resolvem para arquivos de task existentes
- [ ] URLs e links (se houver) estão acessíveis e atuais

## 3. Atualidade das Instruções

- [ ] Sem referências a APIs ou bibliotecas obsoletas (CRITICAL)
- [ ] Sem referências a arquivos removidos ou renomeados
- [ ] A sintaxe dos comandos corresponde às versões atuais das ferramentas (ex.: flags de CLI ainda válidas)
- [ ] As referências de versão do framework estão atuais
- [ ] As descrições de workflow correspondem ao comportamento realmente implementado
- [ ] As instruções de teste usam o test runner e os patterns atuais
- [ ] Os comandos de build correspondem aos scripts atuais do package.json

## 4. Saúde das Rules

- [ ] O frontmatter `paths:` das rules corresponde à estrutura de diretórios atual (CRITICAL)
- [ ] Nenhuma rule referencia padrões de arquivos que não existem mais no projeto
- [ ] O conteúdo das rules está alinhado com os padrões de codificação atuais
- [ ] As rules com escopo por caminho aplicam o escopo corretamente aos arquivos pretendidos
- [ ] Nenhuma rule ficou intocada por mais de 90 dias em um projeto ativo
- [ ] As rules não referenciam agentes removidos ou workflows obsoletos

## 5. Higiene da Memória

- [ ] Os arquivos de auto-memory (MEMORY.md, memória de agente) contêm conteúdo relevante
- [ ] Sem entradas obsoletas referenciando trabalho concluído ou abandonado
- [ ] As entradas de memória estão organizadas por tópico (não despejos cronológicos)
- [ ] Nenhuma entrada de memória contradiz as instruções atuais do CLAUDE.md
- [ ] Os tamanhos dos arquivos de memória estão dentro dos limites (MEMORY.md abaixo de 200 linhas)
- [ ] As notas temporárias (específicas de sessão) foram limpas

## 6. Verificação de Redundância

- [ ] Sem instruções duplicadas entre o CLAUDE.md e os arquivos de rules (CRITICAL)
- [ ] Sem instruções duplicadas entre o CLAUDE.md e as definições de agentes
- [ ] Sem instruções duplicadas entre diferentes arquivos de rules
- [ ] Os patterns comuns são definidos uma vez e referenciados (não copiados)
- [ ] Se a mesma instrução aparece em vários lugares, consolide em uma única fonte
- [ ] Os settings do settings.json não são reafirmados como prosa no CLAUDE.md

---

## Cálculo do Rot Score

Para cada categoria, conte os itens reprovados (excluindo N/A). Aplique os pesos:

| Categoria | Peso | Dedução Máxima |
|----------|--------|---------------|
| Verificação de Tamanho | 1x por falha | 10 pontos |
| Validade das Referências | 3x por falha | 21 pontos |
| Atualidade das Instruções | 2x por falha | 14 pontos |
| Saúde das Rules | 2x por falha | 12 pontos |
| Higiene da Memória | 1x por falha | 6 pontos |
| Verificação de Redundância | 2x por falha | 12 pontos |

**Rot Score** = 100 - (total de deduções, limitado a 100)

| Faixa de Pontuação | Status de Saúde | Ação Necessária |
|-------------|--------------|-----------------|
| 80-100 | Saudável | Apenas manutenção de rotina |
| 60-79 | Envelhecendo | Agende a limpeza dentro de 1-2 sprints |
| 40-59 | Apodrecendo | Sprint de limpeza imediata necessária |
| 0-39 | Crítico | Reconstrução completa do contexto recomendada |

## Ordem de Prioridade de Correção

1. Falhas de **Validade das Referências** -- caminhos quebrados causam erros do agente
2. Falhas de **Atualidade das Instruções** -- instruções desatualizadas causam comportamento errado
3. Falhas de **Redundância** -- duplicatas desperdiçam orçamento de contexto e causam conflitos
4. Falhas de **Saúde das Rules** -- rules obsoletas carregam conteúdo desnecessário
5. Falhas de **Verificação de Tamanho** -- inchaço degrada todas as operações
6. Falhas de **Higiene da Memória** -- memória obsoleta engana os agentes
