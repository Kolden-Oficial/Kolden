import { notFound } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-heading text-xl font-semibold text-omiron-gold border-b border-omiron-border pb-2">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function DesignPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main className="min-h-screen bg-omiron-navy px-8 py-12">
      <div className="mx-auto max-w-4xl space-y-12">

        {/* Header */}
        <div className="space-y-2">
          <h1 className="font-heading text-4xl font-bold text-omiron-ivory">
            Omiron Design System
          </h1>
          <p className="text-omiron-muted">
            Paleta navy/vinho · Dourado âmbar · Tipografia Playfair + Inter
          </p>
        </div>

        {/* Paleta de cores */}
        <Section title="Paleta de Cores">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { name: 'Navy', bg: 'bg-omiron-navy', hex: '#1a1040', text: 'text-omiron-ivory', border: 'border border-omiron-border' },
              { name: 'Wine', bg: 'bg-omiron-wine', hex: '#2d0f2d', text: 'text-omiron-ivory', border: '' },
              { name: 'Gold', bg: 'bg-omiron-gold', hex: '#c9922a', text: 'text-omiron-navy', border: '' },
              { name: 'Ivory', bg: 'bg-omiron-ivory', hex: '#f5f0e8', text: 'text-omiron-navy', border: '' },
              { name: 'Muted', bg: 'bg-omiron-muted', hex: '#8a7e9a', text: 'text-omiron-navy', border: '' },
              { name: 'Surface', bg: 'bg-omiron-surface', hex: '#231545', text: 'text-omiron-ivory', border: 'border border-omiron-border' },
              { name: 'Border', bg: 'bg-omiron-border', hex: '#3d2060', text: 'text-omiron-ivory', border: '' },
            ].map((color) => (
              <div key={color.name} className={`rounded-lg p-4 ${color.bg} ${color.border}`}>
                <p className={`text-sm font-semibold ${color.text}`}>{color.name}</p>
                <p className={`text-xs font-mono ${color.text} opacity-70`}>{color.hex}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Tipografia */}
        <Section title="Tipografia">
          <div className="space-y-4 rounded-lg bg-omiron-surface p-6">
            <div>
              <p className="text-xs text-omiron-muted mb-1">Playfair Display — Headings</p>
              <h1 className="font-heading text-4xl font-bold text-omiron-ivory">Monitoramento Terapêutico</h1>
              <h2 className="font-heading text-2xl font-semibold text-omiron-ivory mt-1">
                Cuidado que acompanha você
              </h2>
              <h3 className="font-heading text-xl italic text-omiron-gold mt-1">
                Sua saúde mental em foco
              </h3>
            </div>
            <Separator className="bg-omiron-border" />
            <div>
              <p className="text-xs text-omiron-muted mb-1">Inter — Body</p>
              <p className="text-base text-omiron-ivory">
                Bem-vindo ao Omiron, seu sistema de monitoramento terapêutico. Registre seu dia, acompanhe seu progresso e mantenha sua planta viva.
              </p>
              <p className="text-sm text-omiron-muted mt-2">
                Texto secundário: informações complementares, rótulos de campo e metadados da interface.
              </p>
            </div>
          </div>
        </Section>

        {/* Botões */}
        <Section title="Botões">
          <div className="rounded-lg bg-omiron-surface p-6 space-y-4">
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="default">Primary (Gold)</Button>
              <Button variant="secondary">Secondary (Wine)</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            <Separator className="bg-omiron-border" />
            <div className="flex flex-wrap gap-3 items-center">
              <Button size="lg">Large</Button>
              <Button size="default">Default</Button>
              <Button size="sm">Small</Button>
              <Button size="xs">Extra Small</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </Section>

        {/* Cards */}
        <Section title="Cards">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Check-in do Dia</CardTitle>
                <CardDescription>Como você está hoje?</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Registre seu humor, alimentação e atividade física para manter sua planta saudável.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="" alt="Paciente" />
                    <AvatarFallback className="bg-omiron-border text-omiron-gold font-heading font-semibold">
                      JP
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="font-heading text-base">João Paciente</CardTitle>
                    <CardDescription>Transtorno Bipolar · Dr. Ariosto</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="default">Ativo</Badge>
                  <Badge variant="secondary">7 dias streak</Badge>
                  <Badge variant="outline">Medicação: OK</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Badges */}
        <Section title="Badges">
          <div className="flex flex-wrap gap-3 rounded-lg bg-omiron-surface p-6">
            <Badge variant="default">Default (Gold)</Badge>
            <Badge variant="secondary">Secondary (Wine)</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </Section>

        {/* Formulário */}
        <Section title="Inputs & Formulário">
          <div className="rounded-lg bg-omiron-surface p-6 space-y-4 max-w-md">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-omiron-ivory">Nome completo</label>
              <Input placeholder="João da Silva" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-omiron-ivory">Email</label>
              <Input type="email" placeholder="joao@exemplo.com" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-omiron-ivory">Observações clínicas</label>
              <Textarea placeholder="Descreva o estado do paciente..." rows={3} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-omiron-muted text-xs">Campo desabilitado</label>
              <Input disabled value="Campo somente leitura" />
            </div>
            <Button className="w-full">Salvar</Button>
          </div>
        </Section>

        {/* Avatars */}
        <Section title="Avatares">
          <div className="flex gap-4 items-end rounded-lg bg-omiron-surface p-6">
            <div className="flex flex-col items-center gap-2">
              <Avatar className="size-16">
                <AvatarFallback className="bg-omiron-gold text-omiron-navy font-heading font-bold text-xl">A</AvatarFallback>
              </Avatar>
              <p className="text-xs text-omiron-muted">Dr. Ariosto</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar className="size-12">
                <AvatarFallback className="bg-omiron-wine text-omiron-ivory font-heading font-semibold">JP</AvatarFallback>
              </Avatar>
              <p className="text-xs text-omiron-muted">Paciente</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar className="size-8">
                <AvatarFallback className="bg-omiron-border text-omiron-muted text-xs font-semibold">S</AvatarFallback>
              </Avatar>
              <p className="text-xs text-omiron-muted">Secretária</p>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <Separator className="bg-omiron-border" />
        <p className="text-center text-xs text-omiron-muted">
          Omiron Design System · Apenas em desenvolvimento · Story 1.7
        </p>

      </div>
    </main>
  )
}
