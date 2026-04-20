import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
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
  const t = await getTranslations({ locale, namespace: "Docs" });
  return {
    title: t("title"),
    description: t("sub"),
  };
}

type Tutorial = {
  slug: string;
  category: string;
  icon: string;
  title: string;
  desc: string;
  time: string;
};

export default async function DocsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Docs");
  const tutorials = t.raw("tutorials") as Tutorial[];
  const categories = t.raw("categories") as Record<string, string>;

  const grouped = Object.entries(categories).map(([key, label]) => ({
    key,
    label,
    items: tutorials.filter((tut) => tut.category === key),
  }));

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-14">
          <h1 className="text-4xl sm:text-5xl font-black text-white">{t("title")}</h1>
          <p className="mt-3 text-gray-400 text-lg">{t("sub")}</p>
        </div>

        {/* Category groups */}
        <div className="flex flex-col gap-14">
          {grouped.map(({ key, label, items }) => (
            items.length === 0 ? null : (
              <div key={key}>
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-5">{label}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {items.map((tut) => (
                    <Link
                      key={tut.slug}
                      href={{ pathname: "/docs/[slug]", params: { slug: tut.slug } }}
                      className="group rounded-xl p-6 border flex items-start gap-4 hover:border-gray-600 transition-colors"
                      style={{ background: "#111", borderColor: "#1f1f1f" }}
                    >
                      <span className="text-3xl flex-shrink-0">{tut.icon}</span>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-white group-hover:text-yellow-300 transition-colors">{tut.title}</h3>
                        <p className="mt-1 text-sm text-gray-400 leading-relaxed">{tut.desc}</p>
                        <p className="mt-3 text-xs text-gray-600">⏱ {tut.time}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
