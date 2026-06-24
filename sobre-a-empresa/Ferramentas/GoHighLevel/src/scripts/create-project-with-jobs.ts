/**
 * Cria 1 Project + 4 Jobs vinculados ao Project (estrutura de Setup Comercial).
 *
 * Uso:
 *   npx tsx src/scripts/create-project-with-jobs.ts            (dry-run — padrão)
 *   npx tsx src/scripts/create-project-with-jobs.ts --execute  (executa de verdade)
 *
 * IMPORTANTE: Confirme os schemaKeys reais rodando list-custom-fields.ts antes.
 * Edite as constantes abaixo conforme os schemaKeys e fieldKeys da sua conta.
 */

import { ghlGet, ghlPost, LOCATION_ID } from '../ghl-client.js';

const IS_DRY_RUN = !process.argv.includes('--execute');

// ──────────────────────────────────────────────────────────────────────────────
// Ajustar conforme os schemaKeys reais da conta (verificar via list-custom-fields)
// ──────────────────────────────────────────────────────────────────────────────
const SCHEMA_PROJECTS = 'custom_objects.projects_tmpl';
const SCHEMA_JOBS = 'custom_objects.jobs_tmpl';

// FieldKeys confirmados via GET /objects/?locationId=...&fetchProperties=true
const FIELD_PROJECT_NAME = 'custom_objects.projects_tmpl.project_name';
const FIELD_JOB_NAME = 'custom_objects.jobs_tmpl.job_name';
// Nota: não existe campo de relacionamento Job→Project no schema atual.
// Para vincular, adicionar um campo TEXT/LOOKUP no Job via interface ou script create-custom-field.
const FIELD_JOB_PROJECT_REF = 'custom_objects.jobs_tmpl.project_ref'; // criar antes de usar --execute
// ──────────────────────────────────────────────────────────────────────────────

const PROJECT_DATA = {
  projectName: 'Setup Comercial — Cliente Teste',
  projectStatus: 'Active',        // SINGLE_OPTIONS — ajustar conforme opções cadastradas
  projectNumber: 'PRJ-001',
};

const JOBS_DATA = [
  { jobName: 'Job 1 — Onboarding Inicial',          jobStatus: 'New', serviceType: '' },
  { jobName: 'Job 2 — Configuração de Ferramentas', jobStatus: 'New', serviceType: '' },
  { jobName: 'Job 3 — Treinamento da Equipe',       jobStatus: 'New', serviceType: '' },
  { jobName: 'Job 4 — Entrega Final e Revisão',     jobStatus: 'New', serviceType: '' },
];

interface ObjectRecord {
  id: string;
  properties: Record<string, unknown>;
}

interface CreateRecordResponse {
  record: ObjectRecord;
}

interface RecordsResponse {
  records: ObjectRecord[];
}

async function findExistingRecord(schemaKey: string, name: string): Promise<ObjectRecord | null> {
  try {
    const data = await ghlGet<RecordsResponse>(`/objects/${schemaKey}/records`, {
      limit: 100,
    });
    const records = data.records ?? [];
    return (
      records.find((r) => {
        const recName = r.properties?.[FIELD_PROJECT_NAME] ?? r.properties?.[FIELD_JOB_NAME];
        return typeof recName === 'string' && recName.toLowerCase() === name.toLowerCase();
      }) ?? null
    );
  } catch (err: unknown) {
    const status = (err as { response?: { status?: number } }).response?.status;
    if (status === 404) return null; // schema não existe ainda
    throw err;
  }
}

async function createRecord(
  schemaKey: string,
  properties: Record<string, unknown>
): Promise<ObjectRecord> {
  const result = await ghlPost<CreateRecordResponse>(`/objects/${schemaKey}/records`, {
    locationId: LOCATION_ID,
    properties,
  });
  return result.record;
}

async function main(): Promise<void> {
  console.log(`\n${'='.repeat(60)}`);
  console.log(IS_DRY_RUN ? '  MODO: DRY-RUN (nenhuma alteração será feita)' : '  MODO: EXECUÇÃO REAL');
  console.log(`${'='.repeat(60)}\n`);
  console.log(`Location: ${LOCATION_ID}`);
  console.log(`Schema Projects: ${SCHEMA_PROJECTS}`);
  console.log(`Schema Jobs: ${SCHEMA_JOBS}\n`);

  // ── STEP 1: Project ──────────────────────────────────────────────────────────
  console.log(`[1/5] Verificando se Project "${PROJECT_DATA.projectName}" já existe...`);
  const existingProject = await findExistingRecord(SCHEMA_PROJECTS, PROJECT_DATA.projectName);

  let projectId: string;

  if (existingProject) {
    console.log(`  [SKIP] Project já existe — ID: ${existingProject.id}`);
    projectId = existingProject.id;
  } else {
    console.log(`  Project não encontrado — será criado.`);
    if (IS_DRY_RUN) {
      console.log(`  [DRY-RUN] POST /objects/${SCHEMA_PROJECTS}/records`);
      console.log('  Properties:', JSON.stringify({
        [FIELD_PROJECT_NAME]: PROJECT_DATA.projectName,
        'custom_objects.projects_tmpl.project_status': PROJECT_DATA.projectStatus,
        'custom_objects.projects_tmpl.project_number': PROJECT_DATA.projectNumber,
      }, null, 2));
      projectId = 'DRY_RUN_PROJECT_ID';
    } else {
      const project = await createRecord(SCHEMA_PROJECTS, {
        [FIELD_PROJECT_NAME]: PROJECT_DATA.projectName,
        'custom_objects.projects_tmpl.project_status': PROJECT_DATA.projectStatus,
        'custom_objects.projects_tmpl.project_number': PROJECT_DATA.projectNumber,
      });
      projectId = project.id;
      console.log(`  [OK] Project criado — ID: ${projectId}`);
    }
  }

  // ── STEP 2-5: Jobs ───────────────────────────────────────────────────────────
  for (let i = 0; i < JOBS_DATA.length; i++) {
    const job = JOBS_DATA[i];
    const stepNum = i + 2;

    console.log(`\n[${stepNum}/5] Verificando se Job "${job.jobName}" já existe...`);
    const existingJob = await findExistingRecord(SCHEMA_JOBS, job.jobName);

    if (existingJob) {
      console.log(`  [SKIP] Job já existe — ID: ${existingJob.id}`);
      continue;
    }

    console.log(`  Job não encontrado — será criado e vinculado ao Project.`);

    const jobProperties: Record<string, unknown> = {
      [FIELD_JOB_NAME]: job.jobName,
      'custom_objects.jobs_tmpl.job_status': job.jobStatus,
      'custom_objects.jobs_tmpl.service_type': job.serviceType,
      [FIELD_JOB_PROJECT_REF]: projectId,
    };

    if (IS_DRY_RUN) {
      console.log(`  [DRY-RUN] POST /objects/${SCHEMA_JOBS}/records`);
      console.log('  Properties:', JSON.stringify(jobProperties, null, 2));
    } else {
      const createdJob = await createRecord(SCHEMA_JOBS, jobProperties);
      console.log(`  [OK] Job criado — ID: ${createdJob.id}`);
    }
  }

  // ── Resumo ───────────────────────────────────────────────────────────────────
  console.log(`\n${'='.repeat(60)}`);
  if (IS_DRY_RUN) {
    console.log('  DRY-RUN concluído. Nenhum dado foi alterado.');
    console.log('  Para executar de verdade: npx tsx src/scripts/create-project-with-jobs.ts --execute');
  } else {
    console.log(`  Concluído! Project ID: ${projectId}`);
    console.log(`  ${JOBS_DATA.length} Jobs processados.`);
  }
  console.log(`${'='.repeat(60)}\n`);
}

main().catch((err) => {
  console.error('\nErro:', err.response?.data ?? err.message);
  process.exit(1);
});
