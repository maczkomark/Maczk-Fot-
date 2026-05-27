"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

const ENDPOINT =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "https://api.maczkoweb.hu/api/contact";
const FORM_TOKEN = process.env.NEXT_PUBLIC_FORM_TOKEN ?? "";

const BottomGradient = () => (
  <>
    <span className="group-hover/input:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-copper-500 to-transparent" />
    <span className="group-hover/input:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-copper-400 to-transparent" />
  </>
);

const inputCls =
  "w-full bg-cream-50 rounded-sm border border-cream-300 text-ink-800 placeholder-ink-400 focus:border-ink-800 focus:ring-0 focus:outline-none px-4 py-3 text-sm transition";

const labelCls = "block brand-chip mb-2";

type Status = { kind: "idle" | "sending" | "ok" | "error"; message?: string };

export const ContactForm = () => {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const tokenMissing = !FORM_TOKEN;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tokenMissing) {
      setStatus({
        kind: "error",
        message: "Az űrlap még nincs aktiválva (hiányzó token).",
      });
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — ha kitöltött (bot), csendben sikerrel zárunk
    if (String(data.get("_gotcha") ?? "").trim()) {
      setStatus({ kind: "ok", message: "Köszi! Hamarosan válaszolok." });
      form.reset();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      // application/x-www-form-urlencoded — egyszerűbb CORS preflight nélkül
      const body = new URLSearchParams();
      for (const [k, v] of data.entries()) body.append(k, String(v));

      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      const json = await res.json().catch(() => ({ ok: false, error: "Szerverhiba" }));

      if (!res.ok || !json.ok) {
        setStatus({
          kind: "error",
          message: json.error ?? "Nem sikerült elküldeni. Próbáld újra később.",
        });
        return;
      }

      setStatus({ kind: "ok", message: "Köszi az üzenetet! 24 órán belül válaszolok." });
      form.reset();
    } catch {
      setStatus({
        kind: "error",
        message: "Hálózati hiba — ellenőrizd az internetet, és próbáld újra.",
      });
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      action={ENDPOINT}
      method="POST"
      className={cn("w-full max-w-md mx-auto p-8 md:p-10 rounded-sm bg-cream-50 border border-cream-300")}
    >
      {/* Hidden: signed token + honeypot */}
      <input type="hidden" name="_token" value={FORM_TOKEN} />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex items-center justify-between mb-6">
        <span className="brand-chip">— Felkérés</span>
        <span className="brand-chip">2026</span>
      </div>

      <h2 className="font-display text-3xl md:text-4xl text-ink-800 leading-tight tracking-tight">
        Vegyük fel a <span className="italic text-copper-600">kapcsolatot.</span>
      </h2>
      <p className="caption mt-4">
        Esküvő, portré, esemény vagy videó — írj, és 24 órán belül válaszolok.
      </p>

      <div className="mt-8 space-y-5">
        <div className="group/input relative">
          <label className={labelCls} htmlFor="cf-name">Név</label>
          <input id="cf-name" required name="name" className={inputCls} placeholder="Teljes neved" autoComplete="name" />
          <BottomGradient />
        </div>

        <div className="group/input relative">
          <label className={labelCls} htmlFor="cf-email">Email</label>
          <input id="cf-email" required type="email" name="email" className={inputCls} placeholder="te@pelda.hu" autoComplete="email" />
          <BottomGradient />
        </div>

        <div className="group/input relative">
          <label className={labelCls} htmlFor="cf-phone">Telefon <span className="text-ink-400 normal-case tracking-normal">(nem kötelező)</span></label>
          <input id="cf-phone" type="tel" name="phone" className={inputCls} placeholder="+36 …" autoComplete="tel" />
          <BottomGradient />
        </div>

        <div className="group/input relative">
          <label className={labelCls} htmlFor="cf-service">Szolgáltatás</label>
          <select id="cf-service" name="service" className={inputCls} defaultValue="Esküvő">
            <option value="Esküvő">Esküvő</option>
            <option value="Portré">Portré</option>
            <option value="Esemény">Esemény</option>
            <option value="Videó">Videó</option>
            <option value="Egyéb">Egyéb</option>
          </select>
          <BottomGradient />
        </div>

        <div className="group/input relative">
          <label className={labelCls} htmlFor="cf-message">Üzenet</label>
          <textarea id="cf-message" required name="message" rows={5} className={inputCls} placeholder="Mesélj röviden a tervezett alkalomról…" />
          <BottomGradient />
        </div>
      </div>

      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink-800 text-cream-50 py-3 px-6 text-sm font-medium transition-colors duration-200 hover:bg-ink-900 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status.kind === "sending" ? "Küldés folyamatban…" : "Küldés →"}
      </button>

      {/* Status messages */}
      {status.kind === "ok" && (
        <p className="mt-5 text-sm text-copper-700 bg-copper-500/10 border border-copper-500/30 rounded-sm px-4 py-3">
          ✓ {status.message}
        </p>
      )}
      {status.kind === "error" && (
        <p className="mt-5 text-sm text-red-800 bg-red-100 border border-red-300 rounded-sm px-4 py-3">
          ✗ {status.message}
        </p>
      )}
      {tokenMissing && status.kind === "idle" && (
        <p className="mt-5 text-xs text-amber-800 bg-amber-100 border border-amber-300 rounded-sm px-4 py-3">
          ⚠ A form még nem aktív — állítsd be a <code className="font-mono">NEXT_PUBLIC_FORM_TOKEN</code> env változót
          a <code className="font-mono">.env.local</code>-ban.
        </p>
      )}

      <p className="mt-5 text-xs text-ink-400 leading-relaxed">
        Az adataidat csak a megkereséshez használom — nem kerül harmadik félhez.
      </p>
    </form>
  );
};
