import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Wizard } from "@/components/Wizard";
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
  const t = await getTranslations({ locale, namespace: "Wizard" });
  return {
    title: t("title"),
    description: t("sub"),
  };
}

export default async function WizardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Wizard />
    </div>
  );
}
