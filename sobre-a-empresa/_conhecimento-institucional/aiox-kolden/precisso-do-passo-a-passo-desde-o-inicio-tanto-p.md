---
id_fonte: "f81a3b4c-f203-4d01-98c5-5af97533bc38"
notebook_id: "0188843a-41c6-4b0a-ba99-1ba5a01ee382"
notebook_titulo: "Aiox-Kolden"
titulo: "Precisso do passo a passo desde o inicio, tanto p..."
tipo: "unknown"
url_original: null
keywords: "('WSL Ubuntu operation', 'OpenClaw server setup', 'Command line access', 'Dashboard link generation', 'Linux server management')"
summary: "This guide serves as a practical manual for users who need to **reactivate a Linux-based server** environment hosted on Windows via WSL. The text outlines a systematic process for **re-establishing a connection** to the Ubuntu terminal, initializing the software’s background services, and generating a **secure access token** for the web dashboard. By framing the technical steps as an architectural \"survival manual,\" the source aims to demystify the command-line interface and provide a **clear bridge between the terminal and the visual browser interface**. Ultimately, its purpose is to empower beginners to navigate their local server infrastructure independently after a system reboot or closure."
extraido_em: "2026-06-30T16:21:39Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Precisso do passo a passo desde o inicio, tanto p...

# Tab 1

É super normal se sentir perdido nessa parte! Quando fechamos a janela preta do Linux pela primeira vez no Windows, parece que o nosso servidor "sumiu" e não sabemos como voltar para lá.

Como você está rodando o Linux (Ubuntu) dentro do Windows (usando o WSL), o seu servidor "dorme" quando você fecha a janela ou reinicia o computador.

Aqui está o **Manual de Sobrevivência Definitivo** de como religar a sua operação do zero, passo a passo, como um verdadeiro Arquiteto de Software:

##### PASSO 1: Abrindo a porta do Linux (Ubuntu)

Nós precisamos voltar para aquela tela preta onde você digita os comandos.

Clique no botão **Iniciar** do seu Windows (ou aperte a tecla Windows no teclado).

Digite **Ubuntu** na barra de pesquisa.

Clique no aplicativo com o ícone laranja do Ubuntu que vai aparecer.

Uma janela preta vai se abrir e, em alguns segundos, você verá o seu nome lá: ronan@RonanSersil:~$. *(Pronto, você está dentro do servidor novamente!)*

##### PASSO 2: Pegando a Chave da Sala de Controle

Como o serviço do OpenClaw foi instalado no sistema (lembra do *Systemd* ?), ele provavelmente já ligou o cérebro do robô sozinho no fundo assim que você abriu o Ubuntu. Nós só precisamos pedir para ele gerar um link novo do painel web para você.

Na tela preta do Ubuntu, digite o seguinte comando e aperte **Enter** : **openclaw dashboard --no-open**

**O que vai acontecer:** Ele vai imprimir várias linhas na tela e uma delas será o link verde fresquinho e atualizado, parecido com este:<http://127.0.0.1:18789/#token=nova_senha_gigante_aqui>

*(Atenção: Se por acaso o comando acima der um erro dizendo que o "Gateway" está desligado, digite* ***openclaw gateway --force*** *e dê Enter para forçar o motor a ligar).*

##### PASSO 3: Acessando o Painel Visual

Use o mouse para selecionar esse link completo (do http até o final do número gigante do token) na tela preta.

No Ubuntu/WSL, para copiar, basta **clicar com o botão direito do mouse** em cima do texto selecionado (ou apertar Ctrl + Shift + C).

Abra o seu navegador no Windows (Chrome, Edge, etc.).

Cole o link na barra de endereços e aperte **Enter** .

##### O seu próximo passo:

Faça essa trilha: Menu Iniciar > Ubuntu > comando openclaw dashboard --no-open > Copiar o link pro navegador.

Me avise se o painel escuro da Sala de Controle finalmente abriu para você! Se aparecer qualquer erro diferente na tela preta, basta copiar e me mandar aqui que eu traduzo na hora.
