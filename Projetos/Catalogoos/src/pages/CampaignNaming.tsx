import { useState, useEffect, useMemo } from "react";
import { Copy, Check, Wand2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

function removeAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function formatSegment(str: string): string {
  return removeAccents(str).replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "");
}

const FUNNEL_TYPES = ["Mensagem", "Conversão", "Lead"];
const PLACEMENTS = ["Feed", "Stories", "Reels", "Automatic"];

export default function CampaignNaming() {
  const [productName, setProductName] = useState("");
  const [source, setSource] = useState("");
  const [funnelType, setFunnelType] = useState("");
  const [audience, setAudience] = useState("");
  const [placement, setPlacement] = useState("");
  const [adFormat, setAdFormat] = useState("");
  const [angle, setAngle] = useState("");
  const [sources, setSources] = useState<string[]>([]);
  const [adTypes, setAdTypes] = useState<string[]>([]);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("taxonomies")
        .select("type, value")
        .order("value");
      if (data) {
        setSources(data.filter(d => d.type === "source").map(d => d.value));
        setAdTypes(data.filter(d => d.type === "ad_type").map(d => d.value));
      }
    };
    fetch();
  }, []);

  const dateStr = useMemo(() => {
    const d = new Date();
    return `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  }, []);

  const campaignName = useMemo(() => {
    if (!source || !funnelType || !productName.trim()) return "";
    const srcAbbrev = formatSegment(source).toUpperCase().slice(0, 4);
    return `[${srcAbbrev}]_[${formatSegment(funnelType)}]_[${formatSegment(productName)}]_[${dateStr}]`;
  }, [source, funnelType, productName, dateStr]);

  const adSetName = useMemo(() => {
    if (!audience.trim()) return "";
    const parts = [formatSegment(audience)];
    if (placement) parts.push(formatSegment(placement));
    return parts.map(p => `[${p}]`).join("_");
  }, [audience, placement]);

  const adName = useMemo(() => {
    if (!adFormat && !angle.trim()) return "";
    const parts: string[] = [];
    if (adFormat) parts.push(formatSegment(adFormat));
    if (angle.trim()) parts.push(formatSegment(angle));
    return parts.map(p => `[${p}]`).join("_");
  }, [adFormat, angle]);

  const handleCopy = (value: string, field: string) => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    toast.success("Nome copiado!");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const NameBlock = ({ label, value, field }: { label: string; value: string; field: string }) => {
    if (!value) return null;
    return (
      <div className="p-4 bg-muted rounded-lg flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground mb-1 font-medium">{label}</p>
          <code className="text-sm font-mono text-foreground break-all">{value}</code>
        </div>
        <Button variant="outline" size="sm" onClick={() => handleCopy(value, field)} className="shrink-0">
          {copiedField === field ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
          <Wand2 className="h-6 w-6" /> Gerador de Nomenclaturas
        </h1>
        <p className="text-sm text-muted-foreground">Gere nomes padronizados para campanhas, conjuntos e anúncios no Facebook Ads.</p>
      </div>

      <Alert className="border-primary/30 bg-primary/5">
        <Info className="h-4 w-4 text-primary" />
        <AlertDescription className="text-sm">
          <strong>Passo 2:</strong> Use esta ferramenta para criar nomes perfeitos para o Facebook Ads. Copie e cole no Gerenciador para evitar erros de leitura nos relatórios.
        </AlertDescription>
      </Alert>

      <div className="bg-card border border-border rounded-lg p-6 space-y-5 animate-fade-in">
        <div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Nível 1 — Campanha</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="space-y-2">
              <Label>Nome do Produto *</Label>
              <Input placeholder="Fone Bluetooth Premium" value={productName} onChange={e => setProductName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Fonte de Tráfego *</Label>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger><SelectValue placeholder="Selecione a fonte" /></SelectTrigger>
                <SelectContent>
                  {sources.length === 0 ? (
                    <SelectItem value="_empty" disabled>Cadastre fontes na Taxonomia</SelectItem>
                  ) : sources.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tipo de Funil *</Label>
              <Select value={funnelType} onValueChange={setFunnelType}>
                <SelectTrigger><SelectValue placeholder="Selecione o tipo" /></SelectTrigger>
                <SelectContent>
                  {FUNNEL_TYPES.map(f => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Data</Label>
              <Input value={dateStr} disabled className="font-mono" />
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-5">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Nível 2 — Conjunto de Anúncios</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="space-y-2">
              <Label>Público / Segmentação</Label>
              <Input placeholder="Lookalike 1%" value={audience} onChange={e => setAudience(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Posicionamento</Label>
              <Select value={placement} onValueChange={setPlacement}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {PLACEMENTS.map(p => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-5">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Nível 3 — Anúncio</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="space-y-2">
              <Label>Formato do Criativo</Label>
              <Select value={adFormat} onValueChange={setAdFormat}>
                <SelectTrigger><SelectValue placeholder="Selecione o formato" /></SelectTrigger>
                <SelectContent>
                  {adTypes.length === 0 ? (
                    <SelectItem value="_empty" disabled>Cadastre formatos na Taxonomia</SelectItem>
                  ) : adTypes.map(a => (
                    <SelectItem key={a} value={a}>{a}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Ângulo / Criativo</Label>
              <Input placeholder="Dor nas costas" value={angle} onChange={e => setAngle(e.target.value)} />
            </div>
          </div>
        </div>

        {(campaignName || adSetName || adName) && (
          <div className="border-t border-border pt-5 space-y-3">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Resultado</Label>
            <NameBlock label="Campanha" value={campaignName} field="campaign" />
            <NameBlock label="Conjunto de Anúncios" value={adSetName} field="adset" />
            <NameBlock label="Anúncio" value={adName} field="ad" />
          </div>
        )}
      </div>
    </div>
  );
}
