import { useState, useEffect } from "react";
import { Plus, Trash2, Loader2, Tags, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Info } from "lucide-react";

interface TaxonomyItem {
  id: string;
  type: string;
  value: string;
}

const SECTIONS = [
  { type: "source", label: "Sources", description: "Fontes de tráfego (ex: Facebook, TikTok, Google)" },
  { type: "medium", label: "Mediums", description: "Meios de veiculação (ex: cpc, social, email)" },
  { type: "ad_type", label: "Tipos de Anúncio", description: "Formatos de criativo (ex: vídeo, carrossel, imagem)" },
] as const;

const DEFAULTS: Record<string, string[]> = {
  source: ["Meta Ads", "Google Ads", "TikTok Ads", "Kwai Ads", "Organico"],
  medium: ["cpc", "cpm", "social", "email", "telegram"],
  ad_type: ["video", "imagem", "carrossel", "reels", "stories"],
};

export default function TaxonomyManager() {
  const [items, setItems] = useState<TaxonomyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDefaults, setLoadingDefaults] = useState(false);
  const [newValues, setNewValues] = useState<Record<string, string>>({ source: "", medium: "", ad_type: "" });
  const [adding, setAdding] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("taxonomies")
      .select("id, type, value")
      .order("value");
    if (!error && data) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleAdd = async (type: string) => {
    const val = newValues[type]?.trim();
    if (!val) { toast.error("Digite um valor."); return; }

    setAdding(type);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("taxonomies").insert({
      type,
      value: val,
      user_id: user?.id,
    });

    if (error) {
      if (error.code === "23505") toast.error("Esse valor já existe.");
      else toast.error("Erro: " + error.message);
    } else {
      toast.success("Adicionado!");
      setNewValues(prev => ({ ...prev, [type]: "" }));
      await fetchItems();
    }
    setAdding(null);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("taxonomies").delete().eq("id", id);
    if (error) toast.error("Erro ao remover.");
    else {
      setItems(prev => prev.filter(i => i.id !== id));
      toast.success("Removido!");
    }
  };

  const handleLoadDefaults = async () => {
    setLoadingDefaults(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { toast.error("Faça login primeiro."); setLoadingDefaults(false); return; }

    const existingValues = new Set(items.map(i => `${i.type}:${i.value}`));
    const toInsert: { type: string; value: string; user_id: string }[] = [];

    for (const [type, values] of Object.entries(DEFAULTS)) {
      for (const value of values) {
        if (!existingValues.has(`${type}:${value}`)) {
          toInsert.push({ type, value, user_id: user.id });
        }
      }
    }

    if (toInsert.length === 0) {
      toast.info("Todos os padrões já estão cadastrados.");
      setLoadingDefaults(false);
      return;
    }

    const { error } = await supabase.from("taxonomies").insert(toInsert);
    if (error) toast.error("Erro ao carregar padrões: " + error.message);
    else {
      toast.success(`${toInsert.length} padrões adicionados!`);
      await fetchItems();
    }
    setLoadingDefaults(false);
  };

  const getByType = (type: string) => items.filter(i => i.type === type);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
          <Tags className="h-6 w-6" /> Gerenciador de Taxonomia
        </h1>
        <p className="text-sm text-muted-foreground">Padronize UTMs e nomenclaturas para evitar erros.</p>
      </div>

      <Alert className="border-primary/30 bg-primary/5">
        <Info className="h-4 w-4 text-primary" />
        <AlertDescription className="text-sm">
          <strong>Passo 1:</strong> Comece por aqui. Cadastre as fontes de tráfego (ex: Meta Ads), meios (ex: cpc) e formatos que você usa. Isso padronizará todo o seu rastreamento.
        </AlertDescription>
      </Alert>

      <div className="flex justify-end">
        <Button variant="outline" onClick={handleLoadDefaults} disabled={loadingDefaults}>
          {loadingDefaults ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Download className="h-4 w-4 mr-2" />}
          Carregar Padrões do Mercado
        </Button>
      </div>

      <Tabs defaultValue="source">
        <TabsList>
          {SECTIONS.map(s => (
            <TabsTrigger key={s.type} value={s.type}>{s.label}</TabsTrigger>
          ))}
        </TabsList>

        {SECTIONS.map(section => (
          <TabsContent key={section.type} value={section.type}>
            <div className="bg-card border border-border rounded-lg p-6 space-y-4 animate-fade-in">
              <div>
                <h3 className="font-medium">{section.label}</h3>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder={`Novo ${section.label.toLowerCase().slice(0, -1)}...`}
                  value={newValues[section.type]}
                  onChange={e => setNewValues(prev => ({ ...prev, [section.type]: e.target.value }))}
                  onKeyDown={e => e.key === "Enter" && handleAdd(section.type)}
                />
                <Button onClick={() => handleAdd(section.type)} disabled={adding === section.type} size="sm">
                  {adding === section.type ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                </Button>
              </div>

              {loading ? (
                <div className="flex justify-center py-6">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : getByType(section.type).length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">Nenhum item cadastrado.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {getByType(section.type).map(item => (
                    <Badge key={item.id} variant="secondary" className="flex items-center gap-1.5 pl-3 pr-1.5 py-1.5 text-sm">
                      {item.value}
                      <button onClick={() => handleDelete(item.id)} className="ml-1 hover:text-destructive transition-colors">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
