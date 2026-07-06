import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2, Pencil, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReviewStepProps {
  data: {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    dob: Date;
  };
  submitting: boolean;
  onEdit: () => void;
  onConfirm: () => void;
}

export function ReviewStep({ data, submitting, onEdit, onConfirm }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-[26px] font-semibold tracking-[-0.02em] text-brand-navy">
          Confirme seus dados
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-brand-navy/65">
          Confira tudo antes de finalizar. Dados corretos garantem seu acesso ao
          canal e seu mimo de aniversário.
        </p>
      </div>

      <dl className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
        <Row label="Nome" value={`${data.first_name} ${data.last_name}`} />
        <Row label="Telefone" value={data.phone} />
        <Row label="E-mail" value={data.email} />
        <Row
          label="Nascimento"
          value={format(data.dob, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
        />
      </dl>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={onEdit}
          disabled={submitting}
          className="h-12 flex-1 border-slate-200 bg-white text-brand-navy hover:bg-slate-50"
        >
          <Pencil className="h-4 w-4" strokeWidth={1.75} /> Editar
        </Button>
        <Button
          type="button"
          variant="premium"
          onClick={onConfirm}
          disabled={submitting}
          className="h-12 flex-1 text-base"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Enviando...
            </>
          ) : (
            "Confirmar e entrar"
          )}
        </Button>
      </div>
      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-brand-navy/50">
        <Lock className="h-3 w-3" strokeWidth={2} />
        Seus dados estão protegidos e seguem a LGPD.
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 px-5 py-3.5">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-navy/50">
        {label}
      </dt>
      <dd className="font-numeric text-right text-sm font-medium text-brand-navy">
        {value}
      </dd>
    </div>
  );
}
