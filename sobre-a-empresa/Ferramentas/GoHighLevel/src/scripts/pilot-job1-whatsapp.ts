/**
 * Piloto: cria Project "TESTE - Setup Sócio João" + Job "Job 1 - WhatsApp Business"
 * com campo Checklist preenchido em Markdown.
 *
 * Uso: npx tsx src/scripts/pilot-job1-whatsapp.ts --execute
 */

import { ghlGet, ghlPost, ghlPut, LOCATION_ID } from '../ghl-client.js';

const IS_DRY_RUN = !process.argv.includes('--execute');

const SCHEMA_PROJECTS = 'custom_objects.projects_tmpl';
const SCHEMA_JOBS     = 'custom_objects.jobs_tmpl';

const CHECKLIST_MD = `- [ ] Confirmar chip dedicado (não compartilhar com WhatsApp pessoal)
- [ ] Instalar WhatsApp Business no aparelho
- [ ] Verificar número via SMS/ligação
- [ ] Adicionar foto de perfil (puxar do Manual da Marca)
- [ ] Configurar nome comercial
- [ ] Adicionar descrição (puxar do Manual)
- [ ] Adicionar endereço comercial
- [ ] Definir horário de atendimento
- [ ] Selecionar categoria
- [ ] Adicionar e-mail de contato institucional
- [ ] Adicionar site
- [ ] Cadastrar catálogo de produtos/serviços (puxar do Manual)
- [ ] Adicionar Pix nos métodos de pagamento`;

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface CustomField {
  id: string;
  name: string;
  fieldKey: string;
  dataType: string;
  objectKey?: string;
}
interface CustomFieldsResponse { customFields: CustomField[] }
interface CreateFieldResponse  { customField: CustomField }

interface SchemaField { name: string; fieldKey: string; dataType: string }
interface ObjectSchemaResponse { fields?: SchemaField[]; object?: { fields?: SchemaField[] } }

interface ObjectRecord {
  id: string;
  properties: Record<string, unknown>;
  owner?: string[];
  followers?: string[];
  associations?: Record<string, unknown>;
  dateAdded?: string;
  dateUpdated?: string;
}
interface CreateRecordResponse { record: ObjectRecord }
interface GetRecordResponse    { record: ObjectRecord }

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function getChecklistFieldKey(): Promise<string | null> {
  // A API REST v2 não suporta criar campos em custom objects programaticamente.
  // O campo "Checklist" deve ser criado manualmente em GHL:
  //   Settings → Objects → Jobs → Add Field → LARGE_TEXT → "Checklist"
  // Após criar, este script detecta automaticamente o fieldKey.

  const data = await ghlGet<ObjectSchemaResponse>(`/objects/${SCHEMA_JOBS}`, {
    locationId: LOCATION_ID,
    fetchProperties: true,
  });
  const fields: SchemaField[] = data.fields ?? [];
  const f = fields.find((x) => x.name.toLowerCase() === 'checklist');

  if (f) {
    console.log(`  Campo Checklist encontrado → fieldKey: ${f.fieldKey}`);
    return f.fieldKey;
  }

  console.log('  ⚠️  Campo "Checklist" ainda não existe no schema de Jobs.');
  console.log('  → Crie manualmente: GHL → Settings → Objects → Jobs → Add Field');
  console.log('     Name: Checklist  |  Type: Long text  |  Salve.');
  console.log('  O Job será criado SEM o checklist por agora.');
  return null;
}

// GET list de records não está disponível sem search endpoint.
// Idempotência é tratada via erro 400 duplicate_record — extraímos o ID existente.
interface DuplicateError {
  response?: {
    status?: number;
    data?: {
      errors?: Array<{ errorCode?: string; conflictingRecordId?: string }>;
    };
  };
}

async function createRecordIdempotent(
  schemaKey: string,
  properties: Record<string, unknown>
): Promise<{ record: ObjectRecord; wasExisting: boolean }> {
  try {
    const res = await ghlPost<CreateRecordResponse>(`/objects/${schemaKey}/records`, {
      locationId: LOCATION_ID,
      properties,
    });
    return { record: res.record, wasExisting: false };
  } catch (err: unknown) {
    const e = err as DuplicateError;
    if (e.response?.status === 400) {
      const dupe = e.response.data?.errors?.find((x) => x.errorCode === 'duplicate_record');
      if (dupe?.conflictingRecordId) {
        console.log(`  [SKIP] Registro já existe — ID: ${dupe.conflictingRecordId}`);
        const existing = await ghlGet<GetRecordResponse>(
          `/objects/${schemaKey}/records/${dupe.conflictingRecordId}`,
          { locationId: LOCATION_ID }
        );
        return { record: existing.record, wasExisting: true };
      }
    }
    throw err;
  }
}

async function tryAssociateJobToProject(jobId: string, projectId: string): Promise<void> {
  // Tentativa 1: endpoint /associations
  const assocEndpoints = [
    `/objects/${SCHEMA_JOBS}/records/${jobId}/associations`,
    `/associations`,
  ];

  for (const ep of assocEndpoints) {
    try {
      await ghlPost(ep, {
        objectKey: SCHEMA_PROJECTS,
        recordId: projectId,
        locationId: LOCATION_ID,
      });
      console.log(`  Vinculado via ${ep}`);
      return;
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } }).response?.status;
      if (status !== 404 && status !== 422) throw err;
    }
  }

  // Tentativa 2: PUT nas properties do Job com campo de referência
  try {
    await ghlPut(
      `/objects/${SCHEMA_JOBS}/records/${jobId}`,
      { properties: { 'custom_objects.jobs_tmpl.project': projectId } },
      { locationId: LOCATION_ID }
    );
    console.log('  Vinculado via campo project nas properties do Job.');
    return;
  } catch { /* silencioso */ }

  console.log('');
  console.log('  ⚠️  VINCULAÇÃO MANUAL NECESSÁRIA ⚠️');
  console.log('  Nenhum endpoint de associação funcionou neste schema.');
  console.log(`  → Abra o Job ${jobId} no GHL e vincule ao Project ${projectId} manualmente.`);
  console.log('');
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log(`\n${'═'.repeat(62)}`);
  console.log(IS_DRY_RUN
    ? '  PILOTO — DRY-RUN (nenhum dado será criado)'
    : '  PILOTO — EXECUÇÃO REAL 🚀');
  console.log(`${'═'.repeat(62)}\n`);

  // ── 1. Verificar campo Checklist ──────────────────────────────────────────
  console.log('[1/4] Verificando campo Checklist no schema de Jobs...');
  const checklistFieldKey = IS_DRY_RUN
    ? 'custom_objects.jobs_tmpl.checklist'
    : await getChecklistFieldKey();

  // ── 2. Criar Project ───────────────────────────────────────────────────────
  const projectName = 'TESTE - Setup Sócio João';
  console.log(`\n[2/4] Criando Project "${projectName}" (idempotente)...`);

  let projectId: string;
  if (IS_DRY_RUN) {
    console.log(`  [DRY-RUN] POST /objects/${SCHEMA_PROJECTS}/records`);
    projectId = 'DRY_RUN_PROJECT_ID';
  } else {
    const { record, wasExisting } = await createRecordIdempotent(SCHEMA_PROJECTS, {
      project_name: projectName,
      project_number: 'TESTE-001',
    });
    projectId = record.id;
    if (!wasExisting) console.log(`  [OK] Project criado — ID: ${projectId}`);
  }

  // ── 3. Criar Job ───────────────────────────────────────────────────────────
  const jobName = 'Job 1 - WhatsApp Business';
  console.log(`\n[3/4] Criando Job "${jobName}" (idempotente)...`);

  let jobId: string;
  if (IS_DRY_RUN) {
    console.log(`  [DRY-RUN] POST /objects/${SCHEMA_JOBS}/records`);
    console.log(`  Properties inclui: ${checklistFieldKey} (LARGE_TEXT, ${CHECKLIST_MD.split('\n').length} linhas)`);
    jobId = 'DRY_RUN_JOB_ID';
  } else {
    const jobProps: Record<string, unknown> = {
      job_name: jobName,
      job_status: 'scheduled',
      job_number: 'JOB-001',
    };
    if (checklistFieldKey) {
      const shortKey = checklistFieldKey.split('.').pop() ?? checklistFieldKey;
      jobProps[shortKey] = CHECKLIST_MD;
    }
    const { record, wasExisting } = await createRecordIdempotent(SCHEMA_JOBS, jobProps);
    jobId = record.id;
    if (!wasExisting) console.log(`  [OK] Job criado — ID: ${jobId}`);
  }

  // ── 4. Vincular Job → Project ──────────────────────────────────────────────
  console.log('\n[4/4] Tentando vincular Job → Project...');
  if (IS_DRY_RUN) {
    console.log('  [DRY-RUN] Tentaria endpoints de association e property ref.');
  } else {
    await tryAssociateJobToProject(jobId, projectId);
  }

  // ── 5. Preencher Checklist via PUT (UTF-8 correto) ───────────────────────
  if (!IS_DRY_RUN && jobId !== 'DRY_RUN_JOB_ID' && checklistFieldKey) {
    const shortKey = checklistFieldKey.split('.').pop() ?? checklistFieldKey;
    console.log(`\n[5/5] PUT — preenchendo ${checklistFieldKey} no Job ${jobId}...`);
    await ghlPut(
      `/objects/${SCHEMA_JOBS}/records/${jobId}`,
      { properties: { [shortKey]: CHECKLIST_MD } },
      { locationId: LOCATION_ID }
    );
    console.log('  [OK] Checklist gravado com encoding UTF-8 correto.\n');
  } else if (!IS_DRY_RUN && !checklistFieldKey) {
    console.log('\n[5/5] ⚠️  Checklist ignorado — campo não existe no schema ainda.');
  }

  // ── 6. GET final do Job ────────────────────────────────────────────────────
  if (!IS_DRY_RUN && jobId !== 'DRY_RUN_JOB_ID') {
    console.log('\n[GET] Buscando Job para validação final...\n');
    const getRes = await ghlGet<GetRecordResponse>(
      `/objects/${SCHEMA_JOBS}/records/${jobId}`,
      { locationId: LOCATION_ID }
    );
    console.log('JSON completo do Job:');
    console.log(JSON.stringify(getRes.record, null, 2));

    const checklist = getRes.record.properties?.['checklist'] as string | undefined;
    if (checklist) {
      console.log('\n--- Checklist armazenado ---');
      console.log(checklist);
      console.log('----------------------------');
    }
  }

  console.log(`\n${'═'.repeat(62)}`);
  console.log(IS_DRY_RUN
    ? '  DRY-RUN concluído. Rode com --execute para criar de verdade.'
    : `  Piloto concluído!\n  Project ID: ${projectId}\n  Job ID:     ${jobId}`);
  console.log(`${'═'.repeat(62)}\n`);
}

main().catch((err) => {
  console.error('\nErro fatal:', JSON.stringify(err.response?.data ?? err.message, null, 2));
  process.exit(1);
});
