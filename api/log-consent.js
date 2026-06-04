export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return res.status(503).json({ error: "consent_logging_not_configured" });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: "invalid_json" });
  }

  const { services, session_hash } = body;
  if (!session_hash || typeof session_hash !== "string" || session_hash.length < 8) {
    return res.status(400).json({ error: "invalid_session_hash" });
  }
  if (!services || typeof services !== "object") {
    return res.status(400).json({ error: "invalid_services" });
  }

  const allowed = ["youtube", "analytics"];
  const filtered = {};
  for (const key of Object.keys(services)) {
    if (allowed.includes(key)) filtered[key] = Boolean(services[key]);
  }
  if (!Object.keys(filtered).length) {
    return res.status(400).json({ error: "no_allowed_services" });
  }

  const row = {
    session_hash: session_hash.slice(0, 128),
    services: filtered,
    klaro_version: body.klaro_version || "unknown",
    privacy_version: body.privacy_version || "2026-06-04",
    user_agent: (req.headers["user-agent"] || "").slice(0, 512),
  };

  try {
    const insertRes = await fetch(`${supabaseUrl}/rest/v1/cookie_consent_logs`, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });
    if (!insertRes.ok) return res.status(502).json({ error: "supabase_insert_failed" });
    return res.status(201).json({ ok: true });
  } catch {
    return res.status(500).json({ error: "internal_error" });
  }
}
