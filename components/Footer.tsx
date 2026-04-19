import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navbar");

  return (
    <footer className="border-t border-gray-800" style={{ background: "#111111" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="max-w-xs">
            <span className="text-2xl font-black tracking-tight" style={{ color: "var(--brand)" }}>
              klapr
            </span>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">{t("tagline")}</p>
          </div>

          <div className="flex flex-wrap gap-12">
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-white">{t("product")}</span>
              <Link href="/funcionalidades" className="text-sm text-gray-400 hover:text-white transition-colors">
                {tNav("features")}
              </Link>
              <Link href="/precios" className="text-sm text-gray-400 hover:text-white transition-colors">
                {tNav("pricing")}
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-white">{t("resources")}</span>
              <span className="text-sm text-gray-600 flex items-center gap-1.5">
                {t("blog")}
                <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "#1f1f1f", color: "#888" }}>
                  {t("comingSoon")}
                </span>
              </span>
              <a href="mailto:hola@klapr.com" className="text-sm text-gray-400 hover:text-white transition-colors">
                {t("contact")}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <span>{t("copyright")}</span>
          <span>{t("love")}</span>
        </div>
      </div>
    </footer>
  );
}
