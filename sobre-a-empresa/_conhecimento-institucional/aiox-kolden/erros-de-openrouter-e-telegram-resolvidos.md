---
id_fonte: "31ad072f-5301-426e-95dd-7cda60ac1d72"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Erros de OpenRouter e Telegram Resolvidos"
tipo: "unknown"
url_original: null
keywords: "('Telegram access authorization', 'OpenRouter billing error', 'User authentication process', 'Credit management', 'Free AI models')"
summary: "This guide serves as a troubleshooting manual for users of the **OpenClaw automation system**, explaining that encountering specific errors is actually a sign that the software's **security and connection layers** are functioning correctly. The author identifies two primary hurdles: a **pairing restriction** that requires the user to manually authorize their Telegram ID for administrative access, and a **billing limitation** within the OpenRouter API. To resolve these, the text outlines a clear structural path, offering the user a choice between **funding their account** for high-performance models or **reconfiguring the system** to utilize free alternative \"brains.\" Ultimately, the source aims to transform a technical setback into a **validation of the installation's success**, guiding the user through the final steps of system activation."
extraido_em: "2026-06-30T16:19:51Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Erros de OpenRouter e Telegram Resolvidos

# Tab 1

Hahaha! Acredite se quiser, mas **isso é um sucesso absoluto!** 🎉

O seu robô está 100% vivo, respirando, conectado à internet e... operando exatamente como as arquiteturas de segurança de milhões de dólares que discutimos!

Você acabou de esbarrar nas duas proteções mais geniais do sistema. Vamos resolver as duas em 2 minutos:

##### 1. O Alerta do Telegram (O "Segurança na Porta")

Lembra quando eu te disse que não podíamos deixar qualquer pessoa no WhatsApp ou Telegram conversando com o seu robô para não gastar o seu dinheiro? É isso que aconteceu!

O OpenClaw viu você mandando mensagem no Telegram e disse: *"Opa, não conheço esse cara (User ID 817916732). Vou bloquear até o meu dono autorizar"* .

**Como resolver (Dar o crachá VIP para você):**

Como você está dentro da tela de chat do terminal (TUI), você precisa voltar para o terminal normal para dar o comando.

Digite /exit e aperte Enter (ou aperte Ctrl + C duas vezes) para sair do modo chat.

Na sua tela preta normal, cole exatamente o comando que ele te deu e aperte Enter:openclaw pairing approve telegram AS63E754

Pronto! O seu Telegram pessoal agora é o "Chefe Oficial" e o robô vai te obedecer para sempre.

##### 2. O Alerta do OpenRouter (O "Bolso Vazio")

O erro billing error significa que a comunicação com o OpenRouter funcionou perfeitamente, mas quando o OpenClaw tentou ligar o motor (usando a opção auto, que geralmente chama o Claude ou GPT-4o), o OpenRouter barrou dizendo: *"A conta desse usuário tem US$ 0.00 de saldo"* .

Você tem dois caminhos agora para fazer ele responder ao seu "Wake up, my friend!":

**Caminho A: Colocar uns trocados (Recomendado para usar a IA no máximo)**

Vá no site do OpenRouter (onde você pegou a chave), clique em **Settings** ou **Credits** (Billing).

Coloque o mínimo possível (geralmente uns US$ 5) via cartão.

Como você gasta frações de centavos, esses 5 dólares vão durar semanas ou meses de testes. Assim que o saldo cair lá, o robô responde na hora.

**Caminho B: Usar um modelo 100% Gratuito (Para não gastar nada agora)**

Se você não quiser colocar cartão agora, podemos mandar o OpenClaw usar os modelos "Free" do OpenRouter (como o Llama 3 da Meta).

No seu terminal normal, digite: openclaw config set defaultModel "meta-llama/llama-3-8b-instruct:free"

Aperte Enter. O seu robô passará a usar um cérebro gratuito e não vai mais dar o erro de saldo!

**Resumo da Ópera:** A sua instalação foi perfeita. A arquitetura está rodando. Ele só barrou você por excesso de segurança e falta de saldo.

Faça o comando de aprovação do Telegram (openclaw pairing approve...) para liberar seu acesso, e me diga qual caminho do OpenRouter você prefere: colocar os 5 dólares lá ou trocar para o cérebro gratuito pelo terminal?
