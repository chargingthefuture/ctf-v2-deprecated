import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Share2, Plus, AlertCircle, Heart, MapPin, Shield, Home, MessageSquare } from "lucide-react";

const COLOR = "#F43F5E";

const REQUESTS = [
  { id: 1, type: "need", title: "Need groceries — single mom, 3 kids", location: "N. Houston", urgency: true, category: "Food", credits: 15, time: "5 min", fulfilled: false },
  { id: 2, type: "offer", title: "I can give rides to medical appointments", location: "Buckhead, ATL", urgency: false, category: "Transport", credits: 0, time: "12 min", fulfilled: false },
  { id: 3, type: "need", title: "Spanish interpreter needed for court", location: "Chicago Loop", urgency: true, category: "Legal", credits: 30, time: "24 min", fulfilled: false },
  { id: 4, type: "offer", title: "Offering resume writing help — 10yr HR", location: "Remote", urgency: false, category: "Employment", credits: 20, time: "1 hr", fulfilled: false },
];

const NAV = [
  { icon: Home, label: "Home", key: "home" },
  { icon: Share2, label: "Feed", key: "feed" },
  { icon: Plus, label: "Post", key: "post" },
  { icon: MessageSquare, label: "Chat", key: "chat" },
];

export function MobileSocketRelay() {
  const [activeNav, setActiveNav] = useState("feed");
  const [helped, setHelped] = useState<number[]>([]);
  const [postType, setPostType] = useState<"need" | "offer">("need");

  return (
    <div style={{ width: 390, height: "100%", minHeight: "100vh", background: "#0F1117", fontFamily: "'Inter', system-ui, sans-serif", color: "#E8EAF0", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 44, background: "#090B0F", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>9:41</div><div style={{ fontSize: 12, color: "#9CA3AF" }}>100%</div>
      </div>
      <div style={{ padding: "14px 20px 12px", background: "#090B0F", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${COLOR}30`, display: "flex", alignItems: "center", justifyContent: "center" }}><Share2 size={18} style={{ color: COLOR }} /></div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#F9FAFB" }}>SocketRelay</div>
            <div style={{ fontSize: 11, color: COLOR }}>Mutual aid · 847 fulfilled today</div>
          </div>
        </div>
        <button onClick={() => setActiveNav("post")} style={{ width: 36, height: 36, borderRadius: 10, background: COLOR, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Plus size={18} style={{ color: "#fff" }} />
        </button>
      </div>
      <ScrollArea style={{ flex: 1 }}>
        <div style={{ padding: "12px 16px" }}>
          {activeNav === "feed" && (
            <>
              <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                {["All", "Needs 🆘", "Offers 🤝", "Urgent"].map((f, i) => (
                  <button key={f} style={{ padding: "5px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: i === 0 ? `${COLOR}20` : "rgba(255,255,255,0.04)", border: `1px solid ${i === 0 ? COLOR + "40" : "rgba(255,255,255,0.06)"}`, color: i === 0 ? COLOR : "#6B7280", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>{f}</button>
                ))}
              </div>
              {REQUESTS.map((r) => (
                <div key={r.id} style={{ padding: "14px", borderRadius: 14, background: "rgba(255,255,255,0.02)", border: `1px solid ${r.type === "need" ? COLOR + "30" : "#22C55E30"}`, marginBottom: 10 }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: r.type === "need" ? `${COLOR}20` : "#22C55E20", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {r.type === "need" ? <AlertCircle size={15} style={{ color: COLOR }} /> : <Heart size={15} style={{ color: "#22C55E" }} />}
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <Badge style={{ background: r.type === "need" ? `${COLOR}20` : "#22C55E20", color: r.type === "need" ? COLOR : "#22C55E", border: `1px solid ${r.type === "need" ? COLOR + "40" : "#22C55E40"}`, fontSize: 10 }}>{r.type === "need" ? "Need" : "Offer"}</Badge>
                      <Badge style={{ background: "rgba(255,255,255,0.04)", color: "#6B7280", border: "1px solid rgba(255,255,255,0.06)", fontSize: 10 }}>{r.category}</Badge>
                      {r.urgency && <Badge style={{ background: "#EF444420", color: "#EF4444", border: "1px solid #EF444440", fontSize: 10 }}>⚠ Urgent</Badge>}
                    </div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#F9FAFB", marginBottom: 6, lineHeight: 1.4 }}>{r.title}</div>
                  <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 10 }}><MapPin size={10} style={{ display: "inline" }} /> {r.location} · {r.time} ago</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    {r.credits > 0 && <span style={{ fontSize: 12, fontWeight: 700, color: "#F59E0B" }}>{r.credits} credits</span>}
                    <button
                      onClick={() => setHelped((h) => h.includes(r.id) ? h.filter((x) => x !== r.id) : [...h, r.id])}
                      style={{ flex: 1, padding: "8px", borderRadius: 8, background: helped.includes(r.id) ? "#22C55E20" : `${COLOR}15`, border: `1px solid ${helped.includes(r.id) ? "#22C55E40" : COLOR + "30"}`, color: helped.includes(r.id) ? "#22C55E" : COLOR, fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                    >
                      {helped.includes(r.id) ? "✓ Fulfilled" : r.type === "need" ? "I Can Help" : "Connect"}
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
          {activeNav === "post" && (
            <div style={{ padding: "8px 0" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#F9FAFB", marginBottom: 16 }}>Post a Request or Offer</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {(["need", "offer"] as const).map((t) => (
                  <button key={t} onClick={() => setPostType(t)} style={{ flex: 1, padding: "16px 12px", borderRadius: 14, background: postType === t ? (t === "need" ? `${COLOR}20` : "#22C55E20") : "rgba(255,255,255,0.02)", border: `2px solid ${postType === t ? (t === "need" ? COLOR : "#22C55E") : "rgba(255,255,255,0.06)"}`, cursor: "pointer", textAlign: "center" }}>
                    <div style={{ fontSize: 24, marginBottom: 4 }}>{t === "need" ? "🆘" : "🤝"}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: postType === t ? (t === "need" ? COLOR : "#22C55E") : "#6B7280" }}>{t === "need" ? "I Need Help" : "I Can Help"}</div>
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <textarea placeholder="What do you need or can offer?" rows={3} style={{ width: "100%", padding: "12px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, fontSize: 14, color: "#E8EAF0", outline: "none", resize: "none", boxSizing: "border-box" }} />
                <input placeholder="Category (Food, Transport, Legal…)" style={{ width: "100%", padding: "12px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, fontSize: 14, color: "#E8EAF0", outline: "none", boxSizing: "border-box" }} />
                <input placeholder="Location (neighborhood only)" style={{ width: "100%", padding: "12px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, fontSize: 14, color: "#E8EAF0", outline: "none", boxSizing: "border-box" }} />
                <button style={{ padding: "14px", borderRadius: 12, background: postType === "need" ? COLOR : "#22C55E", border: "none", color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
                  {postType === "need" ? "Post My Need" : "Post My Offer"}
                </button>
                <div style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}><Shield size={11} style={{ color: COLOR }} /><span style={{ fontSize: 11, fontWeight: 700, color: COLOR }}>Privacy Minimized</span></div>
                  <div style={{ fontSize: 11, color: "#6B7280" }}>Never includes identifying info. Encrypted via GetStream.</div>
                </div>
              </div>
            </div>
          )}
          {(activeNav === "home" || activeNav === "chat") && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔂</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#F9FAFB", marginBottom: 4 }}>SocketRelay</div>
              <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 20 }}>Real-time mutual aid network</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[{ l: "Open Needs", v: "234", c: COLOR }, { l: "Open Offers", v: "189", c: "#22C55E" }, { l: "Fulfilled", v: "847", c: "#F59E0B" }, { l: "Members Helped", v: "612", c: "#A855F7" }].map(({ l, v, c }) => (
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
