import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"] as const,
  defaultLocale: "es",
  pathnames: {
    "/": "/",
    "/precios": {
      es: "/precios",
      en: "/pricing",
    },
    "/funcionalidades": {
      es: "/funcionalidades",
      en: "/features",
    },
    "/registro": {
      es: "/registro",
      en: "/signup",
    },
  },
});
