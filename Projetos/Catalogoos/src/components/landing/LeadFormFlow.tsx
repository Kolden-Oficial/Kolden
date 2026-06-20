import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  CalendarIcon,
  Loader2,
  Lock,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CONSENT_VERSION,
  leadStep1Schema,
  leadStep2Schema,
  type LeadStep1,
  type LeadStep2,
} from "@/lib/lead-schema";
import { maskPhoneBR } from "@/lib/phone-mask";
import { cn } from "@/lib/utils";
import { ReviewStep } from "./ReviewStep";

function getCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[2]) : null;
}

function captureContext() {
  const url = new URL(window.location.href);
  const q = url.searchParams;
  return {
    utm_source: q.get("utm_source"),
    utm_medium: q.get("utm_medium"),
    utm_campaign: q.get("utm_campaign"),
    utm_content: q.get("utm_content"),
    utm_term: q.get("utm_term"),
    fbclid: q.get("fbclid"),
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc"),
    user_agent: navigator.userAgent,
    event_source_url: window.location.href,
  };
}

interface LeadFormFlowProps {
  variant: "a" | "b";
  formId?: string;
}

export function LeadFormFlow({ variant, formId = "lead-form" }: LeadFormFlowProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [step1Data, setStep1Data] = useState<LeadStep1 | null>(null);
  const [step2Data, setStep2Data] = useState<LeadStep2 | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const form1 = useForm<LeadStep1>({
    resolver: zodResolver(leadStep1Schema),
    defaultValues: { first_name: "", last_name: "", phone: "" },
  });

  const form2 = useForm<LeadStep2>({
    resolver: zodResolver(leadStep2Schema),
    defaultValues: {
      email: "",
      email_confirm: "",
      dob: undefined as unknown as Date,
      consent: undefined as unknown as true,
    },
  });

  const onStep1 = (data: LeadStep1) => {
    setStep1Data(data);
    setStep(2);
  };

  const onStep2 = (data: LeadStep2) => {
    setStep2Data(data);
    setStep(3);
  };

  const submitFinal = async () => {
    if (!step1Data || !step2Data) return;
    setSubmitting(true);
    try {
      const ctx = captureContext();
      const dobIso = format(step2Data.dob, "yyyy-MM-dd");
      const { data: res, error } = await supabase.functions.invoke("submit-lead", {
        body: {
          variant,
          first_name: step1Data.first_name,
          last_name: step1Data.last_name,
          phone: step1Data.phone,
          email: step2Data.email,
          dob: dobIso,
          consent_version: CONSENT_VERSION,
          ...ctx,
        },
      });
      if (error) throw error;
      const leadId = (res as { lead_id?: string; telegram_invite_link?: string })?.lead_id;
      const inviteLink = (res as { telegram_invite_link?: string })?.telegram_invite_link;
      if (inviteLink) {
        window.location.href = inviteLink;
      } else {
        navigate(`/lp/obrigado?lead_id=${leadId ?? ""}&variant=${variant}`);
      }
    } catch (e) {
      console.error(e);
      toast.error("Não foi possível enviar. Tente novamente em instantes.");
      setSubmitting(false);
    }
  };

  const dobValue = form2.watch("dob");
  const consentValue = form2.watch("consent");

  return (
    <div
      id={formId}
      className="relative rounded-2xl border border-slate-200/70 bg-white p-7 shadow-[0_1px_2px_rgba(13,19,48,0.04),0_12px_40px_-16px_rgba(13,19,48,0.18)] sm:p-10"
    >
      {/* progress */}
      <div className="mb-7">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-numeric text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-navy/55">
            Passo {step === 3 ? "3" : step}
            <span className="text-brand-navy/30"> · de 3</span>
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-brand-navy transition-all duration-500 ease-out"
            style={{
              width: step === 1 ? "33%" : step === 2 ? "66%" : "100%",
            }}
          />
        </div>
      </div>

      {step === 1 && (
        <>
          <h3 className="font-display text-[26px] font-semibold tracking-[-0.02em] text-brand-navy">
            Inicie sua validação
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-brand-navy/65">
            Seu acesso ao Alertas Catalogo está sendo liberado aos poucos.
            Preencha abaixo para avançar para a próxima etapa.
          </p>

          <form
            onSubmit={form1.handleSubmit(onStep1)}
            className="mt-7 space-y-5"
          >
            <Field label="Nome" error={form1.formState.errors.first_name?.message}>
              <Input
                placeholder="Seu primeiro nome"
                autoComplete="given-name"
                {...form1.register("first_name")}
              />
            </Field>
            <Field label="Sobrenome" error={form1.formState.errors.last_name?.message}>
              <Input
                placeholder="Seu sobrenome"
                autoComplete="family-name"
                {...form1.register("last_name")}
              />
            </Field>
            <Field label="Telefone" error={form1.formState.errors.phone?.message}>
              <Input
                type="tel"
                inputMode="numeric"
                placeholder="(11) 99999-9999"
                autoComplete="tel"
                value={form1.watch("phone") ?? ""}
                onChange={(e) =>
                  form1.setValue("phone", maskPhoneBR(e.target.value), {
                    shouldValidate: true,
                  })
                }
              />
            </Field>

            <Button
              type="submit"
              variant="premium"
              className="h-12 w-full text-base"
            >
              Continuar
            </Button>
            <p className="flex items-center justify-center gap-1.5 text-center text-xs text-brand-navy/50">
              <Lock className="h-3 w-3" strokeWidth={2} />
              Seus dados são protegidos. Não enviamos spam.
            </p>
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <h3 className="font-display text-[26px] font-semibold tracking-[-0.02em] text-brand-navy">
            Falta pouco para liberar seu acesso
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-brand-navy/65">
            Confirme seu e-mail e data de nascimento para entrar no canal e
            receber também uma seleção especial no mês do seu aniversário.
          </p>

          <form
            onSubmit={form2.handleSubmit(onStep2)}
            className="mt-7 space-y-5"
          >
            <Field label="E-mail" error={form2.formState.errors.email?.message}>
              <Input
                type="email"
                placeholder="voce@exemplo.com"
                autoComplete="email"
                {...form2.register("email")}
              />
            </Field>
            <Field
              label="Confirme seu e-mail"
              error={form2.formState.errors.email_confirm?.message}
            >
              <Input
                type="email"
                placeholder="Repita o e-mail acima"
                autoComplete="email"
                onPaste={(e) => e.preventDefault()}
                {...form2.register("email_confirm")}
              />
            </Field>

            <Field
              label="Data de nascimento"
              error={form2.formState.errors.dob?.message}
            >
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "h-12 w-full justify-start border-slate-200 bg-white text-left font-normal text-brand-navy hover:border-slate-300 hover:bg-slate-50",
                      !dobValue && "text-brand-navy/40",
                    )}
                  >
                    <CalendarIcon className="h-4 w-4" strokeWidth={1.75} />
                    {dobValue
                      ? format(dobValue, "dd 'de' MMMM 'de' yyyy", {
                          locale: ptBR,
                        })
                      : "Selecione sua data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dobValue}
                    onSelect={(d) =>
                      d &&
                      form2.setValue("dob", d, { shouldValidate: true })
                    }
                    captionLayout="dropdown-buttons"
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                    defaultMonth={dobValue ?? new Date(1990, 0, 1)}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </Field>

            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <label className="flex items-start gap-3 text-[13px] leading-relaxed text-brand-navy/75">
                <Checkbox
                  checked={consentValue === true}
                  onCheckedChange={(c) =>
                    form2.setValue("consent", c === true ? true : (false as unknown as true), {
                      shouldValidate: true,
                    })
                  }
                  className="mt-0.5 data-[state=checked]:border-brand-navy data-[state=checked]:bg-brand-navy data-[state=checked]:text-white"
                />
                <span>
                  Li e aceito a{" "}
                  <a
                    href="/legal/privacidade"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brand-navy underline underline-offset-2"
                  >
                    Política de Privacidade
                  </a>
                  , os{" "}
                  <a
                    href="/legal/termos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brand-navy underline underline-offset-2"
                  >
                    Termos de Uso
                  </a>{" "}
                  e o{" "}
                  <a
                    href="/legal/cookies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brand-navy underline underline-offset-2"
                  >
                    Aviso de Cookies
                  </a>
                  .
                </span>
              </label>
              {form2.formState.errors.consent && (
                <p className="mt-2 text-xs font-medium text-destructive">
                  {form2.formState.errors.consent.message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                className="h-12 flex-1 border-slate-200 bg-white text-brand-navy hover:bg-slate-50"
              >
                Voltar
              </Button>
              <Button
                type="submit"
                variant="premium"
                className="h-12 flex-1 text-base"
              >
                Revisar dados
              </Button>
            </div>
            <p className="flex items-center justify-center gap-1.5 text-center text-xs text-brand-navy/50">
              <Lock className="h-3 w-3" strokeWidth={2} />
              Você revisa os dados antes de enviar.
            </p>
          </form>
        </>
      )}

      {step === 3 && step1Data && step2Data && (
        <ReviewStep
          data={{
            first_name: step1Data.first_name,
            last_name: step1Data.last_name,
            phone: step1Data.phone,
            email: step2Data.email,
            dob: step2Data.dob,
          }}
          submitting={submitting}
          onEdit={() => setStep(2)}
          onConfirm={submitFinal}
        />
      )}
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-navy/55">
        {label}
      </Label>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-1.5 text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}
