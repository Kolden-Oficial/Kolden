---
id_fonte: "13bbf479-b118-4fa0-ab36-93a6d04d40f6"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "OpenClaw: Configuração e Integração Telegram"
tipo: "unknown"
url_original: null
keywords: "('Telegram integration approval', 'Configuration error fix', 'Dashboard Web UI', 'Model selection settings', 'Software terminal commands')"
summary: "This guide serves as a practical walkthrough for finalizing the setup of **OpenClaw**, focusing on the successful **authentication of a Telegram account** as the primary controller. The text clarifies that initial errors were merely signs of completed pairing or minor **syntax mistakes in the command line**, which are easily bypassed by transitioning to a more user-friendly environment. By accessing a **web-based dashboard** via a unique local link, the user can bypass complex coding to manually select a **free AI model** through a visual interface. Ultimately, the text empowers the user to transition from technical troubleshooting to a functional **\"NASA-level\" control room** where they can manage their bot’s \"brain\" with ease."
extraido_em: "2026-06-30T16:21:21Z"
extraido_por: "notebooklm-py-0.7.3"
---

# OpenClaw: Configuração e Integração Telegram

# Tab 1

Calma, respira que a gente já venceu! Olha que genial o que acabou de acontecer aí na sua tela (e as mensagens irônicas do próprio OpenClaw são um show à parte 😂).

Vamos ler os "códigos da Matrix" que você me mandou:

##### 1. O Telegram FOI APROVADO com Sucesso! 🎉

Olha a sua primeira tentativa ali em cima:

Approved telegram sender 817916732.

**Deu certo de primeira!** O seu celular já é oficialmente o "Chefe" do robô.

O erro que deu na sua terceira tentativa ( *"No pending pairing request found"* ) aconteceu justamente porque **o código já tinha sido usado na primeira vez** . O sistema basicamente te disse: *"Cara, você já está aprovado, não tem mais nenhum convite pendente aqui"* .

##### 2. O Erro do Modelo Gratuito (A Pegadinha da Sintaxe)

Você digitou o comando quase perfeito, mas o sistema reclamou: Unrecognized key: "defaultModel".

Por que isso aconteceu? No mundo dos arquivos de configuração (JSON), as coisas são guardadas em "gavetas". O comando que eu te passei tentou jogar a configuração solta no meio da sala, e o OpenClaw rejeitou porque ele exige que a gente aponte a gaveta certa (algo como agent.defaultModel ou gateway.model).

Mas, como nós somos Arquitetos de Software agora, nós não vamos ficar brigando com código no terminal para trocar o modelo. Nós vamos usar a **Sala de Controle Nível NASA** que você acabou de instalar!

##### O Caminho Sênior: Trocando o "Cérebro" pela Interface Visual

Lembra daquele link verde que o terminal gerou na etapa anterior? Chegou a hora de usá-lo.

Copie o seu link do painel (aquele que tem a sua senha embutida):<http://127.0.0.1:18789/#token=4434b8a664ba06623a4d974a47e29c6aed37ff01dde4a974>

Abra o seu navegador normal aí no Windows (Chrome, Edge, etc.) e **cole esse link** .

Bem-vindo ao seu Dashboard (Web UI)! 🚀

Na interface, procure pelo menu de **Settings** (Configurações) ou **Agent/Model** (Agente/Modelo).

Vai ter um campo lá com o modelo atual (openrouter/auto). Clique nele e procure/digite o modelo gratuito: meta-llama/llama-3-8b-instruct:free (ou qualquer outro com a tag :free).

Salve a alteração!

**Dica de Ouro:** Fazer isso pela interface visual garante que o sistema organize os arquivos internos do jeito perfeito, sem a gente precisar adivinhar o comando no terminal.

Assim que você trocar o modelo lá no seu painel web e salvar, pegue o seu celular de novo e mande o **"Olá"** para o seu robô no Telegram.

Me avise se você conseguiu acessar o painel bonito no navegador e se o robô finalmente respondeu no celular!
