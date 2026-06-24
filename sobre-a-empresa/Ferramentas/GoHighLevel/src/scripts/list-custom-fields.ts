import { ghlGet, LOCATION_ID } from '../ghl-client.js';

interface CustomField {
  id: string;
  name: string;
  fieldKey: string;
  dataType: string;
  objectKey?: string;
  position?: number;
  locationId?: string;
}

interface CustomFieldsResponse {
  customFields: CustomField[];
}

interface ObjectSchemaField {
  id: string;
  key?: string;
  fieldKey?: string;
  name: string;
  dataType: string;
  position?: number;
}

interface ObjectSchema {
  id: string;
  key: string;
  standard: boolean;
  labels: { singular: string; plural: string };
  locationId: string;
  fields?: ObjectSchemaField[];
}

interface ObjectSchemaResponse {
  object: ObjectSchema;
  fields?: ObjectSchemaField[];
}

const KNOWN_SCHEMA_KEYS = [
  'custom_objects.projects_tmpl',
  'custom_objects.jobs_tmpl',
  'contact',
  'opportunity',
  'business',
];


async function probeObjectSchemas(): Promise<void> {
  console.log('\n=== Schemas de Objetos (sondagem direta) ===\n');
  console.log('Testando chaves conhecidas...\n');

  for (const key of KNOWN_SCHEMA_KEYS) {
    try {
      const data = await ghlGet<ObjectSchemaResponse>(`/objects/${key}`, {
        locationId: LOCATION_ID,
        fetchProperties: true,
      });
      const obj = data.object;
      const fields = data.fields ?? obj.fields ?? [];
      console.log(`  ENCONTRADO: ${key}`);
      console.log(`    Label: ${obj.labels?.singular} / ${obj.labels?.plural}`);
      console.log(`    Standard: ${obj.standard}`);
      console.log(`    Campos: ${fields.length}`);
      if (fields.length > 0) {
        fields.forEach((f) => {
          const fk = f.fieldKey ?? f.key ?? f.id;
          console.log(`      - ${f.name} (${f.dataType}) → fieldKey: ${fk}`);
        });
      }
      console.log('');
    } catch {
      // Schema não existe nesta conta — silencioso
    }
  }
}

async function listCustomFields(objectKey?: string): Promise<void> {
  const label = objectKey ? `Custom Fields — ${objectKey}` : 'Custom Fields — todos os objetos';
  console.log(`\n=== ${label} ===\n`);

  const params: Record<string, unknown> = {};
  if (objectKey) params['model'] = objectKey;

  const data = await ghlGet<CustomFieldsResponse>(`/locations/${LOCATION_ID}/customFields`, params);

  const fields = data.customFields ?? [];
  if (fields.length === 0) {
    console.log('Nenhum campo encontrado.');
    return;
  }

  console.log(`${'#'.padStart(3)}  ${'Nome'.padEnd(35)} ${'DataType'.padEnd(20)} ${'FieldKey'.padEnd(55)} ${'Pos'.padStart(3)}`);
  console.log('-'.repeat(120));
  fields.forEach((f, i) => {
    console.log(
      `${String(i + 1).padStart(3)}  ${f.name.padEnd(35)} ${f.dataType.padEnd(20)} ${f.fieldKey.padEnd(55)} ${String(f.position ?? 0).padStart(3)}`
    );
  });
  console.log(`\nTotal: ${fields.length} campo(s)`);
}

async function main(): Promise<void> {
  console.log(`\nLocation ID: ${LOCATION_ID}`);

  const args = process.argv.slice(2);
  const objectKeyArg = args.find((a) => a.startsWith('--object='))?.replace('--object=', '');

  await probeObjectSchemas();
  await listCustomFields(objectKeyArg);

  console.log('\nDica: passe --object=custom_objects.projects para filtrar por objeto.\n');
}

main().catch((err) => {
  console.error('\nErro:', JSON.stringify(err.response?.data ?? err.message ?? err, null, 2));
  console.error('Status:', err.response?.status);
  console.error('URL:', err.config?.url);
  process.exit(1);
});
