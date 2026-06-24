import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { RefreshCw, Copy, Webhook, Code, Send, Loader2, Info, Zap, FileText, AlertCircle, Filter, X, CheckCircle2, ShoppingBag } from "lucide-react";

const CopyableCell = ({ value, className }: { value: string; className?: string }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success("Copiado!");
  };
  return (
    <TableCell className={`cursor-pointer group ${className || ""}`} onClick={handleCopy} title="Clique para copiar">
      <span className="flex items-center gap-1">
        <span className="truncate">{value}</span>
        <Copy className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
      </span>
    </TableCell>
  );
};

interface LogEntry {
  id: string;
  created_at: string;
  ip_address: string | null;
  user_agent: string | null;
  link_id: string;
  lead_id: string | null;
  conversion: { purchase_value: number; status: string; external_order_id: string | null } | null;
}

interface ConversionEntry {
  id: string;
  created_at: string;
  click_id: string;
  purchase_value: number;
  meta_sync_status: string;
  ghl_sync_status: string;
  sync_logs: string | null;
  last_sync_attempt_at: string | null;
}

interface LeadEntry {
  id: string;
  first_name: string | null;
  created_at: string;
  telegram_invite_link: string | null;
  telegram_joined: boolean;
  telegram_joined_at: string | null;
}

const SUPABASE_BASE = (import.meta.env.VITE_SUPABASE_URL as string)?.replace(/\/$/, "") ?? "";
const WEBHOOK_URL = `${SUPABASE_BASE}/functions/v1/track-conversion`;
const SHOPEE_WEBHOOK_URL = `${SUPABASE_BASE}/functions/v1/shopee-webhook`;
const TELEGRAM_WEBHOOK_URL = `${SUPABASE_BASE}/functions/v1/telegram-webhook`;

const jsonExample = `{
  "click_id": "{aff_sub1}",
  "purchase_value": "{comissao}",
  "external_order_id": "{transacao}"
}`;

const SyncBadge = ({ status }: { status: string }) => {
  if (status === "success") return <Badge className="bg-emerald-500/15 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/25">Success</Badge>;
  if (status === "failed") return <Badge variant="destructive">Failed</Badge>;
  if (status === "loading") return <Badge variant="secondary"><Loader2 className="h-3 w-3 animate-spin mr-1" />Syncing</Badge>;
  if (status === "skipped") return <Badge variant="outline" className="text-muted-foreground">Skipped</Badge>;
  return <Badge variant="secondary" className="bg-amber-500/15 text-amber-500 border-amber-500/20">Pending</Badge>;
};

// Pretty-formats a sync_logs string. Each line is expected to be a JSON object,
// but plain-text lines are also supported as fallback.
const formatSyncLogs = (raw: string | null | undefined): string => {
  if (!raw) return "Sem logs registrados ainda.";
  return raw
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return "";
      try {
        return JSON.stringify(JSON.parse(trimmed), null, 2);
      } catch {
        return trimmed;
      }
    })
    .filter(Boolean)
    .join("\n\n────────────────────\n\n");
};

export default function Logs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [conversions, setConversions] = useState<ConversionEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingConversions, setLoadingConversions] = useState(true);
  const [syncingIds, setSyncingIds] = useState<Set<string>>(new Set());
  const [logDetail, setLogDetail] = useState<ConversionEntry | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [telegramCreds, setTelegramCreds] = useState<Record<string, string> | null>(null);
  const [recentLeads, setRecentLeads] = useState<LeadEntry[]>([]);
  const [loadingWebhooks, setLoadingWebhooks] = useState(true);

  const initialTab = searchParams.get("tab") === "saida" ? "saida" : searchParams.get("tab") === "webhooks" ? "webhooks" : "entrada";
  const statusFilter = searchParams.get("status") ?? "all"; // all | success | failed | pending | skipped

  const setStatusFilter = (next: string) => {
    const sp = new URLSearchParams(searchParams);
    if (next === "all") sp.delete("status");
    else sp.set("status", next);
    setSearchParams(sp, { replace: true });
  };

  const setTab = (tab: string) => {
    const sp = new URLSearchParams(searchParams);
    sp.set("tab", tab);
    setSearchParams(sp, { replace: true });
  };

  // "Effective" status of a conversion: worst-of-two between Meta and GHL
  const effectiveStatus = (c: ConversionEntry): "success" | "failed" | "pending" | "skipped" => {
    const m = c.meta_sync_status;
    const g = c.ghl_sync_status;
    if (m === "failed" || g === "failed") return "failed";
    if (m === "pending" || g === "pending") return "pending";
    if (m === "success" || g === "success") return "success";
    return "skipped";
  };

  const filteredConversions = useMemo(() => {
    if (statusFilter === "all") return conversions;
    return conversions.filter((c) => effectiveStatus(c) === statusFilter);
  }, [conversions, statusFilter]);

  const fetchLogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("clicks")
      .select("id, created_at, ip_address, user_agent, link_id, lead_id, conversions(purchase_value, status, external_order_id)")
      .order("created_at", { ascending: false })
      .limit(50);

    if (!error && data) {
      const mapped = data.map((click: any) => ({
        id: click.id,
        created_at: click.created_at,
        ip_address: click.ip_address,
        user_agent: click.user_agent,
        link_id: click.link_id,
        lead_id: click.lead_id,
        conversion: click.conversions && click.conversions.length > 0 ? click.conversions[0] : null,
      }));
      setLogs(mapped);
    }
    setLoading(false);
  };

  const fetchConversions = async () => {
    setLoadingConversions(true);
    const { data, error } = await supabase
      .from("conversions")
      .select("id, created_at, click_id, purchase_value, meta_sync_status, ghl_sync_status, sync_logs, last_sync_attempt_at")
      .order("created_at", { ascending: false })
      .limit(50);

    if (!error && data) setConversions(data as ConversionEntry[]);
    setLoadingConversions(false);
  };

  const fetchWebhookData = async () => {
    setLoadingWebhooks(true);
    const [authRes, tgRes, leadsRes] = await Promise.all([
      supabase.auth.getUser(),
      supabase.from("integrations").select("credentials").eq("provider", "telegram_bot").maybeSingle(),
      supabase.from("leads")
        .select("id, first_name, created_at, telegram_invite_link, telegram_joined, telegram_joined_at")
        .order("created_at", { ascending: false })
        .limit(20),
    ]);
    setUserId(authRes.data.user?.id ?? "");
    setTelegramCreds((tgRes.data?.credentials ?? null) as Record<string, string> | null);
    setRecentLeads((leadsRes.data ?? []) as LeadEntry[]);
    setLoadingWebhooks(false);
  };

  useEffect(() => { fetchLogs(); fetchConversions(); fetchWebhookData(); }, []);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(WEBHOOK_URL);
    toast.success("URL do Webhook copiada!");
  };

  const handleForceSync = async (conversionId: string) => {
    setSyncingIds((prev) => new Set(prev).add(conversionId));
    try {
      const res = await supabase.functions.invoke("sync-outbound", {
        body: { conversion_id: conversionId },
      });
      if (res.error) {
        toast.error("Erro ao sincronizar: " + res.error.message);
      } else {
        const result = res.data as any;
        toast.success(`Sincronização concluída — Meta: ${result.meta_sync_status}, CRM: ${result.ghl_sync_status}`);
      }
    } catch {
      toast.error("Falha na sincronização.");
    }
    setSyncingIds((prev) => { const next = new Set(prev); next.delete(conversionId); return next; });
    fetchConversions();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Logs & Sincronização</h1>
        <p className="text-sm text-muted-foreground">Monitore cliques, webhooks e sincronize conversões com Meta CAPI e CRM.</p>
      </div>

      <Tabs value={initialTab} onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="entrada">Entrada (Cliques & Webhooks)</TabsTrigger>
          <TabsTrigger value="saida">Saída (Meta CAPI & CRM)</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks & Telegram</TabsTrigger>
        </TabsList>

        <TabsContent value="entrada" className="space-y-6">
          <Card className="animate-fade-in border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Webhook className="h-4 w-4 text-primary" />
                Configuração de Postback / Webhook
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1.5">URL do Webhook (POST)</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs font-mono bg-muted px-3 py-2 rounded-md break-all">{WEBHOOK_URL}</code>
                  <Button variant="outline" size="sm" onClick={handleCopyUrl}><Copy className="h-4 w-4" /></Button>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1.5 flex items-center gap-1">
                  <Code className="h-3 w-3" /> Formato JSON esperado
                </p>
                <pre className="text-xs font-mono bg-muted px-3 py-2 rounded-md overflow-x-auto"><code>{jsonExample}</code></pre>
              </div>
              <p className="text-xs text-muted-foreground">
                Configure esta URL como postback/webhook nas plataformas de afiliados (Shopee, Kiwify, Mercado Livre).
                O campo <code className="font-mono text-primary">click_id</code> (ou <code className="font-mono text-primary">aff_sub1</code>) é obrigatório.
              </p>
            </CardContent>
          </Card>

          <div className="bg-card border border-border rounded-lg animate-fade-in">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">Cliques & Conversões Recentes</h3>
              <Button variant="ghost" size="sm" onClick={fetchLogs} disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Click ID</TableHead>
                    <TableHead>Lead ID</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead className="hidden md:table-cell">User Agent</TableHead>
                    <TableHead>Conversão</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.length === 0 && !loading && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        Nenhum clique registrado ainda.
                      </TableCell>
                    </TableRow>
                  )}
                  {logs.map((log) => (
                    <TableRow key={log.id}>
                      <CopyableCell value={new Date(log.created_at).toLocaleString("pt-BR")} className="font-mono text-xs text-muted-foreground whitespace-nowrap" />
                      <CopyableCell value={log.id} className="font-mono text-xs max-w-[150px]" />
                      <CopyableCell value={log.lead_id || "—"} className="font-mono text-xs text-muted-foreground" />
                      <CopyableCell value={log.ip_address || "—"} className="font-mono text-xs text-muted-foreground" />
                      <CopyableCell value={log.user_agent || "—"} className="hidden md:table-cell text-xs text-muted-foreground max-w-[200px]" />
                      <TableCell>
                        {log.conversion ? (
                          <Badge variant="default">R$ {Number(log.conversion.purchase_value).toFixed(2)}</Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">Sem venda</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="saida" className="space-y-6">
          <Alert className="border-emerald-500/30 bg-emerald-500/5 animate-fade-in">
            <Zap className="h-4 w-4 text-emerald-500" />
            <AlertDescription className="text-sm">
              <span className="font-medium text-foreground">Sincronização Automática Ativa.</span>{" "}
              <span className="text-muted-foreground">
                Toda nova conversão recebida via webhook é enviada automaticamente para Meta CAPI e CRM em segundos.
                Use o botão <RefreshCw className="inline h-3 w-3 mx-0.5" /> apenas para reenviar manualmente conversões antigas ou que falharam.
              </span>
            </AlertDescription>
          </Alert>

          <div className="bg-card border border-border rounded-lg animate-fade-in">
            <div className="p-4 border-b border-border flex items-center justify-between gap-3 flex-wrap">
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Send className="h-4 w-4" /> Auditoria de Sincronizações
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="h-8 w-[140px] text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os status</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="skipped">Skipped</SelectItem>
                    </SelectContent>
                  </Select>
                  {statusFilter !== "all" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setStatusFilter("all")}
                      title="Limpar filtro"
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={fetchConversions} disabled={loadingConversions}>
                  <RefreshCw className={`h-4 w-4 ${loadingConversions ? "animate-spin" : ""}`} />
                </Button>
              </div>
            </div>
            {statusFilter !== "all" && (
              <div className="px-4 py-2 bg-muted/30 border-b border-border text-xs text-muted-foreground">
                Mostrando <span className="font-mono font-medium text-foreground">{filteredConversions.length}</span> de{" "}
                <span className="font-mono">{conversions.length}</span> conversões com status{" "}
                <Badge variant="outline" className="ml-1 text-[10px] py-0">{statusFilter}</Badge>
              </div>
            )}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Recebida em</TableHead>
                    <TableHead>Click ID</TableHead>
                    <TableHead>Valor (R$)</TableHead>
                    <TableHead>Meta CAPI</TableHead>
                    <TableHead>CRM</TableHead>
                    <TableHead>Última tentativa</TableHead>
                    <TableHead>Detalhes</TableHead>
                    <TableHead>Reenviar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConversions.length === 0 && !loadingConversions && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <Send className="h-8 w-8 opacity-40" />
                          <p className="text-sm">
                            {statusFilter === "all"
                              ? "Nenhuma conversão para sincronizar ainda."
                              : `Nenhuma conversão com status "${statusFilter}".`}
                          </p>
                          <p className="text-xs">As conversões aparecerão aqui quando forem recebidas via webhook.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                  {filteredConversions.map((conv) => {
                    const isSyncing = syncingIds.has(conv.id);
                    const hasFailure =
                      conv.meta_sync_status === "failed" || conv.ghl_sync_status === "failed";
                    return (
                      <TableRow key={conv.id}>
                        <TableCell className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(conv.created_at).toLocaleString("pt-BR")}
                        </TableCell>
                        <CopyableCell value={conv.click_id} className="font-mono text-xs max-w-[150px]" />
                        <TableCell className="font-semibold">R$ {Number(conv.purchase_value).toFixed(2)}</TableCell>
                        <TableCell><SyncBadge status={isSyncing ? "loading" : conv.meta_sync_status} /></TableCell>
                        <TableCell><SyncBadge status={isSyncing ? "loading" : conv.ghl_sync_status} /></TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                          {conv.last_sync_attempt_at
                            ? new Date(conv.last_sync_attempt_at).toLocaleString("pt-BR")
                            : <span className="italic">aguardando…</span>}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant={hasFailure ? "destructive" : "outline"}
                            size="sm"
                            onClick={() => setLogDetail(conv)}
                            disabled={!conv.sync_logs}
                            title={conv.sync_logs ? "Ver detalhes do log" : "Sem logs ainda"}
                          >
                            {hasFailure ? <AlertCircle className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => handleForceSync(conv.id)} disabled={isSyncing} title="Forçar sincronização">
                            {isSyncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="webhooks" className="space-y-6">
          {/* Webhook URL cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: <ShoppingBag className="h-4 w-4 text-orange-500" />,
                label: "Shopee Affiliate",
                url: SHOPEE_WEBHOOK_URL,
                hint: "Cole no painel Shopee Affiliate → Configurações → Callback URL",
              },
              {
                icon: <Send className="h-4 w-4 text-blue-500" />,
                label: "GoHighLevel (Identidades)",
                url: userId
                  ? `${SUPABASE_BASE}/functions/v1/identities-upsert?user_id=${userId}`
                  : `${SUPABASE_BASE}/functions/v1/identities-upsert?user_id=<SEU_USER_ID>`,
                hint: "Configure em GHL → Settings → Webhooks → Contact Created",
              },
              {
                icon: <Webhook className="h-4 w-4 text-sky-500" />,
                label: "Telegram Bot",
                url: TELEGRAM_WEBHOOK_URL,
                hint: "Registrar via setWebhook na Bot API com allowed_updates=[\"chat_member\"]",
              },
            ].map(({ icon, label, url, hint }) => (
              <Card key={label} className="animate-fade-in">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    {icon}
                    {label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-[11px] font-mono bg-muted px-2 py-1.5 rounded break-all leading-relaxed">{url}</code>
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                      onClick={() => { navigator.clipboard.writeText(url); toast.success("URL copiada!"); }}
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{hint}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Telegram integration status */}
          <Card className="animate-fade-in border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Webhook className="h-4 w-4 text-primary" />
                Status da Integração Telegram
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingWebhooks ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Verificando...
                </div>
              ) : telegramCreds?.bot_token && telegramCreds?.chat_id ? (
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Bot e Chat ID configurados</span>
                  <span className="text-muted-foreground">— webhook ativo em {TELEGRAM_WEBHOOK_URL}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <span className="text-destructive font-medium">Não configurado</span>
                  <span className="text-muted-foreground">— configure bot_token e chat_id em{" "}
                    <a href="/settings" className="underline underline-offset-2">Integrações</a>
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent leads telegram funnel table */}
          <div className="bg-card border border-border rounded-lg animate-fade-in">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Send className="h-4 w-4" /> Entradas Recentes no Telegram
              </h3>
              <Button variant="ghost" size="sm" onClick={fetchWebhookData} disabled={loadingWebhooks}>
                <RefreshCw className={`h-4 w-4 ${loadingWebhooks ? "animate-spin" : ""}`} />
              </Button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Link Gerado</TableHead>
                    <TableHead>Entrou</TableHead>
                    <TableHead>Entrou em</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentLeads.length === 0 && !loadingWebhooks && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10 text-muted-foreground text-sm">
                        Nenhum lead registrado ainda.
                      </TableCell>
                    </TableRow>
                  )}
                  {recentLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleString("pt-BR")}
                      </TableCell>
                      <TableCell className="text-sm font-medium">{lead.first_name || "—"}</TableCell>
                      <TableCell>
                        {lead.telegram_invite_link ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {lead.telegram_joined ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Loader2 className="h-4 w-4 text-amber-500" />
                        )}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                        {lead.telegram_joined_at
                          ? new Date(lead.telegram_joined_at).toLocaleString("pt-BR")
                          : <span className="italic">aguardando…</span>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!logDetail} onOpenChange={(open) => !open && setLogDetail(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Detalhes da Sincronização
            </DialogTitle>
            <DialogDescription>
              Resposta bruta retornada pelas APIs externas para a conversão{" "}
              <code className="font-mono text-xs">{logDetail?.id.slice(0, 8)}…</code>
            </DialogDescription>
          </DialogHeader>

          {logDetail && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-md border border-border p-2">
                  <p className="text-muted-foreground mb-1">Meta CAPI</p>
                  <SyncBadge status={logDetail.meta_sync_status} />
                </div>
                <div className="rounded-md border border-border p-2">
                  <p className="text-muted-foreground mb-1">GoHighLevel</p>
                  <SyncBadge status={logDetail.ghl_sync_status} />
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1.5">
                  Log completo (resposta bruta de cada provider)
                </p>
                <pre className="text-xs font-mono bg-muted px-3 py-3 rounded-md overflow-auto max-h-[400px] whitespace-pre-wrap break-all">
                  <code>{formatSyncLogs(logDetail.sync_logs)}</code>
                </pre>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(logDetail.sync_logs || "");
                    toast.success("Log copiado!");
                  }}
                  disabled={!logDetail.sync_logs}
                >
                  <Copy className="h-3 w-3 mr-1.5" /> Copiar log
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
