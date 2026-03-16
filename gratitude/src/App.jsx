import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const ACCENT = "#5046e5";
const ACCENT_HOVER = "#6058f0";
const CATEGORIES = ["people", "food", "places", "experiences", "work"];
const CAT_COLORS = {
  people: { bg: "#1e1a3a", border: "#3d3489", text: "#afa9ec" },
  food: { bg: "#2a1f0a", border: "#854f0b", text: "#fac775" },
  places: { bg: "#0a2a1e", border: "#0f6e56", text: "#5dcaa5" },
  experiences: { bg: "#2a0a1a", border: "#993556", text: "#ed93b1" },
  work: { bg: "#0a1a2a", border: "#185fa5", text: "#85b7eb" },
};
const CAT_COLORS_LIGHT = {
  people: { bg: "#eeedfe", border: "#cecbf6", text: "#3c3489" },
  food: { bg: "#faeeda", border: "#fac775", text: "#633806" },
  places: { bg: "#e1f5ee", border: "#9fe1cb", text: "#085041" },
  experiences: { bg: "#fbeaf0", border: "#f4c0d1", text: "#72243e" },
  work: { bg: "#e6f1fb", border: "#b5d4f4", text: "#0c447c" },
};
const CHART_COLORS = ["#5046e5", "#fac775", "#5dcaa5", "#ed93b1", "#85b7eb", "#888780"];

const generateId = () => Math.random().toString(36).substr(2, 9);

const parseDateHeader = (line) => {
  const patterns = [
    /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})(?:,?\s+(\d{4}))?$/i,
    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2})(?:,?\s+(\d{4}))?$/i,
  ];
  const monthMap = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
  };
  for (const p of patterns) {
    const m = line.trim().match(p);
    if (m) {
      const month = monthMap[m[2].toLowerCase()];
      const day = parseInt(m[3]);
      const year = m[4] ? parseInt(m[4]) : new Date().getFullYear();
      const d = new Date(year, month, day);
      if (!isNaN(d.getTime())) return d;
    }
  }
  return null;
};

const formatDateKey = (d) => {
  const date = d instanceof Date ? d : new Date(d);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

const formatDateDisplay = (dateStr) => {
  const d = new Date(dateStr + "T12:00:00");
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
};

const isToday = (dateStr) => formatDateKey(new Date()) === dateStr;

const loadData = () => {
  try {
    const raw = localStorage.getItem("gratitude_entries");
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

const saveData = (entries) => {
  localStorage.setItem("gratitude_entries", JSON.stringify(entries));
};

// ─── Components ───

function CategoryPill({ category, isDark }) {
  const colors = isDark ? CAT_COLORS[category] : CAT_COLORS_LIGHT[category];
  if (!colors) return null;
  return (
    <span style={{
      fontSize: 11, padding: "2px 10px", borderRadius: 99,
      background: colors.bg, border: `1px solid ${colors.border}`,
      color: colors.text, flexShrink: 0, whiteSpace: "nowrap",
      fontWeight: 500, letterSpacing: 0.2,
    }}>
      {category}
    </span>
  );
}

function EntryRow({ entry, onUpdate, onDelete, isDark }) {
  const [expanded, setExpanded] = useState(false);
  const [editText, setEditText] = useState(entry.text);
  const [editCat, setEditCat] = useState(entry.category || "");
  const inputRef = useRef(null);

  useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    }
  }, [expanded]);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate({ ...entry, text: editText.trim(), category: editCat || null });
    }
    setExpanded(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSave(); }
    if (e.key === "Escape") { setExpanded(false); setEditText(entry.text); setEditCat(entry.category || ""); }
  };

  if (expanded) {
    return (
      <div style={{
        background: isDark ? "#1a1a1a" : "#f5f5f3", borderRadius: 10,
        padding: 12, transition: "all 0.15s ease",
      }}>
        <textarea
          ref={inputRef}
          value={editText}
          onChange={(e) => { setEditText(e.target.value); e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px"; }}
          onKeyDown={handleKeyDown}
          rows={1}
          style={{
            width: "100%", background: isDark ? "#141414" : "#fff",
            border: `1px solid ${isDark ? "#333" : "#ddd"}`, borderRadius: 8,
            padding: "10px 12px", fontSize: 14, color: isDark ? "#fff" : "#1a1a1a",
            resize: "none", fontFamily: "inherit", lineHeight: 1.4,
            boxSizing: "border-box", outline: "none",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <select
              value={editCat}
              onChange={(e) => setEditCat(e.target.value)}
              style={{
                background: isDark ? "#141414" : "#fff",
                border: `1px solid ${isDark ? "#333" : "#ddd"}`, borderRadius: 6,
                padding: "5px 8px", fontSize: 12, color: isDark ? "#999" : "#666",
                fontFamily: "inherit", outline: "none", cursor: "pointer",
              }}
            >
              <option value="">No category</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <button
              onClick={() => { onDelete(entry.id); setExpanded(false); }}
              style={{
                fontSize: 12, padding: "5px 12px", borderRadius: 8,
                background: "transparent", border: `1px solid ${isDark ? "#3a1515" : "#f0c0c0"}`,
                color: "#e24b4a", cursor: "pointer", fontFamily: "inherit",
              }}
            >
              Delete
            </button>
          </div>
          <button
            onClick={handleSave}
            style={{
              fontSize: 12, padding: "5px 16px", borderRadius: 8,
              background: ACCENT, color: "#fff", border: "none",
              cursor: "pointer", fontWeight: 500, fontFamily: "inherit",
            }}
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => { setExpanded(true); setEditText(entry.text); setEditCat(entry.category || ""); }}
      style={{
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        padding: "10px 12px", background: isDark ? "#141414" : "#fff",
        borderRadius: 8, gap: 10, cursor: "pointer",
        transition: "background 0.1s ease",
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = isDark ? "#1a1a1a" : "#f8f8f6"}
      onMouseLeave={(e) => e.currentTarget.style.background = isDark ? "#141414" : "#fff"}
    >
      <span style={{ fontSize: 14, color: isDark ? "#e0e0e0" : "#2a2a2a", lineHeight: 1.4, flex: 1 }}>
        {entry.text}
      </span>
      {entry.category && <CategoryPill category={entry.category} isDark={isDark} />}
    </div>
  );
}

function DaySection({ dateStr, entries, onUpdate, onDelete, isDark }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{
        fontSize: 11, fontWeight: 500, color: isDark ? "#666" : "#999",
        letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 8,
        paddingLeft: 2, display: "flex", alignItems: "center", gap: 8,
      }}>
        {formatDateDisplay(dateStr)}
        {isToday(dateStr) && (
          <span style={{
            fontSize: 10, padding: "2px 8px", borderRadius: 99,
            background: ACCENT, color: "#fff", fontWeight: 500,
            letterSpacing: 0, textTransform: "none",
          }}>today</span>
        )}
        <span style={{ fontSize: 11, color: isDark ? "#444" : "#bbb", fontWeight: 400, letterSpacing: 0 }}>
          {entries.length} {entries.length === 1 ? "entry" : "entries"}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {entries.map((entry) => (
          <EntryRow key={entry.id} entry={entry} onUpdate={onUpdate} onDelete={onDelete} isDark={isDark} />
        ))}
      </div>
    </div>
  );
}

function MetricsChart({ entries, isDark }) {
  const [range, setRange] = useState("7D");
  const ranges = { "7D": 7, "1M": 30, "3M": 90, "1Y": 365 };
  const days = ranges[range];

  const chartData = useMemo(() => {
    const today = new Date();
    const data = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = formatDateKey(d);
      const dayEntries = entries.filter((e) => e.date === key);
      const catCounts = {};
      dayEntries.forEach((e) => {
        const cat = e.category || "uncategorized";
        catCounts[cat] = (catCounts[cat] || 0) + 1;
      });
      data.push({ date: key, total: dayEntries.length, cats: catCounts });
    }
    return data;
  }, [entries, days]);

  const maxVal = Math.max(...chartData.map((d) => d.total), 1);
  const allCats = [...new Set(entries.map((e) => e.category || "uncategorized"))];

  return (
    <div>
      <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
        {Object.keys(ranges).map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            style={{
              fontSize: 11, padding: "3px 10px", borderRadius: 6,
              background: range === r ? ACCENT : "transparent",
              color: range === r ? "#fff" : (isDark ? "#666" : "#999"),
              border: range === r ? "none" : `1px solid ${isDark ? "#2a2a2a" : "#ddd"}`,
              cursor: "pointer", fontWeight: 500, fontFamily: "inherit",
            }}
          >
            {r}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: days > 30 ? 1 : 3, height: 80 }}>
        {chartData.map((d, i) => {
          const h = d.total > 0 ? Math.max((d.total / maxVal) * 72, 4) : 0;
          const segments = [];
          let offset = 0;
          allCats.forEach((cat, ci) => {
            const count = d.cats[cat] || 0;
            if (count > 0) {
              const segH = (count / d.total) * h;
              segments.push({ color: CHART_COLORS[ci % CHART_COLORS.length], height: segH, offset });
              offset += segH;
            }
          });
          if (segments.length === 0 && d.total > 0) {
            segments.push({ color: ACCENT, height: h, offset: 0 });
          }
          return (
            <div key={i} style={{ flex: 1, height: 80, display: "flex", flexDirection: "column", justifyContent: "flex-end", position: "relative" }}
              title={`${formatDateDisplay(d.date)}: ${d.total} entries`}
            >
              <div style={{ height: h, borderRadius: "2px 2px 0 0", overflow: "hidden", position: "relative" }}>
                {segments.map((s, si) => (
                  <div key={si} style={{
                    position: "absolute", bottom: s.offset, left: 0, right: 0,
                    height: s.height, background: s.color,
                  }} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {days <= 7 && (
        <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
          {chartData.map((d, i) => (
            <div key={i} style={{ flex: 1, fontSize: 9, color: isDark ? "#444" : "#bbb", textAlign: "center" }}>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date(d.date + "T12:00:00").getDay()]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MetricsSidebar({ entries, isDark }) {
  const weekEntries = useMemo(() => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoKey = formatDateKey(weekAgo);
    return entries.filter((e) => e.date > weekAgoKey);
  }, [entries]);

  const prevWeekEntries = useMemo(() => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const twoWeeksAgo = new Date(today);
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    const weekAgoKey = formatDateKey(weekAgo);
    const twoWeeksAgoKey = formatDateKey(twoWeeksAgo);
    return entries.filter((e) => e.date > twoWeeksAgoKey && e.date <= weekAgoKey);
  }, [entries]);

  const streak = useMemo(() => {
    let count = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = formatDateKey(d);
      if (entries.some((e) => e.date === key)) count++;
      else break;
    }
    return count;
  }, [entries]);

  const topCats = useMemo(() => {
    const counts = {};
    entries.forEach((e) => {
      if (e.category) counts[e.category] = (counts[e.category] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [entries]);

  const delta = prevWeekEntries.length > 0
    ? Math.round(((weekEntries.length - prevWeekEntries.length) / prevWeekEntries.length) * 100)
    : null;

  const cardStyle = {
    background: isDark ? "#141414" : "#fff", borderRadius: 10,
    padding: "14px 16px", marginBottom: 12,
    border: `0.5px solid ${isDark ? "#1f1f1f" : "#eee"}`,
  };
  const labelStyle = {
    fontSize: 11, color: isDark ? "#666" : "#999", textTransform: "uppercase",
    letterSpacing: 0.5, marginBottom: 10, fontWeight: 500,
  };

  return (
    <div style={{ width: 220 }}>
      <div style={cardStyle}>
        <div style={labelStyle}>This week</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
          <span style={{ fontSize: 22, fontWeight: 600, color: isDark ? "#fff" : "#1a1a1a" }}>
            {weekEntries.length}
          </span>
{/*          {delta !== null && (
            <span style={{ fontSize: 11, color: delta >= 0 ? "#28c840" : "#e24b4a" }}>
              {delta >= 0 ? "+" : ""}{delta}% vs last week
            </span>
          )}*/}
        </div>
        <MetricsChart entries={entries} isDark={isDark} />
      </div>
      <div style={cardStyle}>
        <div style={labelStyle}>Streak</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 22, fontWeight: 600, color: isDark ? "#fff" : "#1a1a1a" }}>{streak}</span>
          <span style={{ fontSize: 12, color: isDark ? "#666" : "#999" }}>
            {streak === 1 ? "day" : "days"} in a row
          </span>
        </div>
      </div>
      {topCats.length > 0 && (
        <div style={cardStyle}>
          <div style={labelStyle}>Top categories</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {topCats.map(([cat, count]) => (
              <div key={cat} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <CategoryPill category={cat} isDark={isDark} />
                <span style={{ fontSize: 12, color: isDark ? "#555" : "#aaa" }}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MetricsFullPage({ entries, isDark }) {
  const totalEntries = entries.length;
  const daysWithEntries = [...new Set(entries.map((e) => e.date))].length;
  const avgPerDay = daysWithEntries > 0 ? (totalEntries / daysWithEntries).toFixed(1) : "0";

  const cardStyle = {
    background: isDark ? "#141414" : "#fff", borderRadius: 10,
    padding: "14px 16px", border: `0.5px solid ${isDark ? "#1f1f1f" : "#eee"}`,
  };
  const labelStyle = {
    fontSize: 11, color: isDark ? "#666" : "#999", textTransform: "uppercase",
    letterSpacing: 0.5, marginBottom: 6, fontWeight: 500,
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
        <div style={cardStyle}>
          <div style={labelStyle}>Total</div>
          <div style={{ fontSize: 22, fontWeight: 600, color: isDark ? "#fff" : "#1a1a1a" }}>{totalEntries}</div>
        </div>
        <div style={cardStyle}>
          <div style={labelStyle}>Days</div>
          <div style={{ fontSize: 22, fontWeight: 600, color: isDark ? "#fff" : "#1a1a1a" }}>{daysWithEntries}</div>
        </div>
        <div style={cardStyle}>
          <div style={labelStyle}>Avg/day</div>
          <div style={{ fontSize: 22, fontWeight: 600, color: isDark ? "#fff" : "#1a1a1a" }}>{avgPerDay}</div>
        </div>
      </div>
      <div style={cardStyle}>
        <div style={labelStyle}>Entries over time</div>
        <div style={{ marginTop: 8 }}>
          <MetricsChart entries={entries} isDark={isDark} />
        </div>
      </div>
    </div>
  );
}

function BulkImportModal({ onImport, onClose, isDark }) {
  const [text, setText] = useState("");
  const [preview, setPreview] = useState(null);

  const handleParse = () => {
    const lines = text.split("\n");
    const entries = [];
    let currentDate = null;
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      const parsed = parseDateHeader(trimmed);
      if (parsed) {
        currentDate = formatDateKey(parsed);
      } else if (currentDate) {
        entries.push({ id: generateId(), text: trimmed, date: currentDate, category: null, createdAt: Date.now() });
      }
    }
    setPreview(entries);
  };

  const groupedPreview = useMemo(() => {
    if (!preview) return {};
    const grouped = {};
    preview.forEach((e) => {
      if (!grouped[e.date]) grouped[e.date] = [];
      grouped[e.date].push(e);
    });
    return grouped;
  }, [preview]);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 1000, padding: 20,
    }} onClick={onClose}>
      <div
        style={{
          background: isDark ? "#1a1a1a" : "#fff", borderRadius: 16,
          padding: 24, maxWidth: 520, width: "100%", maxHeight: "80vh",
          overflow: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: isDark ? "#fff" : "#1a1a1a", margin: 0 }}>
            Import from Notes
          </h2>
          <button onClick={onClose} style={{
            background: "none", border: "none", fontSize: 20,
            color: isDark ? "#666" : "#999", cursor: "pointer",
          }}>x</button>
        </div>

        {!preview ? (
          <>
            <p style={{ fontSize: 13, color: isDark ? "#888" : "#666", marginBottom: 12, lineHeight: 1.5 }}>
              Paste your Notes content below. Date headers like "Sunday March 8" will be detected automatically.
              Each line after a date becomes one entry.
            </p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={"Saturday March 7\nSophia days\nSeeing new stuff\nUFC\n\nSunday March 8\nThe_PACK\nThe most beautiful sunset"}
              rows={12}
              style={{
                width: "100%", background: isDark ? "#141414" : "#f5f5f3",
                border: `1px solid ${isDark ? "#333" : "#ddd"}`, borderRadius: 10,
                padding: 14, fontSize: 14, color: isDark ? "#e0e0e0" : "#2a2a2a",
                resize: "vertical", fontFamily: "inherit", lineHeight: 1.5,
                boxSizing: "border-box", outline: "none",
              }}
            />
            <div style={{ display: "flex", gap: 8, marginTop: 14, justifyContent: "flex-end" }}>
              <button onClick={onClose} style={{
                padding: "8px 18px", borderRadius: 8, border: `1px solid ${isDark ? "#333" : "#ddd"}`,
                background: "transparent", color: isDark ? "#999" : "#666",
                cursor: "pointer", fontSize: 13, fontFamily: "inherit",
              }}>Cancel</button>
              <button onClick={handleParse} disabled={!text.trim()} style={{
                padding: "8px 18px", borderRadius: 8, border: "none",
                background: text.trim() ? ACCENT : (isDark ? "#2a2a2a" : "#eee"),
                color: text.trim() ? "#fff" : (isDark ? "#555" : "#bbb"),
                cursor: text.trim() ? "pointer" : "default",
                fontSize: 13, fontWeight: 500, fontFamily: "inherit",
              }}>Preview import</button>
            </div>
          </>
        ) : (
          <>
            <p style={{ fontSize: 13, color: isDark ? "#888" : "#666", marginBottom: 16, lineHeight: 1.5 }}>
              Found <strong style={{ color: isDark ? "#fff" : "#1a1a1a" }}>{preview.length} entries</strong> across{" "}
              <strong style={{ color: isDark ? "#fff" : "#1a1a1a" }}>{Object.keys(groupedPreview).length} days</strong>.
            </p>
            <div style={{
              maxHeight: 300, overflow: "auto", background: isDark ? "#141414" : "#f5f5f3",
              borderRadius: 10, padding: 14,
            }}>
              {Object.entries(groupedPreview).sort((a, b) => b[0].localeCompare(a[0])).map(([date, ents]) => (
                <div key={date} style={{ marginBottom: 14 }}>
                  <div style={{
                    fontSize: 11, fontWeight: 500, color: isDark ? "#666" : "#999",
                    letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 4,
                  }}>{formatDateDisplay(date)}</div>
                  {ents.map((e, i) => (
                    <div key={i} style={{ fontSize: 13, color: isDark ? "#ccc" : "#444", padding: "3px 0", lineHeight: 1.4 }}>
                      {e.text}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 14, justifyContent: "flex-end" }}>
              <button onClick={() => setPreview(null)} style={{
                padding: "8px 18px", borderRadius: 8, border: `1px solid ${isDark ? "#333" : "#ddd"}`,
                background: "transparent", color: isDark ? "#999" : "#666",
                cursor: "pointer", fontSize: 13, fontFamily: "inherit",
              }}>Back</button>
              <button onClick={() => { onImport(preview); onClose(); }} style={{
                padding: "8px 18px", borderRadius: 8, border: "none",
                background: ACCENT, color: "#fff", cursor: "pointer",
                fontSize: 13, fontWeight: 500, fontFamily: "inherit",
              }}>Import {preview.length} entries</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function SettingsPage({ entries, isDark, onImportClick }) {
  const handleExport = () => {
    const data = JSON.stringify(entries, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gratitude-backup-${formatDateKey(new Date())}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          if (Array.isArray(data)) {
            saveData(data);
            window.location.reload();
          }
        } catch { alert("Invalid JSON file"); }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const btnStyle = {
    display: "block", width: "100%", padding: "12px 16px", borderRadius: 10,
    border: `1px solid ${isDark ? "#2a2a2a" : "#ddd"}`, background: isDark ? "#141414" : "#fff",
    color: isDark ? "#e0e0e0" : "#2a2a2a", fontSize: 14, cursor: "pointer",
    fontFamily: "inherit", textAlign: "left", marginBottom: 8,
  };
  const descStyle = { fontSize: 12, color: isDark ? "#666" : "#999", marginTop: 4 };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 14, fontWeight: 500, color: isDark ? "#888" : "#666", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
          Data
        </h3>
        <button style={btnStyle} onClick={onImportClick}>
          Import from Notes
          <div style={descStyle}>Paste text from your phone's Notes app</div>
        </button>
        <button style={btnStyle} onClick={handleExport}>
          Export as JSON
          <div style={descStyle}>Download a backup of all {entries.length} entries</div>
        </button>
        <button style={btnStyle} onClick={handleImportJSON}>
          Import from JSON
          <div style={descStyle}>Restore from a previous backup file</div>
        </button>
      </div>
      <div>
        <h3 style={{ fontSize: 14, fontWeight: 500, color: isDark ? "#888" : "#666", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
          About
        </h3>
        <div style={{
          padding: "14px 16px", borderRadius: 10,
          background: isDark ? "#141414" : "#fff",
          border: `1px solid ${isDark ? "#2a2a2a" : "#ddd"}`,
          fontSize: 13, color: isDark ? "#888" : "#666", lineHeight: 1.6,
        }}>
          Gratitude Journal — a tool Chris uses to track what he's grateful for
          <br /><br />
        </div>
      </div>
    </div>
  );
}

// ─── Main App ───

export default function GratitudeApp() {
  const [entries, setEntries] = useState(loadData);
  const [newEntry, setNewEntry] = useState("");
  const [tab, setTab] = useState("journal");
  const [showImport, setShowImport] = useState(false);
  const inputRef = useRef(null);

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setIsDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => { saveData(entries); }, [entries]);

  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const handleAdd = useCallback(() => {
    if (!newEntry.trim()) return;
    const entry = {
      id: generateId(),
      text: newEntry.trim(),
      date: formatDateKey(new Date()),
      category: null,
      createdAt: Date.now(),
    };
    setEntries((prev) => [entry, ...prev]);
    setNewEntry("");
    inputRef.current?.focus();
  }, [newEntry]);

  const handleUpdate = useCallback((updated) => {
    setEntries((prev) => prev.map((e) => e.id === updated.id ? updated : e));
  }, []);

  const handleDelete = useCallback((id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const handleBulkImport = useCallback((newEntries) => {
    setEntries((prev) => {
      const existingTexts = new Set(prev.map((e) => `${e.date}:${e.text}`));
      const unique = newEntries.filter((e) => !existingTexts.has(`${e.date}:${e.text}`));
      return [...prev, ...unique].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt);
    });
  }, []);

  const groupedEntries = useMemo(() => {
    const grouped = {};
    entries.forEach((e) => {
      if (!grouped[e.date]) grouped[e.date] = [];
      grouped[e.date].push(e);
    });
    return Object.entries(grouped).sort((a, b) => b[0].localeCompare(a[0]));
  }, [entries]);

  const bg = isDark ? "#0f0f0f" : "#fafaf8";
  const headerBg = isDark ? "#0f0f0f" : "#fafaf8";

  const journalContent = (
    <>
      <div style={{ padding: isMobile ? "0 16px 16px" : "0 0 20px" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            ref={inputRef}
            type="text"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }}
            placeholder="What are you grateful for?"
            style={{
              flex: 1, background: isDark ? "#1a1a1a" : "#f0f0ee",
              border: `1px solid ${isDark ? "#2a2a2a" : "#e0e0dd"}`,
              borderRadius: 10, padding: "11px 14px", fontSize: 14,
              color: isDark ? "#fff" : "#1a1a1a", outline: "none",
              fontFamily: "inherit",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => e.target.style.borderColor = ACCENT}
            onBlur={(e) => e.target.style.borderColor = isDark ? "#2a2a2a" : "#e0e0dd"}
          />
          <button
            onClick={handleAdd}
            style={{
              width: 38, height: 38, borderRadius: 10, background: ACCENT,
              border: "none", cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center", flexShrink: 0,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = ACCENT_HOVER}
            onMouseLeave={(e) => e.currentTarget.style.background = ACCENT}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M3 8h10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
      <div style={{ padding: isMobile ? "0 16px" : 0 }}>
        {groupedEntries.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "60px 20px",
            color: isDark ? "#444" : "#bbb", fontSize: 14,
          }}>
            No entries yet. Start logging what you're grateful for!
          </div>
        ) : (
          groupedEntries.map(([date, ents], i) => (
            <div key={date}>
              {i > 0 && <div style={{ height: 1, background: isDark ? "#1a1a1a" : "#eee", margin: "4px 0 16px" }} />}
              <DaySection dateStr={date} entries={ents} onUpdate={handleUpdate} onDelete={handleDelete} isDark={isDark} />
            </div>
          ))
        )}
      </div>
    </>
  );

  const tabIcon = (name, isActive) => {
    const color = isActive ? "#fff" : "#555";
    if (name === "journal") return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h10" stroke={color} strokeWidth="1.5" strokeLinecap="round" /></svg>;
    if (name === "metrics") return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="12" width="4" height="8" rx="1" stroke={color} strokeWidth="1.5" /><rect x="10" y="8" width="4" height="12" rx="1" stroke={color} strokeWidth="1.5" /><rect x="17" y="4" width="4" height="16" rx="1" stroke={color} strokeWidth="1.5" /></svg>;
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" /><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M8.34 15.66l-1.41 1.41m12.14 0l-1.41-1.41M8.34 8.34L6.93 6.93" stroke={color} strokeWidth="1.5" strokeLinecap="round" /></svg>;
  };

  // ─── Mobile Layout ───
  if (isMobile) {
    return (
      <div style={{
        minHeight: "100vh", background: bg, fontFamily: "'DM Sans', -apple-system, sans-serif",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ padding: "12px 20px 8px" }}>
          <span style={{ fontSize: 20, fontWeight: 600, color: isDark ? "#fff" : "#1a1a1a", letterSpacing: -0.3 }}>
            Gratitude
          </span>
        </div>
        <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
          {tab === "journal" && journalContent}
          {tab === "metrics" && <div style={{ padding: "0 16px" }}><MetricsFullPage entries={entries} isDark={isDark} /></div>}
          {tab === "settings" && <div style={{ padding: "0 16px" }}><SettingsPage entries={entries} isDark={isDark} onImportClick={() => setShowImport(true)} /></div>}
        </div>
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          display: "flex", justifyContent: "space-around", alignItems: "center",
          padding: "10px 0 env(safe-area-inset-bottom, 20px)",
          borderTop: `1px solid ${isDark ? "#1a1a1a" : "#eee"}`,
          background: bg,
        }}>
          {["journal", "metrics", "settings"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                background: "none", border: "none", cursor: "pointer",
                fontSize: 10, fontWeight: 500, fontFamily: "inherit",
                color: tab === t ? (isDark ? "#fff" : "#1a1a1a") : "#555",
                padding: "4px 16px",
              }}
            >
              {tabIcon(t, tab === t)}
              <span style={{ textTransform: "capitalize" }}>{t}</span>
            </button>
          ))}
        </div>
        {showImport && <BulkImportModal onImport={handleBulkImport} onClose={() => setShowImport(false)} isDark={isDark} />}
      </div>
    );
  }

  // ─── Desktop Layout ───
  return (
    <div style={{
      minHeight: "100vh", background: bg, fontFamily: "'DM Sans', -apple-system, sans-serif",
    }}>
      <div style={{
        display: "flex", alignItems: "baseline", justifyContent: "space-between",
        maxWidth: 760, margin: "0 auto", padding: "24px 24px 0",
      }}>
        <span style={{ fontSize: 22, fontWeight: 600, color: isDark ? "#fff" : "#1a1a1a", letterSpacing: -0.3 }}>
          Gratitude
        </span>
        <div style={{ display: "flex", gap: 24 }}>
          {["journal", "metrics", "settings"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 13, fontFamily: "inherit", textTransform: "capitalize",
                color: tab === t ? (isDark ? "#fff" : "#1a1a1a") : (isDark ? "#555" : "#aaa"),
                fontWeight: tab === t ? 500 : 400, padding: 0,
                borderBottom: tab === t ? `1.5px solid ${isDark ? "#fff" : "#1a1a1a"}` : "1.5px solid transparent",
                paddingBottom: 2,
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        maxWidth: 760, margin: "0 auto", padding: "24px 24px 60px",
        display: "flex", gap: 32,
      }}>
        {tab === "journal" && (
          <>
            <div style={{ flex: 1, minWidth: 0 }}>
              {journalContent}
            </div>
            <MetricsSidebar entries={entries} isDark={isDark} />
          </>
        )}
        {tab === "metrics" && <div style={{ flex: 1 }}><MetricsFullPage entries={entries} isDark={isDark} /></div>}
        {tab === "settings" && <div style={{ flex: 1 }}><SettingsPage entries={entries} isDark={isDark} onImportClick={() => setShowImport(true)} /></div>}
      </div>
      {showImport && <BulkImportModal onImport={handleBulkImport} onClose={() => setShowImport(false)} isDark={isDark} />}
    </div>
  );
}
