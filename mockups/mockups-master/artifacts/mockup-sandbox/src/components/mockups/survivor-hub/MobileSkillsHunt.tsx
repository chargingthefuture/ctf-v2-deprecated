import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Award, Trophy, Star, Zap, Home, CheckCircle, Lock, ChevronRight } from "lucide-react";

const COLOR = "#A855F7";

const ROUNDS = [
  { id: 1, title: "Web Development Bootcamp", status: "live", enrolled: 234, capacity: 300, weeks: 8, facilitator: "Lena H.", color: COLOR },
  { id: 2, title: "Trauma-Informed Care Training", status: "live", enrolled: 189, capacity: 200, weeks: 6, facilitator: "Maria G.", color: "#22C55E" },
  { id: 3, title: "Financial Literacy Cohort", status: "upcoming", enrolled: 0, capacity: 150, weeks: 4, facilitator: "DeShawn W.", color: "#F59E0B" },
];

const LEADERBOARD = [
  { rank: 1, name: "Amara O.", points: 9840, avatar: "AO" },
  { rank: 2, name: "Maria G.", points: 8723, avatar: "MG" },
  { rank: 3, name: "Priya S.", points: 7891, avatar: "PS" },
  { rank: 4, name: "You", points: 6412, avatar: "S", isMe: true },
  { rank: 5, name: "James T.", points: 5910, avatar: "JT" },
];

const NAV = [
  { icon: Home, label: "Home", key: "home" },
  { icon: Award, label: "Rounds", key: "rounds" },
  { icon: Trophy, label: "Leaders", key: "leaderboard" },
  { icon: Star, label: "Badges", key: "badges" },
];

export function MobileSkillsHunt() {
  const [activeNav, setActiveNav] = useState("rounds");
  const [joined, setJoined] = useState<number[]>([]);

  return (
    <div style={{ width: 390, height: "100%", minHeight: "100vh", background: "#0F1117", fontFamily: "'Inter', system-ui, sans-serif", color: "#E8EAF0", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 44, background: "#090B0F", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>9:41</div>
        <div style={{ fontSize: 12, color: "#9CA3AF" }}>100%</div>
      </div>
      <div style={{ padding: "14px 20px 12px", background: "#090B0F", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${COLOR}30`, display: "flex", alignItems: "center", justifyContent: "center" }}><Award size={18} style={{ color: COLOR }} /></div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#F9FAFB" }}>Skills Hunt</div>
            <div style={{ fontSize: 11, color: COLOR }}>🔴 2 live rounds now</div>
          </div>
        </div>
        <div style={{ padding: "8px 12px", borderRadius: 10, background: `${COLOR}08`, border: `1px solid ${COLOR}20`, textAlign: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: COLOR }}>6,412</div>
          <div style={{ fontSize: 9, color: "#6B7280" }}>Your pts</div>
        </div>
      </div>

      <ScrollArea style={{ flex: 1 }}>
        <div style={{ padding: "12px 16px" }}>
          {activeNav === "rounds" && (
            <>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#F9FAFB", marginBottom: 12 }}>Active Rounds</div>
              {ROUNDS.map((r) => (
                <div key={r.id} style={{ padding: "14px", borderRadius: 14, background: "rgba(255,255,255,0.02)", border: `1px solid ${r.color}${r.status === "live" ? "40" : "20"}`, marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div style={{ flex: 1, marginRight: 10 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#F9FAFB", marginBottom: 4, lineHeight: 1.3 }}>{r.title}</div>
                      <div style={{ fontSize: 12, color: "#6B7280" }}>{r.facilitator} · {r.weeks}w</div>
                    </div>
                    <Badge style={{ background: r.status === "live" ? "#22C55E20" : `${COLOR}20`, color: r.status === "live" ? "#22C55E" : COLOR, border: `1px solid ${r.status === "live" ? "#22C55E40" : COLOR + "40"}`, fontSize: 10, flexShrink: 0 }}>
                      {r.status === "live" ? "🔴 Live" : "Upcoming"}
                    </Badge>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4, color: "#6B7280" }}>
                      <span>{r.enrolled} enrolled</span>
                      <span>{r.capacity} max</span>
                    </div>
                    <div style={{ height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ height: "100%", background: r.color, width: `${(r.enrolled / r.capacity) * 100}%` }} />
                    </div>
                  </div>
                  <button
                    onClick={() => r.status !== "upcoming" && setJoined((j) => j.includes(r.id) ? j.filter((x) => x !== r.id) : [...j, r.id])}
                    style={{ width: "100%", padding: "10px", borderRadius: 10, background: joined.includes(r.id) ? "#22C55E20" : r.color, border: joined.includes(r.id) ? "1px solid #22C55E40" : "none", color: joined.includes(r.id) ? "#22C55E" : "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                  >
                    {joined.includes(r.id) ? "✓ Joined" : r.status === "live" ? "Join Now" : "Apply"}
                  </button>
                </div>
              ))}
            </>
          )}
          {activeNav === "leaderboard" && (
            <>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#F9FAFB", marginBottom: 12 }}>Global Leaderboard</div>
              {LEADERBOARD.map((p) => (
                <div key={p.rank} style={{ padding: "12px 14px", borderRadius: 12, background: (p as any).isMe ? `${COLOR}12` : "rgba(255,255,255,0.02)", border: `1px solid ${(p as any).isMe ? COLOR + "40" : "rgba(255,255,255,0.06)"}`, marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ fontSize: 18, width: 28, textAlign: "center" }}>{p.rank <= 3 ? ["🥇","🥈","🥉"][p.rank-1] : `#${p.rank}`}</div>
                  <Avatar style={{ width: 36, height: 36 }}>
                    <AvatarFallback style={{ background: `${COLOR}25`, color: COLOR, fontSize: 13, fontWeight: 800 }}>{p.avatar}</AvatarFallback>
                  </Avatar>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: (p as any).isMe ? COLOR : "#F9FAFB" }}>{p.name}{(p as any).isMe ? " (You)" : ""}</div>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: COLOR }}>{p.points.toLocaleString()}</div>
                </div>
              ))}
            </>
          )}
          {activeNav === "badges" && (
            <>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#F9FAFB", marginBottom: 12 }}>Your Badges</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                {[{ n: "First Skill", e: "🌱", earned: true }, { n: "Fast Learner", e: "⚡", earned: true }, { n: "Mentor", e: "🎓", earned: true }, { n: "5 Rounds", e: "🏆", earned: false }, { n: "Expert", e: "💎", earned: false }, { n: "Leader", e: "👑", earned: false }].map((b) => (
                  <div key={b.n} style={{ padding: "16px 12px", borderRadius: 14, background: b.earned ? `${COLOR}10` : "rgba(255,255,255,0.02)", border: `1px solid ${b.earned ? COLOR + "35" : "rgba(255,255,255,0.06)"}`, textAlign: "center", opacity: b.earned ? 1 : 0.5 }}>
                    <div style={{ fontSize: 32, marginBottom: 6 }}>{b.earned ? b.e : <Lock size={24} style={{ color: "#4B5563" }} />}</div>
                    <div style={{ fontSize: 11, color: b.earned ? COLOR : "#4B5563", fontWeight: 600 }}>{b.n}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, padding: "14px", borderRadius: 12, background: `${COLOR}08`, border: `1px solid ${COLOR}18` }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#9CA3AF", marginBottom: 6 }}>Next: 5 Rounds 🏆</div>
                <div style={{ height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}><div style={{ height: "100%", background: COLOR, width: "60%" }} /></div>
                <div style={{ fontSize: 11, color: "#4B5563", marginTop: 4 }}>3/5 completed · 🔥 7-day streak</div>
              </div>
            </>
          )}
          {activeNav === "home" && (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🎓</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#F9FAFB", marginBottom: 4 }}>Your Skills Journey</div>
              <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 20 }}>Rank #4 globally · 6,412 points · 🔥 7-day streak</div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                {["Rounds","Leaders","Badges"].map((label, i) => (
                  <button key={label} onClick={() => setActiveNav(["rounds","leaderboard","badges"][i])} style={{ padding: "10px 18px", borderRadius: 10, background: `${COLOR}15`, border: `1px solid ${COLOR}30`, color: COLOR, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{label}</button>
                ))}
              </div>
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
