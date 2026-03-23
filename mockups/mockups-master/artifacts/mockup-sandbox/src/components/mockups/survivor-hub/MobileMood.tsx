import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Smile, TrendingUp, Home, Lock, ArrowUpRight } from "lucide-react";

const COLOR = "#EC4899";

const MOODS = [
  { emoji: "😄", label: "Great", value: 5, color: "#22C55E" },
  { emoji: "🙂", label: "Good", value: 4, color: "#84CC16" },
  { emoji: "😐", label: "Okay", value: 3, color: "#F59E0B" },
  { emoji: "😔", label: "Low", value: 2, color: "#F97316" },
  { emoji: "😢", label: "Struggling", value: 1, color: "#EF4444" },
];

const RESOURCES = [
  { title: "4-7-8 Breathing", type: "GentlePulse", color: "#14B8A6" },
  { title: "Crisis Text Line", type: "Emergency", color: "#EF4444" },
  { title: "Peer Chat", type: "Chyme", color: "#22C55E" },
];

const NAV = [
  { icon: Home, label: "Home", key: "home" },
  { icon: Smile, label: "Check-in", key: "checkin" },
  { icon: TrendingUp, label: "Trends", key: "trends" },
  { icon: Lock, label: "Private", key: "private" },
];

export function MobileMood() {
  const [activeNav, setActiveNav] = useState("checkin");
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ width: 390, height: "100%", minHeight: "100vh", background: "#0F1117", fontFamily: "'Inter', system-ui, sans-serif", color: "#E8EAF0", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 44, background: "#090B0F", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>9:41</div><div style={{ fontSize: 12, color: "#9CA3AF" }}>100%</div>
      </div>
      <div style={{ padding: "14px 20px 12px", background: "#090B0F", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${COLOR}30`, display: "flex", alignItems: "center", justifyContent: "center" }}><Smile size={18} style={{ color: COLOR }} /></div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#F9FAFB" }}>Mood</div>
            <div style={{ fontSize: 11, color: COLOR }}>100% anonymous check-ins</div>
          </div>
        </div>
        <div style={{ padding: "4px 10px", borderRadius: 20, background: `${COLOR}20`, border: `1px solid ${COLOR}35`, fontSize: 11, color: COLOR, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
          <Lock size={10} /> Anonymous
        </div>
      </div>
      <ScrollArea style={{ flex: 1 }}>
        <div style={{ padding: "16px" }}>
          {activeNav === "checkin" && !submitted && (
            <>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#F9FAFB", marginBottom: 6 }}>How are you feeling?</div>
                <div style={{ fontSize: 13, color: "#6B7280" }}>Anonymous · Safe · Private. Your mood never leaves this device.</div>
              </div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 24 }}>
                {MOODS.map((m) => (
                  <button key={m.value} onClick={() => setSelected(m.value)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "12px 8px", borderRadius: 14, background: selected === m.value ? `${m.color}20` : "rgba(255,255,255,0.02)", border: `2px solid ${selected === m.value ? m.color : "rgba(255,255,255,0.06)"}`, cursor: "pointer", flex: 1 }}>
                    <div style={{ fontSize: 28 }}>{m.emoji}</div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: selected === m.value ? m.color : "#4B5563" }}>{m.label}</div>
                  </button>
                ))}
              </div>
              {selected && (
                <>
                  <textarea placeholder="(Optional) Anything to share? Completely anonymous…" rows={3} style={{ width: "100%", padding: "12px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, fontSize: 14, color: "#E8EAF0", outline: "none", resize: "none", boxSizing: "border-box", marginBottom: 12 }} />
                  <button onClick={() => setSubmitted(true)} style={{ width: "100%", padding: "14px", borderRadius: 14, background: COLOR, border: "none", color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", marginBottom: 8 }}>Submit Anonymously</button>
                  <div style={{ textAlign: "center", fontSize: 11, color: "#4B5563" }}>Not linked to your account · Encrypted · Instantly deletable</div>
                </>
              )}
              <div style={{ marginTop: 20, padding: "14px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>😄</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#22C55E" }}>4.1</div>
                <div style={{ fontSize: 12, color: "#6B7280" }}>Community avg today · 12,847 check-ins</div>
              </div>
            </>
          )}
          {activeNav === "checkin" && submitted && (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ fontSize: 80, marginBottom: 16 }}>💚</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#F9FAFB", marginBottom: 6 }}>Thank you for checking in.</div>
              <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 24 }}>You're part of 4.9M survivors supporting each other.</div>
              {RESOURCES.map((r) => (
                <div key={r.title} style={{ padding: "12px 14px", borderRadius: 12, background: `${r.color}10`, border: `1px solid ${r.color}25`, display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginBottom: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: r.color, flexShrink: 0 }} />
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#E8EAF0" }}>{r.title}</div>
                    <div style={{ fontSize: 11, color: "#6B7280" }}>{r.type}</div>
                  </div>
                  <ArrowUpRight size={14} style={{ color: r.color }} />
                </div>
              ))}
              <button onClick={() => { setSubmitted(false); setSelected(null); }} style={{ marginTop: 16, padding: "10px 24px", borderRadius: 10, background: `${COLOR}15`, border: `1px solid ${COLOR}30`, color: COLOR, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Check In Again</button>
            </div>
          )}
          {activeNav === "trends" && (
            <>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#F9FAFB", marginBottom: 4 }}>Community Wellness</div>
              <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 16 }}>Aggregated · Individual data never exposed</div>
              <div style={{ padding: "16px", borderRadius: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#9CA3AF", marginBottom: 12 }}>7-Day Community Mood</div>
                <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 80 }}>
                  {[{d:"M",v:3.2},{d:"T",v:3.6},{d:"W",v:3.1},{d:"T",v:3.8},{d:"F",v:4.1},{d:"S",v:4.3},{d:"S",v:3.9}].map((day) => (
                    <div key={day.d} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <div style={{ width: "100%", borderRadius: "3px 3px 0 0", background: COLOR, height: `${(day.v / 5) * 60}px`, opacity: 0.7 + (day.v / 20) }} />
                      <div style={{ fontSize: 10, color: "#4B5563" }}>{day.d}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[{ l: "Daily Check-ins", v: "12,847", c: COLOR }, { l: "Avg Score", v: "4.1/5", c: "#22C55E" }, { l: "7-day Trend", v: "+0.3 ↑", c: "#22C55E" }, { l: "Crisis Handled", v: "23", c: "#EF4444" }].map(({ l, v, c }) => (
                  <div key={l} style={{ padding: "14px", borderRadius: 12, background: `${c}08`, border: `1px solid ${c}20` }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: c, marginBottom: 2 }}>{v}</div>
                    <div style={{ fontSize: 11, color: "#6B7280" }}>{l}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {(activeNav === "home" || activeNav === "private") && (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>{activeNav === "home" ? "😁" : "🔒"}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#F9FAFB", marginBottom: 6 }}>{activeNav === "home" ? "Mood Check-in" : "Privacy First"}</div>
              <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.7 }}>{activeNav === "home" ? "Check in daily to track your wellness journey" : "100% anonymous. Zero tracking. GetStream-protected. Your data is only yours."}</div>
              {activeNav === "home" && <button onClick={() => setActiveNav("checkin")} style={{ marginTop: 20, padding: "12px 28px", borderRadius: 12, background: COLOR, border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Check In Now</button>}
            </div>
          )}
        </div>
      </ScrollArea>
      <div style={{ height: 72, background: "#090B0F", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0 8px" }}>
        {NAV.map(({ icon: Icon, label, key }) => (
          <button key={key} onClick={() => setActiveNav(key)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1, padding: "8px 4px", background: "transparent", border: "none", cursor: "pointer" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: activeNav === key ? `${COLOR}20` : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={20} style={{ color: activeNav === key ? COLOR : "#6B7280" }} />
            </div>
            <span style={{ fontSize: 10, color: activeNav === key ? COLOR : "#4B5563", fontWeight: activeNav === key ? 600 : 400 }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
