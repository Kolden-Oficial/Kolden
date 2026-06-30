import { z } from "zod";
import { frameworkNaoDetectado } from "../lib/erros.js";
import { lerWorkspace } from "../lib/ler-workspace.js";
import { workspacePathSchema } from "../schemas/comuns.js";

export const inputSchemaTesting = z
  .object({
    framework: z
      .enum(["vitest", "jest", "pytest", "playwright", "mocha"])
      .describe("Framework de teste a configurar no VS Code."),
    workspace_path: workspacePathSchema,
    incluir_coverage: z
      .boolean()
      .default(true)
      .describe("Se true, inclui task/launch de coverage além dos de run/watch."),
  })
  .strict();

export type InputTesting = z.infer<typeof inputSchemaTesting>;

interface PerfilFramework {
  extensao_recomendada: string;
  motivo_extensao: string;
  comando_install: string;
  deps_check: (deps: Record<string, string>) => boolean;
  settings_patch: Record<string, unknown>;
  tasks: Array<Record<string, unknown>>;
  launch?: Array<Record<string, unknown>>;
}

const PERFIS: Record<string, PerfilFramework> = {
  vitest: {
    extensao_recomendada: "vitest.explorer",
    motivo_extensao: "Vitest Explorer — descobre, roda e debug de testes Vitest no painel Testing.",
    comando_install: "npm install -D vitest @vitest/coverage-v8",
    deps_check: (d) => "vitest" in d,
    settings_patch: {
      "vitest.enable": true,
      "testing.openTesting": "neverOpen",
    },
    tasks: [
      { label: "test", type: "npm", script: "test", group: { kind: "test", isDefault: true } },
      { label: "test:watch", type: "npm", script: "test:watch", group: "test" },
      { label: "test:coverage", type: "npm", script: "test:coverage", group: "test" },
    ],
    launch: [
      {
        type: "node",
        request: "launch",
        name: "Debug Vitest current file",
        runtimeExecutable: "npx",
        runtimeArgs: ["vitest", "run", "${relativeFile}"],
        smartStep: true,
        console: "integratedTerminal",
      },
    ],
  },
  jest: {
    extensao_recomendada: "orta.vscode-jest",
    motivo_extensao: "Jest extension — UI nativa de Testing, inline results e debug por teste.",
    comando_install: "npm install -D jest @types/jest ts-jest",
    deps_check: (d) => "jest" in d,
    settings_patch: {
      "jest.runMode": "on-demand",
      "jest.outputConfig": { revealOn: "run", revealWithFocus: "none" },
    },
    tasks: [
      { label: "test", type: "npm", script: "test", group: { kind: "test", isDefault: true } },
      { label: "test:coverage", type: "npm", script: "test:coverage", group: "test" },
    ],
    launch: [
      {
        type: "node",
        request: "launch",
        name: "Debug Jest current file",
        program: "${workspaceFolder}/node_modules/.bin/jest",
        args: ["${relativeFile}", "--runInBand"],
        console: "integratedTerminal",
        internalConsoleOptions: "neverOpen",
      },
    ],
  },
  pytest: {
    extensao_recomendada: "ms-python.python",
    motivo_extensao: "Python (Microsoft) — integra pytest no painel Testing nativamente.",
    comando_install: "pip install pytest pytest-cov",
    deps_check: () => true,
    settings_patch: {
      "python.testing.pytestEnabled": true,
      "python.testing.unittestEnabled": false,
      "python.testing.pytestArgs": ["tests"],
    },
    tasks: [
      {
        label: "pytest",
        type: "shell",
        command: "pytest -v",
        problemMatcher: [],
        group: { kind: "test", isDefault: true },
      },
      {
        label: "pytest:coverage",
        type: "shell",
        command: "pytest --cov=. --cov-report=term-missing",
        group: "test",
      },
    ],
    launch: [
      {
        type: "debugpy",
        request: "launch",
        name: "Debug pytest current file",
        module: "pytest",
        args: ["${file}", "-v"],
        console: "integratedTerminal",
        justMyCode: false,
      },
    ],
  },
  playwright: {
    extensao_recomendada: "ms-playwright.playwright",
    motivo_extensao: "Playwright Test — record/run/debug de testes E2E direto no editor.",
    comando_install: "npm init playwright@latest",
    deps_check: (d) => "@playwright/test" in d || "playwright" in d,
    settings_patch: {
      "playwright.reuseBrowser": true,
    },
    tasks: [
      {
        label: "e2e",
        type: "npm",
        script: "e2e",
        group: { kind: "test", isDefault: true },
        problemMatcher: [],
      },
      { label: "e2e:headed", type: "shell", command: "npx playwright test --headed", group: "test" },
    ],
  },
  mocha: {
    extensao_recomendada: "hbenl.vscode-mocha-test-adapter",
    motivo_extensao: "Mocha Test Explorer — integra mocha no painel Testing.",
    comando_install: "npm install -D mocha chai @types/mocha @types/chai",
    deps_check: (d) => "mocha" in d,
    settings_patch: {
      "mochaExplorer.files": "test/**/*.{js,ts}",
    },
    tasks: [
      { label: "test", type: "npm", script: "test", group: { kind: "test", isDefault: true } },
    ],
  },
};

export async function setupTesting(
  input: InputTesting,
): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const perfil = PERFIS[input.framework];
  if (!perfil) {
    // Não deveria acontecer dado o enum, mas defensivo
    throw frameworkNaoDetectado(input.framework, "framework não reconhecido");
  }

  const estado = await lerWorkspace(input.workspace_path);
  const deps = {
    ...(estado.package_json?.dependencies ?? {}),
    ...(estado.package_json?.devDependencies ?? {}),
  };

  // Heurística simples: para frameworks JS, verifica package.json; para pytest, aceita pyproject/requirements.
  const usa_python = input.framework === "pytest";
  const dep_ok = usa_python
    ? estado.pyproject_toml_presente || estado.requirements_txt_presente
    : perfil.deps_check(deps);

  if (!dep_ok) {
    throw frameworkNaoDetectado(input.framework, perfil.comando_install);
  }

  const tasks = perfil.tasks.filter(
    (t) =>
      input.incluir_coverage ||
      (typeof t["label"] === "string" && !(t["label"] as string).includes("coverage")),
  );

  const payload = {
    framework: input.framework,
    workspace_path: input.workspace_path,
    extensao_recomendada: {
      id: perfil.extensao_recomendada,
      motivo: perfil.motivo_extensao,
    },
    patches: {
      ".vscode/extensions.json": {
        recommendations: [perfil.extensao_recomendada],
      },
      ".vscode/settings.json": perfil.settings_patch,
      ".vscode/tasks.json": {
        version: "2.0.0",
        tasks,
      },
      ".vscode/launch.json": perfil.launch
        ? { version: "0.2.0", configurations: perfil.launch }
        : null,
    },
    aviso:
      "Esta tool retorna patches — você precisa MESCLAR com os arquivos existentes em .vscode/ (não substituir).",
    proximo_passo: input.incluir_coverage
      ? "Após colar, rode a task 'test:coverage' (ou 'pytest:coverage') para validar."
      : "Após colar, rode a task 'test' para validar a descoberta.",
  };
  return { content: [{ type: "text", text: JSON.stringify(payload, null, 2) }] };
}
