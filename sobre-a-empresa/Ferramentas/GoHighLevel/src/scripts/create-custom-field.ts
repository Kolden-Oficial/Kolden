/**
 * Cria um campo personalizado em um custom object do GHL.
 *
 * Uso:
 *   npx tsx src/scripts/create-custom-field.ts            (dry-run — padrão)
 *   npx tsx src/scripts/create-custom-field.ts --execute  (executa de verdade)
 *
 * Edite a constante FIELD_TO_CREATE abaixo para configurar o campo desejado.
 */

import { ghlGet, ghlPost, LOCATION_ID } from '../ghl-client.js';

const IS_DRY_RUN = !process.argv.includes('--execute');

// ──────────────────────────────────────────────────────────────────────────────
// Configurar aqui o campo a ser criado
// ──────────────────────────────────────────────────────────────────────────────
const FIELD_TO_CREATE = {
  name: 'Descrição do Projeto',
  dataType: 'LARGE_TEXT' as const,
  objectKey: 'custom_objects.projects_tmpl',
  placeholder: 'Descreva o objetivo e escopo do projeto...',
  position: 0,
};
// ──────────────────────────────────────────────────────────────────────────────

interface CustomField {
  id: string;
  name: string;
  fieldKey: string;
  dataType: string;
  objectKey?: string;
}

interface CustomFieldsResponse {
  customFields: CustomField[];
}

interface CreateCustomFieldResponse {
  customField: CustomField;
}

async function fieldExists(name: string): Promise<CustomField | null> {
  const data = await ghlGet<CustomFieldsResponse>(`/locations/${LOCATION_ID}/customFields`, {});
  const fields = data.customFields ?? [];
  return fields.find((f) => f.name.toLowerCase() === name.toLowerCase()) ?? null;
}

async function main(): Promise<void> {
  console.log(`\n${'='.repeat(60)}`);
  console.log(IS_DRY_RUN ? '  MODO: DRY-RUN (nenhuma alteração será feita)' : '  MODO: EXECUÇÃO REAL');
  console.log(`${'='.repeat(60)}\n`);

  console.log('Campo a criar:');
  console.log(JSON.stringify(FIELD_TO_CREATE, null, 2));
  console.log('');

  // Verificar idempotência
  console.log(`Verificando se campo "${FIELD_TO_CREATE.name}" já existe em "${FIELD_TO_CREATE.objectKey}"...`);
  const existing = await fieldExists(FIELD_TO_CREATE.name);

  if (existing) {
    console.log(`\n[SKIP] Campo já existe — nenhuma ação necessária.`);
    console.log(`  ID:       ${existing.id}`);
    console.log(`  FieldKey: ${existing.fieldKey}`);
    return;
  }

  console.log('Campo não encontrado — será criado.\n');

  if (IS_DRY_RUN) {
    console.log('[DRY-RUN] Chamada que seria feita:');
    console.log(`  POST /locations/${LOCATION_ID}/customFields`);
    console.log('  Body:', JSON.stringify(FIELD_TO_CREATE, null, 2));
    console.log('\nPasse --execute para criar de verdade.\n');
    return;
  }

  console.log('Criando campo...');
  const result = await ghlPost<CreateCustomFieldResponse>(
    `/locations/${LOCATION_ID}/customFields`,
    { ...FIELD_TO_CREATE, locationId: LOCATION_ID }
  );

  console.log('\n[OK] Campo criado com sucesso:');
  console.log(`  ID:       ${result.customField.id}`);
  console.log(`  Nome:     ${result.customField.name}`);
  console.log(`  FieldKey: ${result.customField.fieldKey}`);
  console.log(`  DataType: ${result.customField.dataType}`);
}

main().catch((err) => {
  console.error('\nErro:', err.response?.data ?? err.message);
  process.exit(1);
});
