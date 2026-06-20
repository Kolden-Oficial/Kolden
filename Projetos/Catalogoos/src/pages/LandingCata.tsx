import { LeadFormFlow } from "@/components/landing/LeadFormFlow";
import { useSeo } from "@/components/landing/useSeo";
import { useLandingTracking } from "@/components/landing/useLandingTracking";

interface Props {
  variant: "a" | "b";
}

const scrollToForm = () =>
  document
    .getElementById("lead-form-final")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });

export default function LandingCata({ variant }: Props) {
  useSeo({
    title:
      "Alertas - Cata Logo 🛍 | O grupo que acha bug de preço na Shopee pra você",
    description:
      "Entre grátis no canal do Telegram e receba ofertas verificadas da Shopee: bugs de preço, cupons e descontos escondidos, direto no seu celular.",
  });
  useLandingTracking(variant);

  return (
    <div className="min-h-screen bg-white text-brand-navy font-sans pb-[84px] sm:pb-0">
      {/* TOP BAR */}
      <div className="relative overflow-hidden bg-brand-coral px-4 py-2.5 text-center text-[13px] font-semibold text-white">
        🚀 Grupo <strong className="font-black">novo</strong>. Vagas gratuitas abertas agora. Entre antes de lotar 🔒
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-brand-navy-2 bg-brand-navy">
        <div className="mx-auto flex max-w-[1200px] items-center gap-6 px-6 py-2.5">
          <img
            src="/logo-catalogo.svg"
            alt="CataLogo"
            className="block h-12 w-auto object-contain sm:h-14"
          />
          <div className="flex-1" />
          <button
            onClick={scrollToForm}
            className="rounded-[10px] bg-brand-yellow px-4 py-2.5 text-[13px] font-black tracking-tight text-brand-navy transition-all hover:bg-[hsl(45_100%_57%)] active:scale-[0.97]"
          >
            Entrar grátis no grupo →
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-navy px-6 pb-20 pt-14 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-20 h-[380px] w-[380px] opacity-[0.05]"
        />
        <div className="relative z-[2] mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-yellow/25 bg-brand-yellow/[0.13] px-3.5 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.06em] text-brand-yellow">
              <span className="h-2.5 w-2.5 animate-pulse-coral rounded-full bg-brand-coral" />
              Para quem ralou pra ganhar e quer comprar inteligente
            </div>
            <h1 className="mb-5 text-[clamp(36px,5vw,60px)] font-black leading-[1.02] tracking-[-0.035em] text-balance">
              Descubra o grupo secreto que pega{" "}
              <span className="text-brand-coral">ofertas absurdas</span>{" "}
              <span className="text-brand-yellow">antes de todo mundo</span>.
            </h1>
            <p className="mb-8 max-w-[560px] text-[18px] leading-[1.55] text-white/75">
              Entre grátis no grupo do Telegram onde a gente garimpeia os bugs reais, os descontos escondidos e as ofertas que somem em minutos. Tudo verificado, direto da Shopee, no seu bolso.
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-white/65">
              <span>✅ 100% gratuito, sempre vai ser</span>
              <span>🛡️ Todos os links são da própria Shopee</span>
              <span>🔕 Silenciável quando quiser</span>
            </div>

          </div>

          {/* Form card — substitui o mockup do telefone */}
          <div className="lg:pl-4">
            <LeadFormFlow variant={variant} formId="lead-form-hero" />
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="bg-brand-cream px-6 py-[88px]">
        <div className="mx-auto max-w-[1100px]">
          
          <SectionTitle>Você Já Foi "Enganado" por uma Promoção Online?</SectionTitle>
          <div className="max-w-[740px] space-y-4 text-[18px] leading-[1.65] text-[hsl(230_22%_22%)]">
            <p>Você sabe como é.</p>
            <p>
              Vê aquele preço absurdo no anúncio. Fica animado. Clica cheio de esperança. E chega numa página suspeita, com produto falsificado, avaliação de 2 estrelas e um frete que <strong className="font-extrabold text-brand-navy">dobra o valor na hora do checkout.</strong>
            </p>
            <p>
              Ou então: você abre a Shopee querendo economizar, mas são 800 produtos parecidos, vendedores desconhecidos, foto mentirosa, nota 3.1... e você fica paralisado, com <strong className="font-extrabold text-brand-navy">medo de jogar fora o dinheiro que você suou pra ganhar.</strong>
            </p>
          </div>
          <p className="mb-4 mt-8 text-[16px] font-extrabold tracking-tight text-brand-navy">
            A internet está cheia de:
          </p>
          <ul className="grid max-w-[720px] gap-3">
            {[
              'Preços de "Black Friday" que sobem antes para parecer desconto depois',
              "Links que levam pra lojas de golpe disfarçadas de promoção",
              "Produtos com foto bonita e realidade horrível",
              "Frete oculto que aparece só no momento do pagamento",
              "Avaliações falsas compradas para enganar quem não tem tempo de pesquisar",
            ].map((t) => (
              <li
                key={t}
                className="flex items-start gap-3.5 rounded-xl border border-border-subtle border-l-[4px] border-l-brand-coral bg-white px-[18px] py-4 text-[15px] font-medium leading-snug text-[hsl(230_22%_22%)]"
              >
                <span className="shrink-0 text-[18px] leading-none">❌</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex max-w-[720px] items-start gap-4 rounded-2xl bg-brand-navy px-7 py-6 text-[17px] font-semibold leading-snug text-white shadow-[0_10px_0_rgba(13,19,48,0.06),0_24px_48px_rgba(13,19,48,0.18)]">
            <span className="-mt-0.5 shrink-0 text-[28px] leading-none">⚡</span>
            <span>E enquanto você perde 20 minutos tentando decidir, o bug de preço já evaporou.</span>
          </div>
          <div className="mt-7 max-w-[720px] text-[22px] font-black leading-tight tracking-tight">
            Não é falta de sorte. É porque ninguém fez o trabalho pesado por você.{" "}
            <span className="rounded-md bg-brand-yellow px-2 py-0.5">Até agora.</span>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="bg-white px-6 py-[88px]">
        <div className="mx-auto max-w-[1100px]">
          
          <SectionTitle>
            Conheça a{" "}
            <span className="inline-block align-baseline rounded-lg bg-brand-yellow px-2.5 py-0 leading-[1.15] my-0.5 [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
              Cata Logo
            </span>
            , o grupo que faz o garimpo por você
          </SectionTitle>
          <p className="mb-6 max-w-[760px] text-[18px] leading-relaxed text-[hsl(230_22%_22%)]">
            É um canal gratuito no Telegram onde a nossa equipe passa o dia dentro da Shopee, testando lojas, lendo avaliações, rastreando vendedores oficiais e monitorando quedas de preço que a maioria jamais vai ver.
          </p>
          <p className="mb-6 max-w-[760px] text-[18px] leading-relaxed text-[hsl(230_22%_22%)]">
            Quando a gente encontra um bug de preço, uma oferta genuína ou um produto com desconto absurdo de loja verificada...
          </p>
          <div className="mb-10 max-w-[720px] rounded-r-xl border-l-[6px] border-brand-yellow bg-brand-yellow-soft px-5 py-4 text-[18px] font-extrabold tracking-tight text-brand-navy">
            💛 A gente manda o link direto pra você no Telegram.
          </div>

          <div className="mb-12 grid gap-4 md:grid-cols-3">
            {[
              ["1", "Entre no grupo", "É grátis, leva 10 segundos."],
              ["2", "Receba os alertas", "Quando uma oferta verificada aparecer, você é o primeiro a saber."],
              ["3", "Clique e compre com segurança", "O link vai direto pra Shopee, com toda a proteção da plataforma."],
            ].map(([n, t, d]) => (
              <div
                key={n}
                className="group rounded-2xl border-[1.5px] border-border-subtle bg-white p-7 transition-all hover:-translate-y-1 hover:border-brand-yellow hover:shadow-[0_8px_20px_rgba(13,19,48,0.10)]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-yellow text-[22px] font-black tracking-tight text-brand-navy">
                  {n}
                </div>
                <div className="mb-2 text-[19px] font-black tracking-tight">{t}</div>
                <div className="text-[14.5px] leading-relaxed text-muted-foreground">{d}</div>
              </div>
            ))}
          </div>

          <div className="relative mb-8 grid max-w-[920px] grid-cols-1 gap-6 overflow-hidden rounded-[22px] bg-gradient-to-br from-brand-navy to-brand-navy-2 p-9 text-white md:grid-cols-[80px_1fr]">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-[200px] w-[200px] rounded-full opacity-15"
              style={{ background: "radial-gradient(circle, hsl(var(--brand-green)) 0%, transparent 70%)" }}
            />
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green text-[32px] shadow-[0_8px_24px_rgba(0,200,150,0.4)]">
              🛡️
            </div>
            <div>
              <h3 className="mb-2.5 text-[22px] font-black tracking-tight">
                Por que todos os links são da Shopee?
              </h3>
              <p className="mb-2.5 text-[15px] leading-relaxed text-white/85">
                Porque a Shopee tem <strong className="font-extrabold text-brand-yellow">Garantia de Entrega</strong>, proteção ao comprador e suporte oficial. Se o produto não chegar ou vier diferente do anunciado, você recebe seu dinheiro de volta.
              </p>
              <p className="mt-3.5 text-[15px] font-semibold leading-relaxed text-white">
                Você nunca vai cair num site de golpe. O link sempre vai te levar pra plataforma que você já conhece, já confia e já comprou antes.
              </p>
            </div>
          </div>

          <div className="pt-6 text-center">
            <button onClick={scrollToForm} className={CTA_PRIMARY}>
              🔓 Entrar no Grupo Grátis Agora
            </button>
            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] text-muted-foreground">
              <span>✅ Gratuito para sempre</span>
              <span>🛡️ Links direto da Shopee</span>
              <span>🔕 Sem spam</span>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-brand-navy px-6 py-[88px] text-white">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="mx-auto mb-3 max-w-[800px] text-balance text-center text-[clamp(28px,3.6vw,40px)] font-black leading-[1.05] tracking-[-0.035em] text-white">
            Ofertas Verificadas: O Tipo de Coisa que a Gente Manda
          </h2>
          <p className="mx-auto mb-10 max-w-[720px] text-center text-[18px] leading-snug text-white/72">
            Exemplos reais do tipo de oferta que entra no grupo toda semana.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DEALS.map((d) => (
              <div
                key={d.name}
                className="flex flex-col rounded-2xl bg-white p-5 text-brand-navy transition-all hover:-translate-y-1 hover:shadow-[0_10px_0_rgba(13,19,48,0.06),0_24px_48px_rgba(13,19,48,0.18)]"
              >
                <div className="mb-3.5 flex h-20 w-20 items-center justify-center rounded-xl bg-brand-cream text-[44px]">
                  {d.emoji}
                </div>
                <div className="mb-2 min-h-[36px] text-[14.5px] font-extrabold leading-tight tracking-tight">
                  {d.name}
                </div>
                <div className="text-[11.5px] leading-snug text-muted-foreground">{d.meta1}</div>
                <div className="text-[11.5px] leading-snug text-muted-foreground">{d.meta2}</div>
                <div className="my-3 flex items-baseline gap-2.5">
                  <span className="text-[13px] text-[hsl(230_15%_55%)] line-through">{d.was}</span>
                  <span className="text-[26px] font-black leading-none tracking-tight text-brand-coral-deep">
                    {d.now}
                  </span>
                </div>
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {d.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className={`rounded-md px-2 py-1 text-[10.5px] font-extrabold tracking-tight ${TAG_TONE[tag.tone]}`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 text-center text-[12px] italic text-white/50">
            ↑ Exemplos reais do tipo de oferta que o grupo recebe. Preços e disponibilidade variam.
          </div>

          <h3 className="mb-6 mt-12 text-balance text-center text-[24px] font-black leading-tight tracking-tight text-white sm:mb-8 sm:mt-14 sm:text-[28px] lg:text-[32px]">
            Quem Já Está no Grupo Conta
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="flex flex-col rounded-2xl border border-brand-navy-3 bg-brand-navy-2 p-5 sm:p-6"
              >
                <div className="mb-3 text-[15px] tracking-[2px] text-brand-yellow sm:text-[16px]">★★★★★</div>
                <p className="mb-4 flex-1 text-pretty text-[14px] leading-relaxed text-white/90 sm:text-[14.5px]">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 border-t border-brand-navy-3 pt-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-[14px] font-black tracking-tight text-brand-navy">
                    {t.initials}
                  </div>
                  <div className="min-w-0 text-[12.5px]">
                    <div className="truncate font-extrabold tracking-tight text-white">{t.name}</div>
                    <div className="mt-0.5 truncate text-white/55">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-cream px-6 py-[88px]">
        <div className="mx-auto max-w-[1100px]">
          
          <SectionTitle>Antes de Você Perguntar: Aqui Estão as Respostas</SectionTitle>
          <div className="mx-auto mt-8 flex max-w-[820px] flex-col gap-3.5">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border-[1.5px] border-border-subtle bg-white px-6 py-5 transition-all open:border-brand-yellow open:shadow-[0_8px_20px_rgba(13,19,48,0.10)]"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[17px] font-extrabold leading-snug tracking-tight text-brand-navy [&::-webkit-details-marker]:hidden">
                  <span>{f.q}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-cream text-[16px] text-brand-navy transition-all group-open:rotate-45 group-open:bg-brand-yellow">
                    +
                  </span>
                </summary>
                <div
                  className="mt-4 border-t border-border-subtle pt-4 text-[15.5px] leading-relaxed text-[hsl(230_22%_22%)]"
                  dangerouslySetInnerHTML={{ __html: f.a }}
                />
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        id="cta-final"
        className="relative overflow-hidden bg-brand-yellow px-6 py-24 text-brand-navy"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-20 h-[400px] w-[400px] opacity-[0.06]"
        />
        <div className="relative z-[2] mx-auto max-w-[900px] text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-navy px-3.5 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.08em] text-brand-yellow">
            É simples assim
          </span>
          <h2 className="mb-5 text-balance text-[clamp(34px,4.5vw,52px)] font-black leading-[1.02] tracking-[-0.04em]">
            Você Pode Continuar Achando Sozinho.
            <br />
            <span className="font-semibold opacity-55">
              Ou Pode Deixar a Gente Fazer Isso por Você.
            </span>
          </h2>
          <p className="mx-auto mb-8 max-w-[640px] text-[19px] font-medium leading-snug">
            Toda semana a gente encontra pelo menos 5 ofertas que fazem diferença no bolso de quem está no grupo.
          </p>

          <div className="mx-auto mb-9 grid max-w-[760px] grid-cols-1 gap-3.5 sm:grid-cols-3">
            {[
              ["R$ 17,90", "Fone que parece de R$ 150"],
              ["R$ 27,90", "Garrafa térmica de qualidade"],
              ["R$ 22,90", "Carregador que você precisava"],
            ].map(([p, l]) => (
              <div key={l} className="rounded-2xl bg-brand-navy px-4 py-5 text-center text-white">
                <div className="mb-2 text-[28px] font-black leading-none tracking-tight text-brand-yellow">
                  {p}
                </div>
                <div className="text-[13px] leading-snug text-white/80">{l}</div>
              </div>
            ))}
          </div>

          <div className="mx-auto mb-7 max-w-[540px] text-[18px] font-bold leading-snug tracking-tight">
            <div className="text-brand-navy">Quem está no grupo, pega.</div>
            <div className="text-brand-navy/55">Quem não está… nem fica sabendo.</div>
          </div>

          <div className="mx-auto mb-7 max-w-[580px] text-[14px] font-medium leading-snug text-brand-navy/80">
            A entrada é gratuita. Receba os alertas verificados direto no Telegram.
            <br />
            <strong className="font-black text-brand-navy">
              O grupo é novo. Você ainda chega antes da fila.
            </strong>
          </div>

          {/* Form final */}
          <div id="lead-form-final" className="mx-auto max-w-xl text-left">
            <LeadFormFlow variant={variant} formId="lead-form-final-card" />
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] font-semibold text-brand-navy/75">
            <span>🛡️ Verificado</span>
            <span>✅ Gratuito para sempre</span>
            <span>🔕 Sai quando quiser</span>
            <span>Sem spam</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-navy px-6 pb-14 pt-12 text-[13px] leading-relaxed text-white/70">
        <div className="mx-auto grid max-w-[1100px] gap-12 md:grid-cols-[1fr_1.5fr]">
          <div>
            <img src="/logo-on-navy.png" alt="CataLogo" className="h-14 w-auto object-contain" />
            <div className="mt-2 max-w-[320px] text-[13px] text-white/60">
              Alertas verificados, direto no Telegram. Sem golpe, sem enrolação.
            </div>
            <div className="mt-3.5 flex gap-4 text-[13px] font-semibold">
              <a href="/legal/privacidade" className="text-brand-yellow hover:underline">
                Privacidade
              </a>
              <a href="/legal/termos" className="text-brand-yellow hover:underline">
                Termos
              </a>
            </div>
          </div>
          <div className="text-[12.5px] text-white/55">
            © Alertas - Cata Logo 🛍 — Somos afiliados da Shopee. Ao comprar pelos nossos links, recebemos uma comissão que <strong className="font-bold text-white/85">não altera o preço pago por você</strong>. Todos os links levam diretamente à plataforma Shopee, sujeitos à Garantia de Entrega e Política de Proteção ao Comprador da Shopee.
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY */}
      <div className="fixed inset-x-0 bottom-0 z-[100] bg-brand-yellow p-3.5 shadow-[0_-8px_24px_rgba(13,19,48,0.18)] sm:hidden">
        <button
          onClick={scrollToForm}
          className="w-full rounded-xl bg-brand-navy py-4 text-[15px] font-black tracking-tight text-brand-yellow"
        >
          🔓 Entrar no Grupo Grátis. É Seguro
        </button>
      </div>
    </div>
  );
}

const CTA_PRIMARY =
  "inline-flex items-center justify-center gap-2.5 rounded-2xl bg-brand-yellow px-7 py-5 text-[17px] font-black tracking-tight text-brand-navy shadow-[0_8px_28px_rgba(255,193,7,0.45)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(255,193,7,0.55)] active:scale-[0.97]";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 max-w-[800px] text-balance text-[clamp(30px,4vw,44px)] font-black leading-[1.18] tracking-[-0.035em] sm:leading-[1.05]">
      {children}
    </h2>
  );
}

const TAG_TONE: Record<string, string> = {
  green: "bg-brand-green-soft text-brand-green-deep",
  coral: "bg-brand-coral-soft text-brand-coral-deep",
  yellow: "bg-brand-yellow-soft text-[#6B4F00]",
};

const DEALS = [
  {
    emoji: "🎧",
    name: "Fone TWS Bluetooth sem fio",
    meta1: "Shopee · Loja Oficial",
    meta2: "⭐ 4.8 (3.100 avaliações)",
    was: "R$ 89,90",
    now: "R$ 17,90",
    tags: [
      { label: "✅ Frete Grátis", tone: "green" },
      { label: "🛡️ Garantia", tone: "green" },
    ],
  },
  {
    emoji: "🍳",
    name: "Kit 8 Potes Organização Cozinha",
    meta1: "Shopee · Frete Grátis",
    meta2: "Garantia de Entrega",
    was: "R$ 64,00",
    now: "R$ 21,90",
    tags: [
      { label: "✅ Frete Grátis", tone: "green" },
      { label: "🔥 Estoque limitado", tone: "coral" },
    ],
  },
  {
    emoji: "⚡",
    name: "Carregador Turbo 65W + Cabo Type-C",
    meta1: "Shopee · Vendedor Verificado",
    meta2: "⭐ 4.9",
    was: "R$ 119,00",
    now: "R$ 33,90",
    tags: [
      { label: "✅ Frete Grátis", tone: "green" },
      { label: "🛡️ Loja Oficial", tone: "yellow" },
    ],
  },
  {
    emoji: "💧",
    name: "Garrafa Térmica Inox 1L Premium",
    meta1: "Shopee · Entrega Garantida",
    meta2: "⭐ 4.7 (1.800 avaliações)",
    was: "R$ 79,00",
    now: "R$ 27,90",
    tags: [
      { label: "✅ Frete Grátis", tone: "green" },
      { label: "🔥 Oferta relâmpago", tone: "coral" },
    ],
  },
];

const TESTIMONIALS = [
  {
    initials: "CR",
    name: "Carla Rosa",
    loc: "Belo Horizonte, MG",
    text:
      "Entrei achando que era mais um grupo de spam. Mas o link foi direto pra Shopee, comprei o fone por 19 reais e chegou em 5 dias. Recomendei pra todo mundo no trabalho.",
  },
  {
    initials: "JS",
    name: "Juan Sersil",
    loc: "Sabará, MG",
    text:
      "Eu sempre tive medo de clicar em link de grupo porque já fui em golpe antes. Mas aqui o link abre direto na Shopee. Comprei e veio certinho. Bem melhor do que eu esperava.",
  },
  {
    initials: "AN",
    name: "Alexsandro Nunes",
    loc: "Vespasiano, MG",
    text:
      "Peguei um carregador por R$34 que meu colega pagou 120 reais numa loja física semana passada. É exatamente o que o grupo promete, achado de verdade, sem enrolação.",
  },
  {
    initials: "JN",
    name: "Jesania Nunes",
    loc: "Belo Horizonte, MG",
    text:
      "Comprei o kit de potes pra minha cozinha por menos de R$22. Minha mãe quis saber onde achei. Mandei o link do grupo pra ela também. Tô adorando.",
  },
  {
    initials: "ER",
    name: "Enedina Rosa",
    loc: "Belo Horizonte, MG",
    text:
      "Eu não sabia nem que o Telegram servia pra isso. Minha neta me ajudou a entrar e já na primeira semana recebi uma oferta de garrafa térmica que eu queria faz tempo. Comprei e veio pelo correio normalmente. Muito bom.",
  },
];

const FAQ = [
  {
    q: '"Mas é golpe? Todo grupo de \'promoção\' é golpe..."',
    a: "Entendemos. A maioria é mesmo. Por isso deixamos tudo transparente desde o início: <strong>todos os links vão direto para a Shopee</strong> — não para lojas desconhecidas, não para sites suspeitos, não para 'loja parceira'. Você vai comprar na mesma plataforma que já usa, com a mesma proteção de sempre. Se tiver dúvida, clique no link e veja: vai aparecer <strong>shopee.com.br</strong> na barra de endereço.",
  },
  {
    q: '"Vou receber spam e meu celular vai explodir de notificação?"',
    a: "O canal do Telegram funciona no <strong>modo silencioso por padrão</strong>. Você abre quando quiser, vê as ofertas no seu tempo, e sai quando quiser — sem que ninguém te mande mensagem particular, sem adicionar número no celular, sem cadastro nenhum. Você controla tudo.",
  },
  {
    q: '"É de graça? Tem pegadinha em algum momento?"',
    a: "<strong>100% gratuito agora, amanhã e sempre.</strong> A gente ganha uma comissão da Shopee quando alguém compra pelo link — mas isso não muda absolutamente nada no preço que você paga. Você paga o mesmo preço (ou menos) que pagaria comprando direto.",
  },
  {
    q: '"E se o produto que eu comprei der problema?"',
    a: "Você tem toda a proteção da Shopee — <strong>Garantia de Entrega, avaliação do vendedor e canal de suporte oficial.</strong> A Shopee é responsável pela sua compra. E justamente por isso usamos só ela: pra você nunca ficar desamparado.",
  },
  {
    q: '"Como vocês garantem que as lojas são confiáveis?"',
    a: "A gente só manda link de vendedor com <strong>histórico de entregas, avaliação acima de 4.7 e mais de 500 avaliações verificadas</strong>. Se um vendedor começa a ter reclamações, cortamos o link imediatamente. O filtro é feito todos os dias, manualmente.",
  },
];
