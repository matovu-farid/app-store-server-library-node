import { describe, expect, it, vi } from "vitest";
import {
  AppStoreServerAPIClient,
  Environment,
} from "./index";

async function generateP8Pem(): Promise<string> {
  const pair = (await crypto.subtle.generateKey(
    { name: "ECDSA", namedCurve: "P-256" },
    true,
    ["sign", "verify"],
  )) as CryptoKeyPair;
  const pkcs8 = (await crypto.subtle.exportKey(
    "pkcs8",
    pair.privateKey,
  )) as ArrayBuffer;
  const base64 = Buffer.from(pkcs8).toString("base64");
  const lines = base64.match(/.{1,64}/g)!.join("\n");
  return `-----BEGIN PRIVATE KEY-----\n${lines}\n-----END PRIVATE KEY-----\n`;
}

describe("App Store Server client binary request bodies", () => {
  it("copies upload bytes into an ArrayBuffer BodyInit without changing them", async () => {
    const fetchMock = vi.fn(
      async (_input: RequestInfo | URL, _init?: RequestInit) =>
        new Response(null, { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);

    try {
      const client = new AppStoreServerAPIClient(
        await generateP8Pem(),
        "key-id",
        "issuer-id",
        "com.fidexa.rishi",
        Environment.SANDBOX,
      );
      const image = Buffer.from([7, 0, 255, 3]);

      await client.uploadImage("image-id", image, "small");

      const request = fetchMock.mock.calls[0]?.[1] as RequestInit | undefined;
      expect(request?.body).toBeInstanceOf(ArrayBuffer);
      expect(
        Array.from(new Uint8Array(request?.body as ArrayBuffer)),
      ).toEqual(Array.from(image));
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
