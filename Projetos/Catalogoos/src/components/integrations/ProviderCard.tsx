import { Plug, Check, Key, Zap, AlertCircle, CheckCircle2, Copy, Link2, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Provider } from "@/config/integration-providers";

export interface MetaTestResult {
  ok: boolean;
  meta_sync_status?: string;
  ghl_sync_status?: string;
  raw?: unknown;
  error?: string;
}

interface ProviderCardProps {
  provider: Provider;
  isConnected: boolean;
  savedCreds: Record<string, string> | undefined;
  onConfigure: () => void;
  // Meta-only
  onTestMeta?: () => void;
  testingMeta?: boolean;
  testResult?: MetaTestResult | null;
  // GHL-only
  ghlWebhookUrl?: string;
  onCopyGhlUrl?: () => void;
  onCopyGhlCurl?: () => void;
}

export function ProviderCard({
  provider,
  isConnected,
  savedCreds,
  onConfigure,
  onTestMeta,
  testingMeta,
  testResult,
  ghlWebhookUrl,
  onCopyGhlUrl,
  onCopyGhlCurl,
}: ProviderCardProps) {
  const isMeta = provider.id === "meta";
  const isGhl = provider.id === "gohighlevel";
  const isTelegramBot = provider.id === "telegram_bot";
  const metaConfigured = isMeta && isConnected;
  const testEventCode = isMeta ? savedCreds?.test_event_code : undefined;
  const ghlSecret = isGhl ? savedCreds?.webhook_secret : undefined;
  const telegramBotConfigured = isTelegramBot && !!(savedCreds?.bot_token) && !!(savedCreds?.chat_id);

  return (
    <div className="bg-card border border-border rounded-lg p-6 flex flex-col justify-between animate-fade-in hover:border-primary/30 transition-colors">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Plug className="h-5 w-5 text-primary" />
            <h3 className="font-medium text-foreground">{provider.name}</h3>
          </div>
          {isConnected ? (
            <Badge variant="default" className="gap-1"><Check className="h-3 w-3" /> Conectado</Badge>
          ) : (
            <Badge variant="secondary">Desconectado</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{provider.description}</p>

        {isMeta && metaConfigured && (
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Modo:</span>
            {testEventCode ? (
              <Badge variant="outline" className="gap-1 font-mono">
                <Zap className="h-3 w-3" /> TEST · {testEventCode}
              </Badge>
            ) : (
              <Badge variant="outline" className="gap-1">
                <CheckCircle2 className="h-3 w-3" /> Produção
              </Badge>
            )}
          </div>
        )}

        {isGhl && (
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Webhook:</span>
            {ghlSecret ? (
              <Badge variant="outline" className="gap-1">
                <CheckCircle2 className="h-3 w-3" /> HMAC ativo
              </Badge>
            ) : (
              <Badge variant="outline" className="gap-1 text-muted-foreground">
                <AlertCircle className="h-3 w-3" /> Configure o secret
              </Badge>
            )}
          </div>
        )}

        {isTelegramBot && telegramBotConfigured && (
          <div className="mt-3 rounded-md border border-amber-500/30 bg-amber-500/5 p-3 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-medium text-amber-600 dark:text-amber-500">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              <span>Bot precisa ser administrador do grupo</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Adicione o bot como admin com permissão "Adicionar membros". Sem isso o Telegram não envia eventos de entrada e o Meta Lead nunca é disparado.
            </p>
          </div>
        )}

        {isMeta && testResult && (
          <div
            className={`mt-3 rounded-md border p-3 text-xs space-y-2 ${
              testResult.ok
                ? "border-emerald-500/30 bg-emerald-500/5"
                : "border-destructive/30 bg-destructive/5"
            }`}
          >
            <div className="flex items-center gap-1.5 font-medium">
              {testResult.ok ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Evento de teste aceito pelo Meta</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-3.5 w-3.5 text-destructive" />
                  <span>Falha no envio</span>
                </>
              )}
            </div>
            {testResult.error && (
              <p className="text-muted-foreground">{testResult.error}</p>
            )}
            {testResult.raw != null && (
              <pre className="text-[10px] font-mono bg-muted/50 p-2 rounded overflow-auto max-h-32 whitespace-pre-wrap break-all">
                <code>{Array.isArray(testResult.raw) ? testResult.raw.join("\n\n") : String(testResult.raw)}</code>
              </pre>
            )}
            <p className="text-[10px] text-muted-foreground">
              {testEventCode
                ? `Verifique no Meta Events Manager → Eventos de Teste (código ${testEventCode}).`
                : "Verifique no Meta Events Manager → Visão Geral."}
            </p>
          </div>
        )}
      </div>

      <div className={`mt-4 ${isMeta || isGhl ? "grid grid-cols-2 gap-2" : ""}`}>
        <Button variant="outline" onClick={onConfigure}>
          <Key className="mr-2 h-4 w-4" /> Configurar
        </Button>
        {isMeta && onTestMeta && (
          <Button
            variant="default"
            onClick={onTestMeta}
            disabled={!metaConfigured || testingMeta}
            title={
              metaConfigured
                ? "Cria uma conversão dummy e envia para o Meta para validar credenciais"
                : "Configure as credenciais primeiro"
            }
          >
            {testingMeta ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Zap className="mr-2 h-4 w-4" />
            )}
            Enviar evento de teste
          </Button>
        )}
        {isGhl && onCopyGhlUrl && (
          <Button
            variant="default"
            onClick={onCopyGhlUrl}
            disabled={!ghlWebhookUrl}
            title="Copia a URL do endpoint identities-upsert para colar no GoHighLevel"
          >
            <Link2 className="mr-2 h-4 w-4" />
            Copiar URL
          </Button>
        )}
      </div>

      {isGhl && onCopyGhlCurl && (
        <div className="mt-3 space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start font-mono text-[10px] h-auto py-2"
            onClick={onCopyGhlCurl}
            disabled={!ghlWebhookUrl}
          >
            <Copy className="mr-2 h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Copiar exemplo curl (HMAC)</span>
          </Button>
        </div>
      )}
    </div>
  );
}
