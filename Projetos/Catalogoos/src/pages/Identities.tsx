import { useEffect, useMemo, useState } from "react";
import { Search, Loader2, Pencil, Zap, Save, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Identity {
  id: string;
  lead_id: string;
  email: string | null;
  phone: string | null;
  first_name: string | null;
  last_name: string | null;
  dob: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  country: string | null;
  gender: string | null;
  external_id: string | null;
  fbc: string | null;
  fbp: string | null;
  updated_at: string;
}

const EDITABLE_FIELDS: Array<{ key: keyof Identity; label: string; placeholder?: string }> = [
  { key: "email", label: "Email", placeholder: "lead@example.com" },
  { key: "phone", label: "Telefone", placeholder: "+5511999999999" },
  { key: "first_name", label: "Primeiro nome" },
  { key: "last_name", label: "Sobrenome" },
  { key: "dob", label: "Data de nascimento", placeholder: "YYYYMMDD" },
  { key: "city", label: "Cidade" },
  { key: "state", label: "Estado (UF)", placeholder: "SP" },
  { key: "zip", label: "CEP" },
  { key: "country", label: "País", placeholder: "br" },
  { key: "gender", label: "Gênero", placeholder: "m / f" },
  { key: "external_id", label: "External ID" },
  { key: "fbc", label: "fbc" },
  { key: "fbp", label: "fbp" },
];

// Mirrors weights from track-conversion edge function
const WEIGHTS: Array<[keyof Identity | "fbp_w" | "fbc_w", number]> = [
  ["email", 2.0],
  ["phone", 1.8],
  ["external_id", 1.2],
  ["fbc_w", 1.0],
  ["fbp_w", 0.8],
  ["first_name", 0.4],
  ["last_name", 0.4],
  ["city", 0.3],
  ["state", 0.3],
  ["zip", 0.3],
  ["country", 0.2],
  ["dob", 0.2],
  ["gender", 0.1],
];
const MAX_WEIGHT = WEIGHTS.reduce((s, [, v]) => s + v, 0) + 0.6 + 0.4; // +ip +ua (assumed present)

function projectEmqScore(ident: Identity): { score: number; signals: Record<string, boolean> } {
  const signals: Record<string, boolean> = {
    em: !!ident.email,
    ph: !!ident.phone,
    fn: !!ident.first_name,
    ln: !!ident.last_name,
    ct: !!ident.city,
    st: !!ident.state,
    zp: !!ident.zip,
    country: !!ident.country,
    db: !!ident.dob,
    ge: !!ident.gender,
    external_id: !!ident.external_id,
    fbc: !!ident.fbc,
    fbp: !!ident.fbp,
    ip: true,
    ua: true,
  };
  let score = 0.6 + 0.4; // ip + ua assumed from /go/:slug
  for (const [k, w] of WEIGHTS) {
    if (k === "fbp_w") { if (ident.fbp) score += w; continue; }
    if (k === "fbc_w") { if (ident.fbc) score += w; continue; }
    if (ident[k]) score += w;
  }
  return { score: Math.round((score / MAX_WEIGHT) * 100) / 10, signals };
}

function scoreColor(score: number): string {
  if (score >= 8) return "text-emerald-500";
  if (score >= 6) return "text-amber-500";
  return "text-destructive";
}

export default function Identities() {
  const [identities, setIdentities] = useState<Identity[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Identity | null>(null);
  const [editForm, setEditForm] = useState<Partial<Identity>>({});
  const [saving, setSaving] = useState(false);
  const [emqPreview, setEmqPreview] = useState<Identity | null>(null);

  const fetchIdentities = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("identities")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(200);
    if (error) toast.error(error.message);
    setIdentities((data ?? []) as Identity[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchIdentities();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return identities;
    return identities.filter((i) =>
      [i.lead_id, i.email, i.phone, i.first_name, i.last_name]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [identities, search]);

  const openEdit = (ident: Identity) => {
    setEditing(ident);
    const form: Partial<Identity> = {};
    EDITABLE_FIELDS.forEach((f) => { form[f.key] = ident[f.key] as never; });
    setEditForm(form);
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    const update: Record<string, string | null> = {};
    EDITABLE_FIELDS.forEach((f) => {
      const v = (editForm[f.key] as string | undefined)?.trim() ?? "";
      update[f.key as string] = v === "" ? null : v;
    });
    const { error } = await supabase
      .from("identities")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .update(update as any)
      .eq("id", editing.id);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Identidade atualizada.");
    setEditing(null);
    fetchIdentities();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Identidades (CRM)</h1>
          <p className="text-sm text-muted-foreground">
            Leads enriquecidos usados no envio de eventos para o Meta CAPI. Quanto mais campos,
            maior o EMQ Score projetado.
          </p>
        </div>
        <Badge variant="secondary" className="font-mono">{identities.length} leads</Badge>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por lead_id, email, phone, nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-lg">
          <User2 className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            {search ? "Nenhuma identidade encontrada." : "Nenhuma identidade cadastrada ainda."}
          </p>
        </div>
      ) : (
        <div className="border border-border rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead className="text-right">EMQ projetado</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((ident) => {
                const { score } = projectEmqScore(ident);
                return (
                  <TableRow key={ident.id}>
                    <TableCell className="font-mono text-xs max-w-[180px] truncate">{ident.lead_id}</TableCell>
                    <TableCell className="text-xs">{ident.email ?? <span className="text-muted-foreground">—</span>}</TableCell>
                    <TableCell className="text-xs">{ident.phone ?? <span className="text-muted-foreground">—</span>}</TableCell>
                    <TableCell className="text-xs">
                      {[ident.first_name, ident.last_name].filter(Boolean).join(" ") || <span className="text-muted-foreground">—</span>}
                    </TableCell>
                    <TableCell className="text-xs">
                      {[ident.city, ident.state, ident.country].filter(Boolean).join(" / ") || <span className="text-muted-foreground">—</span>}
                    </TableCell>
                    <TableCell className={`text-right font-mono font-semibold ${scoreColor(score)}`}>
                      {score.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => setEmqPreview(ident)}>
                          <Zap className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openEdit(ident)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Edit dialog */}
      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar identidade</DialogTitle>
            <DialogDescription className="font-mono text-xs">{editing?.lead_id}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto py-2">
            {EDITABLE_FIELDS.map((f) => (
              <div key={String(f.key)} className="space-y-1.5">
                <Label htmlFor={`f-${String(f.key)}`} className="text-xs">{f.label}</Label>
                <Input
                  id={`f-${String(f.key)}`}
                  placeholder={f.placeholder ?? ""}
                  value={(editForm[f.key] as string | undefined) ?? ""}
                  onChange={(e) => setEditForm((p) => ({ ...p, [f.key]: e.target.value }))}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancelar</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EMQ preview dialog */}
      <Dialog open={!!emqPreview} onOpenChange={(open) => !open && setEmqPreview(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>EMQ Score projetado</DialogTitle>
            <DialogDescription className="font-mono text-xs">{emqPreview?.lead_id}</DialogDescription>
          </DialogHeader>
          {emqPreview && (() => {
            const { score, signals } = projectEmqScore(emqPreview);
            return (
              <div className="space-y-4">
                <div className="text-center py-4 border border-border rounded-lg bg-muted/30">
                  <div className={`text-5xl font-bold ${scoreColor(score)}`}>{score.toFixed(1)}</div>
                  <div className="text-xs text-muted-foreground mt-1">de 10.0 (alvo Meta: ≥ 8.0)</div>
                </div>
                <div>
                  <p className="text-xs font-medium mb-2 text-muted-foreground">Sinais que serão enviados ao Meta:</p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {Object.entries(signals).map(([key, present]) => (
                      <Badge
                        key={key}
                        variant={present ? "default" : "outline"}
                        className={`justify-center font-mono text-[10px] ${present ? "" : "text-muted-foreground"}`}
                      >
                        {present ? "✓" : "○"} {key}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed border-l-2 border-primary/40 pl-3">
                  Este score é estimado assumindo IP e User-Agent capturados via /go/:slug. O score
                  real do Meta pode variar conforme a qualidade do match no lado deles.
                </p>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
