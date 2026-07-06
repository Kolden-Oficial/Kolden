import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, RefreshCw, Clock, CheckCircle2, XCircle, AlertTriangle, PlayCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

type CronJob = {
  jobid: number;
  jobname: string;
  schedule: string;
  active: boolean;
  last_run_started: string | null;
  last_run_finished: string | null;
  last_run_status: string | null;
  last_run_return: string | null;
  runtime_ms: number | null;
};

type RetryStats = {
  pending_retries: number;
  failed_max_retries: number;
  next_retry_at: string | null;
};

export default function CronStatus() {
  const [jobs, setJobs] = useState<CronJob[]>([]);
  const [stats, setStats] = useState<RetryStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [reprocessing, setReprocessing] = useState(false);

  const load = async () => {
    setLoading(true);
    const [jobsRes, statsRes] = await Promise.all([
      supabase.rpc("get_cron_status" as never),
      supabase.rpc("get_retry_queue_stats" as never),
    ]);

    if (jobsRes.error) {
      toast({ title: "Erro ao carregar jobs", description: jobsRes.error.message, variant: "destructive" });
    } else {
      setJobs((jobsRes.data as unknown as CronJob[]) || []);
    }

    if (statsRes.error) {
      toast({ title: "Erro ao carregar estatísticas", description: statsRes.error.message, variant: "destructive" });
    } else {
      const arr = statsRes.data as unknown as RetryStats[];
      setStats(arr?.[0] ?? null);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 30_000); // auto refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const handleManualRun = async () => {
    setReprocessing(true);
    try {
      const { data, error } = await supabase.rpc("process_conversion_retries" as never);
      if (error) throw error;
      toast({
        title: "Reprocessamento disparado",
        description: `${data ?? 0} conversões enviadas para a fila de sync-outbound.`,
      });
      await load();
    } catch (e) {
      const err = e as Error;
      toast({ title: "Falha ao executar", description: err.message, variant: "destructive" });
    } finally {
      setReprocessing(false);
    }
  };

  const renderStatus = (status: string | null) => {
    if (!status) return <Badge variant="secondary">Sem execução</Badge>;
    if (status === "succeeded")
      return (
        <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30">
          <CheckCircle2 className="h-3 w-3 mr-1" /> Sucesso
        </Badge>
      );
    if (status === "failed")
      return (
        <Badge variant="destructive">
          <XCircle className="h-3 w-3 mr-1" /> Falhou
        </Badge>
      );
    return (
      <Badge variant="outline">
        <Clock className="h-3 w-3 mr-1" /> {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Status do Cron</h1>
          <p className="text-muted-foreground mt-1">
            Monitoramento dos jobs agendados (pg_cron) e da fila de retries.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Atualizar
        </Button>
      </div>

      {/* Retry queue stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Aguardando retry</CardDescription>
            <CardTitle className="text-3xl">
              {stats?.pending_retries ?? <Loader2 className="h-6 w-6 animate-spin" />}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            {stats?.next_retry_at ? (
              <>Próximo: {formatDistanceToNow(new Date(stats.next_retry_at), { locale: ptBR, addSuffix: true })}</>
            ) : (
              "Nenhum retry agendado"
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Falhas permanentes (3/3)</CardDescription>
            <CardTitle className="text-3xl text-destructive">
              {stats?.failed_max_retries ?? <Loader2 className="h-6 w-6 animate-spin" />}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Requerem intervenção manual
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Disparo manual</CardDescription>
            <CardTitle className="text-base">Forçar processamento</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={handleManualRun} disabled={reprocessing} size="sm" className="w-full">
              {reprocessing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <PlayCircle className="h-4 w-4 mr-2" />
              )}
              Executar agora
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Jobs table */}
      <Card>
        <CardHeader>
          <CardTitle>Jobs agendados</CardTitle>
          <CardDescription>Lista de jobs do pg_cron e sua última execução.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading && jobs.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin mr-2" /> Carregando jobs...
            </div>
          ) : jobs.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              Nenhum job agendado.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job</TableHead>
                  <TableHead>Agenda</TableHead>
                  <TableHead>Ativo</TableHead>
                  <TableHead>Última execução</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Retorno</TableHead>
                  <TableHead className="text-right">Duração</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.jobid}>
                    <TableCell className="font-medium">
                      <div>{job.jobname}</div>
                      <div className="text-xs text-muted-foreground font-mono">#{job.jobid}</div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{job.schedule}</code>
                    </TableCell>
                    <TableCell>
                      {job.active ? (
                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-700 dark:text-emerald-400">
                          Ativo
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Inativo</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">
                      {job.last_run_started
                        ? formatDistanceToNow(new Date(job.last_run_started), { locale: ptBR, addSuffix: true })
                        : "—"}
                    </TableCell>
                    <TableCell>{renderStatus(job.last_run_status)}</TableCell>
                    <TableCell className="text-xs font-mono max-w-[300px] truncate" title={job.last_run_return ?? ""}>
                      {job.last_run_return ?? "—"}
                    </TableCell>
                    <TableCell className="text-right text-sm tabular-nums">
                      {job.runtime_ms != null ? `${Math.round(job.runtime_ms)} ms` : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground text-center">
        Atualização automática a cada 30 segundos.
      </p>
    </div>
  );
}
