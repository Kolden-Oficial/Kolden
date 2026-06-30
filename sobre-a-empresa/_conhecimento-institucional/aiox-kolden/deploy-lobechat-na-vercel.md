---
id_fonte: "1ee8c00d-d3b5-4fff-bd84-0c9382feccda"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Deploy LobeChat na Vercel"
tipo: "unknown"
url_original: null
keywords: "('LobeChat deployment', 'Vercel hosting', 'Environment variables', 'OpenRouter API integration', 'Access security settings')"
summary: "This tutorial provides a streamlined roadmap for launching **LobeChat**, a sophisticated open-source interface designed for AI agencies, using the **Vercel hosting platform**. The author guides the reader through a multi-step deployment process that involves linking a GitHub repository and configuring the software’s core functionality. Central to this setup is the integration of **Environment Variables**, specifically the **OpenRouter API key** to provide the system's intelligence and a **custom access code** to ensure robust security. By following these instructions, users can transform raw code into a functional, private web application capable of advanced tasks like image recognition and audio generation."
extraido_em: "2026-06-30T16:19:30Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Deploy LobeChat na Vercel

# Tab 1

Excelente! O terreno está comprado e a equipe de obras está a postos.

Nós vamos instalar o **LobeChat** . Hoje, ele é o sistema de interface Open Source mais poderoso e bonito do mundo para agências de IA. Ele já tem suporte nativo ao OpenRouter, aceita agentes customizados, leitura de imagens e geração de áudio. É o "chassi" perfeito para a Kolden.

Preste muita atenção agora, pois nós vamos conectar o "Cérebro" (OpenRouter) e colocar uma "Fechadura de Aço" na porta para que ninguém na internet roube os seus créditos.

##### 🏗️ Levantando a Fachada (O Deploy)

**Passo 1: O Botão Mágico**

Clique no link abaixo (ele vai abrir direto no painel da Vercel já clonando o código oficial do LobeChat):

👉 **Deploy LobeChat na Vercel**

**Passo 2: Criando o Repositório**

A Vercel vai pedir para você conectar o seu GitHub (se já não estiver conectado).

Na seção **"Create Git Repository"** , ela vai sugerir um nome (provavelmente lobe-chat). Apague e digite algo com a sua marca, como: **kolden-os** ou **kolden-chat** .

Deixe marcado como "Private" (Privado) e clique no botão **Create** .

**Passo 3: As Variáveis de Ambiente (O Segredo da Kolden)**

*Atenção máxima aqui.* Logo após criar o repositório, a Vercel vai mostrar uma seção chamada **"Environment Variables"** (Variáveis de Ambiente). É aqui que injetamos a inteligência e a segurança.

Adicione exatamente estas duas variáveis (você digita o nome na esquerda e o valor na direita, e clica em *Add* ):

**Variável 1 (O Cérebro):**

```
**Name:**  OPENROUTER_API_KEY

**Value:**  Cole aqui a sua chave do OpenRouter (aquela que começa com sk-or-v1...).
```

**Variável 2 (A Fechadura de Aço):**

```
**Name:**  ACCESS_CODE

**Value:**  Crie uma senha forte (ex: Kolden2026!).  *Isso é vital! Se você não colocar essa senha, qualquer pessoa que descobrir o seu link vai poder usar a IA e gastar o seu saldo.*
```

**Passo 4: O Lançamento**

Depois de adicionar essas duas variáveis, clique no botão gigante **Deploy** .

A Vercel vai começar a compilar o código. A tela vai mostrar um monte de linhas de comando rolando (parecido com o que vimos no Ubuntu). Isso leva cerca de 2 a 3 minutos.

##### O Checkpoint da Interface

Quando a compilação terminar, a Vercel vai te mostrar uma tela de **"Congratulations"** (Parabéns) com confetes digitais e um botão gigante dizendo **"Continue to Dashboard"** ou **"Visit"** .

Faça esse processo agora, Arquiteto. Me avise assim que os confetes aparecerem na sua tela e você tiver o link oficial da Vercel (algo como kolden-os.vercel.app) em mãos!
