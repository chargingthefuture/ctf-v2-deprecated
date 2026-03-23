import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Home, Search, Heart, Shield, MapPin, Bed, Bath, MessageSquare, ArrowLeft, ChevronRight, Lock } from "lucide-react";

const COLOR = "#EAB308";

const LISTINGS = [
  { id: 1, title: "Private Studio — Safe & Verified", location: "Midtown Houston", price: 850, credits: true, beds: 0, baths: 1, rating: 4.9, available: "Now", emoji: "🏠" },
  { id: 2, title: "Furnished 1BR — Female-only Floor", location: "Buckhead, Atlanta", price: 1100, credits: true, beds: 1, baths: 1, rating: 4.8, available: "Now", emoji: "🏢" },
  { id: 3, title: "2BR Safe House — Group Housing", location: "Lincoln Park, Chicago", price: 1400, credits: false, beds: 2, baths: 1, rating: 5.0, available: "Dec 1", emoji: "🏘️" },
  { id: 4, title: "Micro-unit — Month-to-month", location: "Uptown Dallas", price: 650, credits: true, beds: 0, baths: 1, rating: 4.7, available: "Now", emoji: "🏠" },
];

const NAV = [
  { icon: Search, label: "Browse", key: "browse" },
  { icon: Heart, label: "Saved", key: "saved" },
  { icon: MessageSquare, label: "Chat", key: "chat" },
  { icon: Shield, label: "Safety", key: "safety" },
];

export function MobileLightHouse() {
  const [activeNav, setActiveNav] = useState("browse");
  const [saved, setSaved] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const toggleSave = (id: number) => setSaved((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);

  if (selected) {
    const l = LISTINGS.find((x) => x.id === selected)!;
    return (
      <div style={{ width: 390, height: "100%", minHeight: "100vh", background: "#0F1117", fontFamily: "'Inter', system-ui, sans-serif", color: "#E8EAF0", display: "flex", flexDirection: "column" }}>
        <div style={{ height: 44, background: "#090B0F", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>9:41</div><div style={{ fontSize: 12, color: "#9CA3AF" }}>100%</div>
        </div>
        <div style={{ padding: "14px 20px", background: "#090B0F", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: COLOR, display: "flex", alignItems: "center", gap: 4 }}><ArrowLeft size={16} /> Back</button>
          <div style={{ flex: 1, fontSize: 16, fontWeight: 800, color: "#F9FAFB", textAlign: "center" }}>Listing</div>
          <button onClick={() => toggleSave(l.id)} style={{ background: "none", border: "none", cursor: "pointer" }}><Heart size={20} style={{ color: saved.includes(l.id) ? "#EC4899" : "#6B7280" }} fill={saved.includes(l.id) ? "#EC4899" : "none"} /></button>
        </div>
        <ScrollArea style={{ flex: 1 }}>
          <div style={{ padding: "32px 0 16px", background: `${COLOR}08`, borderBottom: "1px solid rgba(255,255,255,0.06)", textAlign: "center", fontSize: 64 }}>{l.emoji}</div>
          <div style={{ padding: "20px" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#F9FAFB", marginBottom: 8 }}>{l.title}</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
              <Badge style={{ background: "rgba(255,255,255,0.05)", color: "#9CA3AF", border: "1px solid rgba(255,255,255,0.08)", fontSize: 11 }}><MapPin size={10} style={{ display: "inline", marginRight: 3 }} />{l.location}</Badge>
              <Badge style={{ background: "rgba(250,204,21,0.1)", color: "#FBBF24", border: "1px solid rgba(250,204,21,0.2)", fontSize: 11 }}>⭐ {l.rating}</Badge>
              {l.credits && <Badge style={{ background: "#F59E0B10", color: "#F59E0B", border: "1px solid #F59E0B25", fontSize: 11 }}>Credits ✓</Badge>}
            </div>
            <div style={{ display: "flex", gap: 12, fontSize: 13, color: "#9CA3AF", marginBottom: 16 }}>
              <span><Bed size={13} style={{ display: "inline", verticalAlign: "middle" }} /> {l.beds === 0 ? "Studio" : `${l.beds}bd`}</span>
              <span><Bath size={13} style={{ display: "inline", verticalAlign: "middle" }} /> {l.baths}ba</span>
              <span>Available: {l.available}</span>
            </div>
            <div style={{ padding: "16px", borderRadius: 14, background: `${COLOR}08`, border: `1px solid ${COLOR}20`, marginBottom: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: COLOR, marginBottom: 2 }}>${l.price}<span style={{ fontSize: 13, color: "#6B7280", fontWeight: 400 }}>/mo</span></div>
              {l.credits && <div style={{ fontSize: 12, color: "#F59E0B" }}>✓ Accepts Service Credits</div>}
            </div>
            <button style={{ width: "100%", padding: "14px", borderRadius: 14, background: COLOR, border: "none", color: "#0F1117", fontSize: 15, fontWeight: 800, cursor: "pointer", marginBottom: 10 }}>Apply Now</button>
            <button style={{ width: "100%", padding: "12px", borderRadius: 14, background: "rgba(255,255,255,0.04)", border: `1px solid ${COLOR}30`, color: COLOR, fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 16 }}>Message Host</button>
            <div style={{ padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}><Lock size={12} style={{ color: COLOR }} /><span style={{ fontSize: 12, fontWeight: 700, color: COLOR }}>Privacy Protected</span></div>
              <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6 }}>Your location is never shown until you confirm. All communications via GetStream encrypted channel.</div>
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
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${COLOR}30`, display: "flex", alignItems: "center", justifyContent: "center" }}><Home size={18} style={{ color: COLOR }} /></div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#F9FAFB" }}>LightHouse</div>
            <div style={{ fontSize: 11, color: COLOR }}>1,204 verified listings</div>
          </div>
        </div>
        <div style={{ padding: "4px 10px", borderRadius: 20, background: "#EF444420", border: "1px solid #EF444440", fontSize: 11, color: "#EF4444", fontWeight: 700 }}>5 Emergency</div>
      </div>
      <div style={{ padding: "10px 16px", display: "flex", gap: 6, overflowX: "auto", background: "#090B0F", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {["All", "Available Now", "Credits OK", "Verified", "Emergency"].map((f, i) => (
          <button key={f} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: i === 0 ? `${COLOR}20` : "rgba(255,255,255,0.04)", border: `1px solid ${i === 0 ? COLOR + "50" : "rgba(255,255,255,0.06)"}`, color: i === 0 ? COLOR : "#6B7280", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>{f}</button>
        ))}
      </div>
      <ScrollArea style={{ flex: 1 }}>
        <div style={{ padding: "12px 16px" }}>
          <div style={{ padding: "12px 14px", borderRadius: 12, background: "#EF444410", border: "1px solid #EF444430", marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#EF4444", marginBottom: 4 }}>⚠️ 5 Emergency Slots Available</div>
            <div style={{ fontSize: 12, color: "#9CA3AF" }}>Immediate placement. No application required.</div>
            <button style={{ marginTop: 8, width: "100%", padding: "8px", borderRadius: 8, background: "#EF4444", border: "none", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Get Emergency Housing</button>
          </div>
          {LISTINGS.map((l) => (
            <div key={l.id} style={{ marginBottom: 12, borderRadius: 16, background: "rgba(255,255,255,0.02)", border: `1px solid ${COLOR}20`, overflow: "hidden", cursor: "pointer" }}>
              <div onClick={() => setSelected(l.id)} style={{ padding: "24px 0", background: `${COLOR}06`, textAlign: "center", fontSize: 48 }}>{l.emoji}</div>
              <div style={{ padding: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#F9FAFB", flex: 1, marginRight: 8, lineHeight: 1.3 }}>{l.title}</div>
                  <button onClick={() => toggleSave(l.id)} style={{ background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}>
                    <Heart size={16} style={{ color: saved.includes(l.id) ? "#EC4899" : "#4B5563" }} fill={saved.includes(l.id) ? "#EC4899" : "none"} />
                  </button>
                </div>
                <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 8 }}><MapPin size={11} style={{ display: "inline" }} /> {l.location}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: COLOR }}>${l.price}<span style={{ fontSize: 11, color: "#6B7280", fontWeight: 400 }}>/mo</span></div>
                    {l.credits && <div style={{ fontSize: 10, color: "#F59E0B" }}>Credits ✓</div>}
                  </div>
                  <button onClick={() => setSelected(l.id)} style={{ padding: "8px 14px", borderRadius: 8, background: `${COLOR}15`, border: `1px solid ${COLOR}30`, color: COLOR, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>View</button>
                </div>
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
