import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Heart, MessageCircle, Share2, Bell, Bookmark, AlertCircle, Plus, Home, TrendingUp } from "lucide-react";

const COLOR = "#8B5CF6";

const POSTS = [
  { id: 1, author: "Survivor Hub", avatar: "SH", time: "2 min", title: "🚀 Phase 2 Live: LightHouse, SocketRelay & TrustTransport!", body: "Three powerful new plugins are now live for all verified members.", likes: 842, comments: 127, urgent: false, color: "#A78BFA" },
  { id: 2, author: "Amara O.", avatar: "AO", time: "18 min", title: "My 6-month journey from survivor to employed", body: "I want to share what helped me. The Workforce dashboard showed my gaps. Skills Hunt leveled me up.", likes: 1203, comments: 89, urgent: false, color: COLOR },
  { id: 3, author: "Safety Team", avatar: "ST", time: "1 hr", title: "⚠️ 47 Emergency Housing Slots — Houston TX", body: "Urgent: 47 emergency safe housing slots opened in Houston. 12 accept Service Credits.", likes: 310, comments: 44, urgent: true, color: "#F97316" },
  { id: 4, author: "Community Bot", avatar: "CB", time: "3 hr", title: "🎉 5 Million Members Worldwide!", body: "We just crossed 5M survivors in 127 countries. $247B economy. This is YOUR economy.", likes: 9841, comments: 1432, urgent: false, color: "#22C55E" },
];

const NAV = [
  { icon: Home, label: "Feed", key: "feed" },
  { icon: TrendingUp, label: "Trending", key: "trending" },
  { icon: Megaphone, label: "Alerts", key: "alerts" },
  { icon: Bell, label: "Notify", key: "notify" },
];

export function MobileFeed() {
  const [activeNav, setActiveNav] = useState("feed");
  const [liked, setLiked] = useState<number[]>([]);
  const toggleLike = (id: number) => setLiked((l) => l.includes(id) ? l.filter((x) => x !== id) : [...l, id]);

  return (
    <div style={{ width: 390, height: "100%", minHeight: "100vh", background: "#0F1117", fontFamily: "'Inter', system-ui, sans-serif", color: "#E8EAF0", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 44, background: "#090B0F", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>9:41</div>
        <div style={{ fontSize: 12, color: "#9CA3AF" }}>100%</div>
      </div>
      <div style={{ padding: "14px 20px 12px", background: "#090B0F", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${COLOR}30`, display: "flex", alignItems: "center", justifyContent: "center" }}><Megaphone size={18} style={{ color: COLOR }} /></div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#F9FAFB" }}>Feed</div>
            <div style={{ fontSize: 11, color: COLOR }}>Community pulse · Live</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ padding: "4px 10px", borderRadius: 20, background: "#EF444420", border: "1px solid #EF444440", fontSize: 11, color: "#EF4444", fontWeight: 700 }}>3 Alerts</div>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}><Plus size={16} style={{ color: "#6B7280" }} /></div>
        </div>
      </div>
      <ScrollArea style={{ flex: 1 }}>
        <div style={{ padding: "12px 16px" }}>
          {POSTS.map((post) => (
            <div key={post.id} style={{ marginBottom: 12, padding: "16px", borderRadius: 16, background: "rgba(255,255,255,0.02)", border: `1px solid ${post.urgent ? post.color + "40" : "rgba(255,255,255,0.06)"}` }}>
              {post.urgent && (
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8, padding: "4px 10px", borderRadius: 6, background: "#EF444415", border: "1px solid #EF444430", width: "fit-content" }}>
                  <AlertCircle size={11} style={{ color: "#EF4444" }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#EF4444" }}>URGENT</span>
                </div>
              )}
              <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center" }}>
                <Avatar style={{ width: 36, height: 36 }}>
                  <AvatarFallback style={{ background: `${post.color}25`, color: post.color, fontSize: 13, fontWeight: 800 }}>{post.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#F9FAFB" }}>{post.author}</div>
                  <div style={{ fontSize: 11, color: "#4B5563" }}>{post.time} ago</div>
                </div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#F9FAFB", marginBottom: 6, lineHeight: 1.4 }}>{post.title}</div>
              <div style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.6, marginBottom: 12 }}>{post.body}</div>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <button onClick={() => toggleLike(post.id)} style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", color: liked.includes(post.id) ? "#EC4899" : "#6B7280", fontSize: 13 }}>
                  <Heart size={14} fill={liked.includes(post.id) ? "#EC4899" : "none"} /> {post.likes + (liked.includes(post.id) ? 1 : 0)}
                </button>
                <button style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: 13 }}><MessageCircle size={14} /> {post.comments}</button>
                <button style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: 13 }}><Share2 size={14} /></button>
                <button style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: 13, marginLeft: "auto" }}><Bookmark size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div style={{ height: 72, background: "#090B0F", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0 8px" }}>
        {NAV.map(({ icon: Icon, label, key }) => (
          <button key={key} onClick={() => setActiveNav(key)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1, padding: "8px 4px", background: "transparent", border: "none", cursor: "pointer" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: activeNav === key ? `${COLOR}20` : "transparent", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <Icon size={20} style={{ color: activeNav === key ? COLOR : "#6B7280" }} />
              {key === "alerts" && <div style={{ position: "absolute", top: 2, right: 2, width: 8, height: 8, borderRadius: "50%", background: "#EF4444" }} />}
            </div>
            <span style={{ fontSize: 10, color: activeNav === key ? COLOR : "#4B5563", fontWeight: activeNav === key ? 600 : 400 }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
