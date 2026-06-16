import { getStore } from "@netlify/blobs";

// One global key-value store, shared by everyone who opens the site.
// Strong consistency so a sign-up is visible on the next read immediately.
export default async (req) => {
  const store = getStore({ name: "padel", consistency: "strong" });
  const url = new URL(req.url);

  if (req.method === "GET") {
    const key = url.searchParams.get("key");
    if (!key) return json({ error: "missing key" }, 400);
    const value = await store.get(key); // string or null
    return json({ key, value });
  }

  if (req.method === "POST") {
    let body;
    try { body = await req.json(); } catch { return json({ error: "bad json" }, 400); }
    const { key, value } = body || {};
    if (!key) return json({ error: "missing key" }, 400);
    await store.set(key, value ?? "");
    return json({ key, ok: true });
  }

  return json({ error: "method not allowed" }, 405);
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

// Maps this function to /api/store — no redirect rules needed.
export const config = { path: "/api/store" };
