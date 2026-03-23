import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Heart, Play, Pause, Home, Star, Clock } from "lucide-react";

const COLOR = "#14B8A6";

const SESSIONS = [
  { id: 1, title: "4-7-8 Breathing", duration: "5 min", emoji: "🌬️", category: "Breathing", plays: 47823 },
  { id: 2, title: "Body Scan for Safety", duration: "10 min", emoji: "🌿", category: "Mindfulness", plays: 39124 },
  { id: 3, title: "Grounding: 5-4-3-2-1", duration: "7 min", emoji: "🌱", category: "Grounding", plays: 52341 },
  { id: 4, title: "Sleep Sanctuary", duration: "20 min", emoji: "🌙", category: "Sleep", plays: 88102 },
  { id: 5, title: "Strength & Resilience", duration: "8 min", emoji: "💎", category: "Affirmations", plays: 31090 },
  { id: 6, title: "Morning Light", duration: "6 min", emoji: "☀️", category: "Morning", plays: 29847 },
];

const NAV = [
  { icon: Home, label: "Home", key: "home" },
  { icon: Heart, label: "Sessions", key: "sessions" },
  { icon: Play, label: "Playing", key: "playing" },
  { icon: Star, label: "Favorites", key: "favorites" },
];

export function MobileGentlePulse() {
  const [activeNav, setActiveNav] = useState("sessions");
  const [playing, setPlaying] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [progress] = useState(40);

  const currentSession = SESSIONS.find((s) => s.id === playing);

  return (
    <div style={{ width: 390, height: "100%", minHeight: "100vh", background: "#0A0F0E", fontFamily: "'Inter', system-ui, sans-serif", color: "#E8EAF0", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 44, background: "#060A09", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>9:41</div><div style={{ fontSize: 12, color: "#9CA3AF" }}>100%</div>
      </div>
      <div style={{ padding: "14px 20px 12px", background: "#060A09", borderBottom: "1px solid rgba(20,184,166,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${COLOR}30`, display: "flex", alignItems: "center", justifyContent: "center" }}><Heart size={18} style={{ color: COLOR }} /></div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#F9FAFB" }}>GentlePulse</div>
            <div style={{ fontSize: 11, color: COLOR }}>Trauma-informed meditation</div>
          </div>
        </div>
        <div style={{ padding: "4px 10px", borderRadius: 20, background: `${COLOR}08`, border: `1px solid ${COLOR}18`, fontSize: 11, color: COLOR }}>🔥 7 days</div>
      </div>

      <ScrollArea style={{ flex: 1 }}>
        <div style={{ padding: "12px 16px" }}>
          {activeNav === "sessions" && (
            <>
              <div style={{ padding: "12px 14px", borderRadius: 12, background: `${COLOR}08`, border: `1px solid ${COLOR}15`, marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: COLOR, marginBottom: 2 }}>23 min practiced today</div>
                <div style={{ fontSize: 12, color: "#4B5563" }}>47 sessions done · 14h 20m total</div>
              </div>
              <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 12, paddingBottom: 4 }}>
                {["All", "Breathing", "Mindfulness", "Grounding", "Sleep", "Morning"].map((c, i) => (
                  <button key={c} style={{ padding: "5px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: i === 0 ? `${COLOR}20` : "rgba(255,255,255,0.04)", border: `1px solid ${i === 0 ? COLOR + "40" : "rgba(255,255,255,0.06)"}`, color: i === 0 ? COLOR : "#6B7280", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>{c}</button>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {SESSIONS.map((s) => (
                  <div key={s.id} onClick={() => { setPlaying(s.id); setActiveNav("playing"); }} style={{ padding: "16px 12px", borderRadius: 14, background: "rgba(20,184,166,0.03)", border: `1px solid ${COLOR}18`, cursor: "pointer" }}>
                    <div style={{ fontSize: 36, marginBottom: 8 }}>{s.emoji}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#F9FAFB", marginBottom: 4, lineHeight: 1.3 }}>{s.title}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: "#4B5563" }}><Clock size={10} style={{ display: "inline" }} /> {s.duration}</span>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: `${COLOR}20`, display: "flex", alignItems: "center", justifyContent: "center" }}><Play size={12} style={{ color: COLOR }} /></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {activeNav === "playing" && (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              {currentSession ? (
                <>
                  <div style={{ fontSize: 80, marginBottom: 16 }}>{currentSession.emoji}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#F9FAFB", marginBottom: 6 }}>{currentSession.title}</div>
                  <div style={{ fontSize: 13, color: "#4B5563", marginBottom: 32 }}>{currentSession.category} · {currentSession.duration}</div>
                  <div style={{ marginBottom: 32 }}>
                    <div style={{ height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden", marginBottom: 6 }}>
                      <div style={{ height: "100%", background: COLOR, width: `${progress}%` }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#4B5563" }}>
                      <span>2:00</span><span>{currentSession.duration}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
                    <button onClick={() => setActiveNav("sessions")} style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, color: "#6B7280" }}>←</button>
                    <button onClick={() => setIsPaused(!isPaused)} style={{ width: 68, height: 68, borderRadius: "50%", background: COLOR, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      {isPaused ? <Play size={28} style={{ color: "#0A0F0E" }} /> : <Pause size={28} style={{ color: "#0A0F0E" }} />}
                    </button>
                    <button onClick={() => setPlaying(null)} style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, color: "#6B7280" }}>✕</button>
                  </div>
                  <div style={{ marginTop: 24, fontSize: 13, color: `${COLOR}80`, fontStyle: "italic" }}>You are safe. You are healing. 💚</div>
                </>
              ) : (
                <div style={{ padding: "40px 0" }}>
                  <Heart size={48} style={{ color: COLOR, opacity: 0.3, marginBottom: 12 }} />
                  <div style={{ fontSize: 14, color: "#4B5563" }}>Select a session to begin</div>
                  <button onClick={() => setActiveNav("sessions")} style={{ marginTop: 16, padding: "10px 24px", borderRadius: 10, background: `${COLOR}15`, border: `1px solid ${COLOR}30`, color: COLOR, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Browse Sessions</button>
                </div>
              )}
            </div>
          )}
          {(activeNav === "home" || activeNav === "favorites") && (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>💚</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#F9FAFB", marginBottom: 6 }}>Your Safe Space</div>
              <div style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.7, marginBottom: 16 }}>48 trauma-informed sessions · Expert-designed · Always free</div>
              <div style={{ padding: "14px 16px", borderRadius: 12, background: `${COLOR}08`, border: `1px solid ${COLOR}15`, fontStyle: "italic" }}>
                <div style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.7 }}>"You did not choose what happened to you. You DO choose what happens next."</div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div style={{ height: 72, background: "#060A09", borderTop: "1px solid rgba(20,184,166,0.08)", display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0 8px" }}>
        {NAV.map(({ icon: Icon, label, key }) => (
          <button key={key} onClick={() => setActiveNav(key)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1, padding: "8px 4px", background: "transparent", border: "none", cursor: "pointer" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: activeNav === key ? `${COLOR}20` : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={20} style={{ color: activeNav === key ? COLOR : "#4B5563" }} />
            </div>
            <span style={{ fontSize: 10, color: activeNav === key ? COLOR : "#374151", fontWeight: activeNav === key ? 600 : 400 }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
