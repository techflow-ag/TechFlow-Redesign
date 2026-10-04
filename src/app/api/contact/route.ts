import { NextResponse } from "next/server";

/**
 * Contact form → Resend. Sends the brief to the team (reply-to = the visitor) and a short
 * confirmation to the visitor. Needs RESEND_API_KEY (Vercel env); CONTACT_TO / CONTACT_FROM override
 * the defaults. The domain techflow-agency.com is verified in Resend.
 */
const TO = process.env.CONTACT_TO ?? "maximilien@techflow-agency.com";
const FROM = process.env.CONTACT_FROM ?? "TechFlow <hello@techflow-agency.com>";

type Brief = {
  lang?: string;
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  services?: string[];
  timeline?: string;
  message?: string;
  consent?: boolean;
  /** Honeypot: a hidden field real visitors leave empty. */
  fax?: string;
  /** When the form was shown (ms since epoch), set by the page's script: bots posting directly have none. */
  shownAt?: number;
};

/** Random-looking tokens bots send ("sBbziUpsMezAexuyzpLmZqV"): no space, long, many case switches. */
function gibberish(text: string) {
  return text.split(/\s+/).some((word) => {
    if (word.length < 12 || /[^A-Za-z]/.test(word)) return false;
    const switches = [...word].filter((ch, i) => i > 0 && (ch === ch.toUpperCase()) !== (word[i - 1] === word[i - 1].toUpperCase())).length;
    return switches >= 8 && switches / word.length >= 0.4;
  });
}

/** Spam signals; any one is enough to drop the message (the bot still gets "ok"). */
function spamReason(brief: Brief, name: string, message: string) {
  if (brief.fax) return "honeypot";
  const shown = Number(brief.shownAt);
  if (!shown) return "no-js";
  const elapsed = Date.now() - shown;
  if (elapsed < 4000) return "too-fast";
  if (elapsed > 1000 * 60 * 60 * 24) return "stale";
  if (gibberish(name) || gibberish(message) || gibberish(String(brief.company ?? ""))) return "gibberish";
  if (!/\s/.test(message.trim()) && message.length > 15) return "one-word";
  if ((message.match(/https?:\/\//g) ?? []).length > 3) return "links";
  return null;
}

const escape = (s: string) => s.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
const clip = (s: unknown, max: number) => (typeof s === "string" ? s.trim().slice(0, max) : "");

async function send(payload: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

export async function POST(request: Request) {
  let brief: Brief;
  try {
    brief = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const lang = brief.lang === "en" ? "en" : "fr";
  const name = clip(brief.name, 120);
  const email = clip(brief.email, 200);
  const message = clip(brief.message, 5000);

  // Spam: pretend it worked so bots don't adapt, but send nothing.
  const spam = spamReason(brief, name, message);
  if (spam) {
    console.warn(`contact: dropped (${spam})`);
    return NextResponse.json({ ok: true });
  }
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message || brief.consent !== true) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  if (!process.env.RESEND_API_KEY) {
    console.error("contact: RESEND_API_KEY is not set");
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  }

  const rows: [string, string][] = [
    ["Nom", name],
    ["E-mail", email],
    ["Entreprise", clip(brief.company, 200)],
    ["Site web", clip(brief.website, 300)],
    ["Services", (Array.isArray(brief.services) ? brief.services : []).map((s) => clip(s, 60)).filter(Boolean).join(", ")],
    ["Délai", clip(brief.timeline, 80)],
    ["Langue", lang.toUpperCase()],
  ].filter(([, v]) => v) as [string, string][];

  const table = rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#6b6b6b">${k}</td><td style="padding:4px 0">${escape(v)}</td></tr>`).join("");
  const company = clip(brief.company, 200);

  try {
    await send({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `Nouveau brief${company ? ` · ${company}` : ""} — ${name}`,
      html: `<div style="font-family:system-ui,sans-serif;font-size:15px;color:#111"><h2 style="margin:0 0 12px">Nouveau brief depuis techflow-agency.com</h2><table>${table}</table><p style="margin-top:20px;white-space:pre-wrap">${escape(message)}</p><p style="margin-top:24px;color:#6b6b6b;font-size:13px">Répondez directement à cet e-mail pour écrire à ${escape(name)}.</p></div>`,
      text: `${rows.map(([k, v]) => `${k} : ${v}`).join("\n")}\n\n${message}`,
    });
    const confirm =
      lang === "en"
        ? {
            subject: "We received your brief — TechFlow",
            body: `Hi ${name},\n\nThanks for your message: the TechFlow team has received your brief and will get back to you shortly.\n\nIn a hurry? Book a 30-minute call: https://calendly.com/maximilien-grolier-1/30min\n\nThe TechFlow team`,
          }
        : {
            subject: "Nous avons bien reçu votre brief — TechFlow",
            body: `Bonjour ${name},\n\nMerci pour votre message : l'équipe TechFlow a bien reçu votre brief et revient vers vous très vite.\n\nPressé ? Réservez un appel de 30 minutes : https://calendly.com/maximilien-grolier-1/30min\n\nL'équipe TechFlow`,
          };
    // The visitor's confirmation must not block the brief itself.
    await send({ from: FROM, to: [email], reply_to: TO, subject: confirm.subject, text: confirm.body }).catch((err) =>
      console.error("contact: confirmation failed", err),
    );
  } catch (err) {
    console.error("contact: send failed", err);
    return NextResponse.json({ ok: false, error: "send" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
