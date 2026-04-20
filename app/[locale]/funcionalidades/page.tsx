import type { Metadata } from "next";
import type { ReactNode } from "react";
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
  const t = await getTranslations({ locale, namespace: "Features" });
  return {
    title: t("headerTitle"),
    description: t("headerSub"),
  };
}

function CRMMock({ statuses }: { statuses: string[] }) {
  const colors = ["#3b82f6", "#F7CC01", "#22c55e"];
  const clients = ["Hernán Rodríguez — Campaña Nike", "Laura Méndez — Spot TV Claro", "Carlos Vega — Docu Noroeste"];
  return (
    <div className="p-4 space-y-2">
      {clients.map((client, i) => (
        <div key={client} className="flex items-center justify-between rounded-lg px-3 py-2.5 text-xs" style={{ background: "#1a1a1a", borderLeft: `3px solid ${colors[i]}` }}>
          <span className="text-gray-300 truncate mr-4">{client}</span>
          <span className="text-gray-500 whitespace-nowrap flex-shrink-0">{statuses[i]}</span>
        </div>
      ))}
    </div>
  );
}

function KanbanMock({ columns }: { columns: string[] }) {
  const bgs = ["#1f2937", "#1e3a5f", "#14532d"];
  const texts = ["#9ca3af", "#93c5fd", "#86efac"];
  const cards = [["Campaña Adidas", "Spot Honda"], ["Videoclip Lali", "Docu Patagonia"], ["Marca Quilmes 2026"]];
  return (
    <div className="p-4 flex gap-2">
      {columns.map((col, i) => (
        <div key={col} className="flex-1 flex flex-col gap-1.5 min-w-0">
          <div className="text-xs font-medium px-2 py-1 rounded truncate" style={{ background: bgs[i], color: texts[i] }}>{col}</div>
          {(cards[i] ?? []).map((card) => (
            <div key={card} className="text-xs px-2 py-2 rounded truncate" style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#d1d5db" }}>{card}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

function AgendaMock() {
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  const highlighted: Record<number, string> = { 19: "var(--brand)", 22: "#1e3a5f", 25: "#14532d", 28: "#3b1f5f" };
  return (
    <div className="p-4">
      <div className="text-xs font-semibold text-gray-400 mb-3">Abril 2026</div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((d) => <div key={d} className="text-xs text-gray-600 py-1">{d}</div>)}
        {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
          const bg = highlighted[day];
          return (
            <div key={day} className="text-xs py-1.5 rounded" style={{ background: bg ?? "transparent", color: day === 19 ? "#0A0A0A" : bg ? "#fff" : "#6b7280", fontWeight: day === 19 ? "700" : "400" }}>
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EquipamientoMock() {
  const items = [
    { name: "Sony FX6", cat: "Cámara", serial: "SN-1234567", status: "operativo", color: "#22c55e" },
    { name: "DJI Mavic 3 Pro", cat: "Drone", serial: "SN-9876543", status: "operativo", color: "#22c55e" },
    { name: "Aputure 600D", cat: "Iluminación", serial: "SN-5551234", status: "en reparación", color: "#eab308" },
  ];
  return (
    <div className="p-4 space-y-2">
      {items.map((item) => (
        <div key={item.name} className="flex items-center justify-between rounded-lg px-3 py-2.5 text-xs" style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}>
          <div className="min-w-0 mr-3">
            <div className="text-gray-200 font-medium truncate">{item.name}</div>
            <div className="text-gray-600 font-mono text-[10px]">{item.serial}</div>
          </div>
          <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
            <span className="text-gray-500 text-[10px]">{item.cat}</span>
            <span className="text-[10px] font-medium" style={{ color: item.color }}>{item.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function CrewMock({ headers, exportBtn }: { headers: string[]; exportBtn: string }) {
  const crew = [
    { name: "Marcos Paz", rol: "Dir. de Foto", tarifa: "$350 USD/día" },
    { name: "Ana García", rol: "Sonidista", tarifa: "$180 USD/día" },
    { name: "Luis Torres", rol: "Gaffer", tarifa: "$150 USD/día" },
  ];
  return (
    <div className="p-4">
      <div className="flex text-xs text-gray-600 border-b border-gray-800 pb-2 gap-3 mb-2">
        {headers.map((h, i) => <span key={h} className={i === 0 ? "flex-1" : "w-24"}>{h}</span>)}
      </div>
      <div className="space-y-2">
        {crew.map((c) => (
          <div key={c.name} className="flex text-xs gap-3 items-center">
            <span className="flex-1 text-gray-300">{c.name}</span>
            <span className="w-24 text-gray-500 truncate">{c.rol}</span>
            <span className="w-24 text-gray-600 font-mono">{c.tarifa}</span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <span className="text-xs px-3 py-1.5 rounded cursor-default" style={{ background: "var(--brand)", color: "#0A0A0A" }}>{exportBtn}</span>
      </div>
    </div>
  );
}

function ImportarIAMock({ pasteLabel, pasteContent, resultLabel, results }: {
  pasteLabel: string; pasteContent: string; resultLabel: string;
  results: { name: string; rubro: string; web: string; ig: string }[];
}) {
  return (
    <div className="p-4 space-y-3">
      <div className="rounded-lg p-3 text-xs" style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}>
        <p className="text-gray-500 mb-1.5 font-medium">{pasteLabel}</p>
        <p className="text-gray-400 whitespace-pre-line font-mono text-[11px]">{pasteContent}</p>
      </div>
      <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--brand)" }}>
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--brand)" }} />
        Claude procesando...
      </div>
      <div className="space-y-1.5">
        <p className="text-xs text-gray-500 font-medium mb-1">{resultLabel}</p>
        {results.map((r) => (
          <div key={r.name} className="rounded-lg px-3 py-2 text-xs flex items-center justify-between" style={{ background: "#0f1f0f", border: "1px solid #1a3a1a" }}>
            <span className="text-gray-200 font-medium truncate mr-2">{r.name}</span>
            <span className="text-gray-500 text-[10px] whitespace-nowrap">{r.rubro} · {r.ig}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AFIPMock({ invoiceType, invoiceNumber, client, amount, cae }: {
  invoiceType: string; invoiceNumber: string; client: string; amount: string; cae: string;
}) {
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] text-gray-600 uppercase tracking-wide">{invoiceType}</p>
          <p className="text-base font-black text-white mt-0.5">{invoiceNumber}</p>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#14532d", color: "#86efac" }}>CAE ✓</span>
      </div>
      <div className="rounded-lg p-3 text-xs space-y-1" style={{ background: "#111", border: "1px solid #1a1a1a" }}>
        <p className="text-gray-400"><span className="text-gray-600">Cliente: </span>{client}</p>
        <p className="text-gray-400"><span className="text-gray-600">CAE: </span><span className="font-mono text-green-400">{cae}</span></p>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-gray-600">Total</p>
          <p className="text-lg font-black" style={{ color: "var(--brand)" }}>{amount}</p>
        </div>
        <span className="text-xs px-3 py-1.5 rounded-lg font-medium cursor-default" style={{ background: "var(--brand)", color: "#0A0A0A" }}>↓ PDF</span>
      </div>
    </div>
  );
}

function PresupuestosMock({ title, status, items, amounts, total }: {
  title: string; status: string; items: string[]; amounts: string[]; total: string;
}) {
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-white">{title}</p>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#1e3a5f", color: "#93c5fd" }}>{status}</span>
      </div>
      <div className="rounded-lg overflow-hidden" style={{ border: "1px solid #1a1a1a" }}>
        {items.map((item, i) => (
          <div key={item} className="flex items-center justify-between px-3 py-2 text-xs" style={{ background: i % 2 === 0 ? "#111" : "#0d0d0d", borderBottom: i < items.length - 1 ? "1px solid #1a1a1a" : "none" }}>
            <span className="text-gray-400 truncate mr-2">{item}</span>
            <span className="font-mono text-gray-300 flex-shrink-0">{amounts[i]}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-1">
        <span className="text-xs text-gray-500">Total</span>
        <span className="text-base font-black" style={{ color: "var(--brand)" }}>{total}</span>
      </div>
    </div>
  );
}

function MCPMock({ userMsg, aiMsg, typing }: { userMsg: string; aiMsg: string; typing: string }) {
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2 h-2 rounded-full bg-green-400" />
        <span className="text-[10px] text-gray-500 font-mono">KLAPR connector · activo</span>
      </div>
      <div className="text-xs rounded-xl px-3 py-2.5 max-w-[90%]" style={{ background: "#1e3a5f", color: "#93c5fd" }}>{userMsg}</div>
      <div className="text-xs rounded-xl px-3 py-2.5 ml-auto max-w-[90%] whitespace-pre-line" style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#d1d5db" }}>{aiMsg}</div>
      <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--brand)" }}>
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--brand)" }} />
        {typing}
      </div>
    </div>
  );
}

type ModuleMockLabels = {
  statuses?: string[]; columns?: string[]; headers?: string[]; exportBtn?: string;
  pasteLabel?: string; pasteContent?: string; resultLabel?: string;
  results?: { name: string; rubro: string; web: string; ig: string }[];
  invoiceType?: string; invoiceNumber?: string; client?: string; amount?: string; cae?: string;
  title?: string; status?: string; items?: string[]; amounts?: string[]; total?: string;
  userMsg?: string; aiMsg?: string; typing?: string;
};

type ModuleData = {
  icon: string; title: string; headline: string; problem: string; desc: string;
  bullets: string[]; mockLabels: ModuleMockLabels; isPro?: boolean;
};

type ComingSoonItem = { icon: string; title: string; desc: string };

function buildMockContent(index: number, labels: ModuleMockLabels): ReactNode {
  switch (index) {
    case 0: return <CRMMock statuses={labels.statuses ?? []} />;
    case 1: return <KanbanMock columns={labels.columns ?? []} />;
    case 2: return <AgendaMock />;
    case 3: return <EquipamientoMock />;
    case 4: return <CrewMock headers={labels.headers ?? []} exportBtn={labels.exportBtn ?? ""} />;
    case 5: return <ImportarIAMock pasteLabel={labels.pasteLabel ?? ""} pasteContent={labels.pasteContent ?? ""} resultLabel={labels.resultLabel ?? ""} results={labels.results ?? []} />;
    case 6: return <AFIPMock invoiceType={labels.invoiceType ?? ""} invoiceNumber={labels.invoiceNumber ?? ""} client={labels.client ?? ""} amount={labels.amount ?? ""} cae={labels.cae ?? ""} />;
    case 7: return <PresupuestosMock title={labels.title ?? ""} status={labels.status ?? ""} items={labels.items ?? []} amounts={labels.amounts ?? []} total={labels.total ?? ""} />;
    case 8: return <MCPMock userMsg={labels.userMsg ?? ""} aiMsg={labels.aiMsg ?? ""} typing={labels.typing ?? ""} />;
    default: return null;
  }
}

export default async function FuncionalidadesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Features");
  const modules = t.raw("modules") as ModuleData[];
  const comingSoonItems = t.raw("comingSoonItems") as ComingSoonItem[];

  return (
    <div style={{ background: "var(--bg)" }}>
      <section className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">{t("headerTitle")}</h1>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">{t("headerSub")}</p>
        </div>
      </section>

      {modules.map((mod, i) => (
        <section key={mod.title} style={{ background: i % 2 === 0 ? "#111111" : "var(--bg)" }} className="py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{mod.icon}</span>
                  {mod.isPro && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "var(--brand)", color: "#0A0A0A" }}>{t("proBadge")}</span>
                  )}
                </div>
                <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white">{mod.title}</h2>
                <p className="mt-1 text-base font-semibold" style={{ color: "var(--brand)" }}>{mod.headline}</p>
                <p className="mt-3 text-sm text-gray-500 italic leading-relaxed border-l-2 pl-3" style={{ borderColor: "#2a2a2a" }}>{mod.problem}</p>
                <p className="mt-4 text-gray-400 leading-relaxed">{mod.desc}</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {mod.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-gray-300">
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--brand)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Link href="/registro" className="mt-6 inline-flex items-center text-sm font-semibold transition-opacity hover:opacity-80" style={{ color: "var(--brand)" }}>
                  {t("tryFree")}
                </Link>
              </div>
              <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                <div className="rounded-xl overflow-hidden shadow-xl" style={{ background: "#0d0d0d", border: "1px solid #1f1f1f" }}>
                  <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#1a1a1a", borderBottom: "1px solid #2a2a2a" }}>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#eab308" }} />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e" }} />
                    <span className="ml-3 text-xs text-gray-600 font-mono">{mod.title.toLowerCase()}</span>
                  </div>
                  {buildMockContent(i, mod.mockLabels)}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section style={{ background: "#111111" }} className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: "#1f1f1f", color: "#888" }}>{t("comingSoonBadge")}</span>
            <h2 className="mt-4 text-2xl sm:text-3xl font-black text-white">{t("comingSoonTitle")}</h2>
            <p className="mt-2 text-gray-500">{t("comingSoonSub")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {comingSoonItems.map((item) => (
              <div key={item.title} className="rounded-xl p-6 border flex items-start gap-4 opacity-70" style={{ background: "#0d0d0d", borderColor: "#1a1a1a" }}>
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    {item.title}
                    <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "#1f1f1f", color: "#888" }}>{t("comingSoonBadge")}</span>
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg)" }} className="py-20">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black" style={{ color: "var(--brand)" }}>{t("ctaHeadline")}</h2>
          <p className="mt-3 text-gray-400">{t("ctaSub")}</p>
          <Link href="/registro" className="mt-6 inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-lg transition-opacity hover:opacity-90" style={{ background: "var(--brand)", color: "#0A0A0A" }}>
            {t("ctaBtn")}
          </Link>
        </div>
      </section>
    </div>
  );
}
