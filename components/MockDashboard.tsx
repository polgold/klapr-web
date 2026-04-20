const kanbanColors = [
  { bg: "#1f2937", textColor: "#9ca3af" },
  { bg: "#1e3a5f", textColor: "#93c5fd" },
  { bg: "#14532d", textColor: "#86efac" },
];

const kanbanCards = [
  ["Campaña Honda", "Spot TV Claro"],
  ["Videoclip Los Palmeras", "Docu Noroeste"],
  ["Marca Quilmes 2026"],
];

interface MockDashboardProps {
  sidebarLabels: string[];
  columnLabels: string[];
  newLabel: string;
}

export function MockDashboard({ sidebarLabels, columnLabels, newLabel }: MockDashboardProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-2xl shadow-black/60"
      style={{ background: "#111", border: "1px solid #2a2a2a" }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ background: "#1a1a1a", borderBottom: "1px solid #2a2a2a" }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: "#ef4444" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#eab308" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#22c55e" }} />
        <span className="ml-4 text-xs text-gray-500 font-mono">app.klapr.io</span>
      </div>

      {/* App body */}
      <div className="flex h-64 sm:h-80">
        {/* Sidebar */}
        <div
          className="w-40 flex-shrink-0 flex flex-col p-3 gap-0.5"
          style={{ background: "#0d0d0d", borderRight: "1px solid #1f1f1f" }}
        >
          <div className="text-sm font-black mb-3 px-2" style={{ color: "var(--brand)" }}>
            klapr
          </div>
          {sidebarLabels.map((label, i) => (
            <div
              key={label}
              className="text-xs px-2 py-1.5 rounded-md flex items-center gap-2"
              style={{
                background: i === 1 ? "#1e1e1e" : "transparent",
                color: i === 1 ? "#fff" : "#6b7280",
              }}
            >
              <span
                className="w-2 h-2 rounded-sm flex-shrink-0"
                style={{ background: i === 1 ? "var(--brand)" : "#2a2a2a" }}
              />
              {label}
            </div>
          ))}
        </div>

        {/* Kanban board */}
        <div className="flex-1 p-4 overflow-hidden flex flex-col min-w-0">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-white">{sidebarLabels[2]}</span>
            <span
              className="text-xs px-2 py-0.5 rounded font-medium cursor-default"
              style={{ background: "var(--brand)", color: "#0A0A0A" }}
            >
              {newLabel}
            </span>
          </div>

          <div className="flex gap-2 flex-1 min-h-0">
            {columnLabels.map((label, i) => (
              <div key={label} className="flex-1 flex flex-col gap-1.5 min-w-0">
                <div
                  className="text-xs font-medium px-2 py-1 rounded-md flex-shrink-0"
                  style={{ background: kanbanColors[i]?.bg ?? "#1f2937", color: kanbanColors[i]?.textColor ?? "#9ca3af" }}
                >
                  {label}
                </div>
                {(kanbanCards[i] ?? []).map((card) => (
                  <div
                    key={card}
                    className="text-xs px-2 py-2 rounded-md truncate"
                    style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#d1d5db" }}
                  >
                    {card}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
