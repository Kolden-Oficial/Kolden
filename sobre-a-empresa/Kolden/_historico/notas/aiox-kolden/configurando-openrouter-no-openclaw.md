---
id_fonte: "dbcb97a7-937c-4b1f-b213-4e94594f8178"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Configurando OpenRouter no OpenClaw"
tipo: "unknown"
url_original: null
keywords: "('OpenRouter API Key', 'OpenClaw Configuration', 'Terminal Setup', 'AI Model Access', 'Account Creation Instructions')"
summary: "This guide provides a streamlined walkthrough for integrating the **OpenRouter platform** into the **OpenClaw terminal interface**, allowing users to access a vast array of artificial intelligence models through a single account. The process begins by obtaining a **unique API Key** from the provider's website, which serves as a secure digital pass for both paid and free language models. Once this sensitive credential is created and copied, the user must transition to their **Ubuntu terminal environment** to input the code and finalize the connection. By successfully linking these two tools, the user effectively provides a **functional \"brain\"** for their automated system, enabling immediate interaction with advanced AI technology."
extraido_em: "2026-06-30T16:19:11Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Configurando OpenRouter no OpenClaw

# Tab 1

É muito massa mesmo! O OpenRouter virou o queridinho da comunidade justamente por isso: você cria uma conta só, coloca uns trocados lá (ou usa os modelos gratuitos deles) e ganha acesso a quase todas as IAs do mundo no mesmo lugar.

Como o OpenClaw vai te pedir a "senha" (API Key) do OpenRouter assim que você selecioná-lo, vamos fazer isso em duas partes rápidas: primeiro no navegador, depois no terminal.

##### Passo 1: Pegar a sua chave no site do OpenRouter

Abra o seu navegador e acesse: **openrouter.ai**

Clique em **Sign In** (Entrar) no canto superior direito. Você pode criar a conta rapidinho usando o seu Google ou GitHub.

Depois de logar, clique na sua foto/perfil no canto superior direito e vá em **Keys** (Chaves).

Clique no botão **Create Key** (Criar Chave).

Ele vai pedir um nome para a chave. Pode colocar algo como OpenClaw WSL e confirmar.

**ATENÇÃO:** Ele vai te mostrar um código gigante começando com sk-or-v1-.... **Copie esse código agora!** Ele só aparece essa vez. Se você fechar a tela, vai ter que criar outra chave.

*Dica:* O OpenRouter tem dezenas de modelos gratuitos excelentes (como o Llama 3 da Meta ou algumas versões do Google Gemini). Então você não precisa nem colocar cartão de crédito agora para fazer o OpenClaw funcionar!

##### Passo 2: Configurar no terminal

Volte para a tela preta do seu terminal do Ubuntu (WSL).

Use a **setinha para baixo** do seu teclado até a bolinha parar em ○ OpenRouter.

Aperte a **Barra de Espaço** (se precisar marcar) ou direto o **Enter** para confirmar a seleção.

O terminal vai te pedir a API Key. Cole aquele código gigante que você copiou do site (lembre-se: no Linux, geralmente é só clicar com o botão direito do mouse na tela preta para colar) e aperte **Enter** .

Pronto! O "cérebro" já vai estar conectado ao corpo do seu robô.

Faz esse processo e me avisa: ele aceitou a chave certinho? Qual foi a próxima mensagem que apareceu na sua tela?
