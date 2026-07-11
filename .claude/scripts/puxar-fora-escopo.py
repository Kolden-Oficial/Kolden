# -*- coding: utf-8 -*-
"""
puxar-fora-escopo.py — estende a rede ao material fora do escopo original
(Hermes/website+vendor, Prometeu vendor, skills, registros, docs de squad).

- Camada 1: frontmatter (tipo/area/up) por path — merge cirúrgico.
- Camada 2: um _MOC-<dominio> por domínio de topo (Hermes, Prometeu, cada squad, .claude).
- Camada 3: relacionado estrutural (hub-spoke/clique/indice) — EXCETO /i18n/ (traduções:
  só frontmatter+up, sem interligação densa, para não poluir).
Idempotente, merge-seguro. Só toca .md que ainda NÃO têm `up:`.

Uso: python .claude/scripts/puxar-fora-escopo.py [--apply]
"""
import sys, re, os, subprocess, collections, yaml
sys.stdout.reconfigure(encoding='utf-8')
APPLY = '--apply' in sys.argv

def sh(*a): return subprocess.run(a, capture_output=True).stdout.decode('utf-8', 'replace')
todos = [p for p in sh('git','-c','core.quotepath=false','ls-files','-z','--','*.md').split('\0') if p]
# escopo ORIGINAL (já interligado antes) — definido por path, estável e idempotente
orig = set(p for p in sh('git','-c','core.quotepath=false','ls-files','-z','--',
    'sobre-a-empresa/**/*.md','**/agents/*.md','**/agent-memory/*.md','**/MEMORY.md').split('\0')
    if p and '/_staging/' not in p)   # staging não é escopo original (glob do git é ganancioso)
fora = [f for f in todos
        if '/' in f and f not in orig                 # fora do escopo original; exclui raiz do vault
        and '/quarentena/' not in f                   # quarentena de segurança (Art. VIII) fica de fora
        and not os.path.basename(f).startswith('_MOC')]

def slug(s): return re.sub(r'[^a-z0-9]+','-',s.lower()).strip('-')
def _stg_seg(f):
    seg = f.split('/_staging/')[1].split('/')[0]
    return None if seg.endswith('.md') else seg   # None = arquivo solto direto em _staging/
def dom_de(f):
    if '/_staging/' in f:
        seg = _stg_seg(f)
        return f'staging-{seg}' if seg else 'staging'
    d = f.split('/')[0]
    return 'kolden-os' if d == '.claude' else d
def moc_path(f):
    if '/_staging/' in f:
        seg = _stg_seg(f); base_stg = f.split('/_staging/')[0] + '/_staging'
        base = f'{base_stg}/{seg}' if seg else base_stg
        return f'{base}/_MOC-{slug(dom_de(f))}.md'
    d = f.split('/')[0]
    base = '.claude' if d == '.claude' else d
    return f'{base}/_MOC-{slug(dom_de(f))}.md'
def tipo_de(f):
    if '/i18n/' in f: return 'traducao'
    if 'website' in f: return 'doc-site'
    b = os.path.basename(f)
    if b == 'SKILL.md': return 'skill'
    if '/registros/' in f: return 'registro'
    if '/checklists/' in f: return 'checklist'
    if '/reflexos/' in f: return 'reflexo'
    if re.search(r'/(docs|guides)/', f): return 'doc'
    return 'nota'

# ---------- frontmatter (merge cirúrgico) ----------
def fmtv(v): return f'"{v}"' if v.startswith('[[') else v
def merge_fm(f, pares):
    raw=open(f,'rb').read().decode('utf-8'); crlf='\r\n' in raw
    hasFM = raw.startswith('---\n') or raw.startswith('---\r\n')
    if hasFM:
        fe=raw.index('\n'); cm=re.search(r'\r?\n---[ \t]*(?=\r?\n|$)', raw[fe:])
        if not cm: return False
        close=fe+cm.start(); bloco=raw[fe+1:close]
        eol='\r\n' if raw[fe:fe+2]=='\r\n' else '\n'
        add=[f'{k}: {fmtv(v)}' for k,v in pares if not re.search(r'^'+k+r'\s*:',bloco,re.M)]
        if not add: return False
        novo=raw[:close]+eol+eol.join(add)+raw[close:]
    else:
        eol='\r\n' if crlf else '\n'
        novo='---'+eol+eol.join(f'{k}: {fmtv(v)}' for k,v in pares)+eol+'---'+eol+eol+raw
    if APPLY: open(f,'wb').write(novo.encode('utf-8'))
    return True

fmok=0
pordom=collections.defaultdict(list)
for f in fora:
    up=f'[[{moc_path(f)[:-3]}]]'
    if merge_fm(f, [('tipo',tipo_de(f)),('area',dom_de(f)),('up',up)]): fmok+=1
    pordom[moc_path(f)].append(f)

# ---------- MOCs de domínio ----------
def label(p): return os.path.basename(p)[:-3]
mocs=0
for mp, notas in pordom.items():
    if not APPLY: mocs+=1; continue
    corpo=['---','tipo: moc','up: "[[_MOC]]"','---','',
           f'# 🗂️ MOC — {label(mp).replace("_MOC-","")}','',f'> {len(notas)} notas.','']
    # agrupa por subpasta de 2º nível para legibilidade
    grp=collections.defaultdict(list)
    for n in sorted(notas): grp['/'.join(n.split('/')[1:3]) or '(raiz)'].append(n)
    for sub in sorted(grp):
        corpo.append(f'## {sub} ({len(grp[sub])})')
        corpo += [f'- [[{n[:-3]}|{label(n)}]]' for n in grp[sub]]
        corpo.append('')
    os.makedirs(os.path.dirname(mp) or '.', exist_ok=True)
    open(mp,'w',encoding='utf-8',newline='\n').write('\n'.join(corpo)+'\n')
    mocs+=1

# ---------- Camada 3: relacionado estrutural (exceto i18n) ----------
HUBS={'leia-me','leiame','index','indice','readme','dossie','_index','_indice'}
def is_hub(b,pasta):
    b=b.lower()
    if pasta=='agents' and (b.endswith('-chief') or b.endswith('-orquestrador')): return True
    return b in HUBS or b==pasta.lower() or 'indice' in b or b.startswith('leia')
rel_scope=[f for f in fora if '/i18n/' not in f]
grupos=collections.defaultdict(list)
for f in rel_scope: grupos[os.path.dirname(f)].append(f)
adj=collections.defaultdict(set); idx_novos={}
for d,notas in grupos.items():
    if len(notas)<2: continue
    pasta=os.path.basename(d)
    hs=[n for n in notas if is_hub(label(n),pasta)]
    if hs:
        hub=sorted(hs,key=lambda n:(label(n).lower() not in HUBS,len(n)))[0]
        for n in notas:
            if n!=hub: adj[n].add(hub); adj[hub].add(n)
    elif len(notas)<=6:
        for a in notas:
            for b in notas:
                if a!=b: adj[a].add(b)
    else:
        idx=d+'/_indice.md'; idx_novos[idx]=sorted(notas)
        for n in notas: adj[n].add(idx); adj[idx].add(n)
for idx,notas in idx_novos.items():
    if not APPLY: continue
    corpo=['---','tipo: indice',f'up: "[[{moc_path(notas[0])[:-3]}]]"','---','',
           f'# 🗂️ Índice — {os.path.basename(os.path.dirname(idx))}','',f'> {len(notas)} notas.','']
    corpo+=[f'- [[{n[:-3]}|{label(n)}]]' for n in notas]
    open(idx,'w',encoding='utf-8',newline='\n').write('\n'.join(corpo)+'\n')

def existing(b): return set(re.findall(r'\[\[([^\|\]]+)',b))
relok=arestas=0
for n,viz in adj.items():
    if n in idx_novos or not os.path.exists(n): continue
    raw=open(n,'rb').read().decode('utf-8'); crlf='\r\n' in raw; t=raw.replace('\r\n','\n')
    m=re.match(r'^---\n(.*?)\n---',t,re.S)
    if not m: continue
    bloco=m.group(1); ja=existing(bloco)
    novos=sorted([v for v in viz if v[:-3] not in ja],key=lambda x:label(x).lower())
    if not novos: continue
    linhas=[f'  - "[[{v[:-3]}|{label(v)}]]"' for v in novos]
    if re.search(r'^relacionado:',bloco,re.M):
        nb=re.sub(r'^relacionado:.*$',lambda mm:mm.group(0)+'\n'+'\n'.join(linhas),bloco,count=1,flags=re.M)
        novo=t[:m.start(1)]+nb+t[m.end(1):]
    else:
        ins=t.index('\n---',4); novo=t[:ins]+'\nrelacionado:\n'+'\n'.join(linhas)+t[ins:]
    arestas+=len(novos); relok+=1
    if APPLY:
        if crlf: novo=novo.replace('\n','\r\n')
        open(n,'wb').write(novo.encode('utf-8'))

print(f"{'APLICADO' if APPLY else 'DRY-RUN'}")
print(f"fora-de-escopo alvo: {len(fora)} | i18n (só frontmatter): {sum('/i18n/' in f for f in fora)}")
print(f"frontmatter add: {fmok} | MOCs de domínio: {mocs} | índices locais: {len(idx_novos)}")
print(f"relacionado: {relok} notas | {arestas} arestas")
