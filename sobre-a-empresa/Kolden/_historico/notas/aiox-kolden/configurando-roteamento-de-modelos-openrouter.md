---
id_fonte: "464b4f5d-5435-4a64-9d1c-19d92eacc14f"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Configurando Roteamento de Modelos OpenRouter"
tipo: "unknown"
url_original: null
keywords: "('OpenRouter Model Routing', 'Allowed Models Selection', 'Fallback Model Configuration', 'Provider Selection Logic', 'Optimization and Security')"
summary: "This guide provides a technical walkthrough for configuring **intelligent model routing** within the OpenRouter interface to ensure system stability and cost-efficiency. The author explains how to establish a **prioritized hierarchy of AI models**, instructing the user to select an \"elite squad\" of primary models while designating a **reliable fallback option** to act as a safety net during server outages. By filtering specific allowed models and setting a **balanced sorting logic**, the user transforms the platform into a \"smart vault\" that automatically switches between providers based on performance and availability. Ultimately, these steps serve as a **optimization framework** designed to shield the user's workflow from technical failures while maintaining high-quality output."
extraido_em: "2026-06-30T16:19:12Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Configurando Roteamento de Modelos OpenRouter

# Tab 1

Você não está cego de jeito nenhum! A culpa foi minha. Eu te expliquei o *conceito* arquitetural de "Prioridade 1, 2 e 3", mas a OpenRouter não usa essas palavras exatas na tela. Eles usam uma lógica de "Filtro de Auto Router" e "Fallback".

Olhando para o seu print, você está no lugar milimetricamente exato. Como o seu robô lá no terminal está usando o cérebro /model openrouter/auto, essa tela é a que dita as regras do que esse "auto" pode ou não fazer.

Vamos preencher essa tela juntos para criar a sua cascata de inteligência:

##### Passo a Passo nessa tela:

**1. O Retângulo Escuro (Allowed Models)**

É aqui que você cria o seu "esquadrão de elite". Se você deixar vazio, o openrouter/auto pode tentar usar qualquer um dos mais de 200 modelos deles (o que é ruim, pois pode pegar um modelo burro).

**O que fazer:** Digite (ou copie e cole) exatamente isso dentro dessa caixa escura:anthropic/claude-3.7-sonnet, openai/gpt-4o, deepseek/deepseek-chat-v3.1

*A Mágica:* Agora, quando o seu robô for pensar, a OpenRouter vai olhar para esses três. Ela vai tentar usar o melhor (Claude), mas se o servidor da Anthropic estiver lento, ela pula para o GPT-4o automaticamente.

**2. A Opção do Meio (Default Provider Sort)**

Isso dita *como* a OpenRouter desempata a escolha se todos estiverem online.

**O que fazer:** Deixe exatamente como está: **Default (balanced)** . Isso significa que ela vai balancear entre o mais rápido e o mais barato no momento da pergunta.

**3. O Último Quadro (Default Model / Fallback)**

Olha o texto miúdo escrito ali: *"This model will also be used as your default fallback model"* (Este modelo também será usado como seu modelo de segurança/fallback). É a rede de proteção final. Se o mundo acabar e os 3 modelos que você escolheu lá em cima caírem, ele usa esse.

**O que fazer:** Clique no "No default" e escolha um modelo que seja um "trator" (que nunca cai e é muito barato), como o **openai/gpt-4o-mini** ou o **google/gemini-2.5-flash** .

##### O Checkpoint da Fase 1

Pronto! É só preencher essas duas caixinhas (a primeira e a última) e clicar no botão roxo **Save** .

Com o limite de dinheiro que você já configurou nas chaves e esse roteamento de elite salvo, a sua Fase 1 (Blindagem e Otimização) está 100% concluída. O OpenRouter agora é um cofre inteligente.

Me dê o "Ok" assim que salvar essa tela, para darmos o grande salto para a **FASE 4** : abrir aquele painel maravilhoso da Sala de Controle do seu OpenClaw no navegador!
