import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Hammer, Search, CheckCircle, Clock, Shield, ChevronRight, ArrowLeft, Home, FileText, MessageSquare } from "lucide-react";

const COLOR = "#EF4444";

const PROVIDERS = [
  { id: 1, name: "Carlos Rivera", trade: "Electrician", rating: 4.9, jobs: 312, available: true, credits: true, avatar: "CR", price: "$85/hr", eta: "30 min" },
  { id: 2, name: "Sarah Johnson", trade: "Plumber", rating: 4.8, jobs: 198, available: true, credits: true, avatar: "SJ", price: "$95/hr", eta: "1 hr" },
  { id: 3, name: "Marcus Bell", trade: "HVAC", rating: 4.7, jobs: 445, available: false, credits: false, avatar: "MB", price: "$110/hr", eta: "2 hr" },
  { id: 4, name: "Fatima Al-Hassan", trade: "Contractor", rating: 5.0, jobs: 87, available: true, credits: true, avatar: "FA", price: "Quote", eta: "4 hr" },
];

const NAV = [
  { icon: Home, label: "Home", key: "home" },
  { icon: Search, label: "Browse", key: "browse" },
  { icon: FileText, label: "Quotes", key: "quotes" },
  { icon: MessageSquare, label: "Chat", key: "chat" },
];

export function MobileFoundation() {
  const [activeNav, setActiveNav] = useState("browse");
  const [selected, setSelected] = useState<number | null>(null);

  if (selected) {
    const p = PROVIDERS.find((x) => x.id === selected)!;
    return (
      <div style={{ width: 390, height: "100%", minHeight: "100vh", background: "#0F1117", fontFamily: "'Inter', system-ui, sans-serif", color: "#E8EAF0", display: "flex", flexDirection: "column" }}>
        <div style={{ height: 44, background: "#090B0F", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>9:41</div><div style={{ fontSize: 12, color: "#9CA3AF" }}>100%</div>
        </div>
        <div style={{ padding: "14px 20px", background: "#090B0F", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: COLOR, display: "flex", alignItems: "center", gap: 4 }}><ArrowLeft size={16} /> Back</button>
          <div style={{ flex: 1, fontSize: 16, fontWeight: 800, color: "#F9FAFB", textAlign: "center" }}>Provider</div>
          <div style={{ width: 40 }} />
        </div>
        <ScrollArea style={{ flex: 1 }}>
          <div style={{ padding: "20px 20px" }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <Avatar style={{ width: 72, height: 72, margin: "0 auto 10px" }}>
                <AvatarFallback style={{ background: `${COLOR}25`, color: COLOR, fontSize: 28, fontWeight: 800 }}>{p.avatar}</AvatarFallback>
              </Avatar>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#F9FAFB", marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontSize: 14, color: "#9CA3AF", marginBottom: 8 }}>{p.trade}</div>
              <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
                <Badge style={{ background: "rgba(250,204,21,0.1)", color: "#FBBF24", border: "1px solid rgba(250,204,21,0.2)", fontSize: 11 }}>⭐ {p.rating} ({p.jobs})</Badge>
                <Badge style={{ background: p.available ? "#22C55E20" : "rgba(255,255,255,0.05)", color: p.available ? "#22C55E" : "#6B7280", border: `1px solid ${p.available ? "#22C55E40" : "rgba(255,255,255,0.08)"}`, fontSize: 11 }}>{p.available ? "● Available" : "Busy"}</Badge>
                {p.credits && <Badge style={{ background: "#F59E0B10", color: "#F59E0B", border: "1px solid #F59E0B25", fontSize: 11 }}>Credits ✓</Badge>}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              {[{ l: "Rate", v: p.price }, { l: "Response", v: p.eta }, { l: "Jobs Done", v: `${p.jobs}` }, { l: "Verified", v: "✓ Yes" }].map(({ l, v }) => (
                <div key={l} style={{ padding: "12px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: COLOR, marginBottom: 2 }}>{v}</div>
                  <div style={{ fontSize: 11, color: "#6B7280" }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <button style={{ flex: 1, padding: "12px", borderRadius: 12, background: COLOR, border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Request Quote</button>
              <button style={{ flex: 1, padding: "12px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: `1px solid ${COLOR}35`, color: COLOR, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Message</button>
            </div>
            <div style={{ padding: "14px", borderRadius: 12, background: `${COLOR}08`, border: `1px solid ${COLOR}18` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}><Shield size={12} style={{ color: COLOR }} /><span style={{ fontSize: 12, fontWeight: 700, color: COLOR }}>Safety Guarantee</span></div>
              <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6 }}>Background-checked, insured, trauma-informed. All communications via GetStream encrypted channel.</div>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  }

  return (
    <div style={{ width: 390, height: "100%", minHeight: "100vh", background: "#0F1117", fontFamily: "'Inter', system-ui, sans-serif", color: "#E8EAF0", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 44, background: "#090B0F", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>9:41</div><div style={{ fontSize: 12, color: "#9CA3AF" }}>100%</div>
      </div>
      <div style={{ padding: "14px 20px 12px", background: "#090B0F", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${COLOR}30`, display: "flex", alignItems: "center", justifyContent: "center" }}><Hammer size={18} style={{ color: COLOR }} /></div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#F9FAFB" }}>Foundation</div>
            <div style={{ fontSize: 11, color: COLOR }}>8,400 vetted tradespeople</div>
          </div>
        </div>
        <Badge style={{ background: `${COLOR}20`, color: COLOR, border: `1px solid ${COLOR}35`, fontSize: 11 }}>Verified ✓</Badge>
      </div>
      <div style={{ padding: "10px 16px", display: "flex", gap: 6, overflowX: "auto", background: "#090B0F", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {["All", "Electric", "Plumbing", "HVAC", "Carpenter", "Contractor"].map((f, i) => (
          <button key={f} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: i === 0 ? `${COLOR}20` : "rgba(255,255,255,0.04)", border: `1px solid ${i === 0 ? COLOR + "50" : "rgba(255,255,255,0.06)"}`, color: i === 0 ? COLOR : "#6B7280", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>{f}</button>
        ))}
      </div>
      <ScrollArea style={{ flex: 1 }}>
        <div style={{ padding: "12px 16px" }}>
          {PROVIDERS.map((p) => (
            <div key={p.id} onClick={() => setSelected(p.id)} style={{ padding: "14px", borderRadius: 14, background: "rgba(255,255,255,0.02)", border: `1px solid ${COLOR}15`, marginBottom: 10, cursor: "pointer", display: "flex", gap: 12, alignItems: "center" }}>
              <Avatar style={{ width: 48, height: 48, flexShrink: 0 }}>
                <AvatarFallback style={{ background: `${COLOR}20`, color: COLOR, fontSize: 18, fontWeight: 800 }}>{p.avatar}</AvatarFallback>
              </Avatar>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#F9FAFB" }}>{p.name}</div>
                  <CheckCircle size={12} style={{ color: COLOR, flexShrink: 0 }} />
                </div>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4 }}>{p.trade} · ⭐ {p.rating}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.available ? "#22C55E" : "#4B5563", marginTop: 4 }} />
                  <span style={{ fontSize: 11, color: p.available ? "#22C55E" : "#4B5563" }}>{p.available ? "Available" : "Busy"}</span>
                  {p.credits && <span style={{ fontSize: 11, color: "#F59E0B" }}>Credits ✓</span>}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: COLOR, marginBottom: 6 }}>{p.price}</div>
                <ChevronRight size={16} style={{ color: "#4B5563" }} />
              </div>
            </div>
          ))}
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
