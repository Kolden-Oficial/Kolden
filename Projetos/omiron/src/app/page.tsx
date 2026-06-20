import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const areas = [
  { icon: '💊', name: 'Medicação' },
  { icon: '🥗', name: 'Alimentação' },
  { icon: '🏃', name: 'Movimento' },
  { icon: '🤝', name: 'Conexões' },
  { icon: '🧘', name: 'Estresse' },
  { icon: '✅', name: 'Produtividade' },
  { icon: '🚫', name: 'Tóxicos' },
]

export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-omiron-navy">

      {/* Nav */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-omiron-border">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-omiron-gold flex items-center justify-center">
            <span className="text-omiron-navy text-sm font-heading font-bold">O</span>
          </div>
          <span className="font-heading font-semibold text-omiron-ivory text-lg tracking-wide">
            Omiron
          </span>
        </div>
        <Badge variant="outline" className="text-xs text-omiron-muted border-omiron-border">
          Em desenvolvimento
        </Badge>
      </header>

      {/* Hero */}
      <main className="flex flex-col items-center justify-center flex-1 px-6 py-20 text-center gap-8">

        {/* Planta placeholder */}
        <div className="relative flex items-center justify-center">
          <div className="size-32 rounded-full bg-omiron-surface border-2 border-omiron-border flex items-center justify-center shadow-lg">
            <span className="text-6xl">🌱</span>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-omiron-gold text-omiron-navy text-xs font-semibold px-2 py-0.5 rounded-full">
            Dia 1
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-3 max-w-md">
          <h1 className="font-heading text-4xl font-bold text-omiron-ivory leading-tight">
            Seu cuidado,<br />
            <span className="text-omiron-gold italic">dia a dia.</span>
          </h1>
          <p className="text-omiron-muted text-base leading-relaxed">
            Monitore seu bem-estar em 7 áreas essenciais e acompanhe sua evolução junto ao Dr. Ariosto.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
          <Button className="flex-1 h-11 text-sm font-semibold">
            Entrar
          </Button>
          <Button variant="outline" className="flex-1 h-11 text-sm">
            Saiba mais
          </Button>
        </div>

        <Separator className="bg-omiron-border max-w-xs w-full" />

        {/* 7 Áreas */}
        <div className="space-y-3 max-w-sm w-full">
          <p className="text-xs text-omiron-muted uppercase tracking-widest">
            7 áreas de monitoramento
          </p>
          <div className="grid grid-cols-4 gap-2">
            {areas.map((area) => (
              <div
                key={area.name}
                className="flex flex-col items-center gap-1.5 bg-omiron-surface rounded-xl p-3 border border-omiron-border"
              >
                <span className="text-2xl">{area.icon}</span>
                <span className="text-omiron-muted text-[10px] leading-tight text-center">
                  {area.name}
                </span>
              </div>
            ))}
            {/* Card vazio para fechar o grid 4x2 */}
            <div className="flex flex-col items-center gap-1.5 bg-omiron-surface/40 rounded-xl p-3 border border-omiron-border/30">
              <span className="text-2xl opacity-20">✦</span>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="flex items-center justify-center px-6 py-4 border-t border-omiron-border">
        <p className="text-omiron-muted text-xs">
          Clínica Dr. Ariosto Filho · Omiron v0.1 · Story 1.7 preview
        </p>
      </footer>

    </div>
  )
}
