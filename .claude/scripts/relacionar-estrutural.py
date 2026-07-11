# -*- coding: utf-8 -*-
"""
relacionar-estrutural.py — Camada 3 (estrutural) da rede do vault.

Liga notas IRMÃS (mesmo diretório) via `relacionado:`:
  - HUB no diretório (leia-me/indice/dossie/<squad>-chief) -> hub-and-spoke;
  - grupo pequeno (<=6) sem hub -> clique;
  - grupo grande (>6) sem hub -> se o PAI tem hub, liga ao hub do pai;
    senão cria um `_indice.md` local (hub sintético) e liga a ele.
Exclui: _MOC, _staging, quarentena, /backups/ (snapshots, não são conteúdo).
Merge-seguro + idempotente (dedup por path).

Uso: python .claude/scripts/relacionar-estrutural.py [--apply]
"""
import sys, re, os, subprocess, collections
sys.stdout.reconfigure(encoding='utf-8')
APPLY = '--apply' in sys.argv

def git_list():
    out = subprocess.run(['git','-c','core.quotepath=false','ls-files','-z','--',
        'sobre-a-empresa/**/*.md','**/agents/*.md','**/agent-memory/*.md','**/MEMORY.md'],
        capture_output=True).stdout
    return [p for p in out.decode('utf-8').split('\0') if p]

HUBS = {'leia-me','leiame','index','indice','readme','dossie','_index','_indice'}
def is_hub(base, pasta):
    b = base.lower()
    if pasta == 'agents' and (b.endswith('-chief') or b.endswith('-orquestrador')):
        return True
    return b in HUBS or b == pasta.lower() or 'indice' in b or b.startswith('leia')
def hub_de(notas, pasta):
    hs = [n for n in notas if is_hub(os.path.basename(n)[:-3], pasta)]
    return sorted(hs, key=lambda n: (os.path.basename(n)[:-3].lower() not in HUBS, len(n)))[0] if hs else None
def label(p): return os.path.basename(p)[:-3]

def up_para(d):
    if '/Kolden/_historico/' in d+'/': return '[[sobre-a-empresa/Kolden/_historico/_MOC-historico]]'
    m = re.search(r'sobre-a-empresa/Kolden/([^/]+)/', d+'/')
    if m: return f'[[sobre-a-empresa/Kolden/{m.group(1)}/_MOC-{m.group(1)}]]'
    if '/Projetos/' in d+'/': return '[[sobre-a-empresa/Projetos/_MOC-projetos]]'
    if d.startswith('sobre-a-empresa/Ferramentas'): return '[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]'
    if re.search(r'(^|/)agents$', d): return '[[_MOC-frota]]'
    if 'agent-memory' in d: return '[[_MOC-memorias]]'
    return '[[_MOC]]'

files = [f for f in git_list()
         if not os.path.basename(f).startswith('_MOC')
         and '/_staging/' not in f and '/quarentena/' not in f and '/backups/' not in f]
grupos = collections.defaultdict(list)
for f in files: grupos[os.path.dirname(f)].append(f)

adj = collections.defaultdict(set)
indices_novos = {}   # path do _indice -> [notas]
stats = collections.Counter()
for d, notas in grupos.items():
    if len(notas) < 2: continue
    pasta = os.path.basename(d)
    hub = hub_de(notas, pasta)
    if hub:
        stats['hub-spoke'] += 1
        for n in notas:
            if n != hub: adj[n].add(hub); adj[hub].add(n)
    elif len(notas) <= 6:
        stats['clique'] += 1
        for a in notas:
            for b in notas:
                if a != b: adj[a].add(b)
    else:  # grande sem hub
        pai = os.path.dirname(d)
        pai_hub = hub_de(grupos.get(pai, []), os.path.basename(pai)) if pai else None
        if pai_hub:
            stats['spoke-ao-pai'] += 1
            for n in notas: adj[n].add(pai_hub); adj[pai_hub].add(n)
        else:
            stats['indice-local'] += 1
            idx = d + '/_indice.md'
            indices_novos[idx] = sorted(notas)
            for n in notas: adj[n].add(idx); adj[idx].add(n)

# --- escreve os _indice locais sintéticos ---
def wl(t): return f'"[[{t[:-3]}|{label(t)}]]"'
for idx, notas in indices_novos.items():
    if not APPLY: continue
    corpo = ['---', 'tipo: indice', f'up: {up_para(os.path.dirname(idx))}', '---', '',
             f'# 🗂️ Índice — {os.path.basename(os.path.dirname(idx))}', '',
             f'> {len(notas)} notas nesta pasta.', '']
    corpo += [f'- [[{n[:-3]}|{label(n)}]]' for n in notas]
    with open(idx, 'w', encoding='utf-8', newline='\n') as fh:
        fh.write('\n'.join(corpo) + '\n')

# --- aplica relacionado nas notas (merge-seguro/dedup) ---
def existing(bloco): return set(re.findall(r'\[\[([^\|\]]+)', bloco))
ap = nn = 0
for n, viz in adj.items():
    if n in indices_novos: continue  # o _indice já nasce com os links no corpo
    if not os.path.exists(n): continue
    raw = open(n,'rb').read().decode('utf-8'); crlf = '\r\n' in raw
    t = raw.replace('\r\n','\n')
    m = re.match(r'^---\n(.*?)\n---', t, re.S)
    if not m: continue
    bloco = m.group(1); ja = existing(bloco)
    novos = sorted([v for v in viz if v[:-3] not in ja], key=lambda x: label(x).lower())
    if not novos: continue
    linhas = [f'  - {wl(v)}' for v in novos]
    if re.search(r'^relacionado:', bloco, re.M):
        nb = re.sub(r'^relacionado:.*$', lambda mm: mm.group(0)+'\n'+'\n'.join(linhas), bloco, count=1, flags=re.M)
        novo = t[:m.start(1)] + nb + t[m.end(1):]
    else:
        ins = t.index('\n---', 4); novo = t[:ins] + '\nrelacionado:\n' + '\n'.join(linhas) + t[ins:]
    nn += len(novos); ap += 1
    if APPLY:
        if crlf: novo = novo.replace('\n','\r\n')
        open(n,'wb').write(novo.encode('utf-8'))

print(f"{'APLICADO' if APPLY else 'DRY-RUN'}  {dict(stats)}")
print(f"índices locais criados: {len(indices_novos)}")
print(f"notas que recebem relacionado: {ap} | novas arestas: {nn}")
