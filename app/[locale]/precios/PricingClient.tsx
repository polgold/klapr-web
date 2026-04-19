"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Tier = {
  name: string;
  priceFree?: string;
  monthly: number;
  annual: number;
  isFree: boolean;
  desc: string;
  cta: string;
};

type FAQ = { q: string; a: string };
type TierFeatures = { starter: boolean[]; pro: boolean[]; studio: boolean[] };

const TIER_KEYS: (keyof TierFeatures)[] = ["starter", "pro", "studio"];

function CheckIcon() {
  return (
    <svg className="w-5 h-5 mx-auto" style={{ color: "var(--brand)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-5 h-5 mx-auto text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function PricingClient() {
  const t = useTranslations("Pricing");
  const [annual, setAnnual] = useState(false);

  const tiers = t.raw("tiers") as Tier[];
  const features = t.raw("features") as string[];
  const tierFeatures = t.raw("tierFeatures") as TierFeatures;
  const faqs = t.raw("faq") as FAQ[];

  return (
    <div>
      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <span className={`text-sm font-medium transition-colors ${!annual ? "text-white" : "text-gray-500"}`}>
          {t("monthly")}
        </span>
        <button
          role="switch"
          aria-checked={annual}
          onClick={() => setAnnual(!annual)}
          className="relative w-12 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{ background: annual ? "var(--brand)" : "#2a2a2a" }}
        >
          <span
            className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
            style={{ transform: annual ? "translateX(24px)" : "translateX(0)" }}
          />
        </button>
        <span className={`text-sm font-medium flex items-center gap-2 transition-colors ${annual ? "text-white" : "text-gray-500"}`}>
          {t("annual")}
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full transition-colors"
            style={{ background: annual ? "var(--brand)" : "#1f1f1f", color: annual ? "#0A0A0A" : "#888" }}
          >
            {t("annualBadge")}
          </span>
        </span>
      </div>

      {/* Pricing cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {tiers.map((tier, idx) => {
          const price = annual ? tier.annual : tier.monthly;
          const isHighlighted = idx === 1;
          return (
            <div
              key={tier.name}
              className="rounded-2xl p-8 flex flex-col relative"
              style={{
                background: isHighlighted ? "#1a1a1a" : "#111",
                border: isHighlighted ? "2px solid var(--brand)" : "1px solid #1f1f1f",
              }}
            >
              {isHighlighted && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap"
                  style={{ background: "var(--brand)", color: "#0A0A0A" }}
                >
                  {t("recommended")}
                </div>
              )}
              <h3 className="text-lg font-bold text-white">{tier.name}</h3>
              <div className="mt-2 flex items-end gap-1">
                {tier.isFree ? (
                  <span className="text-3xl font-black text-white">{tier.priceFree}</span>
                ) : (
                  <>
                    <span className="text-3xl font-black text-white">${price}</span>
                    <span className="text-sm text-gray-400 mb-1">{t("period")}</span>
                  </>
                )}
              </div>
              {annual && !tier.isFree && (
                <span className="text-xs text-gray-500 mt-0.5">
                  {t("billedAnnually", { total: price * 12 })}
                </span>
              )}
              <p className="mt-2 text-xs text-gray-500">{tier.desc}</p>

              <ul className="mt-6 flex flex-col gap-2 flex-1">
                {features
                  .filter((_, i) => tierFeatures[TIER_KEYS[idx]]?.[i])
                  .map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: "var(--brand)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
              </ul>

              <Link
                href="/registro"
                className="mt-8 block text-center py-2.5 px-4 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
                style={
                  isHighlighted
                    ? { background: "var(--brand)", color: "#0A0A0A" }
                    : { background: "#1f1f1f", color: "#fff", border: "1px solid #2a2a2a" }
                }
              >
                {tier.cta}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Comparison table */}
      <div className="mb-20">
        <h2 className="text-2xl font-black text-white text-center mb-8">{t("tableTitle")}</h2>
        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "#1f1f1f" }}>
          <table className="w-full min-w-[500px]">
            <thead>
              <tr style={{ background: "#111", borderBottom: "1px solid #1f1f1f" }}>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">—</th>
                {tiers.map((t, i) => (
                  <th
                    key={t.name}
                    className="py-4 px-6 text-sm font-bold text-center"
                    style={{ color: i === 1 ? "var(--brand)" : "white" }}
                  >
                    {t.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feat, fi) => (
                <tr
                  key={feat}
                  style={{ background: fi % 2 === 0 ? "#0d0d0d" : "#111", borderBottom: "1px solid #1a1a1a" }}
                >
                  <td className="py-3 px-6 text-sm text-gray-300">{feat}</td>
                  {TIER_KEYS.map((key) => (
                    <td key={key} className="py-3 px-6 text-center">
                      {tierFeatures[key]?.[fi] ? <CheckIcon /> : <XIcon />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-black text-white text-center mb-8">{t("faqTitle")}</h2>
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="rounded-xl border group"
              style={{ background: "#111", borderColor: "#1f1f1f" }}
            >
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer text-sm font-medium text-white">
                {faq.q}
                <svg
                  className="w-4 h-4 text-gray-400 flex-shrink-0 ml-4 transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-5 text-sm text-gray-400 leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
