---
id_fonte: "af7ea698-6747-4487-9ad7-c2674b1e8bf8"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Abrindo o Chat e Trocando o Modelo"
tipo: "unknown"
url_original: null
keywords: "('OpenClaw command', 'Linux terminal errors', 'Changing AI models', 'Chat interface setup', 'Model configuration steps')"
summary: "This guide clarifies how to correctly interact with a program called OpenClaw by distinguishing between the **operating system terminal** and the **application’s internal chat interface**. The author explains that specific commands, such as switching the artificial intelligence \"brain,\" will only function once the user has **initiated the chat environment** by typing the activation command. By following a sequential process of opening the software first and then inputting configuration codes, users can successfully **transition from the Linux command line** to a functional conversation with the AI model. Ultimately, the text serves as a **troubleshooting tutorial** designed to help users navigate the specific environment requirements necessary for the bot to recognize their instructions."
extraido_em: "2026-06-30T16:17:59Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Abrindo o Chat e Trocando o Modelo

# Tab 1

Calma lá, soldado! 😂 Você tentou dar uma ordem para o robô, mas acabou gritando no ouvido do Linux!

O erro -bash: /model: No such file or directory aconteceu por um motivo muito simples: repare ali no começo da linha que está escrito ronan@RonanSersil:~$. Isso significa que você ainda está na linha de comando pura do Ubuntu (o "porteiro"). O Linux não faz a menor ideia do que seja /model.

Esse comando /model com a barra invertida só funciona **dentro da tela de chat** do OpenClaw.

Vamos fazer o passo a passo exato para você entrar na sala certa:

**Passo 1: Entrar na sala do robô**

Na sua tela normal do Linux (onde está o ronan@RonanSersil:), digite apenas isso e aperte Enter:

openclaw

*(Isso vai limpar a tela e abrir aquela interface de chat bonita, onde fica piscando para você digitar uma mensagem).*

**Passo 2: Agora sim, trocar o cérebro!**

Somente **depois** que a tela mudar para a interface de conversa, você digita o comando mágico ali onde você escreveria o "Oi":

/model openrouter/meta-llama/llama-3-8b-instruct:free

E aperte **Enter** .

Ele vai te dar um aviso na própria tela de chat confirmando que o modelo mudou.

**Passo 3: Falar com ele**

Aí mesmo nessa tela, mande um:

Oi, tá me ouvindo?

Se ele responder, o cérebro gratuito conectou com sucesso, e você já pode ir lá no celular mandar mensagem pelo Telegram também!

Faz esse teste: digita openclaw primeiro para abrir o chat, e me conta se deu certo!
