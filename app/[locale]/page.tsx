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

type FeatureItem = { icon: string; title: string; desc: string };
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

  return (
    <>
      {/* Hero */}
      <section style={{ background: "var(--bg)" }} className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full mb-6"
                style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#a0a0a0" }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--brand)" }} />
                {t("badge")}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white">
                {t("heroHeadline")}
              </h1>
              <p className="mt-6 text-lg text-gray-400 leading-relaxed max-w-lg">
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
                <a
                  href="#features"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
                >
                  {t("ctaDemo")}
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
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
                className="rounded-xl p-6 border hover:border-gray-600 transition-colors"
                style={{ background: "#0d0d0d", borderColor: "#1f1f1f" }}
              >
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
