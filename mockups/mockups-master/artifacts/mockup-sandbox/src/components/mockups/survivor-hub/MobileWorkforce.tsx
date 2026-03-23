import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BarChart2, TrendingUp, Bell, ChevronRight, Users, MessageSquare, Home } from "lucide-react";

const COLOR = "#6366F1";

const GAPS = [
  { skill: "Software Dev", supply: 7400, demand: 22000, color: COLOR },
  { skill: "Housing Nav", supply: 5100, demand: 18300, color: "#22C55E" },
  { skill: "Therapy", supply: 3200, demand: 12800, color: "#EC4899" },
  { skill: "Legal Aid", supply: 2800, demand: 9100, color: "#F59E0B" },
];

const NAV = [
  { icon: Home, label: "Home", key: "home" },
  { icon: BarChart2, label: "Dashboard", key: "dashboard" },
  { icon: TrendingUp, label: "Gaps", key: "gaps" },
  { icon: Users, label: "Pathways", key: "pathways" },
];

export function MobileWorkforce() {
  const [activeNav, setActiveNav] = useState("dashboard");

  return (
    <div style={{ width: 390, height: "100%", minHeight: "100vh", background: "#0F1117", fontFamily: "'Inter', system-ui, sans-serif", color: "#E8EAF0", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 44, background: "#090B0F", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>9:41</div>
        <div style={{ fontSize: 12, color: "#9CA3AF" }}>100%</div>
      </div>
      <div style={{ padding: "14px 20px 12px", background: "#090B0F", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${COLOR}30`, display: "flex", alignItems: "center", justifyContent: "center" }}><BarChart2 size={18} style={{ color: COLOR }} /></div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#F9FAFB" }}>Workforce</div>
            <div style={{ fontSize: 11, color: COLOR }}>4.9M survivors · Live skills data</div>
          </div>
        </div>
        <Badge style={{ background: `${COLOR}20`, color: COLOR, border: `1px solid ${COLOR}35`, fontSize: 11 }}>Phase 1</Badge>
      </div>
      <ScrollArea style={{ flex: 1 }}>
        <div style={{ padding: "16px" }}>
          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            {[{ l: "Total Members", v: "4.9M", c: COLOR }, { l: "Employed", v: "1.83M", c: "#22C55E" }, { l: "In Training", v: "1.22M", c: "#F59E0B" }, { l: "Skill Gaps", v: "6 Critical", c: "#EF4444" }].map(({ l, v, c }) => (
              <div key={l} style={{ padding: "16px 14px", borderRadius: 14, background: `${c}08`, border: `1px solid ${c}20` }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: c, marginBottom: 2 }}>{v}</div>
                <div style={{ fontSize: 11, color: "#6B7280" }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Distribution bars */}
          <div style={{ padding: "16px", borderRadius: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#F9FAFB", marginBottom: 12 }}>Status Distribution</div>
            {[{ l: "Employed", v: 37, c: "#22C55E" }, { l: "In Training", v: 25, c: COLOR }, { l: "Seeking Work", v: 20, c: "#F59E0B" }, { l: "Exploring", v: 18, c: "#6B7280" }].map(({ l, v, c }) => (
              <div key={l} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: "#9CA3AF" }}>{l}</span>
                  <span style={{ color: c, fontWeight: 700 }}>{v}%</span>
                </div>
                <div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", background: c, borderRadius: 3, width: `${v}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Skill gaps */}
          <div style={{ padding: "16px", borderRadius: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#F9FAFB" }}>Critical Skill Gaps</div>
              <Badge style={{ background: "#EF444420", color: "#EF4444", border: "1px solid #EF444435", fontSize: 10 }}>4 shown</Badge>
            </div>
            {GAPS.map((g) => (
              <div key={g.skill} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: "#9CA3AF" }}>{g.skill}</span>
                  <span style={{ color: "#EF4444", fontWeight: 700 }}>−{((g.demand - g.supply) / 1000).toFixed(0)}K</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden" }}><div style={{ height: "100%", background: "#22C55E", width: `${(g.supply / g.demand) * 100}%` }} /></div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden" }}><div style={{ height: "100%", background: "#EF4444", width: "100%" }} /></div>
                </div>
              </div>
            ))}
          </div>

          {/* Pathways */}
          <div style={{ padding: "16px", borderRadius: 14, background: `${COLOR}08`, border: `1px solid ${COLOR}20` }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#F9FAFB", marginBottom: 12 }}>My Recommended Pathways</div>
            {[{ n: "Full-Stack Developer", m: 87 }, { n: "UX/UI Designer", m: 74 }, { n: "Data Analyst", m: 68 }].map(({ n, m }) => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#E8EAF0", marginBottom: 4 }}>{n}</div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}><div style={{ height: "100%", background: COLOR, width: `${m}%` }} /></div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: COLOR, flexShrink: 0 }}>{m}%</div>
              </div>
            ))}
          </div>
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
