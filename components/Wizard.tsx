"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type WizardStep = {
  id: string;
  title: string;
  desc: string;
  appPath?: string;
  docsPath?: string;
  isPro?: boolean;
  isAdvanced?: boolean;
};

const APP_BASE = "https://app.klapr.io";
const STORAGE_KEY = "klapr_wizard_done";

export function Wizard() {
  const t = useTranslations("Wizard");
  const steps = t.raw("steps") as WizardStep[];
  const [done, setDone] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as string[];
      setDone(new Set(saved));
    } catch {}
  }, []);

  const toggle = (id: string) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])); } catch {}
      return next;
    });
  };

  const completed = steps.filter((s) => done.has(s.id)).length;
  const pct = Math.round((completed / steps.length) * 100);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-black text-white">{t("title")}</h1>
        <p className="mt-3 text-gray-400">{t("sub")}</p>
      </div>

      {/* Progress bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-400">
            {completed} / {steps.length} {t("progressLabel")}
          </span>
          <span className="text-sm font-bold" style={{ color: "var(--brand)" }}>{pct}%</span>
        </div>
        <div className="h-2 rounded-full" style={{ background: "#1f1f1f" }}>
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{ background: "var(--brand)", width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-4">
        {steps.map((step, i) => {
          const isDone = done.has(step.id);
          return (
            <div
              key={step.id}
              className="rounded-xl p-5 border transition-all"
              style={{
                background: isDone ? "#0f1f0f" : "#111",
                borderColor: isDone ? "#1a3a1a" : "#1f1f1f",
              }}
            >
              <div className="flex items-start gap-4">
                {/* Step number / check */}
                <button
                  onClick={() => toggle(step.id)}
                  aria-label={isDone ? t("done") : t("markDone")}
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-colors mt-0.5"
                  style={{
                    background: isDone ? "var(--brand)" : "#1f1f1f",
                    color: isDone ? "#0A0A0A" : "#666",
                    border: isDone ? "none" : "1px solid #2a2a2a",
                  }}
                >
                  {isDone ? "✓" : i + 1}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-base font-bold" style={{ color: isDone ? "#86efac" : "#fff" }}>
                      {step.title}
                    </h3>
                    {step.isPro && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "var(--brand)", color: "#0A0A0A" }}>
                        {t("proStep")}
                      </span>
                    )}
                    {step.isAdvanced && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#1e3a5f", color: "#93c5fd" }}>
                        {t("advancedStep")}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {step.appPath && (
                      <a
                        href={`${APP_BASE}${step.appPath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
                        style={{ background: "var(--brand)", color: "#0A0A0A" }}
                      >
                        {t("openApp")}
                      </a>
                    )}
                    {step.docsPath && (
                      <Link
                        href={{ pathname: "/docs/[slug]", params: { slug: step.docsPath.split("/").pop()! } }}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                        style={{ background: "#1f1f1f", color: "#fff", border: "1px solid #2a2a2a" }}
                      >
                        Ver tutorial →
                      </Link>
                    )}
                    <button
                      onClick={() => toggle(step.id)}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                      style={{ background: "transparent", color: isDone ? "#86efac" : "#666", border: `1px solid ${isDone ? "#1a3a1a" : "#2a2a2a"}` }}
                    >
                      {isDone ? t("done") : t("markDone")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500 mb-4">{t("ctaHeadline")}</p>
        <a
          href={APP_BASE}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-lg transition-opacity hover:opacity-90"
          style={{ background: "var(--brand)", color: "#0A0A0A" }}
        >
          {t("ctaBtn")}
        </a>
      </div>
    </div>
  );
}
