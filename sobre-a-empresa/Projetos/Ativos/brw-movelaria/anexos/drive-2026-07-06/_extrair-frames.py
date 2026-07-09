import subprocess, sys, os, json
from pathlib import Path
import imageio_ffmpeg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
ROOT = Path(r"C:\Kolden\sobre-a-empresa\Projetos\Ativos\brw-movelaria\anexos\drive-2026-07-06")
OUT = ROOT / "_frames"
OUT.mkdir(exist_ok=True)

def probe_duration(p):
    r = subprocess.run([FFMPEG, "-i", str(p)], capture_output=True, text=True, encoding="utf-8", errors="replace")
    for line in r.stderr.splitlines():
        if "Duration:" in line:
            t = line.split("Duration:")[1].split(",")[0].strip()
            h, m, s = t.split(":")
            return int(h)*3600 + int(m)*60 + float(s)
    return None

results = []
for mp4 in sorted(ROOT.rglob("*.mp4")):
    rel = mp4.relative_to(ROOT)
    stem = str(rel).replace("\\", "__").replace(".mp4", "")
    dur = probe_duration(mp4)
    if not dur:
        results.append({"file": str(rel), "error": "no duration"})
        continue
    for label, pct in [("a", 0.30), ("b", 0.70)]:
        t = dur * pct
        outp = OUT / f"{stem}_{label}.jpg"
        subprocess.run([FFMPEG, "-y", "-ss", f"{t:.2f}", "-i", str(mp4), "-frames:v", "1", "-q:v", "3", str(outp)],
                       capture_output=True)
    results.append({"file": str(rel), "duration_s": round(dur, 2)})

print(json.dumps(results, indent=2, ensure_ascii=False))
