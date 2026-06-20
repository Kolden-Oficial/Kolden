import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Activity, ChevronRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Counts {
  success: number;
  failed: number;
  skipped: number;
  pending: number;
  total: number;
}

const ZERO: Counts = { success: 0, failed: 0, skipped: 0, pending: 0, total: 0 };

const STATUS_META: Array<{
  key: keyof Omit<Counts, "total">;
  label: string;
  // semantic Tailwind classes — keeping color literal here is intentional
  // because these are status indicators, not theme colors.
  bar: string;
  dot: string;
  text: string;
  href: string;
}> = [
  { key: "success", label: "Success", bar: "bg-emerald-500", dot: "bg-emerald-500", text: "text-emerald-500", href: "/logs?tab=saida&status=success" },
  { key: "failed",  label: "Failed",  bar: "bg-destructive", dot: "bg-destructive", text: "text-destructive", href: "/logs?tab=saida&status=failed" },
  { key: "pending", label: "Pending", bar: "bg-amber-500",  dot: "bg-amber-500",  text: "text-amber-500",  href: "/logs?tab=saida&status=pending" },
  { key: "skipped", label: "Skipped", bar: "bg-muted-foreground/60", dot: "bg-muted-foreground", text: "text-muted-foreground", href: "/logs?tab=saida&status=skipped" },
];

export function SyncHealthCard() {
  const [counts, setCounts] = useState<Counts>(ZERO);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const { data } = await supabase
        .from("conversions")
        .select("meta_sync_status, ghl_sync_status")
        .gte("created_at", since);

      const next: Counts = { ...ZERO };
      (data ?? []).forEach((row: any) => {
        // Worst-of-two rule: a conversion is "failed" if either Meta or GHL failed
        const m = row.meta_sync_status as string;
        const g = row.ghl_sync_status as string;
        let final: keyof Omit<Counts, "total">;
        if (m === "failed" || g === "failed") final = "failed";
        else if (m === "pending" || g === "pending") final = "pending";
        else if (m === "success" || g === "success") final = "success";
        else final = "skipped";
        next[final] += 1;
        next.total += 1;
      });
      setCounts(next);
      setLoading(false);
    };
    load();
  }, []);

  const successRate = counts.total > 0 ? (counts.success / counts.total) * 100 : 0;

  return (
    <div className="bg-card border border-border rounded-lg p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium">Saúde da Sincronização (24h)</h3>
        </div>
        <Link
          to="/logs?tab=saida"
          className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-0.5 transition-colors"
        >
          Ver todos <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : counts.total === 0 ? (
        <p className="text-sm text-muted-foreground py-4">Nenhuma conversão nas últimas 24h.</p>
      ) : (
        <div className="space-y-4">
          {/* Big number: success rate */}
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-muted-foreground">Taxa de sucesso</span>
            <span className="text-2xl font-semibold tabular-nums">
              {successRate.toFixed(1)}
              <span className="text-sm font-normal text-muted-foreground">%</span>
            </span>
          </div>

          {/* Segmented horizontal bar */}
          <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
            {STATUS_META.map(({ key, bar }) => {
              const pct = counts.total > 0 ? (counts[key] / counts.total) * 100 : 0;
              if (pct === 0) return null;
              return (
                <div
                  key={key}
                  className={`${bar} h-full transition-all`}
                  style={{ width: `${pct}%` }}
                  title={`${key}: ${counts[key]}`}
                />
              );
            })}
          </div>

          {/* Status list */}
          <div className="space-y-1.5">
            {STATUS_META.map(({ key, label, dot, text, href }) => (
              <Link
                key={key}
                to={href}
                className="flex items-center justify-between text-xs py-1 -mx-1 px-1 rounded hover:bg-muted/50 transition-colors group"
              >
                <span className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${dot}`} />
                  <span className="text-muted-foreground group-hover:text-foreground">{label}</span>
                </span>
                <span className={`font-mono tabular-nums ${counts[key] > 0 ? text : "text-muted-foreground/50"}`}>
                  {counts[key]}
                </span>
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span>Total processado</span>
            <span className="font-mono tabular-nums">{counts.total}</span>
          </div>
        </div>
      )}
    </div>
  );
}
