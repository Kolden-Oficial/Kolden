import { useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PROVIDERS } from "@/config/integration-providers";
import { useIntegrations } from "@/hooks/useIntegrations";
import { ProviderCard, type MetaTestResult } from "@/components/integrations/ProviderCard";
import { ProviderConfigDialog } from "@/components/integrations/ProviderConfigDialog";

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string)?.replace(/\/$/, "") ?? "";

export default function IntegrationSettings() {
  const { userId, saved, savedCredentials, loading, save } = useIntegrations();
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
  const [testingMeta, setTestingMeta] = useState(false);
  const [testResult, setTestResult] = useState<MetaTestResult | null>(null);

  const selected = PROVIDERS.find((p) => p.id === selectedProviderId) ?? null;

  const ghlWebhookUrl = userId
    ? `${SUPABASE_URL}/functions/v1/identities-upsert?user_id=${userId}`
    : "";

  const buildGhlCurlExample = () => {
    const url = ghlWebhookUrl || `${SUPABASE_URL}/functions/v1/identities-upsert?user_id=<SEU_USER_ID>`;
    const secret = savedCredentials["gohighlevel"]?.webhook_secret || "<SEU_WEBHOOK_SECRET>";
    return `# 1. Calcule a assinatura HMAC SHA-256 do body com seu webhook_secret
BODY='{"lead_id":"contato@exemplo.com","email":"contato@exemplo.com","phone":"+5511999998888","first_name":"Maria","last_name":"Silva","city":"Sao Paulo","state":"SP","zip":"01310-100","country":"BR"}'
SECRET='${secret}'
SIG=$(printf "%s" "$BODY" | openssl dgst -sha256 -hmac "$SECRET" -hex | awk '{print $2}')

# 2. Envie a requisicao
curl -X POST '${url}' \\
  -H "Content-Type: application/json" \\
  -H "x-signature: sha256=$SIG" \\
  -d "$BODY"`;
  };

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copiado!`);
    } catch {
      toast.error("Falha ao copiar.");
    }
  };

  const handleTestMeta = async () => {
    setTestingMeta(true);
    setTestResult(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado.");

      const metaCreds = savedCredentials["meta"] ?? {};
      if (!metaCreds.pixel_id || !metaCreds.capi_token) {
        throw new Error("Configure Pixel ID e CAPI Token antes de testar.");
      }

      const stamp = Date.now();

      const { data: link, error: linkErr } = await supabase
        .from("links")
        .insert({
          user_id: user.id,
          channel: "test",
          product_name: "META TEST EVENT",
          slug: `meta-test-${stamp}`,
          destination_url: "https://example.com/meta-test",
        })
        .select("id")
        .single();
      if (linkErr || !link) throw new Error(linkErr?.message ?? "Falha ao criar link dummy.");

      const { data: click, error: clickErr } = await supabase
        .from("clicks")
        .insert({
          link_id: link.id,
          ip_address: "127.0.0.1",
          user_agent: "TrackerFlow-MetaTest/1.0",
          lead_id: "meta-test@trackerflow.app",
        })
        .select("id")
        .single();
      if (clickErr || !click) throw new Error(clickErr?.message ?? "Falha ao criar click dummy.");

      const { data: conv, error: convErr } = await supabase
        .from("conversions")
        .insert({
          click_id: click.id,
          purchase_value: 1.0,
          external_order_id: `META-TEST-${stamp}`,
        })
        .select("id")
        .single();
      if (convErr || !conv) throw new Error(convErr?.message ?? "Falha ao criar conversão dummy.");

      const { data: syncData, error: syncErr } = await supabase.functions.invoke("sync-outbound", {
        body: { conversion_id: conv.id },
      });
      if (syncErr) throw new Error(syncErr.message);

      const result = syncData as { meta_sync_status?: string; ghl_sync_status?: string; sync_logs?: unknown };
      setTestResult({
        ok: result.meta_sync_status === "success",
        meta_sync_status: result.meta_sync_status,
        ghl_sync_status: result.ghl_sync_status,
        raw: result.sync_logs,
      });

      if (result.meta_sync_status === "success") {
        toast.success("Evento de teste enviado com sucesso ao Meta!");
      } else {
        toast.error(`Meta retornou: ${result.meta_sync_status}. Veja detalhes abaixo.`);
      }
    } catch (e) {
      const err = e as Error;
      setTestResult({ ok: false, error: err.message });
      toast.error(err.message);
    } finally {
      setTestingMeta(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Integrações</h1>
        <p className="text-sm text-muted-foreground">Conecte suas plataformas para sincronização automática.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROVIDERS.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              isConnected={!!saved[provider.id]}
              savedCreds={savedCredentials[provider.id]}
              onConfigure={() => setSelectedProviderId(provider.id)}
              onTestMeta={provider.id === "meta" ? handleTestMeta : undefined}
              testingMeta={testingMeta}
              testResult={provider.id === "meta" ? testResult : null}
              ghlWebhookUrl={ghlWebhookUrl}
              onCopyGhlUrl={
                provider.id === "gohighlevel"
                  ? () => handleCopy(ghlWebhookUrl, "URL do webhook")
                  : undefined
              }
              onCopyGhlCurl={
                provider.id === "gohighlevel"
                  ? () => handleCopy(buildGhlCurlExample(), "Exemplo curl")
                  : undefined
              }
            />
          ))}
        </div>
      )}

      <ProviderConfigDialog
        provider={selected}
        savedCredentials={selected ? savedCredentials[selected.id] : undefined}
        open={!!selected}
        onClose={() => setSelectedProviderId(null)}
        onSave={save}
      />
    </div>
  );
}
