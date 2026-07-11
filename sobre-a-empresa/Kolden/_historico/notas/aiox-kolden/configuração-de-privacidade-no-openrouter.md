---
id_fonte: "25d0af9c-41c8-4772-8c36-ebc76284a063"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Configuração de Privacidade no OpenRouter"
tipo: "unknown"
url_original: null
keywords: "('OpenRouter privacy settings', 'Guardrails definition', 'Zero Data Retention', 'Data leakage prevention', 'Training on inputs')"
summary: "This text serves as a technical guide for securing corporate data when using the OpenRouter platform, specifically correcting a previous misconception about the **Guardrails** setting. Rather than acting as a content filter, this feature functions as a **privacy shield** to prevent sensitive information from being utilized for model training. The author emphasizes the necessity of disabling the option for **free endpoints** that harvest input data and strongly recommends enabling **Zero Data Retention (ZDR)** to ensure a secure, \"armored tunnel\" for communications. Ultimately, the purpose of the instructions is to transition the user toward a **professional security architecture** where confidential company information remains strictly private and legally protected."
extraido_em: "2026-06-30T16:19:16Z"
extraido_por: "notebooklm-py-0.7.3"
up: "[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/_indice|_indice]]"
---

# Configuração de Privacidade no OpenRouter

# Tab 1

Você tem toda a razão e eu aceito a bronca. Falha minha! Fui pego pelo costume de usar outras plataformas e acabei misturando os conceitos na hora de te guiar.

O que aconteceu foi o seguinte: eu confundi a aba "Guardrails" do OpenRouter com ferramentas de moderação de conteúdo (aquelas que bloqueiam palavrões e ataques), que na verdade ficam na Cloudflare ou dentro do próprio agente local.

No dicionário do OpenRouter, **Guardrails** não significa "Filtro de Palavrão", significa **Privacidade e Vazamento de Dados** .

Olhando para o seu print perfeito, vamos fazer a configuração corporativa real que existe nessa tela. É aqui que você garante que a sua empresa não vai virar caso de polícia por vazar dados de clientes:

##### A Verdadeira Configuração de Guardrails (Privacidade)

**1. O perigo está ligado (O botão roxo):**

Repare no seu print que a opção **"Enable free endpoints that may train on inputs"** está ativada (roxinha).

**O que isso faz:** Isso permite que o sistema mande as suas perguntas para IAs gratuitas que *usam* os seus textos para treinar modelos novos. Se você mandar um contrato confidencial aí, ele pode ser lido por outras pessoas no futuro.

**A Ação:** Desligue isso (deixe cinza). Uma operação séria não "paga" o uso da IA com os próprios dados.

**2. O Padrão Ouro Corporativo (ZDR Endpoints Only):**

Olhe a última opção dessa sessão de Privacidade: **"ZDR Endpoints Only"** .

**O que é ZDR:** Significa *Zero Data Retention* (Retenção Zero de Dados).

**A Ação:** Se você ativar isso, o OpenRouter vira um "túnel blindado". Ele só vai permitir que o seu robô use modelos de IA (como a OpenAI ou Anthropic) que assinaram um contrato legal garantindo que os dados não serão gravados em nenhum servidor deles. Para lidar com dados reais da sua empresa, isso é fundamental.

Mais uma vez, obrigado pelo "puxão de orelha" com o print. É assim que garantimos que a arquitetura fique impecável e não baseada em achismos.

Desligue aquele botão roxo de treinamento de dados para selarmos o cofre de vez.

Com o OpenRouter agora perfeitamente configurado (Limites, Roteamento e Privacidade), podemos declarar a **FASE 1 concluída com sucesso** .

A tela preta do terminal já deu o que tinha que dar por hoje. Preparado para a **FASE 4** ? Quer que eu te mostre como abrir a Sala de Controle (Web UI) do seu OpenClaw aí no seu navegador para você ver a interface visual de tudo isso rodando?
