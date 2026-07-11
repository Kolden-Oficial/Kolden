# -*- coding: utf-8 -*-
"""
relacionar-semantico.py — conecta as notas SINGLETON (up: sem relacionado:)
por sobreposição de palavras-chave reais (frontmatter + título). Sem alucinação:
só liga quando há >=2 termos em comum. Top-3 alvos por nota. Merge-seguro.

Uso: python .claude/scripts/relacionar-semantico.py [--apply]
"""
import sys, re, os, subprocess, collections, yaml
sys.stdout.reconfigure(encoding='utf-8')
APPLY = '--apply' in sys.argv

STOP = set('de da do das dos e a o os as um uma para por com sem no na nos nas '
           'kolden nota notas sobre que the of and to in um ca'.split())
def toks(s):
    return {w for w in re.split(r'[^a-zà-ú0-9]+', (s or '').lower()) if len(w) > 2 and w not in STOP}

def load(f):
    try: t = open(f, encoding='utf-8', errors='replace').read()
    except: return None, None
    m = re.match(r'^---\r?\n(.*?)\r?\n---', t, re.S)
    if not m: return None, t
    try: return yaml.safe_load(m.group(1)) or {}, t
    except: return {}, t

def keywords(fm, path):
    kw = set()
    if isinstance(fm, dict):
        for k in ('palavras-chave','tags','keywords','palavras_chave'):
            v = fm.get(k)
            if isinstance(v, list): kw |= {str(x).lower() for x in v}
            elif isinstance(v, str): kw |= toks(v)
        kw |= toks(str(fm.get('titulo','')))
        kw |= toks(str(fm.get('area',''))) | toks(str(fm.get('categoria','')))
    kw |= toks(os.path.basename(path)[:-3])
    return {w for w in kw if w not in STOP and len(w) > 2}

# universo
out = subprocess.run(['git','-c','core.quotepath=false','ls-files','-z','--',
    'sobre-a-empresa/**/*.md','**/agents/*.md','**/agent-memory/*.md','**/MEMORY.md'],capture_output=True).stdout
files = [p for p in out.decode('utf-8').split('\0')
         if p and '/_staging/' not in p and '/quarentena/' not in p and not os.path.basename(p).startswith('_MOC')]
KW = {}; HASREL = {}
for f in files:
    fm, t = load(f)
    if t is None: continue
    KW[f] = keywords(fm, f)
    HASREL[f] = bool(t and re.search(r'^relacionado:', t, re.M))

singletons = [f for f in files if HASREL.get(f) is False and re.search(r'^up:', open(f,encoding="utf-8",errors="replace").read(), re.M)]

# --- IDF: keyword rara discrimina; genérica não ---
import math
N = len(files); df = collections.Counter()
for f in files:
    for w in KW[f]: df[w] += 1
def idf(w): return math.log(N / (df.get(w,0)+1))

# --- índice: nome do agente -> path (para regra memória->agente) ---
AGENTE = {}
for f in files:
    if re.search(r'(^|/)agents/[^/]+\.md$', f):
        AGENTE.setdefault(os.path.basename(f)[:-3], f)

def alvos_de(s):
    base = os.path.basename(s)[:-3]
    # regra forte: memória de agente -> agente homônimo
    if 'agent-memory' in s and base in AGENTE:
        return [(99, AGENTE[base])]
    # regra forte: MEMORY.md -> agente/chief dono (nome da pasta pai, ou <squad>-chief)
    if base == 'MEMORY':
        dono = os.path.basename(os.path.dirname(s))
        squad = s.split('/')[0]
        for cand in (dono, f'{dono}-chief', f'{squad.lower()}-chief'):
            if cand in AGENTE and AGENTE[cand] != s:
                return [(99, AGENTE[cand])]
    inter_min, cand = 2, []
    for g in files:
        if g == s or os.path.dirname(g) == os.path.dirname(s): continue
        inter = KW[s] & KW[g]
        if len(inter) < inter_min: continue
        w = sum(idf(x) for x in inter)           # score ponderado por raridade
        disc = max((idf(x) for x in inter), default=0)
        if w >= 7.0 and disc >= 3.5:              # exige sinal discriminante forte
            cand.append((round(w,1), g))
    cand.sort(key=lambda x: (-x[0], x[1]))
    return cand[:2]

def label(p): return os.path.basename(p)[:-3]
def merge(f, alvos):
    raw = open(f,'rb').read().decode('utf-8'); crlf='\r\n' in raw; t=raw.replace('\r\n','\n')
    m = re.match(r'^---\n(.*?)\n---', t, re.S)
    if not m: return False
    bloco=m.group(1)
    if re.search(r'^relacionado:',bloco,re.M): return False
    linhas=[f'  - "[[{g[:-3]}|{label(g)}]]"' for _,g in alvos]
    ins=t.index('\n---',4); novo=t[:ins]+'\nrelacionado:\n'+'\n'.join(linhas)+t[ins:]
    yaml.safe_load(re.match(r'^---\n(.*?)\n---',novo,re.S).group(1))
    if crlf: novo=novo.replace('\n','\r\n')
    if APPLY: open(f,'wb').write(novo.encode('utf-8'))
    return True

ligadas=semmatch=0; amostra=[]
for s in singletons:
    al = alvos_de(s)
    if not al: semmatch+=1; continue
    if merge(s, al): ligadas+=1
    if len(amostra) < 15: amostra.append((s, al))

print(f"{'APLICADO' if APPLY else 'DRY-RUN'}")
print(f"singletons: {len(singletons)} | ligadas: {ligadas} | sem match (>=2 kw): {semmatch}")
print("\n--- amostra (singleton -> alvos por keyword) ---")
for s, al in amostra:
    print(f"\n• {label(s)}  [{'/'.join(s.split('/')[:3])}]")
    for sc, g in al: print(f"     {sc}kw  {label(g)}  [{'/'.join(g.split('/')[1:4])}]")
