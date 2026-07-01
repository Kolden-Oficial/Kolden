import { useEffect, useState } from "react";
import { Gauge, Info, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface EmqStats {
  avg_emq_score: number;
  total_conversions: number;
  signal_coverage: Record<string, number>;
}

const SIGNAL_LABELS: Array<{ key: string; label: string }> = [
  { key: "ip",          label: "IP Address" },
  { key: "ua",          label: "User Agent" },
  { key: "fbp",         label: "Facebook Browser ID (fbp)" },
  { key: "fbc",         label: "Facebook Click ID (fbc)" },
  { key: "external_id", label: "External ID" },
  { key: "em",          label: "Email" },
  { key: "ph",          label: "Telefone" },
  { key: "fn",          label: "Nome" },
  { key: "ln",          label: "Sobrenome" },
  { key: "ct",          label: "Cidade" },
  { key: "st",          label: "Estado" },
  { key: "zp",          label: "CEP" },
  { key: "country",     label: "País" },
  { key: "db",          label: "Data de Nascimento" },
  { key: "ge",          label: "Gênero" },
];

function scoreColor(score: number): { text: string; bg: string; ring: string } {
  if (score >= 7) return { text: "text-emerald-500", bg: "bg-emerald-500", ring: "ring-emerald-500/30" };
  if (score >= 4) return { text: "text-amber-500",   bg: "bg-amber-500",   ring: "ring-amber-500/30" };
  return { text: "text-destructive", bg: "bg-destructive", ring: "ring-destructive/30" };
}

export function EmqScoreCard() {
  const [stats, setStats] = useState<EmqStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase.rpc("get_emq_stats_24h" as any);
      if (!error && data && Array.isArray(data) && data.length > 0) {
        const row = data[0] as any;
        setStats({
          avg_emq_score: Number(row.avg_emq_score ?? 0),
          total_conversions: Number(row.total_conversions ?? 0),
          signal_coverage: (row.signal_coverage ?? {}) as Record<string, number>,
        });
      } else {
        setStats({ avg_emq_score: 0, total_conversions: 0, signal_coverage: {} });
      }
      setLoading(false);
    };
    load();
  }, []);

  const score = stats?.avg_emq_score ?? 0;
  const colors = scoreColor(score);
  const widthPct = Math.min(100, (score / 10) * 100);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="bg-card border border-border rounded-lg p-5 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">EMQ Score Estimado (24h)</h3>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground transition-colors" />
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-xs">
              <p className="text-xs">
                Quanto mais signals enviados (IP, UA, fbp, fbc, email, telefone, localização…),
                maior o Event Match Quality reportado pelo Meta — o que melhora atribuição,
                otimização de campanhas e ROAS.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : stats?.total_conversions === 0 ? (
          <p className="text-sm text-muted-foreground py-4">
            Nenhuma conversão nas últimas 24h.
          </p>
        ) : (
          <div className="space-y-4">
            {/* Big number */}
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-muted-foreground">Score médio</span>
              <span className={`text-2xl font-semibold tabular-nums ${colors.text}`}>
                {score.toFixed(1)}
                <span className="text-sm font-normal text-muted-foreground"> / 10</span>
              </span>
            </div>

            {/* Score bar */}
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`${colors.bg} h-full transition-all`}
                style={{ width: `${widthPct}%` }}
              />
            </div>

            {/* Signal coverage list */}
            <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
              {SIGNAL_LABELS.map(({ key, label }) => {
                const pct = (stats?.signal_coverage?.[key] ?? 0) * 100;
                const has = pct > 0;
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between text-xs py-0.5"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          has ? "bg-primary" : "bg-muted-foreground/30"
                        }`}
                      />
                      <span className={has ? "text-foreground" : "text-muted-foreground"}>
                        {label}
                      </span>
                    </span>
                    <span
                      className={`font-mono tabular-nums ${
                        has ? "text-foreground" : "text-muted-foreground/50"
                      }`}
                    >
                      {pct.toFixed(0)}%
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span>Conversões avaliadas</span>
              <span className="font-mono tabular-nums">{stats?.total_conversions ?? 0}</span>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
