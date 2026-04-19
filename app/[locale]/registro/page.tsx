"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function RegistroPage() {
  const t = useTranslations("Signup");

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "https://app.klapr.com/signup";
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "var(--bg)" }}
    >
      <div className="text-center">
        <span className="text-5xl font-black tracking-tight" style={{ color: "var(--brand)" }}>
          klapr
        </span>
        <div className="mt-10 flex flex-col items-center gap-4">
          <div
            className="w-10 h-10 rounded-full border-2 animate-spin"
            style={{ borderColor: "var(--brand)", borderTopColor: "transparent" }}
          />
          <p className="text-lg font-medium text-white">{t("creating")}</p>
          <p className="text-sm text-gray-500">{t("redirecting")}</p>
        </div>
      </div>
    </div>
  );
}
