import { useState } from "react";
import { Search, MousePointerClick, ArrowRight, DollarSign, Loader2, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface JourneyData {
  click: { id: string; created_at: string; ip_address: string | null; user_agent: string | null };
  link: { slug: string; channel: string; destination_url: string; utm_source: string | null; created_at: string };
  conversion: { created_at: string; purchase_value: number; status: string } | null;
}

const stepStyles = {
  link: { bg: "bg-info text-primary-foreground", icon: ArrowRight },
  click: { bg: "bg-warning text-primary-foreground", icon: MousePointerClick },
  conversion: { bg: "bg-primary text-primary-foreground", icon: DollarSign },
  waiting: { bg: "bg-muted text-muted-foreground", icon: Clock },
};

export default function JourneyViewer() {
  const [query, setQuery] = useState("");
  const [journey, setJourney] = useState<JourneyData | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    setSearched(true);
    setJourney(null);

    const { data: click, error } = await supabase
      .from("clicks")
      .select("id, created_at, ip_address, user_agent, link_id")
      .eq("id", q)
      .maybeSingle();

    if (error || !click) {
      toast.error("Jornada não encontrada. Verifique o Click ID.");
      setLoading(false);
      return;
    }

    const [linkRes, convRes] = await Promise.all([
      supabase.from("links").select("slug, channel, destination_url, utm_source, created_at").eq("id", click.link_id).single(),
      supabase.from("conversions").select("created_at, purchase_value, status").eq("click_id", click.id).maybeSingle(),
    ]);

    if (!linkRes.data) {
      toast.error("Link associado não encontrado.");
      setLoading(false);
      return;
    }

    setJourney({
      click: { id: click.id, created_at: click.created_at, ip_address: click.ip_address, user_agent: click.user_agent },
      link: linkRes.data,
      conversion: convRes.data ?? null,
    });
    setLoading(false);
  };

  const fmt = (iso: string) => new Date(iso).toLocaleString("pt-BR");

  const steps = journey
    ? [
        {
          key: "link",
          style: stepStyles.link,
          title: "Link Criado / Origem",
          desc: `Canal: ${journey.link.channel} • Slug: /go/${journey.link.slug}`,
          sub: `Criado em ${fmt(journey.link.created_at)}${journey.link.utm_source ? ` • UTM Source: ${journey.link.utm_source}` : ""}`,
        },
        {
          key: "click",
          style: stepStyles.click,
          title: "Clique Registrado",
          desc: `Click ID: ${journey.click.id}`,
          sub: `${fmt(journey.click.created_at)} • IP: ${journey.click.ip_address || "—"} • UA: ${(journey.click.user_agent || "—").slice(0, 60)}`,
        },
        journey.conversion
          ? {
              key: "conversion",
              style: stepStyles.conversion,
              title: "Conversão Realizada",
              desc: `Valor: R$ ${Number(journey.conversion.purchase_value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} • Status: ${journey.conversion.status}`,
              sub: fmt(journey.conversion.created_at),
            }
          : {
              key: "waiting",
              style: stepStyles.waiting,
              title: "Aguardando conversão...",
              desc: "Nenhuma conversão registrada para este clique até o momento.",
              sub: "",
            },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Journey Viewer</h1>
        <p className="text-sm text-muted-foreground">Inspecione a jornada completa de um lead pelo Click ID.</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 animate-fade-in">
        <div className="flex gap-3 max-w-lg">
          <Input
            placeholder="Cole o Click ID (UUID)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="font-mono text-xs"
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
            Buscar
          </Button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {!loading && searched && !journey && (
        <div className="bg-card border border-border rounded-lg p-8 text-center animate-fade-in">
          <p className="text-muted-foreground">Jornada não encontrada para o Click ID informado.</p>
        </div>
      )}

      {journey && (
        <div className="bg-card border border-border rounded-lg p-6 animate-fade-in">
          <h3 className="text-sm font-medium text-muted-foreground mb-6">Jornada do Lead</h3>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-6">
              {steps.map((step) => {
                const Icon = step.style.icon;
                return (
                  <div key={step.key} className="relative flex gap-4 items-start">
                    <div className={`relative z-10 h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${step.style.bg}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="pt-1">
                      <p className="text-sm font-medium text-foreground">{step.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                      {step.sub && <p className="text-xs text-muted-foreground/70 mt-0.5">{step.sub}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
