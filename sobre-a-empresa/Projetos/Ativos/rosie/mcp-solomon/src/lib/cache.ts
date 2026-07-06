// Cache in-memory com TTL fixo. Usado para:
//   (a) dedup de idempotência (chave = "pedido:<orderId>" ou "produto:<productId>")
//   (b) metadata de validar-conta (chave = "conta:validacao")
// Zero persistência entre sessões — some no restart do processo Node.

const TTL_MS = 5 * 60 * 1000; // 5 minutos

interface Entrada<T> {
  valor: T;
  expira_em: number;
}

const store = new Map<string, Entrada<unknown>>();

/**
 * Guarda um valor sob uma chave, com TTL padrão de 5min.
 * TTL customizado pode ser passado em ms.
 */
export function guardar<T>(chave: string, valor: T, ttl_ms: number = TTL_MS): void {
  store.set(chave, {
    valor,
    expira_em: Date.now() + ttl_ms,
  });
}

/**
 * Recupera um valor. Retorna undefined se ausente ou expirado.
 * Expirado é removido do store no ato da consulta (lazy eviction).
 */
export function buscar<T>(chave: string): T | undefined {
  const entrada = store.get(chave);
  if (!entrada) return undefined;
  if (Date.now() > entrada.expira_em) {
    store.delete(chave);
    return undefined;
  }
  return entrada.valor as T;
}

/**
 * Verifica presença sem retornar o valor. Também expira preguiçosamente.
 */
export function contem(chave: string): boolean {
  return buscar(chave) !== undefined;
}

export function invalidar(chave: string): void {
  store.delete(chave);
}

export function limpar(): void {
  store.clear();
}

// Chaves auxiliares para uso consistente pelas tools.
export const chaves = {
  dedupPedido: (orderId: string): string => `pedido:${orderId}`,
  dedupProduto: (productId: string): string => `produto:${productId}`,
  validacaoConta: (): string => "conta:validacao",
};
