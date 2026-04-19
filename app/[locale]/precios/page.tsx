import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PricingClient } from "./PricingClient";
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
  const t = await getTranslations({ locale, namespace: "Pricing" });
  return {
    title: t("headline"),
    description: t("sub"),
  };
}

export default async function PreciosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Pricing");

  return (
    <div style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            {t("headline")}
          </h1>
          <p className="mt-4 text-gray-400 text-lg">{t("sub")}</p>
        </div>

        <PricingClient />

        <div
          className="mt-20 rounded-2xl p-10 sm:p-14 text-center"
          style={{ background: "#111", border: "1px solid #1f1f1f" }}
        >
          <h2 className="text-3xl font-black" style={{ color: "var(--brand)" }}>
            {t("ctaHeadline")}
          </h2>
          <p className="mt-3 text-gray-400 max-w-md mx-auto">{t("ctaSub")}</p>
          <Link
            href="/registro"
            className="mt-6 inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-lg transition-opacity hover:opacity-90"
            style={{ background: "var(--brand)", color: "#0A0A0A" }}
          >
            {t("ctaBtn")}
          </Link>
        </div>
      </div>
    </div>
  );
}
