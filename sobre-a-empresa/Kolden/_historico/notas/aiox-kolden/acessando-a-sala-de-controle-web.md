---
id_fonte: "5872f37a-48a7-46ae-aaad-3938e29a91e7"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Acessando a Sala de Controle Web"
tipo: "unknown"
url_original: null
keywords: "('Web Control Room', 'Dashboard Overview', 'Agent Management', 'System Logs', 'Access Link Token')"
summary: "This tutorial serves as a bridge between the technical backend of a server and its **user-friendly visual interface**, guiding the user through the transition from terminal commands to a browser-based dashboard. By utilizing a **unique security token** generated during installation, the operator can unlock a \"control room\" that offers a comprehensive **overview of their AI agent's internal logic**. The interface provides transparency by allowing users to **monitor conversation histories, manage functional tools, and track operational costs** in real time. Ultimately, this text empowers the user to shift roles from a back-end engineer to a **strategic manager** who can oversee their automated operations with ease and precision."
extraido_em: "2026-06-30T16:18:01Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Acessando a Sala de Controle Web

# Tab 1

Excelente! Chegou a hora de colhermos os frutos de todo aquele trabalho no terminal. Vamos sair da tela preta e entrar no mundo visual da sua operação.

No mundo corporativo, o engenheiro (você) configura o servidor na tela preta, mas o gerente da operação (você também, nesse caso!) acompanha tudo por um painel de controle bonito no navegador.

##### Passo a Passo para acessar a Sala de Controle (Web UI)

**Passo 1: O Link Mágico**

Lembra daquele link verde que o seu terminal gerou logo depois que instalamos o serviço do Gateway? Ele tem uma "chave mestra" (token) embutida para garantir que só você consiga acessar o painel.

Copie exatamente este link abaixo (eu resgatei dos seus logs anteriores):

<http://127.0.0.1:18789/#token=4434b8a664ba06623a4d974a47e29c6aed37ff01dde4a974>

**Passo 2: Abrindo as Portas**

Abra o navegador normal aí do seu Windows (Google Chrome, Edge, Brave, etc.), cole esse link na barra de endereços e aperte Enter.

**Passo 3: O que você vai encontrar**

Assim que a página carregar, você estará dentro do cérebro do seu Agente. Você vai ver coisas como:

**Dashboard/Overview:** O resumo da sua operação.

**Agents:** Onde o seu agente "main" mora. Se você clicar nele, vai poder ver o histórico de conversas (tudo o que você falou com ele pelo Telegram vai aparecer aqui!).

**Skills / Tools:** Onde ficam aquelas ferramentas de ler PDF, pesquisar na web, etc. (que vamos ativar na Fase 2).

**Logs / Traces:** Onde você pode ver, em tempo real, quanto tempo ele demorou para pensar e quanto custou cada mensagem.

Faça esse teste agora: cole o link no seu navegador e me diga se o painel carregou com sucesso! Se ele pedir alguma senha, ou se a tela ficar em branco, me avise que a gente ajusta a rota.

O painel abriu bonito por aí?
