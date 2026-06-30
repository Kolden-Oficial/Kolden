---
id_fonte: "7f5c20e0-bf1a-4e41-ac66-5584493c0efe"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Instalação do OpenClaw e Skills"
tipo: "unknown"
url_original: null
keywords: "('OpenClaw installation', 'Assistant configuration', 'Skill selection', 'Package manager', 'Infrastructure setup')"
summary: "This technical guide serves as a practical walkthrough for finalizing the installation of **OpenClaw**, an AI-driven assistant, by focusing on the activation of its core capabilities. Having established a stable infrastructure, the user is directed to execute a specific setup command to configure **essential \"skills\"**—such as PDF reading and link processing—which act as the robot's functional senses. The text emphasizes a **meticulous configuration sequence**, instructing the user to bypass unnecessary API providers while selecting specific tools through a command-line interface. Ultimately, the purpose of this manual is to ensure a **seamless integration of tools** without errors, marking the transition from basic server setup to a fully operational and intelligent digital agent."
extraido_em: "2026-06-30T16:20:19Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Instalação do OpenClaw e Skills

# Tab 1

Excelente! O trabalho duro de infraestrutura acabou. A sua fundação agora é de concreto armado. 🏗️

Como o servidor agora tem todas as ferramentas de construção (brew, uv, gcc), o OpenClaw não vai mais tropeçar naquelas mensagens de erro.

Chegou a hora da nossa revanche. Vamos chamar o assistente de volta e instalar os Sentidos do robô de verdade.

##### O Passo a Passo da Revanche:

Na sua tela preta, digite novamente o comando mágico e aperte **Enter** : **openclaw onboard**

**O "Cheat Sheet" para voar no assistente:** Como você já sabe o caminho, faça exatamente isto:

```
Security warning:  **Yes**

Model/auth provider: Vá até o final e escolha  **Skip for now**

Filter models:  **openrouter**  (se pedir modelo, escolha openrouter/auto ou Keep current)

Search provider:  **DuckDuckGo**

**Configure skills now?** : Mude para  **● Yes**  🎯
```

**Na tela gigante de Skills (O Arsenal):** Use a **Barra de Espaço** para marcar as nossas 4 ferramentas essenciais (um "X" vai aparecer):

```
[X] nano-pdf (Leitor de relatórios)

[X] session-logs (Memória base)

[X] summarize (Poder de síntese)

[X] xurl (Leitor de links) *(Aperte*  ***Enter***  *quando as 4 estiverem marcadas).*
```

**Package Manager:** Escolha **npm** e dê Enter.

**Se pedir API (goplaces, openai-whisper, etc):** Escolha **No** ou deixe em branco e dê Enter (como fizemos da última vez).

Agora sim, a instalação vai fluir perfeitamente sem aqueles erros vermelhos de antes.

Vá em frente, cruze a linha de chegada desse assistente e me avise quando o terminal terminar de baixar tudo e voltar a ficar com o ronan@RonanSersil:~$ piscando!
