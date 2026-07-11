---
id_fonte: "4b596220-4dd3-41eb-81bc-a829ef623d75"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Configurando Cérebro Gratuito no Terminal"
tipo: "unknown"
url_original: null
keywords: "('OpenClaw terminal configuration', 'Telegram bot pairing', 'Free AI models', 'OpenRouter integration', 'Command line setup')"
summary: "This guide provides a technical walkthrough for developers to bridge a **Telegram messaging bot** with a local server using a **cost-free artificial intelligence model**. By executing specific terminal commands, the user grants communication permissions to their mobile device and manually switches the system's \"brain\" to the **Meta Llama 3 model** via the OpenRouter platform. The primary objective is to **validate the bot's functionality** without incurring expenses, ensuring the backend service processes requests invisibly before delivering a live response to the user's smartphone. Through this setup, the text empowers users to transition from a configuration error to a **fully operational, free-to-use AI assistant**."
extraido_em: "2026-06-30T16:19:08Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Configurando Cérebro Gratuito no Terminal

# Tab 1

Excelente escolha! É o caminho perfeito para validar a ideia e ver o seu robô funcionando na prática sem tirar 1 centavo do bolso.

Vamos fazer essas duas configurações rápidas no seu terminal para colocar a casa em ordem.

Como você estava na tela de chat (TUI) com aquela linha de erro piscando, precisamos voltar para a linha de comando normal do Linux. Siga este passo a passo:

##### Passo 1: Sair da tela de Chat

Se você ainda estiver naquela tela com a linha embaixo, apenas aperte **Ctrl + C duas vezes** no seu teclado (ou digite /exit e dê Enter). Isso vai te devolver para a linha de comando padrão do seu Ubuntu (aquela que tem o seu nome, tipo ronan@ubuntu:~$).

##### Passo 2: Dar o Crachá VIP para o seu Telegram

Agora vamos avisar o seu servidor que o seu celular está autorizado a conversar com o robô. Copie o comando abaixo, cole no terminal e dê Enter:

Bash

openclaw pairing approve telegram AS63E754

*(Você deve ver uma mensagem verde dizendo que o acesso foi concedido!)*

##### Passo 3: Trocar para o Cérebro Gratuito

Agora vamos tirar a opção automática (que tentou cobrar) e forçar o sistema a usar o Llama 3 da Meta, que a OpenRouter fornece de graça. Cole o comando abaixo no terminal e dê Enter:

Bash

openclaw config set defaultModel "meta-llama/llama-3-8b-instruct:free"

*(Ele vai confirmar que a configuração foi salva no arquivo openclaw.json)* .

##### A Hora da Verdade 🚀

O seu servidor do OpenClaw continua rodando de forma invisível no fundo do seu Linux (graças àquele serviço do *Systemd* que ativamos lá atrás). Então você não precisa ligar mais nada!

Pegue o seu celular, abra o **Telegram** , vá na conversa do seu robô (@AioxKolden\_BOT) e mande um simples:

**"Olá, quem é você?"**

Ele vai bater no servidor da sua máquina, ser roteado pelo OpenRouter (agora de graça) e te responder direto no celular!

Manda a mensagem lá e me conta se ele finalmente conversou com você!
