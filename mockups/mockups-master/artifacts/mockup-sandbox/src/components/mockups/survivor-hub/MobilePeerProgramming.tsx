import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Video, MessageSquare, Home, Globe } from "lucide-react";

const COLOR = "#8B5CF6";

const COHORTS = [
  { id: 1, name: "Tech for Good — Week 4", facilitator: "Lena H.", time: "Tues 7 PM UTC", members: 12, maxMembers: 12, status: "active", skills: ["React", "Node.js"], countries: ["🇺🇸","🇳🇬","🇧🇷","🇮🇳"], joinable: false },
  { id: 2, name: "Business Basics — Week 2", facilitator: "James T.", time: "Wed 6 PM UTC", members: 9, maxMembers: 12, status: "active", skills: ["Accounting", "Marketing"], countries: ["🇺🇸","🇬🇭","🇺🇬"], joinable: true },
  { id: 3, name: "Creative Economy Cohort", facilitator: "Amara O.", time: "Thurs 8 PM UTC", members: 7, maxMembers: 12, status: "forming", skills: ["Design", "Content"], countries: ["🇺🇸","🇰🇪","🇦🇺"], joinable: true },
];

const NAV = [
  { icon: Home, label: "Home", key: "home" },
  { icon: Users, label: "Cohorts", key: "cohorts" },
  { icon: Video, label: "Session", key: "session" },
  { icon: Globe, label: "Global", key: "global" },
];

export function MobilePeerProgramming() {
  const [activeNav, setActiveNav] = useState("cohorts");
  const [joined, setJoined] = useState<number[]>([]);

  return (
    <div style={{ width: 390, height: "100%", minHeight: "100vh", background: "#0F1117", fontFamily: "'Inter', system-ui, sans-serif", color: "#E8EAF0", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 44, background: "#090B0F", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>9:41</div><div style={{ fontSize: 12, color: "#9CA3AF" }}>100%</div>
      </div>
      <div style={{ padding: "14px 20px 12px", background: "#090B0F", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${COLOR}30`, display: "flex", alignItems: "center", justifyContent: "center" }}><Users size={18} style={{ color: COLOR }} /></div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#F9FAFB" }}>Peer Programming</div>
            <div style={{ fontSize: 11, color: COLOR }}>48 cohorts · 576 members placed</div>
          </div>
        </div>
        <Badge style={{ background: `${COLOR}20`, color: COLOR, border: `1px solid ${COLOR}35`, fontSize: 11 }}>Phase 2</Badge>
      </div>
      <ScrollArea style={{ flex: 1 }}>
        <div style={{ padding: "12px 16px" }}>
          {activeNav === "cohorts" && (
            <>
              <div style={{ padding: "12px 14px", borderRadius: 12, background: `${COLOR}08`, border: `1px solid ${COLOR}18`, marginBottom: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: COLOR, marginBottom: 4 }}>Deterministic Placement</div>
                <div style={{ fontSize: 12, color: "#6B7280" }}>Every survivor gets placed in a cohort. No one left behind.</div>
              </div>
              {COHORTS.map((c) => (
                <div key={c.id} style={{ padding: "14px", borderRadius: 14, background: "rgba(255,255,255,0.02)", border: `1px solid ${COLOR}${c.status === "active" ? "30" : "18"}`, marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div style={{ flex: 1, marginRight: 8 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#F9FAFB", marginBottom: 4, lineHeight: 1.3 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: "#6B7280" }}>{c.facilitator} · {c.time}</div>
                    </div>
                    <Badge style={{ background: c.status === "active" ? "#22C55E20" : `${COLOR}20`, color: c.status === "active" ? "#22C55E" : COLOR, border: `1px solid ${c.status === "active" ? "#22C55E40" : COLOR + "40"}`, fontSize: 10, flexShrink: 0 }}>
                      {c.status === "active" ? "🔴 Active" : "⏳ Forming"}
                    </Badge>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                    {c.skills.map((s) => <Badge key={s} style={{ background: `${COLOR}10`, color: COLOR, border: `1px solid ${COLOR}25`, fontSize: 10 }}>{s}</Badge>)}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <div style={{ display: "flex" }}>{c.countries.map((f, i) => <span key={i} style={{ fontSize: 14 }}>{f}</span>)}</div>
                    <span style={{ fontSize: 11, color: "#6B7280" }}>{c.members}/{c.maxMembers} members</span>
                    <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ height: "100%", background: COLOR, width: `${(c.members / c.maxMembers) * 100}%` }} />
                    </div>
                  </div>
                  <button
                    onClick={() => c.joinable && setJoined((j) => j.includes(c.id) ? j.filter((x) => x !== c.id) : [...j, c.id])}
                    disabled={!c.joinable}
                    style={{ width: "100%", padding: "10px", borderRadius: 10, background: joined.includes(c.id) ? "#22C55E20" : c.joinable ? COLOR : "rgba(255,255,255,0.04)", border: joined.includes(c.id) ? "1px solid #22C55E40" : "none", color: joined.includes(c.id) ? "#22C55E" : c.joinable ? "#fff" : "#4B5563", fontSize: 13, fontWeight: 700, cursor: c.joinable ? "pointer" : "not-allowed" }}
                  >
                    {joined.includes(c.id) ? "✓ Joined" : c.joinable ? "Join Cohort" : "Full"}
                  </button>
                </div>
              ))}
            </>
          )}
          {activeNav === "session" && (
            <div>
              <div style={{ padding: "24px", borderRadius: 16, background: `${COLOR}08`, border: `1px solid ${COLOR}20`, textAlign: "center", marginBottom: 16 }}>
                <Video size={48} style={{ color: COLOR, marginBottom: 12 }} />
                <div style={{ fontSize: 16, fontWeight: 700, color: "#F9FAFB", marginBottom: 4 }}>Tech for Good — Week 4</div>
                <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 14 }}>Facilitated by Lena Hoffmann · Tues 7 PM UTC</div>
                <button style={{ width: "100%", padding: "12px", borderRadius: 12, background: COLOR, border: "none", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Join Session</button>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#9CA3AF", marginBottom: 10 }}>Cohort Members</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                {["Lena H.", "You", "Ana K.", "James R.", "Priya S.", "Marcus B.", "Fatima A.", "David P."].map((name) => (
                  <div key={name} style={{ textAlign: "center" }}>
                    <Avatar style={{ width: 40, height: 40, margin: "0 auto 4px" }}>
                      <AvatarFallback style={{ background: `${COLOR}25`, color: COLOR, fontSize: 13, fontWeight: 700 }}>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div style={{ fontSize: 10, color: name === "You" ? COLOR : "#9CA3AF", fontWeight: name === "You" ? 700 : 400 }}>{name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {(activeNav === "home" || activeNav === "global") && (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🏘️</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#F9FAFB", marginBottom: 4 }}>Global Network</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 20 }}>
                {[{ l: "Active Cohorts", v: "48", c: COLOR }, { l: "Members Placed", v: "576", c: "#22C55E" }, { l: "Countries", v: "127", c: "#F59E0B" }, { l: "Jobs Landed", v: "1,284", c: "#EC4899" }].map(({ l, v, c }) => (
                  <div key={l} style={{ padding: "14px", borderRadius: 12, background: `${c}08`, border: `1px solid ${c}20`, textAlign: "center" }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: c }}>{v}</div>
                    <div style={{ fontSize: 11, color: "#6B7280" }}>{l}</div>
                  </div>
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
