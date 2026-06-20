# Story 7.1.1: Bootstrap do Workspace /dev — Clone do aiox-dashboard

**Story ID:** 7.1.1  
**Epic:** Epic-7 - Integração do Workspace do Dashboard  
**Wave:** Wave 1 (Fundação)  
**Status:** ⌛ Em Andamento
**Prioridade:** 🔴 Alta  
**Responsável:** Architect (Aria) → Dev (Dex)  
**Criada:** 2026-05-05  
**Atualizada:** 2026-05-05

---

## 📋 Objetivo

Configurar `/dev` como monorepo pai com `aiox-core` e `aiox-dashboard` como projetos irmãos.  
O dashboard observa dados do aiox-core via Supabase (somente leitura). Sem workspace hoisting — projetos independentes.

---

## 🎯 Story

**Como** desenvolvedor AIOX,  
**Quero** o `aiox-dashboard` clonado em `C:\dev\aiox-dashboard` com um `package.json` raiz de conveniência em `C:\dev\`,  
**Para que** eu possa rodar e desenvolver CLI + Dashboard em paralelo no mesmo workspace.

---

## ✅ Critérios de Aceitação

- [x] `C:\dev\aiox-dashboard\` existe com clone do repositório `SynkraAI/aiox-dashboard`
- [x] `C:\dev\package.json` existe com scripts de conveniência (`dev`, `dev:core`, `dev:dashboard`, `lint`, `test`)
- [x] `C:\dev\.gitignore` existe cobrindo `node_modules`, `.env`, lock files dos dois projetos
- [x] `C:\dev\aiox-dashboard\.env.local` criado a partir do `.env.example` do dashboard
- [ ] Variáveis Supabase alinhadas entre `aiox-core` e `aiox-dashboard` — **pendente: preencher credenciais**
- [x] `cd C:\dev\aiox-dashboard && npm install` completa sem erros (bun não instalado, npm usado como fallback)
- [ ] Dashboard roda localmente (`npm run dev`) com acesso ao Supabase configurado — **pendente: credenciais Supabase**

---

## 📐 Escopo

**DENTRO (IN):**
- Clone do repositório aiox-dashboard
- `package.json` raiz apenas com scripts (sem workspace hoisting)
- Alinhamento de variáveis de ambiente Supabase
- `.gitignore` raiz

**FORA (OUT):**
- Unificação de workspaces npm (risco CJS/ESM)
- Rename de namespace `@aios/` → `@aiox/` (Story 7.1.2)
- Integração de dados Supabase (Story 7.1.3)
- CI/CD para o dashboard (Story 7.1.4)

---

## 🔗 Dependências

- `aiox-core` já configurado em `C:\dev\aiox-core\`
- Bun não instalado; npm usado como fallback
- Credenciais Supabase disponíveis em `C:\dev\aiox-core\.env`

---

## 📁 Lista de Arquivos

- [x] `C:\dev\package.json` — scripts do workspace raiz
- [x] `C:\dev\.gitignore` — gitignore raiz
- [x] `C:\dev\aiox-dashboard\` — clone do repositório (1358 arquivos)
- [x] `C:\dev\aiox-dashboard\.env.local` — env local do dashboard (variáveis Supabase aguardando preenchimento)

---

## 📝 Change Log

| Data | Autor | Mudança |
|------|--------|--------|
| 2026-05-05 | Aria (@architect) | Story criada em YOLO mode |
