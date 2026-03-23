import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, Star, CheckCircle, MapPin, MessageSquare, Users, ChevronRight, ArrowLeft, Shield } from "lucide-react";

const COLOR = "#3B82F6";

const PROFILES = [
  { id: 1, name: "Maria Gonzalez", role: "Trauma Therapist", location: "Houston, TX", rating: 4.9, online: true, avatar: "MG", verified: true, credits: true },
  { id: 2, name: "James Thibodeau", role: "Housing Navigator", location: "Atlanta, GA", rating: 4.8, online: true, avatar: "JT", verified: true, credits: true },
  { id: 3, name: "Amara Okonkwo", role: "Employment Coach", location: "Chicago, IL", rating: 4.7, online: false, avatar: "AO", verified: true, credits: false },
  { id: 4, name: "Priya Sharma", role: "Legal Advocate", location: "New York, NY", rating: 5.0, online: true, avatar: "PS", verified: true, credits: true },
  { id: 5, name: "Lena Hoffmann", role: "Tech Skills Trainer", location: "Remote", rating: 4.9, online: true, avatar: "LH", verified: true, credits: false },
];

const NAV = [
  { icon: Users, label: "Browse", key: "browse" },
  { icon: Search, label: "Search", key: "search" },
  { icon: MessageSquare, label: "Chat", key: "chat" },
  { icon: BookOpen, label: "Directory", key: "directory" },
];

export function MobileDirectory() {
  const [activeNav, setActiveNav] = useState("browse");
  const [selected, setSelected] = useState<number | null>(null);

  if (selected) {
    const p = PROFILES.find((x) => x.id === selected)!;
    return (
      <div style={{ width: 390, height: "100%", minHeight: "100vh", background: "#0F1117", fontFamily: "'Inter', system-ui, sans-serif", color: "#E8EAF0", display: "flex", flexDirection: "column" }}>
        <div style={{ height: 44, background: "#090B0F", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>9:41</div>
          <div style={{ fontSize: 12, color: "#9CA3AF" }}>100%</div>
        </div>
        <div style={{ padding: "14px 20px", background: "#090B0F", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: COLOR, fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}><ArrowLeft size={16} /> Back</button>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#F9FAFB", flex: 1, textAlign: "center" }}>Profile</div>
          <div style={{ width: 40 }} />
        </div>
        <ScrollArea style={{ flex: 1 }}>
          <div style={{ padding: "24px 20px" }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <Avatar style={{ width: 72, height: 72, margin: "0 auto 12px" }}>
                <AvatarFallback style={{ background: `${COLOR}30`, color: COLOR, fontSize: 28, fontWeight: 800 }}>{p.avatar}</AvatarFallback>
              </Avatar>
              <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center", marginBottom: 4 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#F9FAFB" }}>{p.name}</div>
                {p.verified && <CheckCircle size={16} style={{ color: COLOR }} />}
              </div>
              <div style={{ fontSize: 14, color: "#9CA3AF", marginBottom: 8 }}>{p.role}</div>
              <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
                <Badge style={{ background: "rgba(250,204,21,0.1)", color: "#FBBF24", border: "1px solid rgba(250,204,21,0.2)", fontSize: 11 }}>⭐ {p.rating}</Badge>
                <Badge style={{ background: p.online ? "#22C55E20" : "rgba(255,255,255,0.05)", color: p.online ? "#22C55E" : "#6B7280", border: `1px solid ${p.online ? "#22C55E40" : "rgba(255,255,255,0.08)"}`, fontSize: 11 }}>{p.online ? "● Online" : "Offline"}</Badge>
                {p.credits && <Badge style={{ background: "#F59E0B10", color: "#F59E0B", border: "1px solid #F59E0B25", fontSize: 11 }}>Credits ✓</Badge>}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <button style={{ flex: 1, padding: "12px", borderRadius: 12, background: COLOR, border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Book Session</button>
              <button style={{ flex: 1, padding: "12px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: `1px solid ${COLOR}35`, color: COLOR, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Message</button>
            </div>
            <div style={{ padding: "16px", borderRadius: 14, background: `${COLOR}08`, border: `1px solid ${COLOR}18`, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}><Shield size={12} style={{ color: COLOR }} /><span style={{ fontSize: 12, fontWeight: 700, color: COLOR }}>Privacy Guaranteed</span></div>
              <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6 }}>All messages are encrypted via GetStream. Your identity is never exposed.</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#9CA3AF", marginBottom: 10 }}>Recent Reviews</div>
            {["Changed my life. Truly trauma-informed.", "Exceptional advocate and listener.", "Helped me find housing in 3 days."].map((r, i) => (
              <div key={i} style={{ padding: "12px", borderRadius: 10, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 8 }}>
                <div style={{ fontSize: 12, color: "#FBBF24", marginBottom: 4 }}>⭐⭐⭐⭐⭐</div>
                <div style={{ fontSize: 13, color: "#9CA3AF" }}>{r}</div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  }

  return (
    <div style={{ width: 390, height: "100%", minHeight: "100vh", background: "#0F1117", fontFamily: "'Inter', system-ui, sans-serif", color: "#E8EAF0", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 44, background: "#090B0F", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>9:41</div>
        <div style={{ fontSize: 12, color: "#9CA3AF" }}>100%</div>
      </div>
      <div style={{ padding: "14px 20px 10px", background: "#090B0F", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${COLOR}30`, display: "flex", alignItems: "center", justifyContent: "center" }}><BookOpen size={18} style={{ color: COLOR }} /></div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#F9FAFB" }}>Directory</div>
              <div style={{ fontSize: 11, color: COLOR }}>47,234 verified providers</div>
            </div>
          </div>
          <Badge style={{ background: `${COLOR}20`, color: COLOR, border: `1px solid ${COLOR}35`, fontSize: 11 }}>GetStream</Badge>
        </div>
        <div style={{ position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#4B5563" }} />
          <input placeholder="Search providers, skills…" style={{ width: "100%", padding: "10px 12px 10px 34px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, fontSize: 14, color: "#E8EAF0", outline: "none", boxSizing: "border-box" }} />
        </div>
      </div>
      <div style={{ padding: "10px 16px", display: "flex", gap: 6, overflowX: "auto", background: "#090B0F", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {["All", "Therapists", "Housing", "Legal", "Employment", "Tech"].map((f, i) => (
          <button key={f} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: i === 0 ? `${COLOR}20` : "rgba(255,255,255,0.04)", border: `1px solid ${i === 0 ? COLOR + "50" : "rgba(255,255,255,0.06)"}`, color: i === 0 ? COLOR : "#6B7280", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>{f}</button>
        ))}
      </div>
      <ScrollArea style={{ flex: 1 }}>
        <div style={{ padding: "12px 16px" }}>
          {PROFILES.map((p) => (
            <div key={p.id} onClick={() => setSelected(p.id)} style={{ padding: "14px", borderRadius: 14, background: "rgba(255,255,255,0.02)", border: `1px solid ${COLOR}15`, marginBottom: 10, cursor: "pointer", display: "flex", gap: 12, alignItems: "center" }}>
              <Avatar style={{ width: 48, height: 48, flexShrink: 0 }}>
                <AvatarFallback style={{ background: `${COLOR}25`, color: COLOR, fontSize: 18, fontWeight: 800 }}>{p.avatar}</AvatarFallback>
              </Avatar>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#F9FAFB", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                  {p.verified && <CheckCircle size={12} style={{ color: COLOR, flexShrink: 0 }} />}
                </div>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4 }}>{p.role}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.online ? "#22C55E" : "#4B5563" }} />
                  <span style={{ fontSize: 11, color: p.online ? "#22C55E" : "#4B5563" }}>{p.online ? "Online" : "Away"}</span>
                  <span style={{ fontSize: 11, color: "#4B5563" }}>⭐ {p.rating}</span>
                  {p.credits && <span style={{ fontSize: 10, color: "#F59E0B" }}>Credits ✓</span>}
                </div>
              </div>
              <ChevronRight size={16} style={{ color: "#4B5563", flexShrink: 0 }} />
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
