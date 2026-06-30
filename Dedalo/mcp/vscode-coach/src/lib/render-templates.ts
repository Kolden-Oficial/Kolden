import type { ExtensoesPorStack, ExtensaoCurada } from "./catalogo.js";

export interface KitDeSetup {
  extensions_json: { recommendations: string[] };
  settings_json: Record<string, unknown>;
  launch_json: { version: string; configurations: unknown[] };
  tasks_json: { version: string; tasks: unknown[] };
  notas: string[];
}

function mesclarConfiguracoes(extensoes: ExtensaoCurada[]): Record<string, unknown> {
  const acc: Record<string, unknown> = {};
  for (const ext of extensoes) {
    if (ext.configuracao_minima) {
      Object.assign(acc, ext.configuracao_minima);
    }
  }
  return acc;
}

export function renderKitSetup(
  stack: string,
  bloco: ExtensoesPorStack,
  essenciais: ExtensoesPorStack,
  intencoes: string[],
): KitDeSetup {
  const ids_essenciais = essenciais.essenciais.map((e) => e.id);
  const ids_stack = bloco.essenciais.map((e) => e.id);
  const ids_recomendadas =
    intencoes.length === 0
      ? bloco.recomendadas.map((e) => e.id)
      : bloco.recomendadas
          .filter((e) => !e.condicao || intencoes.some((i) => e.condicao!.includes(i)))
          .map((e) => e.id);

  const recommendations = [...new Set([...ids_essenciais, ...ids_stack, ...ids_recomendadas])];

  const settings_essenciais = mesclarConfiguracoes(essenciais.essenciais);
  const settings_stack = mesclarConfiguracoes([...bloco.essenciais, ...bloco.recomendadas]);
  const settings_base = (bloco.settings_base ?? {}) as Record<string, unknown>;

  const settings_json: Record<string, unknown> = {
    ...settings_essenciais,
    ...settings_stack,
    ...settings_base,
  };

  const launch_json = {
    version: "0.2.0",
    configurations: (bloco.launch_base?.configurations as unknown[] | undefined) ?? [],
  };

  const tasks_json = {
    version: "2.0.0",
    tasks: (bloco.tasks_base?.tasks as unknown[] | undefined) ?? [],
  };

  const notas: string[] = [
    `Stack: ${stack}`,
    `${recommendations.length} extensão(ões) recomendada(s)`,
    bloco.evitar && bloco.evitar.length > 0
      ? `Evitar: ${bloco.evitar.map((x) => x.id).join(", ")}`
      : "Sem extensões a evitar registradas",
  ];

  return { extensions_json: { recommendations }, settings_json, launch_json, tasks_json, notas };
}
