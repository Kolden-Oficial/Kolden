---
id_fonte: "b0e691e7-8a28-458d-9cb4-e880d8a5379e"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Trocar Modelo Pelo Terminal Rápido"
tipo: "unknown"
url_original: null
keywords: "('Terminal interface usage', 'Model switching commands', 'Linux TUI environment', 'Model testing procedure', 'Openrouter integration')"
summary: "Instead of hunting for hidden buttons in a complex web interface, this guide advocates for a **command-line approach** to configuring an AI assistant on Linux. By accessing the **Terminal User Interface (TUI)**, users can bypass graphical menus and exert direct control over the system using simple keyboard inputs. The core instruction involves utilizing the **\"/model\" command** to manually switch the agent's processing engine to a **free alternative**, effectively resolving billing errors and connection issues. Ultimately, this \"ninja\" method ensures that the AI is **successfully linked** and responsive across all connected platforms, including mobile devices."
extraido_em: "2026-06-30T16:22:22Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Trocar Modelo Pelo Terminal Rápido

# Tab 1

Tranquilo! Essas interfaces web (ainda mais de projetos de código aberto) adoram esconder o botão de configurações numa engrenagem minúscula ⚙️ ou exigem que você clique no nome do agente ("main") para abrir o menu.

Mas quer saber de uma coisa? Nós somos "raiz", estamos no Linux e temos o terminal na nossa mão. Não precisamos caçar botão em interface gráfica!

Vamos trocar esse cérebro do jeito mais rápido e "hacker" possível, direto pela tela de chat do próprio terminal.

##### O Jeito Ninja de Trocar o Modelo (Pelo Terminal)

**Passo 1: Voltar para a tela de Chat (TUI)**

No seu terminal normal do Linux (onde você digitou o comando de aprovar o Telegram), simplesmente digite:

openclaw (ou openclaw tui) e aperte **Enter** .

Isso vai abrir aquela mesma tela bonita de chat onde ele disse "Wake up, my friend!"

**Passo 2: Usar o Comando Mágico**

Dentro dessa tela de chat, em vez de conversar com ele, você pode dar "ordens diretas" ao sistema usando a barra /.

Digite exatamente isso na linha de conversa e aperte Enter:

/model openrouter/meta-llama/llama-3-8b-instruct:free

*(Nota: Alguns modelos gratuitos mudam de nome, se esse não for de primeira, você pode testar o /model openrouter/google/gemma-2-9b-it:free ou simplesmente /model para ele listar as opções).*

**Passo 3: Fazer o Teste de Vida**

Assim que você der o comando, ele vai piscar dizendo que o modelo foi alterado para a sessão atual.

Ainda nessa tela, digite um simples:

Oi, consegue me ouvir agora?

Se ele te responder aí na tela preta (sem aquele erro vermelho chato de "billing error"), significa que o cérebro gratuito conectou com sucesso!

Faz esse teste rápido do /model lá na tela do TUI. Se ele te responder no terminal, pode correr pro Telegram do celular que ele já vai estar conversando com você por lá também! Me diz se o "milagre" aconteceu!
