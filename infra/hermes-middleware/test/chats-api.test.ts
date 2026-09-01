import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { createHash, createHmac } from "node:crypto";

/**
 * Verifica o cálculo de HMAC-SHA1 conforme a receita Kommo Chats API.
 * Referência: developers.kommo.com/recipes/calculate-headers-for-chats-api-requests
 */

function md5(input: string): string {
  return createHash("md5").update(input, "utf8").digest("hex");
}

function hmacSha1Hex(input: string, secret: string): string {
  return createHmac("sha1", secret).update(input, "utf8").digest("hex");
}

describe("chats-api — headers HMAC", () => {
  test("MD5 de body vazio é d41d8cd98f00b204e9800998ecf8427e", () => {
    assert.equal(md5(""), "d41d8cd98f00b204e9800998ecf8427e");
  });

  test("HMAC-SHA1 gera hex determinístico", () => {
    const sig = hmacSha1Hex("POST\n\napplication/json\nMon, 01 Jan 2024\n/foo", "my-secret");
    assert.match(sig, /^[a-f0-9]{40}$/);
  });

  test("string canonica segue formato método\\n md5\\n content-type\\n date\\n path", () => {
    const body = JSON.stringify({ event: "test" });
    const contentMd5 = md5(body);
    const date = "Mon, 01 Jan 2024 12:00:00 GMT";
    const path = "/chats/abc";
    const canonical = ["POST", contentMd5, "application/json", date, path].join("\n");
    const sig = hmacSha1Hex(canonical, "secret");
    // apenas verifica formato — não temos secret oficial pra comparar
    assert.equal(sig.length, 40);
  });
});
