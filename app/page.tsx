import { redirect } from "next/navigation";

// Middleware handles / → /es, but this is a fallback.
export default function RootPage() {
  redirect("/es");
}
