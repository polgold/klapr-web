import "./globals.css";
import type { ReactNode } from "react";

// Minimal shell — [locale]/layout.tsx provides <html> and <body>.
export default function RootLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
