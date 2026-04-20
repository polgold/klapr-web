import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MockDashboard } from "@/components/MockDashboard";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });
  return {
    title: t("heroHeadline"),
    description: t("heroSub"),
  };
}

type FeatureItem = { icon: string; title: string; desc: string; badge?: string };
type ProblemItem = { icon: string; title: string; desc: string };
type PricingTier = {
  name: string;
  price: string;
  period: string | null;
  desc: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
};
type McpSection = {
  badge: string;
  headline: string;
  sub: string;
  bullets: string[];
  exampleLabel: string;
  examplePrompt: string;
  exampleResponse: string;
  cta: string;
  ctaPlan: string;
};
type AfipSection = {
  badge: string;
  headline: string;
  sub: string;
  bullets: string[];
  note: string;
  cta: string;
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Home");
  const tDash = await getTranslations("MockDashboard");

  const features = t.raw("features") as FeatureItem[];
  const problems = t.raw("problems") as ProblemItem[];
  const pricingTiers = t.raw("pricingTiers") as PricingTier[];
  const socialProof = t.raw("socialProof") as string[];
  const mcpSection = t.raw("mcpSection") as McpSection;
  const afipSection = t.raw("afipSection") as AfipSection;

  return (
    <>
      {/* Hero */}
      <section style={{ background: "var(--bg)" }} className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <div
                  className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#a0a0a0" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--brand)" }} />
                  {t("badge")}
                </div>
                <div
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{ background: "#0f1f0f", border: "1px solid #1a3a1a", color: "#4ade80" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  {t("mcpBadge")}
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white">
                {t("heroHeadline")}
              </h1>
              <p className="mt-3 text-base font-semibold" style={{ color: "var(--brand)" }}>
                {t("heroTagline")}
              </p>
              <p className="mt-4 text-lg text-gray-400 leading-relaxed max-w-lg">
                {t("heroSub")}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/registro"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg transition-opacity hover:opacity-90"
                  style={{ background: "var(--brand)", color: "#0A0A0A" }}
                >
                  {t("ctaStart")}
                </Link>
                <Link
                  href="/funcionalidades"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
                >
                  {t("ctaDemo")}
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <MockDashboard
                sidebarLabels={tDash.raw("sidebarLabels") as string[]}
                columnLabels={tDash.raw("columnLabels") as string[]}
                newLabel={tDash("newLabel")}
              />
            </div>
          </div>
          <div className="lg:hidden mt-12">
            <MockDashboard
              sidebarLabels={tDash.raw("sidebarLabels") as string[]}
              columnLabels={tDash.raw("columnLabels") as string[]}
              newLabel={tDash("newLabel")}
            />
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section
        style={{ background: "#111111", borderTop: "1px solid #1f1f1f", borderBottom: "1px solid #1f1f1f" }}
        className="py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-medium text-gray-500 uppercase tracking-widest mb-6">
            {t("socialLabel")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {socialProof.map((name) => (
              <span key={name} className="text-sm font-medium text-gray-600 hover:text-gray-400 transition-colors">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section style={{ background: "var(--bg)" }} className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              {t("problemHeadline")}
            </h2>
            <p className="mt-4 text-gray-400">{t("problemSub")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((p) => (
              <div key={p.title} className="rounded-xl p-6 border" style={{ background: "#111", borderColor: "#1f1f1f" }}>
                <span className="text-3xl">{p.icon}</span>
                <h3 className="mt-3 text-base font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ background: "#111111" }} className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white">{t("featuresHeadline")}</h2>
            <p className="mt-4 text-gray-400">{t("featuresSub")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl p-6 border hover:border-gray-600 transition-colors relative"
                style={{ background: "#0d0d0d", borderColor: "#1f1f1f" }}
              >
                {f.badge && (
                  <span
                    className="absolute top-4 right-4 text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: f.badge === "Pro" ? "var(--brand)" : "#1e3a5f", color: f.badge === "Pro" ? "#0A0A0A" : "#93c5fd" }}
                  >
                    {f.badge}
                  </span>
                )}
                <span className="text-3xl">{f.icon}</span>
                <h3 className="mt-3 text-base font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/funcionalidades" className="text-sm font-medium hover:underline" style={{ color: "var(--brand)" }}>
              {t("featuresLink")}
            </Link>
          </div>
        </div>
      </section>

      {/* MCP Section */}
      <section style={{ background: "var(--bg)" }} className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — text */}
            <div>
              <div
                className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full mb-6"
                style={{ background: "#0f1f0f", border: "1px solid #1a3a1a", color: "#4ade80" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                {mcpSection.badge}
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                {mcpSection.headline}
              </h2>
              <p className="mt-4 text-gray-400 leading-relaxed">{mcpSection.sub}</p>
              <ul className="mt-6 flex flex-col gap-3">
                {mcpSection.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-gray-300">
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--brand)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  href={{ pathname: "/docs/[slug]", params: { slug: "conectar-claude" } }}
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-lg transition-opacity hover:opacity-90"
                  style={{ background: "var(--brand)", color: "#0A0A0A" }}
                >
                  {mcpSection.cta}
                </Link>
                <span className="text-xs text-gray-500">{mcpSection.ctaPlan}</span>
              </div>
            </div>

            {/* Right — MCP chat mock */}
            <div>
              <div
                className="rounded-2xl overflow-hidden shadow-2xl shadow-black/60"
                style={{ background: "#0d0d0d", border: "1px solid #1f1f1f" }}
              >
                {/* Chrome */}
                <div
                  className="flex items-center gap-2 px-4 py-3"
                  style={{ background: "#1a1a1a", borderBottom: "1px solid #2a2a2a" }}
                >
                  <span className="w-3 h-3 rounded-full" style={{ background: "#ef4444" }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: "#eab308" }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: "#22c55e" }} />
                  <span className="ml-3 text-xs text-gray-500 font-mono">claude.ai — KLAPR connector</span>
                </div>
                {/* Chat */}
                <div className="p-5 space-y-4">
                  <p className="text-xs text-gray-600 mb-2 uppercase tracking-widest font-medium">{mcpSection.exampleLabel}</p>
                  {/* User message */}
                  <div
                    className="text-xs rounded-xl px-4 py-3 max-w-[85%]"
                    style={{ background: "#1e3a5f", color: "#93c5fd" }}
                  >
                    {mcpSection.examplePrompt}
                  </div>
                  {/* Assistant response */}
                  <div
                    className="text-xs rounded-xl px-4 py-3 ml-auto max-w-[85%] whitespace-pre-line"
                    style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#d1d5db" }}
                  >
                    {mcpSection.exampleResponse}
                  </div>
                  {/* Typing indicator */}
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--brand)" }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--brand)" }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--brand)", animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--brand)", animationDelay: "300ms" }} />
                  </div>
                </div>
                {/* Footer */}
                <div
                  className="px-5 py-3 flex items-center gap-2"
                  style={{ background: "#111", borderTop: "1px solid #1f1f1f" }}
                >
                  <div
                    className="flex-1 text-xs text-gray-600 px-3 py-2 rounded-lg"
                    style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}
                  >
                    Preguntá cualquier cosa...
                  </div>
                  <span
                    className="text-xs px-3 py-2 rounded-lg font-medium"
                    style={{ background: "var(--brand)", color: "#0A0A0A" }}
                  >
                    ↑
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AFIP Section */}
      <section style={{ background: "#111111", borderTop: "1px solid #1f1f1f" }} className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — AFIP invoice mock */}
            <div>
              <div
                className="rounded-2xl overflow-hidden shadow-xl"
                style={{ background: "#0d0d0d", border: "1px solid #1f1f1f" }}
              >
                <div
                  className="flex items-center justify-between px-5 py-3"
                  style={{ background: "#1a1a1a", borderBottom: "1px solid #2a2a2a" }}
                >
                  <span className="text-xs font-mono text-gray-500">app.klapr.io · facturación</span>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: "#14532d", color: "#86efac" }}
                  >
                    CAE ✓
                  </span>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Factura C</p>
                      <p className="text-lg font-black text-white mt-0.5">0001-00000042</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Fecha emisión</p>
                      <p className="text-sm text-gray-300 mt-0.5">20/04/2026</p>
                    </div>
                  </div>
                  <div
                    className="rounded-lg p-3 text-xs space-y-1"
                    style={{ background: "#111", border: "1px solid #1a1a1a" }}
                  >
                    <p className="text-gray-400"><span className="text-gray-600">Cliente:</span> Cervecería Quilmes SA</p>
                    <p className="text-gray-400"><span className="text-gray-600">CUIL:</span> 30-50000012-3</p>
                    <p className="text-gray-400"><span className="text-gray-600">IVA:</span> Responsable Inscripto</p>
                    <p className="text-gray-400"><span className="text-gray-600">Trabajo:</span> Video institucional 2026</p>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <p className="text-xs text-gray-500">Total</p>
                      <p className="text-xl font-black" style={{ color: "var(--brand)" }}>$185.000,00</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">CAE</p>
                      <p className="text-xs font-mono text-green-400">74023456789012</p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <span
                      className="text-xs px-3 py-1.5 rounded-lg font-medium flex-1 text-center cursor-default"
                      style={{ background: "var(--brand)", color: "#0A0A0A" }}
                    >
                      ↓ Descargar PDF
                    </span>
                    <span
                      className="text-xs px-3 py-1.5 rounded-lg font-medium cursor-default"
                      style={{ background: "#1f1f1f", color: "#888", border: "1px solid #2a2a2a" }}
                    >
                      Nueva factura
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — text */}
            <div>
              <div
                className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full mb-6"
                style={{ background: "#1e3a5f", border: "1px solid #1e3a8a", color: "#93c5fd" }}
              >
                <span>🇦🇷</span>
                {afipSection.badge}
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                {afipSection.headline}
              </h2>
              <p className="mt-4 text-gray-400 leading-relaxed">{afipSection.sub}</p>
              <ul className="mt-6 flex flex-col gap-3">
                {afipSection.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-gray-300">
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--brand)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-gray-500 italic">{afipSection.note}</p>
              <div className="mt-6">
                <Link
                  href={{ pathname: "/docs/[slug]", params: { slug: "facturacion-afip" } }}
                  className="inline-flex items-center text-sm font-semibold transition-opacity hover:opacity-80"
                  style={{ color: "var(--brand)" }}
                >
                  {afipSection.cta} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section style={{ background: "var(--bg)" }} className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white">{t("pricingHeadline")}</h2>
            <p className="mt-4 text-gray-400">{t("pricingSub")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className="rounded-2xl p-8 flex flex-col relative"
                style={{
                  background: tier.highlighted ? "#1a1a1a" : "#111",
                  border: tier.highlighted ? "2px solid var(--brand)" : "1px solid #1f1f1f",
                }}
              >
                {tier.highlighted && tier.badge && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap"
                    style={{ background: "var(--brand)", color: "#0A0A0A" }}
                  >
                    {tier.badge}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                  <div className="mt-2 flex items-end gap-1">
                    <span className="text-3xl font-black text-white">{tier.price}</span>
                    {tier.period && <span className="text-sm text-gray-400 mb-1">{tier.period}</span>}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{tier.desc}</p>
                </div>
                <ul className="mt-6 flex flex-col gap-2 flex-1">
                  {tier.features.map((f) => (
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
                    tier.highlighted
                      ? { background: "var(--brand)", color: "#0A0A0A" }
                      : { background: "#1f1f1f", color: "#fff", border: "1px solid #2a2a2a" }
                  }
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/precios" className="text-sm font-medium hover:underline" style={{ color: "var(--brand)" }}>
              {t("pricingLink")}
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: "#111111", borderTop: "1px solid #1f1f1f" }} className="py-20 lg:py-28">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black leading-tight" style={{ color: "var(--brand)" }}>
            {t("ctaFinalHeadline")}
          </h2>
          <p className="mt-4 text-gray-400 text-lg">{t("ctaFinalSub")}</p>
          <div className="mt-8">
            <Link
              href="/registro"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg transition-opacity hover:opacity-90"
              style={{ background: "var(--brand)", color: "#0A0A0A" }}
            >
              {t("ctaFinalBtn")}
            </Link>
          </div>
          <p className="mt-4 text-xs text-gray-600">{t("noCC")}</p>
        </div>
      </section>
    </>
  );
}
