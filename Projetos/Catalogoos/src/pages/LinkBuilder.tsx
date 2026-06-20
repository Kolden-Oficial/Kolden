import { useState, useEffect, useMemo } from "react";
import { Copy, Check, Link2, ExternalLink, Loader2, Megaphone, MessageCircle, ShoppingBag, Info, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { channelOptions } from "@/lib/mock-data";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

function generateSlug(productName: string): string {
  const base = productName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const rand = Math.random().toString(36).substring(2, 8);
  return base ? `${base}-${rand}` : rand;
}

interface LinkRow {
  id: string;
  slug: string;
  destination_url: string;
  product_name: string;
  channel: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  created_at: string;
  clicks: { count: number }[];
}

type LinkType = "ad" | "funnel" | "offer";

const LINK_TYPES = [
  { value: "ad" as const, label: "Link de Anúncio", desc: "Top Funnel — URL = Landing Page. Exige UTMs.", icon: Megaphone, color: "text-green-500" },
  { value: "funnel" as const, label: "Link de Funil", desc: "Mid Funnel — URL = Grupo Telegram/WhatsApp.", icon: MessageCircle, color: "text-yellow-500" },
  { value: "offer" as const, label: "Link de Oferta", desc: "Bottom Funnel — URL = Shopee/Mercado Livre.", icon: ShoppingBag, color: "text-red-500" },
];

export default function LinkBuilder() {
  const [linkType, setLinkType] = useState<LinkType>("ad");
  const [destinationUrl, setDestinationUrl] = useState("");
  const [productName, setProductName] = useState("");
  const [channel, setChannel] = useState("");
  const [utmSource, setUtmSource] = useState("");
  const [utmMedium, setUtmMedium] = useState("");
  const [utmCampaign, setUtmCampaign] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [links, setLinks] = useState<LinkRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const [sources, setSources] = useState<string[]>([]);
  const [mediums, setMediums] = useState<string[]>([]);
  const [campaigns, setCampaigns] = useState<string[]>([]);

  const fetchLinks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("links")
      .select("*, clicks(count)")
      .order("created_at", { ascending: false });
    if (!error && data) setLinks(data as unknown as LinkRow[]);
    setLoading(false);
  };

  const fetchTaxonomies = async () => {
    const { data } = await supabase.from("taxonomies").select("type, value").order("value");
    if (data) {
      setSources(data.filter(d => d.type === "source").map(d => d.value));
      setMediums(data.filter(d => d.type === "medium").map(d => d.value));
      setCampaigns(data.filter(d => d.type === "campaign").map(d => d.value));
    }
  };

  useEffect(() => { fetchLinks(); fetchTaxonomies(); }, []);

  const filteredLinks = useMemo(() => {
    if (!searchQuery.trim()) return links;
    const q = searchQuery.toLowerCase();
    return links.filter(l =>
      l.slug.toLowerCase().includes(q) ||
      l.product_name.toLowerCase().includes(q) ||
      l.channel.toLowerCase().includes(q)
    );
  }, [links, searchQuery]);

  const handleGenerate = async () => {
    if (!destinationUrl || !productName || !channel) {
      toast.error("Preencha URL de destino, nome do produto e canal.");
      return;
    }
    if (linkType === "ad" && (!utmSource || !utmMedium)) {
      toast.error("Links de Anúncio exigem UTM Source e Medium.");
      return;
    }

    setGenerating(true);
    const slug = generateSlug(productName);
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from("links").insert({
      slug,
      destination_url: destinationUrl,
      product_name: productName,
      channel,
      utm_source: linkType === "ad" ? utmSource : null,
      utm_medium: linkType === "ad" ? utmMedium : null,
      utm_campaign: linkType === "ad" ? utmCampaign || null : null,
      user_id: user?.id,
    });

    if (error) {
      toast.error("Erro ao criar link: " + error.message);
      setGenerating(false);
      return;
    }

    const link = `${window.location.origin}/go/${slug}`;
    setGeneratedLink(link);
    toast.success("Link gerado com sucesso!");
    await fetchLinks();

    setDestinationUrl("");
    setProductName("");
    setChannel("");
    setUtmSource("");
    setUtmMedium("");
    setUtmCampaign("");
    setGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    toast.success("Link copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySlug = (slug: string) => {
    const url = `${window.location.origin}/go/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    toast.success("Link copiado!");
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const showUtms = linkType === "ad";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Link Builder</h1>
        <p className="text-sm text-muted-foreground">Crie links rastreáveis para cada etapa do funil.</p>
      </div>

      <Alert className="border-primary/30 bg-primary/5">
        <Info className="h-4 w-4 text-primary" />
        <AlertDescription className="text-sm">
          <strong>Passo 3:</strong> Crie seus links. Use "Anúncio" para mandar para a Landing Page, "Funil" para botões de WhatsApp/Telegram, e "Oferta" para links de afiliados da Shopee.
        </AlertDescription>
      </Alert>

      {/* Step 1: Link Type */}
      <div className="bg-card border border-border rounded-lg p-6 animate-fade-in space-y-4">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Passo 1 — Tipo de Link</Label>
        <RadioGroup value={linkType} onValueChange={(v) => setLinkType(v as LinkType)} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {LINK_TYPES.map(lt => (
            <label
              key={lt.value}
              className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                linkType === lt.value ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-muted-foreground/30"
              }`}
            >
              <RadioGroupItem value={lt.value} className="mt-0.5" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <lt.icon className={`h-4 w-4 ${lt.color}`} />
                  <span className="font-medium text-sm">{lt.label}</span>
                </div>
                <p className="text-xs text-muted-foreground">{lt.desc}</p>
              </div>
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Step 2: Fields */}
      <div className="bg-card border border-border rounded-lg p-6 animate-fade-in space-y-4">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Passo 2 — Dados do Link</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>URL de Destino *</Label>
            <Input
              placeholder={
                linkType === "ad" ? "https://sua-landing-page.com/oferta" :
                linkType === "funnel" ? "https://t.me/+grupo-vip-123" :
                "https://shopee.com.br/produto-real..."
              }
              value={destinationUrl}
              onChange={e => setDestinationUrl(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Nome do Produto *</Label>
            <Input
              placeholder={
                linkType === "ad" ? "Fone Bluetooth Premium" :
                linkType === "funnel" ? "Grupo VIP Black Friday" :
                "Nome exato do produto"
              }
              value={productName}
              onChange={e => setProductName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Canal *</Label>
            <Select value={channel} onValueChange={setChannel}>
              <SelectTrigger><SelectValue placeholder="Selecione o canal" /></SelectTrigger>
              <SelectContent>
                {channelOptions.map(ch => (
                  <SelectItem key={ch} value={ch}>{ch}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {showUtms && (
            <>
              <div className="space-y-2">
                <Label>UTM Source *</Label>
                <Select value={utmSource} onValueChange={setUtmSource}>
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
                <Label>UTM Medium *</Label>
                <Select value={utmMedium} onValueChange={setUtmMedium}>
                  <SelectTrigger><SelectValue placeholder="Selecione o meio" /></SelectTrigger>
                  <SelectContent>
                    {mediums.length === 0 ? (
                      <SelectItem value="_empty" disabled>Cadastre meios na Taxonomia</SelectItem>
                    ) : mediums.map(m => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>UTM Campaign</Label>
                <Select value={utmCampaign} onValueChange={setUtmCampaign}>
                  <SelectTrigger><SelectValue placeholder="Selecione a campanha" /></SelectTrigger>
                  <SelectContent>
                    {campaigns.length === 0 ? (
                      <SelectItem value="_empty" disabled>Cadastre campanhas na Taxonomia</SelectItem>
                    ) : campaigns.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>

        <Button className="mt-2" onClick={handleGenerate} disabled={generating}>
          {generating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Link2 className="mr-2 h-4 w-4" />}
          Gerar Link Rastreador
        </Button>

        {generatedLink && (
          <div className="mt-4 space-y-3">
            <div className="p-4 bg-muted rounded-lg flex items-center justify-between gap-4">
              <code className="text-sm font-mono text-foreground break-all">{generatedLink}</code>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>

            {linkType === "funnel" && (
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-2">
                <Info className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground">
                  <strong>Dica:</strong> Para rastrear a identidade do lead, adicione o email ou telefone dinâmico da sua LP no final deste link:
                  <code className="ml-1 bg-muted px-1 py-0.5 rounded text-foreground">{generatedLink}?lead_id={"{{contact.email}}"}</code>
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Links Table */}
      <div className="bg-card border border-border rounded-lg animate-fade-in">
        <div className="p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-sm font-medium text-muted-foreground">Links Criados</h3>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por slug, produto ou canal..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Slug</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Canal</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead className="text-right">Cliques</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLinks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      {searchQuery ? "Nenhum link encontrado." : "Nenhum link criado ainda. Crie seu primeiro link acima!"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLinks.map(link => (
                    <TableRow key={link.id}>
                      <TableCell className="font-mono text-sm text-primary">/go/{link.slug}</TableCell>
                      <TableCell>{link.product_name}</TableCell>
                      <TableCell>{link.channel}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        <a href={link.destination_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                          {link.destination_url.replace(/^https?:\/\//, "").slice(0, 30)}...
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {(link.clicks?.[0]?.count ?? 0).toLocaleString("pt-BR")}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(link.created_at).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopySlug(link.slug)}
                          title="Copiar link completo"
                          className="h-8 w-8 p-0"
                        >
                          {copiedSlug === link.slug ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
