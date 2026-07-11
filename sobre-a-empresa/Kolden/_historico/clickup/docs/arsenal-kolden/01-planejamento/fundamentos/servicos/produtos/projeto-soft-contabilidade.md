---
clickup_doc_id: 8cdvxek-13273
clickup_page_id: 8cdvxek-35353
parent_page_id: 8cdvxek-13873
path_clickup: "Kolden/Planejamento/Fundamentos da Empresa/Serviços/Produtos/Projeto Soft Contabilidade"
date_created: 2024-01-08T15:42:51.754Z
date_updated: 2024-01-08T15:47:33.724Z
author_ids: [60963240]
edited_by: 60963240
url: https://app.clickup.com/9007134163/docs/8cdvxek-13273/8cdvxek-35353
extracted_at: 2026-06-30
tipo: historico
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/clickup/docs/arsenal-kolden/01-planejamento/fundamentos/servicos/produtos/entregaveis-futuro|entregaveis-futuro]]"
  - "[[sobre-a-empresa/Kolden/_historico/clickup/docs/arsenal-kolden/01-planejamento/fundamentos/servicos/produtos/proposta-koldenup|proposta-koldenup]]"
---

# Projeto Soft Contabilidade

O intuito principal seria ter um app para calcular os ICMS, de acordo com as notas de compras de mercadorias fora do estado do destinatário

Ele precisaria identificar todas as NF do mês respectivo, e calcular de acordo com NCM e natureza da operação da NF

Conseguindo distinguir entre ST, Equalização ou Diferença de Alíquota

Portanto 1° passo: identificar NF e separar de acordo com NCM e operação da NF, um modo de minimizar os erros seria que cada empresa deixe cadastrado os NCM de compra e uso e consumo num "banco de dados", nesse caso tudo o que fugir de revenda, automaticamente viraria uso e consumo

2° Calcular o imposto

3° Emissão da guia

4° transmissão do DESTDA, de acordo com o ICMS gerado anteriormente, e caso não tenha impostos, faça a transmissão sem movimento

5° seria uma integração com o sistema do contador, exemplo Domínio

Nessa interação, precisaria encontrar "notas não lançadas" para a parte de entrada (NF de compra), até o momento só tem para NF de saídas e serviço
Não sei se podem ter algumas coisas que outros sites tem, porém seria uma boa caso consiga ter certidões e parcelamentos
Apesar q certidão tem capcha, talvez não dê pra automatizar
