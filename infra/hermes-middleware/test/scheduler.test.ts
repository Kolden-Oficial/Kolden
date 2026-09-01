import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  scheduleFollowUp,
  fetchDue,
  cancelByLead,
  markDone,
  scheduleCarrinhoEnviadoFollowUps,
  type ScheduledTask,
} from "../src/kommo/scheduler.js";

// Mock in-memory do Redis Upstash (só os métodos usados)
class MockRedis {
  private zset: Array<{ score: number; member: string }> = [];
  private sets = new Map<string, Set<string>>();

  async zadd(key: string, entry: { score: number; member: string }): Promise<number> {
    this.zset.push(entry);
    return 1;
  }

  async zrange(
    key: string,
    min: number,
    max: number,
    opts?: { byScore?: boolean; offset?: number; count?: number },
  ): Promise<string[]> {
    if (opts?.byScore) {
      const items = this.zset
        .filter((e) => e.score >= min && e.score <= max)
        .sort((a, b) => a.score - b.score)
        .slice(opts.offset ?? 0, (opts.offset ?? 0) + (opts.count ?? 100));
      return items.map((e) => e.member);
    }
    // sem byScore, retorna todos (usado em cancelByLead)
    return this.zset.map((e) => e.member);
  }

  async zrem(key: string, member: string): Promise<number> {
    const before = this.zset.length;
    this.zset = this.zset.filter((e) => e.member !== member);
    return before - this.zset.length;
  }

  async sadd(key: string, ...members: string[]): Promise<number> {
    const s = this.sets.get(key) ?? new Set<string>();
    for (const m of members) s.add(m);
    this.sets.set(key, s);
    return members.length;
  }

  async smembers(key: string): Promise<string[]> {
    return Array.from(this.sets.get(key) ?? []);
  }

  async srem(key: string, ...members: string[]): Promise<number> {
    const s = this.sets.get(key);
    if (!s) return 0;
    let n = 0;
    for (const m of members) {
      if (s.delete(m)) n++;
    }
    return n;
  }

  async del(key: string): Promise<number> {
    return this.sets.delete(key) ? 1 : 0;
  }
}

describe("scheduler — enqueue / fetchDue / cancelByLead", () => {
  test("scheduleFollowUp adiciona à fila", async () => {
    const redis = new MockRedis() as never;
    const id = await scheduleFollowUp(redis, {
      leadId: 42,
      template: "rosie_carrinho_followup_2h",
      templateParams: { name: "Test" },
      delayMs: 100,
      reason: "test",
    });
    assert.ok(id.startsWith("42:rosie_carrinho_followup_2h:"));
  });

  test("fetchDue retorna tarefas vencidas", async () => {
    const redis = new MockRedis() as never;
    await scheduleFollowUp(redis, {
      leadId: 100,
      template: "rosie_carrinho_followup_2h",
      templateParams: {},
      delayMs: -1000, // já vencida
      reason: "vencida",
    });
    const due = await fetchDue(redis);
    assert.equal(due.length, 1);
    assert.equal(due[0].leadId, 100);
    assert.equal(due[0].reason, "vencida");
  });

  test("cancelByLead remove todas as tasks de um lead", async () => {
    const redis = new MockRedis() as never;
    await scheduleCarrinhoEnviadoFollowUps(redis, {
      leadId: 200,
      contactFirstName: "Ana",
      linkCarrinho: "https://rosie.com/c/1",
      pecaInteresse: "vestido",
      tamanho: "M",
    });
    const removed = await cancelByLead(redis, 200);
    assert.equal(removed, 3);
    const after = await fetchDue(redis, 100);
    assert.equal(after.filter((t) => t.leadId === 200).length, 0);
  });

  test("markDone remove uma task específica", async () => {
    const redis = new MockRedis() as never;
    await scheduleFollowUp(redis, {
      leadId: 300,
      template: "rosie_recuperacao_1h",
      templateParams: {},
      delayMs: -5000,
      reason: "removeme",
    });
    const due = await fetchDue(redis);
    assert.equal(due.length, 1);
    await markDone(redis, due[0]);
    const after = await fetchDue(redis);
    assert.equal(after.filter((t) => t.leadId === 300).length, 0);
  });
});
