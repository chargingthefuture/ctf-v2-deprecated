import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Globe, BarChart2, TrendingUp, Home } from "lucide-react";

const COLOR = "#06B6D4";

const SECTORS = [
  { name: "Professional Services", value: 84.2, pct: 34, color: COLOR },
  { name: "Technology & Coding", value: 52.4, pct: 21, color: "#A855F7" },
  { name: "Housing & Property", value: 37.1, pct: 15, color: "#22C55E" },
  { name: "Healthcare", value: 28.6, pct: 12, color: "#EC4899" },
  { name: "Education", value: 23.4, pct: 9, color: "#EAB308" },
  { name: "Trade", value: 21.3, pct: 9, color: "#F97316" },
];

const TOP_COUNTRIES = [
  { flag: "🇺🇸", country: "United States", gdp: 89.4 },
  { flag: "🇳🇬", country: "Nigeria", gdp: 34.7 },
  { flag: "🇧🇷", country: "Brazil", gdp: 28.1 },
  { flag: "🇮🇳", country: "India", gdp: 22.6 },
  { flag: "🇵🇭", country: "Philippines", gdp: 18.9 },
];

const NAV = [
  { icon: Home, label: "Home", key: "home" },
  { icon: Globe, label: "Overview", key: "overview" },
  { icon: BarChart2, label: "Sectors", key: "sectors" },
  { icon: TrendingUp, label: "Trend", key: "trend" },
];

export function MobileGDP() {
  const [activeNav, setActiveNav] = useState("overview");

  return (
    <div style={{ width: 390, height: "100%", minHeight: "100vh", background: "#0F1117", fontFamily: "'Inter', system-ui, sans-serif", color: "#E8EAF0", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 44, background: "#090B0F", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>9:41</div><div style={{ fontSize: 12, color: "#9CA3AF" }}>100%</div>
      </div>
      <div style={{ padding: "14px 20px 12px", background: "#090B0F", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${COLOR}30`, display: "flex", alignItems: "center", justifyContent: "center" }}><Globe size={18} style={{ color: COLOR }} /></div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#F9FAFB" }}>GDP Tracker</div>
            <div style={{ fontSize: 11, color: COLOR }}>TI Skills Economy · Live</div>
          </div>
        </div>
        <Badge style={{ background: "#22C55E20", color: "#22C55E", border: "1px solid #22C55E35", fontSize: 11 }}>↑ Live</Badge>
      </div>
      <ScrollArea style={{ flex: 1 }}>
        <div style={{ padding: "16px" }}>
          {activeNav === "overview" && (
            <>
              {/* Hero */}
              <div style={{ padding: "20px", borderRadius: 16, background: `linear-gradient(135deg,${COLOR}20 0%,rgba(6,182,212,0.05) 100%)`, border: `1px solid ${COLOR}25`, marginBottom: 16, textAlign: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: COLOR, letterSpacing: "0.08em", marginBottom: 6 }}>TI SKILLS ECONOMY</div>
                <div style={{ fontSize: 42, fontWeight: 900, color: "#F9FAFB", lineHeight: 1, marginBottom: 4 }}>$247.1B</div>
                <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 12 }}>of $300B target · 82.4% reached</div>
                <div style={{ height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", background: `linear-gradient(to right,${COLOR},#22D3EE)`, width: "82.4%", borderRadius: 4 }} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
                {[{ v: "4.9M", l: "Members", c: "#A78BFA" }, { v: "127", l: "Countries", c: "#22C55E" }, { v: "+$1.2B", l: "This week", c: COLOR }].map(({ v, l, c }) => (
                  <div key={l} style={{ padding: "14px 8px", borderRadius: 12, background: `${c}08`, border: `1px solid ${c}20`, textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: c, marginBottom: 2 }}>{v}</div>
                    <div style={{ fontSize: 10, color: "#6B7280" }}>{l}</div>
                  </div>
                ))}
              </div>
              {/* Top countries */}
              <div style={{ padding: "14px", borderRadius: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#F9FAFB", marginBottom: 12 }}>Top Countries</div>
                {TOP_COUNTRIES.map((c, i) => (
                  <div key={c.country} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                    <div style={{ fontSize: 20 }}>{c.flag}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                        <span style={{ color: "#E8EAF0" }}>{c.country}</span>
                        <span style={{ color: COLOR, fontWeight: 700 }}>${c.gdp}B</span>
                      </div>
                      <div style={{ height: 4, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ height: "100%", background: COLOR, width: `${(c.gdp / 89.4) * 100}%`, opacity: 0.7 - i * 0.1 }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Your contribution */}
              <div style={{ padding: "14px", borderRadius: 12, background: `${COLOR}08`, border: `1px solid ${COLOR}18`, textAlign: "center" }}>
                <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 4 }}>Your contribution to GDP</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: COLOR }}>$24,800</div>
              </div>
            </>
          )}
          {activeNav === "sectors" && (
            <>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#F9FAFB", marginBottom: 12 }}>GDP by Sector</div>
              {SECTORS.map((s) => (
                <div key={s.name} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                    <span style={{ color: "#E8EAF0" }}>{s.name}</span>
                    <span style={{ color: s.color, fontWeight: 700 }}>${s.value}B ({s.pct}%)</span>
                  </div>
                  <div style={{ height: 8, background: "rgba(255,255,255,0.04)", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", background: s.color, width: `${s.pct * 2.5}%`, opacity: 0.85 }} />
                  </div>
                </div>
              ))}
            </>
          )}
          {activeNav === "trend" && (
            <>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#F9FAFB", marginBottom: 12 }}>Weekly Growth</div>
              <div style={{ padding: "16px", borderRadius: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 100 }}>
                  {[212,218,224,229,235,241,247].map((v, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <div style={{ fontSize: 9, color: "#4B5563" }}>${v}B</div>
                      <div style={{ width: "100%", borderRadius: "4px 4px 0 0", background: `${COLOR}${i === 6 ? "" : "60"}`, height: `${(v / 247) * 70}px` }} />
                      <div style={{ fontSize: 10, color: "#4B5563" }}>{["M","T","W","T","F","S","S"][i]}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: "14px", borderRadius: 12, background: `${COLOR}08`, border: `1px solid ${COLOR}18` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: COLOR, marginBottom: 6 }}>$300B Target Timeline</div>
                <div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden", marginBottom: 6 }}>
                  <div style={{ height: "100%", background: COLOR, width: "82.4%" }} />
                </div>
                <div style={{ fontSize: 12, color: "#6B7280" }}>82.4% reached · Est. Q4 2026</div>
              </div>
            </>
          )}
          {activeNav === "home" && (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 64, marginBottom: 12 }}>🗺️</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#F9FAFB", marginBottom: 6 }}>TI Skills Economy</div>
              <div style={{ fontSize: 13, color: "#6B7280" }}>Building a $300B survivor economy across 127 countries</div>
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
