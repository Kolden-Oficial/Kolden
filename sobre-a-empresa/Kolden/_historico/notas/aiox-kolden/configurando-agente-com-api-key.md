---
id_fonte: "5810c5ef-cd25-4018-8ef5-7b1ca9fa7f6c"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Configurando Agente com API Key"
tipo: "unknown"
url_original: null
keywords: "('API Key Configuration', 'Terminal Setup', 'OpenRouter Integration', 'Agent Customization', 'Troubleshooting Connection')"
summary: "This tutorial provides practical instructions for activating an autonomous agent by **integrating an OpenRouter API key** into a Linux terminal environment. The text guides the user through the specific mechanics of **pasting credentials securely**, noting that sensitive keys often remain invisible to protect the user's privacy during the setup. Once the connection is validated, the process moves into a **QuickStart configuration phase** where the user defines the agent’s \"brain\" by selecting specific AI models and naming their virtual assistant. Ultimately, the source serves as a bridge between abstract architecture and a **functional local deployment**, ensuring the agent is properly powered and ready to communicate."
extraido_em: "2026-06-30T16:19:04Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Configurando Agente com API Key

# Tab 1

Sensacional! Agora chegou a hora da verdade, onde tudo aquilo que conversamos sobre arquitetura e chaves de acesso vai acontecer na prática.

Vamos colar essa chave no seu terminal e dar vida ao seu Agente. O processo é super rápido:

##### O Passo a Passo no Terminal

**Volte para o seu terminal do Ubuntu/WSL:** A tela deve estar da mesma forma que você deixou, com a opção ○ OpenRouter selecionada e aguardando a sua chave.

**Cole a sua API Key:**

```
Lembre-se: No terminal do Linux (Ubuntu), você geralmente  **não usa**  o Ctrl + V.

O jeito certo de colar é  **clicando com o botão direito do mouse**  em qualquer lugar da tela preta do terminal.

*Aviso de segurança padrão:*  Em alguns terminais, quando você cola uma senha ou chave, ela fica  **invisível**  na tela (parece que não colou nada, para ninguém que estiver atrás de você conseguir ler). Se isso acontecer, confie que colou!
```

**Aperte o Enter:** Logo após colar, dê um Enter. O OpenClaw vai validar se a chave começa com sk-or-v1-... e se está tudo certinho.

##### O que acontece a seguir?

Se a chave for aceita, o "cérebro" do seu Agente já estará conectado àquela "tomada universal" do OpenRouter.

O OpenClaw provavelmente vai te fazer a última rodada de perguntas do modo QuickStart. Geralmente, ele pergunta coisas como:

Qual modelo de IA você quer usar como padrão (ex: anthropic/claude-3-haiku ou openai/gpt-4o-mini).

Como você quer chamar o seu robô.

Em qual porta do seu computador ele deve rodar.

Pode colar a chave, dar o Enter e me mandar exatamente qual foi a **próxima mensagem** que apareceu na sua tela! Vamos configurar esse agente até ele te dar o primeiro "Olá, mundo!"
