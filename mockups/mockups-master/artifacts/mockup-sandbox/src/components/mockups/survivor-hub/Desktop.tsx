import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Mic, Home, Car, BookOpen, Hammer, Users, Globe, Coins,
  BarChart2, Heart, Smile, Share2, Search, Send, Plus,
  ChevronRight, Sparkles, Radio, Bell, Settings, MessageSquare,
  Hash, Zap, ArrowUpRight, X,
} from "lucide-react";
import { ChymeApp } from "./Chyme";

const MINI_APPS = [
  { id: "chyme", name: "Chyme", emoji: "🎙️", icon: Radio, desc: "Social audio rooms", color: "#22C55E", bg: "#052e16", tag: "Phase 0" },
  { id: "lighthouse", name: "LightHouse", emoji: "🏠", icon: Home, desc: "Safe housing marketplace", color: "#EAB308", bg: "#1c1407", tag: "Phase 2" },
  { id: "trusttransport", name: "TrustTransport", emoji: "📦", icon: Car, desc: "People & package delivery", color: "#F97316", bg: "#1c0a03", tag: "Phase 1" },
  { id: "directory", name: "Directory", emoji: "📇", icon: BookOpen, desc: "People & skills directory", color: "#3B82F6", bg: "#0c1a3d", tag: "Phase 0" },
  { id: "foundation", name: "Foundation", emoji: "🪛", icon: Hammer, desc: "Find skilled tradespeople", color: "#EF4444", bg: "#1c0505", tag: "Phase 1" },
  { id: "peer-programming", name: "Peer Programming", emoji: "🏘️", icon: Users, desc: "Weekly global masterminds", color: "#8B5CF6", bg: "#150d2e", tag: "Phase 1" },
  { id: "gdp", name: "Gross Domestic Product", emoji: "🗺️", icon: Globe, desc: "TI Skills Economy tracker", color: "#06B6D4", bg: "#011c26", tag: "Phase 2" },
  { id: "service-credits", name: "Service Credits", emoji: "⚙️", icon: Coins, desc: "Utility token ecosystem", color: "#F59E0B", bg: "#1c1200", tag: "Phase 1" },
  { id: "workforce", name: "Workforce", emoji: "💼", icon: BarChart2, desc: "Skills distribution & gaps", color: "#6366F1", bg: "#0e0f30", tag: "Phase 1" },
  { id: "gentlepulse", name: "GentlePulse", emoji: "💚", icon: Heart, desc: "Guided meditation", color: "#14B8A6", bg: "#011c1a", tag: "Phase 2" },
  { id: "mood", name: "Mood", emoji: "😁", icon: Smile, desc: "Anonymous mood check-ins", color: "#EC4899", bg: "#1c0416", tag: "Phase 0" },
  { id: "socketrelay", name: "SocketRelay", emoji: "🔂", icon: Share2, desc: "Mutual aid network", color: "#F43F5E", bg: "#1c0409", tag: "Phase 0" },
];

const CHAT_MESSAGES = [
  { id: 1, from: "hub", text: "Welcome back, Survivor. You have 3 new opportunities in your network today.", time: "9:01 AM" },
  { id: 2, from: "user", text: "Show me housing options near me", time: "9:03 AM" },
  { id: 3, from: "hub", text: "I found 12 verified safe housing listings through LightHouse. Two are accepting Service Credits. Want me to open LightHouse?", time: "9:03 AM", action: { label: "Open LightHouse →", app: "lighthouse" } },
  { id: 4, from: "user", text: "What's the GDP tracker showing this week?", time: "9:05 AM" },
  { id: 5, from: "hub", text: "The TI Skills Economy is at $247B of its $300B opportunity. Your skills are contributing to Workforce. 4.9M active members globally.", time: "9:05 AM", stat: { label: "$247B", sub: "of $300B opportunity" } },
];

const SUGGESTED = ["Find a tradesperson", "Join a Chyme room", "Check my Service Credits", "Open meditation", "View skills directory"];
const CHANNELS = [
  { name: "general", unread: 3 },
  { name: "housing-help", unread: 1 },
  { name: "skills-trade", unread: 0 },
  { name: "mutual-aid", unread: 7 },
];

export function Desktop() {
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [openApp, setOpenApp] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const [section, setSection] = useState<"chat" | "apps">("chat");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), from: "user", text: input, time: "Now" }]);
    setInput("");
  };

  if (openApp === "chyme") {
    return <ChymeApp onClose={() => setOpenApp(null)} />;
  }

  const app = MINI_APPS.find((a) => a.id === openApp);
  if (openApp && app) {
    return (
      <div className="min-h-screen w-full flex flex-col" style={{ background: app.bg, fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div style={{ height: 56, borderBottom: `1px solid ${app.color}25`, display: "flex", alignItems: "center", padding: "0 24px", gap: 16, background: "rgba(0,0,0,0.3)" }}>
          <button onClick={() => setOpenApp(null)} style={{ color: app.color, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}>
            <X size={16} /> Back
          </button>
          <div style={{ flex: 1, textAlign: "center", fontSize: 16, fontWeight: 700, color: "#fff" }}>{app.emoji} {app.name}</div>
          <Badge style={{ background: `${app.color}20`, color: app.color, border: `1px solid ${app.color}40`, fontSize: 11 }}>Live</Badge>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, color: "#9CA3AF" }}>
          <div style={{ fontSize: 40 }}>{app.emoji}</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#F9FAFB" }}>{app.name}</div>
          <div style={{ fontSize: 15, color: "#6B7280" }}>{app.desc}</div>
          <div style={{ padding: "10px 20px", borderRadius: 10, background: `${app.color}18`, border: `1px solid ${app.color}35`, color: app.color, fontSize: 13 }}>Coming soon — GetStream powered</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex" style={{ background: "#0F1117", fontFamily: "'Inter', system-ui, sans-serif", color: "#E8EAF0" }}>
      {/* Icon rail */}
      <aside style={{ width: 72, background: "#090B0F", borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 16, paddingBottom: 16, gap: 8, flexShrink: 0 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#7C3AED 0%,#0EA5E9 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 12, flexShrink: 0 }}>SH</div>
        {[{ icon: MessageSquare, key: "chat" }, { icon: Zap, key: "apps" }].map(({ icon: Icon, key }) => (
          <button key={key} onClick={() => setSection(key as "chat" | "apps")} style={{ width: 44, height: 44, borderRadius: 12, background: section === key ? "rgba(124,58,237,0.2)" : "transparent", border: section === key ? "1px solid rgba(124,58,237,0.4)" : "1px solid transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: section === key ? "#A78BFA" : "#6B7280" }}>
            <Icon size={20} />
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button style={{ width: 44, height: 44, borderRadius: 12, background: "transparent", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#6B7280" }}><Bell size={18} /></button>
        <button style={{ width: 44, height: 44, borderRadius: 12, background: "transparent", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#6B7280" }}><Settings size={18} /></button>
        <Avatar style={{ width: 36, height: 36, marginTop: 4 }}>
          <AvatarFallback style={{ background: "linear-gradient(135deg,#7C3AED,#0EA5E9)", color: "#fff", fontSize: 14, fontWeight: 700 }}>S</AvatarFallback>
        </Avatar>
      </aside>

      {/* Second sidebar */}
      <aside style={{ width: 240, background: "#0D0F14", borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "20px 16px 12px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#6B7280", textTransform: "uppercase", marginBottom: 12 }}>
            {section === "chat" ? "Channels" : "Mini-Apps"}
          </div>
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#4B5563" }} />
            <input placeholder={section === "chat" ? "Search channels…" : "Search apps…"} style={{ width: "100%", padding: "7px 10px 7px 30px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, fontSize: 13, color: "#9CA3AF", outline: "none", boxSizing: "border-box" }} />
          </div>
        </div>
        <ScrollArea style={{ flex: 1 }}>
          {section === "chat" ? (
            <div style={{ padding: "0 8px 16px" }}>
              {CHANNELS.map((ch) => (
                <div key={ch.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, cursor: "pointer", background: ch.name === "general" ? "rgba(124,58,237,0.12)" : "transparent" }}>
                  <Hash size={15} style={{ color: ch.unread > 0 ? "#9CA3AF" : "#4B5563", flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: ch.unread > 0 || ch.name === "general" ? "#E8EAF0" : "#6B7280", flex: 1 }}>{ch.name}</span>
                  {ch.unread > 0 && <span style={{ background: "#7C3AED", borderRadius: 10, fontSize: 11, fontWeight: 700, color: "#fff", padding: "1px 6px" }}>{ch.unread}</span>}
                </div>
              ))}
              <div style={{ margin: "20px 0 8px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#4B5563", textTransform: "uppercase", padding: "0 10px" }}>Direct Messages</div>
              {["Maria G.", "James T.", "Amara O."].map((name) => (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, cursor: "pointer" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "#9CA3AF" }}>{name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: "0 8px 16px" }}>
              {MINI_APPS.map((app) => {
                const Icon = app.icon;
                return (
                  <div key={app.id} onClick={() => setActiveApp(app.id === activeApp ? null : app.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, cursor: "pointer", background: activeApp === app.id ? `${app.color}18` : "transparent", borderLeft: activeApp === app.id ? `2px solid ${app.color}` : "2px solid transparent", marginLeft: 2 }}>
                    <Icon size={15} style={{ color: activeApp === app.id ? app.color : "#6B7280", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: activeApp === app.id ? "#E8EAF0" : "#9CA3AF", flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{app.name}</span>
                    <span style={{ fontSize: 12 }}>{app.emoji}</span>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
        <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ padding: "10px 12px", borderRadius: 10, background: "linear-gradient(135deg,rgba(124,58,237,0.15) 0%,rgba(14,165,233,0.15) 100%)", border: "1px solid rgba(124,58,237,0.25)", cursor: "pointer" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#A78BFA", marginBottom: 2 }}>Safe Space · Invite Only</div>
            <div style={{ fontSize: 11, color: "#6B7280" }}>4.9M survivors worldwide</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header style={{ height: 56, borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", padding: "0 24px", gap: 16, background: "#0D0F14", flexShrink: 0 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#E8EAF0" }}>{section === "chat" ? "# general" : activeApp ? MINI_APPS.find((a) => a.id === activeApp)?.name : "All Mini-Apps"}</div>
            <div style={{ fontSize: 12, color: "#6B7280" }}>{section === "chat" ? "Community · 4,912 online" : "Your peer-to-peer marketplace"}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Badge style={{ background: "rgba(34,197,94,0.15)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.25)", fontSize: 11, padding: "3px 10px", borderRadius: 20 }}>✓ Safe Space</Badge>
            <Badge style={{ background: "rgba(14,165,233,0.12)", color: "#38BDF8", border: "1px solid rgba(14,165,233,0.2)", fontSize: 11, padding: "3px 10px", borderRadius: 20 }}>GetStream ⚡</Badge>
          </div>
        </header>

        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
            {section === "chat" ? (
              <>
                <div style={{ margin: "20px 24px 0", padding: "20px 24px", borderRadius: 16, background: "linear-gradient(135deg,rgba(124,58,237,0.2) 0%,rgba(14,165,233,0.1) 50%,rgba(16,185,129,0.1) 100%)", border: "1px solid rgba(124,58,237,0.2)", display: "flex", alignItems: "center", gap: 20, flexShrink: 0 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <Sparkles size={16} style={{ color: "#A78BFA" }} />
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#A78BFA", textTransform: "uppercase" }}>From Survivor to Thriver</span>
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#F9FAFB", lineHeight: 1.3 }}>Good morning — your network is active.</div>
                    <div style={{ fontSize: 14, color: "#9CA3AF", marginTop: 4 }}>5 million survivors. One economy. $300B opportunity.</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[{ v: "4.9M", l: "Members", c: "#A78BFA" }, { v: "$247B", l: "GDP", c: "#38BDF8" }, { v: "127", l: "Countries", c: "#34D399" }].map(({ v, l, c }) => (
                      <div key={l} style={{ textAlign: "center", background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "10px 16px", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div style={{ fontSize: 20, fontWeight: 800, color: c }}>{v}</div>
                        <div style={{ fontSize: 11, color: "#6B7280" }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <ScrollArea style={{ flex: 1, padding: "16px 24px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {messages.map((msg) => (
                      <div key={msg.id} style={{ display: "flex", flexDirection: msg.from === "user" ? "row-reverse" : "row", gap: 10, alignItems: "flex-end" }}>
                        {msg.from === "hub" && (
                          <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#7C3AED 0%,#0EA5E9 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff", flexShrink: 0 }}>SH</div>
                        )}
                        <div style={{ maxWidth: "70%", display: "flex", flexDirection: "column", gap: 6 }}>
                          <div style={{ padding: "12px 16px", borderRadius: msg.from === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: msg.from === "user" ? "linear-gradient(135deg,#7C3AED 0%,#6D28D9 100%)" : "rgba(255,255,255,0.05)", border: msg.from === "user" ? "none" : "1px solid rgba(255,255,255,0.06)", fontSize: 14, lineHeight: 1.6, color: "#E8EAF0" }}>{msg.text}</div>
                          {(msg as any).action && (
                            <button onClick={() => { setActiveApp("chyme"); setSection("apps"); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.25)", color: "#38BDF8", fontSize: 13, fontWeight: 600, cursor: "pointer", alignSelf: "flex-start" }}>
                              {(msg as any).action.label}<ArrowUpRight size={13} />
                            </button>
                          )}
                          {(msg as any).stat && (
                            <div style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.15)", display: "flex", gap: 10, alignItems: "center" }}>
                              <Globe size={16} style={{ color: "#06B6D4" }} />
                              <div>
                                <div style={{ fontSize: 18, fontWeight: 800, color: "#22D3EE" }}>{(msg as any).stat.label}</div>
                                <div style={{ fontSize: 11, color: "#6B7280" }}>{(msg as any).stat.sub}</div>
                              </div>
                            </div>
                          )}
                          <div style={{ fontSize: 11, color: "#4B5563", textAlign: msg.from === "user" ? "right" : "left" }}>{msg.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div style={{ padding: "0 24px 8px", display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {SUGGESTED.map((s) => (
                    <button key={s} onClick={() => setInput(s)} style={{ padding: "6px 14px", borderRadius: 20, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 13, color: "#9CA3AF", cursor: "pointer" }}>{s}</button>
                  ))}
                </div>

                <div style={{ padding: "8px 24px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14 }}>
                    <Plus size={18} style={{ color: "#4B5563", cursor: "pointer", flexShrink: 0 }} />
                    <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="Ask Survivor Hub anything, or search resources…" style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 14, color: "#E8EAF0" }} />
                    <button onClick={handleSend} style={{ width: 32, height: 32, borderRadius: 8, background: input.trim() ? "linear-gradient(135deg,#7C3AED 0%,#0EA5E9 100%)" : "rgba(255,255,255,0.06)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
                      <Send size={14} style={{ color: input.trim() ? "#fff" : "#4B5563" }} />
                    </button>
                  </div>
                  <div style={{ textAlign: "center", fontSize: 11, color: "#374151", marginTop: 8 }}>Powered by GetStream · End-to-end encrypted · Safe space guaranteed</div>
                </div>
              </>
            ) : (
              <ScrollArea style={{ flex: 1 }}>
                <div style={{ padding: "24px" }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#F9FAFB", marginBottom: 4 }}>All Mini-Apps</div>
                    <div style={{ fontSize: 14, color: "#6B7280" }}>Your complete peer-to-peer marketplace — from survivor to thriver</div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                    {MINI_APPS.map((app) => {
                      const Icon = app.icon;
                      return (
                        <div key={app.id} style={{ padding: "18px 20px", borderRadius: 14, background: activeApp === app.id ? `${app.color}18` : `${app.bg}88`, border: `1px solid ${activeApp === app.id ? app.color + "50" : app.color + "20"}`, cursor: "pointer", transition: "all 0.15s" }} onClick={() => setActiveApp(app.id === activeApp ? null : app.id)}>
                          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${app.color}20`, border: `1px solid ${app.color}35`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Icon size={20} style={{ color: app.color }} />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                              <Badge style={{ background: `${app.color}15`, color: app.color, border: `1px solid ${app.color}30`, fontSize: 10, padding: "2px 8px", borderRadius: 20 }}>Live</Badge>
                              <span style={{ fontSize: 10, color: "#4B5563" }}>{app.tag}</span>
                            </div>
                          </div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: "#F9FAFB", marginBottom: 4 }}>{app.emoji} {app.name}</div>
                          <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 14 }}>{app.desc}</div>
                          <button onClick={(e) => { e.stopPropagation(); setOpenApp(app.id); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, background: `${app.color}15`, border: `1px solid ${app.color}35`, color: app.color, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                            Open App <ChevronRight size={12} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollArea>
            )}
          </div>

          {/* Right panel */}
          <aside style={{ width: 280, borderLeft: "1px solid rgba(255,255,255,0.06)", background: "#0D0F14", display: "flex", flexDirection: "column", flexShrink: 0 }}>
            <div style={{ padding: "20px 16px" }}>
              <div style={{ padding: "16px", borderRadius: 14, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", marginBottom: 16, textAlign: "center" }}>
                <Avatar style={{ width: 56, height: 56, margin: "0 auto 10px" }}>
                  <AvatarFallback style={{ background: "linear-gradient(135deg,#7C3AED 0%,#0EA5E9 100%)", color: "#fff", fontSize: 22, fontWeight: 800 }}>S</AvatarFallback>
                </Avatar>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#F9FAFB", marginBottom: 4 }}>Welcome, Survivor</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 10 }}>Member since 2024</div>
                <Badge style={{ background: "rgba(124,58,237,0.15)", color: "#A78BFA", border: "1px solid rgba(124,58,237,0.25)", fontSize: 11, padding: "4px 12px", borderRadius: 20 }}>Safe Space ✓</Badge>
              </div>
              <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)", marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: "#C4B5FD", lineHeight: 1.6, fontStyle: "italic", marginBottom: 8 }}>"You are not what happened to you. You are what you choose to become."</div>
                <div style={{ fontSize: 11, color: "#6B7280" }}>— Carl Jung</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#4B5563", textTransform: "uppercase", marginBottom: 10 }}>Active Apps</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {MINI_APPS.slice(0, 5).map((app) => {
                    const Icon = app.icon;
                    return (
                      <div key={app.id} onClick={() => setOpenApp(app.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, background: "rgba(255,255,255,0.02)", cursor: "pointer", border: `1px solid ${app.color}15` }}>
                        <Icon size={14} style={{ color: app.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: "#9CA3AF", flex: 1 }}>{app.name}</span>
                        <span style={{ fontSize: 10, color: app.color }}>{app.emoji}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.12)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <Globe size={14} style={{ color: "#06B6D4" }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#22D3EE" }}>GDP Progress</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#F9FAFB", marginBottom: 2 }}>$247B</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 10 }}>of $300B opportunity</div>
                <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: "82%", borderRadius: 3, background: "linear-gradient(90deg,#06B6D4 0%,#7C3AED 100%)" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  <span style={{ fontSize: 11, color: "#4B5563" }}>82% to goal</span>
                  <span style={{ fontSize: 11, color: "#22D3EE" }}>$53B remaining</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
