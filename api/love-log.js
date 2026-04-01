export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { yourName, partnerName, consentedAt, source } = req.body || {};

  if (!yourName || !partnerName) {
    return res.status(400).json({ ok: false, error: "Missing names" });
  }

  const payload = {
    yourName: String(yourName).slice(0, 80),
    partnerName: String(partnerName).slice(0, 80),
    consentedAt: consentedAt || new Date().toISOString(),
    source: source || "HeartSpark Studio"
  };

  console.log("Love calculator submission:", payload);

  const webhookUrl = process.env.WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: `HeartSpark Studio submission\n${payload.yourName} + ${payload.partnerName}\n${payload.consentedAt}`
        })
      });

      if (!response.ok) {
        console.error("Webhook forwarding failed with status:", response.status);
      }
    } catch (error) {
      console.error("Webhook forwarding error:", error);
    }
  }
  return res.status(200).json({ ok: true });
}
