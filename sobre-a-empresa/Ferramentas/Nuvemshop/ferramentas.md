---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
relacionado:
  - "[[sobre-a-empresa/Ferramentas/Infisical/ferramentas|Infisical]]"
  - "[[sobre-a-empresa/Projetos/Ativos/rosie/_tema-recife/README|Tema Recife — Rosie]]"
---

# Nuvemshop CLI — Edição de Temas

CLI oficial da Nuvemshop/Tiendanube para editar temas localmente. Pacote npm
**`@tiendanube/cli`** (v2.4.0 em 2026-10-02). Os binários `nuvemshop` e `tiendanube` são o mesmo CLI.

- Docs: https://nuvemshop.dev/themes/developer-tools/cli/overview
- Fluxo FTP: https://nuvemshop.dev/themes/developer-tools/cli/ftp-theme-development
- npm: https://www.npmjs.com/package/@tiendanube/cli

## Dois modos

| Modo | Para quais temas | Auth | Observação |
|------|------------------|------|-----------|
| **FTP** (`theme ftp …`) | legados — **Recife (Rosie)** | credenciais FTP do painel | só `setup/pull/diff/push/watch`; **todo push é produção** |
| **Fork** (`theme …`) | seccionáveis (Ipanema) | `theme authorize` (token do navegador) | preview, publish, clone, performance |

## Credenciais — Infisical, nunca em disco

O CLI **não lê credencial de variável de ambiente**: `theme ftp setup` grava host, usuário,
senha e URL da loja em `.nuvem` no diretório do tema — **ofuscado, não criptografado**.

Por isso o CLI nunca é chamado direto. O wrapper [`nuvemshop-tema.cjs`](nuvemshop-tema.cjs):

1. lê as credenciais que o `infisical run` injeta;
2. roda `theme ftp setup` (recria o `.nuvem`);
3. roda o comando pedido (`pull | diff | push | watch`);
4. **apaga o `.nuvem`** no fim — também em erro ou Ctrl+C.

Também desliga a telemetria do CLI (`NUVEMSHOP_CLI_TELEMETRY_ENABLED=0`).

### Segredos no Infisical

Projeto `43d90b85-ca09-437c-b8f2-364b5cbe6093`, ambiente **Development** (`dev`), pasta raiz `/`:

| Chave | Valor |
|-------|-------|
| `NUVEMSHOP_ROSIE_FTP_USER` | usuário FTP (painel → Loja online → Layouts → Recife → Abrir FTP) |
| `NUVEMSHOP_ROSIE_FTP_PASSWORD` | senha FTP (mesma tela) |
| `NUVEMSHOP_ROSIE_STORE_URL` | `https://rosieiadoreyou.com.br` |
| `NUVEMSHOP_ROSIE_FTP_HOST` | *(opcional)* padrão `ftp.nuvemshop.com.br` |

> A senha só aparece no painel ao clicar em **"Gerar nova senha"**, que invalida a anterior.
> Gerar, copiar direto para o Infisical, não colar em chat/doc.

## Instalação (máquina local — `C:\Kolden\` ou WSL)

```bash
node --version                     # precisa ser >= 24.15 (exigência do pacote)
npm install -g @tiendanube/cli
nuvemshop --version
```

Pré-requisito: CLI do Infisical + `INFISICAL_TOKEN` (ver `../Infisical/instalacao.md`).

## Uso

Sempre da raiz do repositório:

```bash
INF="infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev --"
W=sobre-a-empresa/Ferramentas/Nuvemshop/nuvemshop-tema.cjs

$INF node $W rosie pull                  # baixa o tema para rosie/_tema-recife/codigo/
$INF node $W rosie diff                  # o que um push mudaria (só leitura)
$INF node $W rosie watch --no-browser    # sobe cada arquivo salvo, ao vivo
$INF node $W rosie push                  # mostra diff, depois pede confirmação
```

Para adicionar outra loja: nova entrada em `LOJAS` no wrapper + segredos `NUVEMSHOP_<LOJA>_*`.

## Riscos — ler antes de push/watch

- **Push FTP = produção imediata.** Não há rascunho nem preview no modo FTP.
- **Push apaga do servidor** arquivos que não existem localmente. Nunca dar push de uma pasta incompleta; sempre `pull` recente antes.
- **`watch` também é produção**: cada save vai ao ar.
- `diff` compara **tamanho + data de modificação**, não conteúdo.
- O wrapper recusa `push -y`: a confirmação no prompt é obrigatória.
- Fazer snapshot em `_tema-recife/_backup/` antes de mudanças grandes.

## Limitações conhecidas

- **Não roda em sessão Claude Code na nuvem**: o FTP é FTPS explícito na porta 21, e o
  container só sai por proxy HTTPS — testado em 2026-10-02, timeout no control socket.
- Durante o `setup` (poucos segundos) a senha aparece na lista de processos da máquina
  (é argumento de linha de comando). Aceitável em máquina de uso único; não rodar em host compartilhado.
- Como o `.nuvem` é apagado a cada execução, o registro de "qual modo fez o último pull"
  também some — o CLI trata a pasta como nunca sincronizada e não bloqueia o push.
