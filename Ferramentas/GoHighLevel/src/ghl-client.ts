import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import 'dotenv/config';

const BASE_URL = process.env.GHL_BASE_URL ?? 'https://services.leadconnectorhq.com';
const API_KEY = process.env.GHL_API_KEY;
export const LOCATION_ID = process.env.GHL_LOCATION_ID;

if (!API_KEY) throw new Error('GHL_API_KEY não definido no .env');
if (!LOCATION_ID) throw new Error('GHL_LOCATION_ID não definido no .env');

const MAX_RETRIES = 3;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function log(method: string, path: string, status: number, durationMs: number): void {
  const ts = new Date().toISOString();
  console.log(`[${ts}] ${method} ${path} → ${status} (${durationMs}ms)`);
}

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    Version: '2021-07-28',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 30_000,
});

instance.interceptors.request.use((config) => {
  (config as Record<string, unknown>)['_startTime'] = Date.now();
  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const cfg = response.config as AxiosRequestConfig & Record<string, unknown>;
    const duration = Date.now() - (cfg['_startTime'] as number ?? Date.now());
    log(cfg.method?.toUpperCase() ?? 'REQ', cfg.url ?? '', response.status, duration);
    return response;
  },
  async (error) => {
    const cfg = (error.config ?? {}) as AxiosRequestConfig & Record<string, unknown>;
    const retries: number = (cfg['_retries'] as number) ?? 0;
    const status: number = error.response?.status ?? 0;

    if (status === 429 && retries < MAX_RETRIES) {
      const delay = Math.pow(2, retries + 1) * 1000;
      console.warn(`[RATE LIMIT] 429 — aguardando ${delay}ms antes de retry ${retries + 1}/${MAX_RETRIES}`);
      await sleep(delay);
      cfg['_retries'] = retries + 1;
      return instance.request(cfg);
    }

    if (status === 401) {
      console.error('[AUTH] 401 Unauthorized — verifique GHL_API_KEY e os scopes do PIT');
    } else if (status === 403) {
      console.error('[AUTH] 403 Forbidden — o PIT não tem o scope necessário para esta operação');
    } else if (status >= 500) {
      console.error(`[SERVER] ${status} — erro no servidor GHL`);
    }

    return Promise.reject(error);
  }
);

export async function ghlGet<T>(path: string, params?: Record<string, unknown>): Promise<T> {
  const res = await instance.get<T>(path, { params });
  return res.data;
}

export async function ghlPost<T>(path: string, body: unknown): Promise<T> {
  const res = await instance.post<T>(path, body);
  return res.data;
}

export async function ghlPut<T>(path: string, body: unknown, params?: Record<string, unknown>): Promise<T> {
  const res = await instance.put<T>(path, body, { params });
  return res.data;
}

export async function ghlDelete<T>(path: string): Promise<T> {
  const res = await instance.delete<T>(path);
  return res.data;
}
