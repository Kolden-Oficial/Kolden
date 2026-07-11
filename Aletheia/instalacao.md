---
tipo: nota
area: Aletheia
up: "[[Aletheia/_MOC-aletheia]]"
relacionado:
  - "[[Aletheia/README|README]]"
---

# Instalação — Aletheia

Como colocar o squad em produção.

## 1. Pré-requisitos
- O squad é um **projeto Claude Code independente**. Abrir `C:\Kolden\Aletheia\` no Claude Code
  já ativa a identidade (lê `CLAUDE.md` automaticamente).
- Git Bash disponível (os reflexos em `.claude/reflexos/` são scripts `.sh`).

## 2. Reflexos (hooks)
Os reflexos já estão configurados em `.claude/settings.json`. Confira a permissão de execução:

```bash
chmod +x C:/Kolden/Aletheia/.claude/reflexos/*.sh
```

Eventos ativos:
- **PreToolUse (Bash):** `pre-ferramenta.sh` — bloqueia comandos destrutivos e segredos em texto puro.
- **PostToolUse (Write|Edit):** `pos-escrita.sh` (auditoria) + `marca-trabalho.sh` (marcador de sessão).
- **Stop:** `encerramento-aprendizado.sh` — dispara o Ritual de Encerramento (auto-aprendizado).
- **SessionStart:** `inicio-sessao.sh` (estado do squad) + `verificacao-diaria.sh` (alinhamento >24h).

## 3. Segredos (Infisical)
Toda credencial vem do Infisical — caminho `/kolden/aletheia`. Nunca em texto puro (Art. VII).
Use a habilidade compartilhada `infisical-padrao`.

## 4. Primeiro uso
```
@aletheia validate "<uma ideia de negócio crua>"
```
Ou rode a jornada completa com `*journey`.

## 5. Handoffs
Quando a decisão for "perseverar para build", o squad prepara o pacote de handoff para
Aglaia / Pluto / Harmonia / Caliope / Prometeu / Metis (ver `tasks/decide.md`).

## 6. Registro
O squad está registrado em `C:\Kolden\Caos\dados\registro-de-entidades.yaml` e indexado em
`C:\Kolden\AGENTS.md`.
