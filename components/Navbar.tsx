"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";

export function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const switchLocale = () => {
    router.replace(pathname, { locale: locale === "es" ? "en" : "es" });
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b border-gray-800"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight"
            style={{ color: "var(--brand)" }}
          >
            klapr
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/funcionalidades"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {t("features")}
            </Link>
            <Link
              href="/precios"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {t("pricing")}
            </Link>
            <button
              onClick={switchLocale}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors px-2 py-1 rounded border border-gray-700 hover:border-gray-500"
              aria-label={`Switch to ${t("langSwitch")}`}
            >
              {t("langSwitch")}
            </button>
            <Link
              href="/registro"
              className="text-sm font-semibold px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
              style={{ background: "var(--brand)", color: "#0A0A0A" }}
            >
              {t("cta")}
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-gray-400 hover:text-white transition-colors p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-1 border-t border-gray-800 pt-4">
            <Link
              href="/funcionalidades"
              className="text-sm text-gray-400 hover:text-white px-3 py-3 rounded-lg hover:bg-gray-900 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {t("features")}
            </Link>
            <Link
              href="/precios"
              className="text-sm text-gray-400 hover:text-white px-3 py-3 rounded-lg hover:bg-gray-900 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {t("pricing")}
            </Link>
            <button
              onClick={() => { switchLocale(); setMenuOpen(false); }}
              className="text-sm font-medium text-gray-400 hover:text-white px-3 py-3 rounded-lg hover:bg-gray-900 transition-colors text-left border border-gray-800"
            >
              {t("langSwitch")}
            </button>
            <Link
              href="/registro"
              className="text-sm font-semibold px-4 py-3 rounded-lg text-center transition-opacity hover:opacity-90 mt-2"
              style={{ background: "var(--brand)", color: "#0A0A0A" }}
              onClick={() => setMenuOpen(false)}
            >
              {t("cta")}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
