import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Mic, Home, Car, BookOpen, Hammer, Users, Globe, Coins,
  BarChart2, Heart, Smile, Share2, Search, Send, Radio,
  Bell, Settings, MessageSquare, Zap, ChevronRight, Sparkles,
  Hash, ArrowUpRight, Plus,
} from "lucide-react";

const MINI_APPS = [
  { id: "chyme", name: "Chyme", emoji: "🎙️", icon: Radio, color: "#22C55E" },
  { id: "lighthouse", name: "LightHouse", emoji: "🏠", icon: Home, color: "#EAB308" },
  { id: "trusttransport", name: "TrustTransport", emoji: "📦", icon: Car, color: "#F97316" },
  { id: "directory", name: "Directory", emoji: "📇", icon: BookOpen, color: "#3B82F6" },
  { id: "foundation", name: "Foundation", emoji: "🪛", icon: Hammer, color: "#EF4444" },
  { id: "peer-programming", name: "Peer Programming", emoji: "🏘️", icon: Users, color: "#8B5CF6" },
  { id: "gdp", name: "GDP", emoji: "🗺️", icon: Globe, color: "#06B6D4" },
  { id: "service-credits", name: "Credits", emoji: "⚙️", icon: Coins, color: "#F59E0B" },
  { id: "workforce", name: "Workforce", emoji: "💼", icon: BarChart2, color: "#6366F1" },
  { id: "gentlepulse", name: "GentlePulse", emoji: "💚", icon: Heart, color: "#14B8A6" },
  { id: "mood", name: "Mood", emoji: "😁", icon: Smile, color: "#EC4899" },
  { id: "socketrelay", name: "SocketRelay", emoji: "🔂", icon: Share2, color: "#F43F5E" },
];

const LIVE_ROOMS = [
  { title: "Survivor Stories: Rebuilding Together", host: "Amara O.", listeners: 128, color: "#22C55E" },
  { title: "Service Credits 101", host: "Maria G.", listeners: 67, color: "#22C55E" },
];

const CHAT_MSGS = [
  { id: 1, from: "hub", text: "Good morning! 3 new opportunities in your network. 🌍" },
  { id: 2, from: "user", text: "Find housing near me" },
  { id: 3, from: "hub", text: "Found 12 safe listings via LightHouse. 2 accept Service Credits.", action: "Open LightHouse" },
];

const NAV = [
  { icon: MessageSquare, label: "Chat", key: "chat" },
  { icon: Zap, label: "Apps", key: "apps" },
  { icon: Radio, label: "Chyme", key: "chyme" },
  { icon: Bell, label: "Alerts", key: "alerts" },
  { icon: Settings, label: "Settings", key: "settings" },
];

export function MobileHome() {
  const [activeNav, setActiveNav] = useState("chat");
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState(CHAT_MSGS);

  const sendMsg = () => {
    if (!input.trim()) return;
    setMsgs((m) => [...m, { id: Date.now(), from: "user", text: input }]);
    setInput("");
  };

  return (
    <div style={{ width: 390, height: "100%", minHeight: "100vh", background: "#0F1117", fontFamily: "'Inter', system-ui, sans-serif", color: "#E8EAF0", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      {/* Status bar */}
      <div style={{ height: 44, background: "#090B0F", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", flexShrink: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#E8EAF0" }}>9:41</div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", color: "#9CA3AF" }}>
          <div style={{ fontSize: 12 }}>•••</div>
          <div style={{ fontSize: 12 }}>WiFi</div>
          <div style={{ fontSize: 12 }}>100%</div>
        </div>
      </div>

      {/* Header */}
      <div style={{ padding: "14px 20px 10px", background: "#090B0F", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#7C3AED,#0EA5E9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff" }}>SH</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#F9FAFB" }}>Survivor Hub</div>
              <div style={{ fontSize: 11, color: "#22C55E" }}>✓ Safe Space · 4.9M members</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Search size={16} style={{ color: "#6B7280" }} />
            </button>
            <button style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Bell size={16} style={{ color: "#6B7280" }} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {activeNav === "chat" && (
          <>
            {/* Hero */}
            <div style={{ margin: "12px 16px 0", padding: "16px", borderRadius: 16, background: "linear-gradient(135deg,rgba(124,58,237,0.25) 0%,rgba(14,165,233,0.15) 100%)", border: "1px solid rgba(124,58,237,0.2)", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                <Sparkles size={13} style={{ color: "#A78BFA" }} />
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#A78BFA", textTransform: "uppercase" }}>From Survivor to Thriver</span>
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#F9FAFB", marginBottom: 8 }}>Your network is active. 🌍</div>
              <div style={{ display: "flex", gap: 8 }}>
                {[{ v: "4.9M", l: "Members", c: "#A78BFA" }, { v: "$247B", l: "GDP", c: "#38BDF8" }, { v: "127", l: "Nations", c: "#34D399" }].map(({ v, l, c }) => (
                  <div key={l} style={{ flex: 1, textAlign: "center", background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "8px 4px" }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: c }}>{v}</div>
                    <div style={{ fontSize: 10, color: "#6B7280" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live rooms strip */}
            <div style={{ padding: "14px 16px 0", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.08em" }}>🔴 Live on Chyme</div>
                <span style={{ fontSize: 12, color: "#22C55E", cursor: "pointer" }}>See all</span>
              </div>
              <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
                {LIVE_ROOMS.map((room) => (
                  <div key={room.title} style={{ minWidth: 200, padding: "12px", borderRadius: 12, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", flexShrink: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 6px #22C55E" }} />
                      <span style={{ fontSize: 10, color: "#22C55E", fontWeight: 600 }}>LIVE · {room.listeners}</span>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#F0FDF4", marginBottom: 4, lineHeight: 1.4 }}>{room.title}</div>
                    <div style={{ fontSize: 11, color: "#4B5563" }}>{room.host}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat */}
            <ScrollArea style={{ flex: 1, padding: "12px 16px 0" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {msgs.map((msg) => (
                  <div key={msg.id} style={{ display: "flex", flexDirection: msg.from === "user" ? "row-reverse" : "row", gap: 8, alignItems: "flex-end" }}>
                    {msg.from === "hub" && (
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#7C3AED,#0EA5E9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#fff", flexShrink: 0 }}>SH</div>
                    )}
                    <div style={{ maxWidth: "78%", display: "flex", flexDirection: "column", gap: 5 }}>
                      <div style={{ padding: "10px 14px", borderRadius: msg.from === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: msg.from === "user" ? "linear-gradient(135deg,#7C3AED,#6D28D9)" : "rgba(255,255,255,0.05)", border: msg.from === "user" ? "none" : "1px solid rgba(255,255,255,0.07)", fontSize: 13, lineHeight: 1.5, color: "#E8EAF0" }}>
                        {msg.text}
                      </div>
                      {(msg as any).action && (
                        <button style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 8, background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.25)", color: "#38BDF8", fontSize: 12, fontWeight: 600, cursor: "pointer", alignSelf: "flex-start" }}>
                          {(msg as any).action} <ArrowUpRight size={11} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Suggestions */}
            <div style={{ padding: "8px 16px 0", display: "flex", gap: 6, overflowX: "auto", flexShrink: 0 }}>
              {["Find housing", "Join Chyme", "My credits", "Meditation"].map((s) => (
                <button key={s} onClick={() => setInput(s)} style={{ padding: "5px 12px", borderRadius: 20, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 12, color: "#9CA3AF", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>{s}</button>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: "8px 16px 12px", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14 }}>
                <Plus size={16} style={{ color: "#4B5563", flexShrink: 0 }} />
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMsg()} placeholder="Ask anything…" style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 14, color: "#E8EAF0" }} />
                <button onClick={sendMsg} style={{ width: 30, height: 30, borderRadius: 8, background: input.trim() ? "linear-gradient(135deg,#7C3AED,#0EA5E9)" : "rgba(255,255,255,0.06)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
                  <Send size={13} style={{ color: input.trim() ? "#fff" : "#4B5563" }} />
                </button>
              </div>
            </div>
          </>
        )}

        {activeNav === "apps" && (
          <ScrollArea style={{ flex: 1, padding: "16px" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#F9FAFB", marginBottom: 4 }}>Mini-Apps</div>
            <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 16 }}>Tap to launch</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
              {MINI_APPS.map((app) => {
                const Icon = app.icon;
                return (
                  <div key={app.id} style={{ padding: "16px 12px", borderRadius: 14, background: `${app.color}10`, border: `1px solid ${app.color}25`, cursor: "pointer", textAlign: "center" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${app.color}20`, border: `1px solid ${app.color}35`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                      <Icon size={22} style={{ color: app.color }} />
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#E8EAF0", marginBottom: 2 }}>{app.name}</div>
                    <div style={{ fontSize: 14 }}>{app.emoji}</div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}

        {activeNav !== "chat" && activeNav !== "apps" && (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#4B5563", fontSize: 14 }}>
            {activeNav.charAt(0).toUpperCase() + activeNav.slice(1)} — coming soon
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div style={{ height: 72, background: "#090B0F", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0 8px", flexShrink: 0 }}>
        {NAV.map(({ icon: Icon, label, key }) => (
          <button key={key} onClick={() => setActiveNav(key)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1, padding: "8px 4px", background: "transparent", border: "none", cursor: "pointer" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: activeNav === key ? "rgba(124,58,237,0.2)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={20} style={{ color: activeNav === key ? "#A78BFA" : "#6B7280" }} />
            </div>
            <span style={{ fontSize: 10, color: activeNav === key ? "#A78BFA" : "#4B5563", fontWeight: activeNav === key ? 600 : 400 }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
