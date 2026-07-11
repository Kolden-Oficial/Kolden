---
tipo: checklist
area: Harmonia
up: "[[Harmonia/_MOC-harmonia]]"
---

# Checklist de Qualidade de Saída de Design Systems/UX

**ID do Checklist:** DESIGN-CL-001
**Referenciado por:** tasks/review.md
**Propósito:** Validar a qualidade de design systems e entregas de UX antes da entrega ao usuário.

[[LLM: INSTRUÇÕES DE INICIALIZAÇÃO

Este checklist valida especificamente a saída de design systems e UX.

ABORDAGEM DE EXECUÇÃO:
1. Para cada categoria, verifique cada item em relação à entrega
2. Marque os itens como [x] Aprovado, [ ] Reprovado, [N/A] Não Aplicável
3. Itens CRÍTICOS bloqueiam a entrega; itens não críticos são consultivos

Itens CRÍTICOS são marcados com o sufixo (CRÍTICO).]]

---

## 1. Acessibilidade (WCAG 2.1 AA)

- [ ] O contraste de cor atende ao mínimo de 4.5:1 para texto normal e 3:1 para texto grande (CRÍTICO)
- [ ] Elementos interativos têm estados de foco visíveis (CRÍTICO)
- [ ] Alvos de toque têm no mínimo 44x44px no mobile
- [ ] O conteúdo é legível sem depender da cor como único indicador
- [ ] Considerações de leitor de tela documentadas (rótulos ARIA, papéis, landmarks)
- [ ] A ordem de navegação por teclado é lógica

## 2. Consistência do Design System

- [ ] Os design tokens são usados corretamente — sem valores fixos no código para cores, espaçamento, tipografia (CRÍTICO)
- [ ] O componente segue os padrões existentes do design system e as convenções de nomenclatura (CRÍTICO)
- [ ] O espaçamento usa a escala definida (grade de 4px/8px ou específica do sistema)
- [ ] A tipografia usa a escala de tipos e os pesos definidos pelo sistema
- [ ] A iconografia vem do conjunto de ícones aprovado, com dimensionamento consistente
- [ ] As variações de estado estão definidas: padrão, hover, ativo, desabilitado, erro, carregando

## 3. Design Responsivo

- [ ] O layout se adapta corretamente nos breakpoints: mobile, tablet, desktop (CRÍTICO)
- [ ] A hierarquia de conteúdo é mantida nos diferentes tamanhos de tela
- [ ] Imagens e mídias escalam proporcionalmente
- [ ] A navegação se adapta adequadamente para toque versus ponteiro
- [ ] Sem rolagem horizontal nas larguras de viewport padrão

## 4. Fluxo de UX & Interação

- [ ] O fluxo do usuário é lógico — mínimo de passos para concluir a tarefa
- [ ] Estados de erro e estados vazios estão desenhados
- [ ] Estados de carregamento e telas de esqueleto estão especificados
- [ ] O feedback é imediato para as ações do usuário (microinterações)
- [ ] Existem caminhos de desfazer/recuperação para ações destrutivas
- [ ] Casos extremos tratados: texto longo, dados ausentes, primeiro uso

## 5. Qualidade Visual

- [ ] A hierarquia visual é clara — o olho sabe para onde ir primeiro
- [ ] Alinhamento e espaçamento são consistentes, não "feitos a olho"
- [ ] O uso de cor sustenta o clima pretendido e a marca
- [ ] O espaço em branco é usado intencionalmente, não como sobra
- [ ] A composição geral parece equilibrada e profissional

## 6. Documentação & Handoff

- [ ] A API/props do componente estão documentadas, se aplicável
- [ ] Diretrizes de uso: quando usar, quando NÃO usar
- [ ] As decisões de design estão anotadas com a justificativa
- [ ] Os assets estão prontos para exportação ou especificados para desenvolvimento

---

## Critérios de APROVAÇÃO/REPROVAÇÃO

**APROVADO:** Todos os itens CRÍTICOS [x] e menos de 3 falhas não críticas.
**REVISAR:** Todos os itens CRÍTICOS [x], mas 3 ou mais falhas não críticas.
**REPROVADO:** Qualquer item CRÍTICO não marcado.
