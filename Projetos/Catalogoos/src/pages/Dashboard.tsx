import { useEffect, useState } from "react";
import { MousePointerClick, ShoppingCart, DollarSign, TrendingUp, Loader2, BarChart3, Send } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { ClicksConversionsChart } from "@/components/charts/ClicksConversionsChart";
import { SyncHealthCard } from "@/components/dashboard/SyncHealthCard";
import { EmqScoreCard } from "@/components/dashboard/EmqScoreCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ChannelRow {
  channel: string;
  clicks: number;
  sales: number;
  revenue: number;
  cvr: number;
}

interface ChartDay {
  name: string;
  clicks: number;
  conversions: number;
}

export default function Dashboard() {
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [channels, setChannels] = useState<ChannelRow[]>([]);
  const [chartData, setChartData] = useState<ChartDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [metaSyncEnabled, setMetaSyncEnabled] = useState(false);
  const [metaSyncLoading, setMetaSyncLoading] = useState(false);
  const [telegramLeads, setTelegramLeads] = useState(0);
  const [telegramLinks, setTelegramLinks] = useState(0);
  const [telegramJoined, setTelegramJoined] = useState(0);

  const handleMetaSyncToggle = (checked: boolean) => {
    setMetaSyncEnabled(checked);
    if (checked) {
      setMetaSyncLoading(true);
      toast.info("Buscando dados do Gerenciador de Anúncios...");
      setTimeout(() => {
        setMetaSyncLoading(false);
        toast.success("Sincronização simulada concluída.");
      }, 2000);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);

      // KPIs
      const [clicksRes, conversionsRes] = await Promise.all([
        supabase.from("clicks").select("id", { count: "exact", head: true }),
        supabase.from("conversions").select("purchase_value"),
      ]);

      const clicks = clicksRes.count ?? 0;
      const sales = conversionsRes.data?.length ?? 0;
      const rev = conversionsRes.data?.reduce((sum, c) => sum + Number(c.purchase_value), 0) ?? 0;
      const cvr = clicks > 0 ? (sales / clicks) * 100 : 0;

      setTotalClicks(clicks);
      setTotalSales(sales);
      setRevenue(rev);
      setConversionRate(parseFloat(cvr.toFixed(1)));

      // Telegram funnel
      const { data: leadsData } = await supabase
        .from("leads")
        .select("telegram_invite_link, telegram_joined");
      const leadsTotal = leadsData?.length ?? 0;
      const leadsWithLink = leadsData?.filter((l: any) => l.telegram_invite_link).length ?? 0;
      const leadsJoined = leadsData?.filter((l: any) => l.telegram_joined).length ?? 0;
      setTelegramLeads(leadsTotal);
      setTelegramLinks(leadsWithLink);
      setTelegramJoined(leadsJoined);

      // Top channels: links with clicks and conversions
      const { data: linksData } = await supabase
        .from("links")
        .select("id, channel, clicks(id, conversions(purchase_value))");

      if (linksData) {
        const map: Record<string, { clicks: number; sales: number; revenue: number }> = {};
        for (const link of linksData as any[]) {
          const ch = link.channel;
          if (!map[ch]) map[ch] = { clicks: 0, sales: 0, revenue: 0 };
          const clicksList = link.clicks ?? [];
          map[ch].clicks += clicksList.length;
          for (const click of clicksList) {
            const convs = click.conversions ?? [];
            map[ch].sales += convs.length;
            map[ch].revenue += convs.reduce((s: number, c: any) => s + Number(c.purchase_value), 0);
          }
        }
        const arr: ChannelRow[] = Object.entries(map)
          .map(([channel, d]) => ({
            channel,
            clicks: d.clicks,
            sales: d.sales,
            revenue: d.revenue,
            cvr: d.clicks > 0 ? parseFloat(((d.sales / d.clicks) * 100).toFixed(1)) : 0,
          }))
          .sort((a, b) => b.revenue - a.revenue);
        setChannels(arr);
      }

      // Chart: last 7 days
      const now = new Date();
      const days: { label: string; start: string; end: string }[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const start = new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString();
        const end = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1).toISOString();
        const label = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
        days.push({ label, start, end });
      }

      const sevenDaysAgo = days[0].start;

      const [clicksChartRes, convsChartRes] = await Promise.all([
        supabase.from("clicks").select("created_at").gte("created_at", sevenDaysAgo),
        supabase.from("conversions").select("created_at").gte("created_at", sevenDaysAgo),
      ]);

      const clicksByDay: Record<string, number> = {};
      const convsByDay: Record<string, number> = {};
      for (const d of days) {
        clicksByDay[d.label] = 0;
        convsByDay[d.label] = 0;
      }

      (clicksChartRes.data ?? []).forEach((c) => {
        const dt = new Date(c.created_at);
        const key = `${String(dt.getDate()).padStart(2, "0")}/${String(dt.getMonth() + 1).padStart(2, "0")}`;
        if (clicksByDay[key] !== undefined) clicksByDay[key]++;
      });

      (convsChartRes.data ?? []).forEach((c) => {
        const dt = new Date(c.created_at);
        const key = `${String(dt.getDate()).padStart(2, "0")}/${String(dt.getMonth() + 1).padStart(2, "0")}`;
        if (convsByDay[key] !== undefined) convsByDay[key]++;
      });

      setChartData(days.map((d) => ({ name: d.label, clicks: clicksByDay[d.label], conversions: convsByDay[d.label] })));

      setLoading(false);
    };

    fetchAll();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Visão executiva da sua operação de tracking.</p>
        </div>
        <div className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3 animate-fade-in">
          <BarChart3 className="h-4 w-4 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <Label htmlFor="meta-sync" className="text-sm font-medium cursor-pointer">
              Sincronizar Custos do Meta Ads (Graph API)
            </Label>
          </div>
          {metaSyncLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          <Switch
            id="meta-sync"
            checked={metaSyncEnabled}
            onCheckedChange={handleMetaSyncToggle}
            disabled={metaSyncLoading}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total de Cliques" value={totalClicks.toLocaleString("pt-BR")} icon={MousePointerClick} />
        <KpiCard title="Total de Vendas" value={totalSales.toLocaleString("pt-BR")} icon={ShoppingCart} />
        <KpiCard title="Receita Atribuída" value={`R$ ${revenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} icon={DollarSign} />
        <KpiCard title="Taxa de Conversão" value={`${conversionRate}%`} icon={TrendingUp} />
      </div>

      {!loading && telegramLinks > 0 && (
        <div className="bg-card border border-border rounded-lg animate-fade-in">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <Send className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Funil Telegram</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
            <div className="p-4 flex flex-col gap-0.5">
              <span className="text-[11px] text-muted-foreground uppercase tracking-wide">Leads Submetidos</span>
              <span className="text-2xl font-semibold font-mono">{telegramLeads.toLocaleString("pt-BR")}</span>
            </div>
            <div className="p-4 flex flex-col gap-0.5">
              <span className="text-[11px] text-muted-foreground uppercase tracking-wide">Link Gerado</span>
              <span className="text-2xl font-semibold font-mono">{telegramLinks.toLocaleString("pt-BR")}</span>
              <span className="text-xs text-muted-foreground">
                {telegramLeads > 0 ? `${((telegramLinks / telegramLeads) * 100).toFixed(0)}% dos leads` : "—"}
              </span>
            </div>
            <div className="p-4 flex flex-col gap-0.5">
              <span className="text-[11px] text-muted-foreground uppercase tracking-wide">Entradas Confirmadas</span>
              <span className="text-2xl font-semibold font-mono text-emerald-500">{telegramJoined.toLocaleString("pt-BR")}</span>
              <span className="text-xs text-muted-foreground">
                {telegramLinks > 0 ? `${((telegramJoined / telegramLinks) * 100).toFixed(0)}% dos links` : "—"}
              </span>
            </div>
            <div className="p-4 flex flex-col gap-0.5">
              <span className="text-[11px] text-muted-foreground uppercase tracking-wide">Taxa Submit → Entrada</span>
              <span className="text-2xl font-semibold font-mono">
                {telegramLeads > 0 ? `${((telegramJoined / telegramLeads) * 100).toFixed(1)}%` : "—"}
              </span>
            </div>
          </div>
        </div>
      )}

      <ClicksConversionsChart data={chartData} loading={loading} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SyncHealthCard />
        <EmqScoreCard />
      </div>

      <div className="bg-card border border-border rounded-lg animate-fade-in">
        <div className="p-5 border-b border-border">
          <h3 className="text-sm font-medium text-muted-foreground">Top Canais por Vendas</h3>
        </div>
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : channels.length === 0 ? (
          <p className="text-center text-muted-foreground py-8 text-sm">Nenhum dado de canal disponível.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Canal</TableHead>
                <TableHead className="text-right">Cliques</TableHead>
                <TableHead className="text-right">Vendas</TableHead>
                <TableHead className="text-right">Receita</TableHead>
                <TableHead className="text-right">CVR</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {channels.map((ch) => (
                <TableRow key={ch.channel}>
                  <TableCell className="font-medium">{ch.channel}</TableCell>
                  <TableCell className="text-right font-mono text-sm">{ch.clicks.toLocaleString("pt-BR")}</TableCell>
                  <TableCell className="text-right font-mono text-sm">{ch.sales}</TableCell>
                  <TableCell className="text-right font-mono text-sm">R$ {ch.revenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell className="text-right font-mono text-sm text-primary">{ch.cvr}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
