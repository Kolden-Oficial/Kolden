import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import type { Provider } from "@/config/integration-providers";
import { maskValue } from "@/config/integration-providers";

interface ProviderConfigDialogProps {
  provider: Provider | null;
  savedCredentials: Record<string, string> | undefined;
  open: boolean;
  onClose: () => void;
  onSave: (
    providerId: string,
    finalCreds: Record<string, string>,
    secondaryKey: string | null,
  ) => Promise<{ ok: boolean; error?: string }>;
}

export function ProviderConfigDialog({
  provider,
  savedCredentials,
  open,
  onClose,
  onSave,
}: ProviderConfigDialogProps) {
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (provider) {
      const initial: Record<string, string> = {};
      provider.fields.forEach((f) => { initial[f.key] = ""; });
      setCredentials(initial);
    }
  }, [provider]);

  const handleSave = async () => {
    if (!provider) return;
    const existing = savedCredentials ?? {};
    const finalCreds: Record<string, string> = {};
    for (const field of provider.fields) {
      const newVal = credentials[field.key]?.trim() ?? "";
      if (newVal) {
        finalCreds[field.key] = newVal;
      } else if (existing[field.key]) {
        finalCreds[field.key] = existing[field.key];
      } else if (field.optional) {
        // skip
      } else {
        toast.error(`Preencha o campo: ${field.label}`);
        return;
      }
    }

    setSaving(true);
    const result = await onSave(provider.id, finalCreds, provider.fields[1]?.key ?? null);
    setSaving(false);

    if (!result.ok) {
      toast.error("Erro ao salvar: " + (result.error ?? "desconhecido"));
      return;
    }
    toast.success(`Integração ${provider.name} salva com sucesso!`);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurar {provider?.name}</DialogTitle>
          <DialogDescription>Insira as credenciais de API. Os valores serão salvos de forma segura.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          {provider?.fields.map((field) => {
            const existing = savedCredentials?.[field.key];
            return (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={`field-${field.key}`} className="flex items-center gap-2">
                  {field.label}
                  {field.optional && (
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground font-normal">
                      opcional
                    </span>
                  )}
                </Label>
                <Input
                  id={`field-${field.key}`}
                  type={field.optional ? "text" : "password"}
                  placeholder={existing ? maskValue(existing) : (field.placeholder ?? "••••••••")}
                  value={credentials[field.key] ?? ""}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, [field.key]: e.target.value }))}
                />
                {field.hint && (
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{field.hint}</p>
                )}
              </div>
            );
          })}

          {provider?.helpText && (
            <p className="text-xs text-muted-foreground leading-relaxed border-l-2 border-primary/40 pl-3">
              {provider.helpText}
            </p>
          )}

          <Button className="w-full" onClick={handleSave} disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar Credenciais
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
