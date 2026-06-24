import { z } from "zod";

export const CONSENT_VERSION = "v1-2026-04-20";

export const leadStep1Schema = z.object({
  first_name: z
    .string()
    .trim()
    .min(2, "Informe seu nome")
    .max(80, "Nome muito longo"),
  last_name: z
    .string()
    .trim()
    .min(2, "Informe seu sobrenome")
    .max(80, "Sobrenome muito longo"),
  phone: z
    .string()
    .trim()
    .min(14, "Telefone incompleto")
    .max(20, "Telefone inválido")
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Formato: (11) 99999-9999"),
});

export const leadStep2Schema = z
  .object({
    email: z
      .string()
      .trim()
      .email("E-mail inválido")
      .max(255, "E-mail muito longo"),
    email_confirm: z
      .string()
      .trim()
      .email("Confirme seu e-mail")
      .max(255),
    dob: z
      .date({ required_error: "Informe sua data de nascimento" })
      .refine((d) => d <= new Date(), "Data inválida")
      .refine(
        (d) => d >= new Date("1900-01-01"),
        "Data inválida",
      ),
    consent: z.literal(true, {
      errorMap: () => ({
        message: "Você precisa aceitar para continuar",
      }),
    }),
  })
  .refine((d) => d.email.toLowerCase() === d.email_confirm.toLowerCase(), {
    path: ["email_confirm"],
    message: "Os e-mails não conferem",
  });

export const leadFullSchema = z.object({
  variant: z.enum(["a", "b"]),
  first_name: z.string(),
  last_name: z.string(),
  phone: z.string(),
  email: z.string(),
  dob: z.string(),
  consent_version: z.string(),
  utm_source: z.string().optional().nullable(),
  utm_medium: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
  utm_content: z.string().optional().nullable(),
  utm_term: z.string().optional().nullable(),
  fbclid: z.string().optional().nullable(),
  fbp: z.string().optional().nullable(),
  fbc: z.string().optional().nullable(),
  user_agent: z.string().optional().nullable(),
  event_source_url: z.string().optional().nullable(),
});

export type LeadStep1 = z.infer<typeof leadStep1Schema>;
export type LeadStep2 = z.infer<typeof leadStep2Schema>;
export type LeadFull = z.infer<typeof leadFullSchema>;
