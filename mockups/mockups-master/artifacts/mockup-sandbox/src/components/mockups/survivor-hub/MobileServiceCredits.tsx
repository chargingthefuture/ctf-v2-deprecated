import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Coins, TrendingUp, ArrowDown, ArrowUp, Home, RefreshCw, CheckCircle, Shield } from "lucide-react";

const COLOR = "#F59E0B";

const TRANSACTIONS = [
  { id: 1, type: "earned", description: "Skills Hunt — Week 3 bonus", amount: +200, date: "Today 9:15 AM" },
  { id: 2, type: "spent", description: "LightHouse — Nov rent", amount: -850, date: "Today 8:00 AM" },
  { id: 3, type: "received", description: "Foundation — Electrician service", amount: +12, date: "Yesterday" },
  { id: 4, type: "earned", description: "Peer Programming — Cohort bonus", amount: +500, date: "Mon" },
  { id: 5, type: "sent", description: "SocketRelay — Grocery assist", amount: -15, date: "Sun" },
];

const EARN_WAYS = [
  { title: "Complete Skills Hunt Round", credits: "+200", color: "#A855F7" },
  { title: "Facilitate Peer Programming", credits: "+500", color: "#8B5CF6" },
  { title: "Verify Your Profile", credits: "+50", color: "#3B82F6" },
  { title: "Refer a Survivor", credits: "+100", color: "#22C55E" },
];

const NAV = [
  { icon: Home, label: "Home", key: "home" },
  { icon: Coins, label: "Wallet", key: "wallet" },
  { icon: TrendingUp, label: "Earn", key: "earn" },
  { icon: ArrowUp, label: "Send", key: "send" },
];

export function MobileServiceCredits() {
  const [activeNav, setActiveNav] = useState("wallet");
  const [sendAmount, setSendAmount] = useState("");

  const typeColor = (type: string) => type === "earned" || type === "received" ? "#22C55E" : "#EF4444";
  const typeSign = (amount: number) => amount > 0 ? "+" : "";

  return (
    <div style={{ width: 390, height: "100%", minHeight: "100vh", background: "#0F1117", fontFamily: "'Inter', system-ui, sans-serif", color: "#E8EAF0", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 44, background: "#090B0F", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>9:41</div><div style={{ fontSize: 12, color: "#9CA3AF" }}>100%</div>
      </div>
      <div style={{ padding: "14px 20px 12px", background: "#090B0F", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${COLOR}30`, display: "flex", alignItems: "center", justifyContent: "center" }}><Coins size={18} style={{ color: COLOR }} /></div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#F9FAFB" }}>Service Credits</div>
            <div style={{ fontSize: 11, color: COLOR }}>Utility token ecosystem</div>
          </div>
        </div>
        <div style={{ padding: "6px 12px", borderRadius: 10, background: `${COLOR}08`, border: `1px solid ${COLOR}20`, textAlign: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: COLOR }}>2,420</div>
          <div style={{ fontSize: 9, color: "#6B7280" }}>credits</div>
        </div>
      </div>
      <ScrollArea style={{ flex: 1 }}>
        <div style={{ padding: "16px" }}>
          {activeNav === "wallet" && (
            <>
              {/* Balance card */}
              <div style={{ padding: "20px", borderRadius: 16, background: `linear-gradient(135deg,${COLOR}25 0%,rgba(245,158,11,0.05) 100%)`, border: `1px solid ${COLOR}30`, marginBottom: 16, textAlign: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: COLOR, marginBottom: 6 }}>YOUR BALANCE</div>
                <div style={{ fontSize: 48, fontWeight: 900, color: "#F9FAFB", lineHeight: 1, marginBottom: 4 }}>2,420</div>
                <div style={{ fontSize: 13, color: COLOR, marginBottom: 16 }}>credits ≈ $242 USD</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ flex: 1, padding: "10px", borderRadius: 10, background: COLOR, border: "none", color: "#0F1117", fontSize: 13, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}><ArrowUp size={14} /> Send</button>
                  <button style={{ flex: 1, padding: "10px", borderRadius: 10, background: "rgba(255,255,255,0.06)", border: `1px solid ${COLOR}30`, color: COLOR, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}><ArrowDown size={14} /> Request</button>
                  <button style={{ flex: 1, padding: "10px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#9CA3AF", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}><RefreshCw size={14} /> Swap</button>
                </div>
              </div>
              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
                {[{ l: "Earned", v: "+4,820", c: "#22C55E" }, { l: "Spent", v: "−2,400", c: "#EF4444" }, { l: "This Month", v: "+350", c: COLOR }, { l: "Network Rank", v: "#247", c: "#A855F7" }].map(({ l, v, c }) => (
                  <div key={l} style={{ padding: "12px", borderRadius: 12, background: `${c}08`, border: `1px solid ${c}18` }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: c, marginBottom: 2 }}>{v}</div>
                    <div style={{ fontSize: 11, color: "#6B7280" }}>{l}</div>
                  </div>
                ))}
              </div>
              {/* Transactions */}
              <div style={{ padding: "14px", borderRadius: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#F9FAFB", marginBottom: 12 }}>Recent Transactions</div>
                {TRANSACTIONS.map((t) => (
                  <div key={t.id} style={{ display: "flex", gap: 10, alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: t.amount > 0 ? "#22C55E15" : "#EF444415", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {t.amount > 0 ? <ArrowDown size={13} style={{ color: "#22C55E" }} /> : <ArrowUp size={13} style={{ color: "#EF4444" }} />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#E8EAF0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.description}</div>
                      <div style={{ fontSize: 10, color: "#4B5563" }}>{t.date}</div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: typeColor(t.type), flexShrink: 0 }}>{typeSign(t.amount)}{t.amount} cr</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {activeNav === "earn" && (
            <>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#F9FAFB", marginBottom: 4 }}>Earn Credits</div>
              <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 14 }}>Contribute to the community and get rewarded</div>
              {EARN_WAYS.map((w) => (
                <div key={w.title} style={{ padding: "14px", borderRadius: 14, background: "rgba(255,255,255,0.02)", border: `1px solid ${w.color}25`, marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#F9FAFB", marginBottom: 2 }}>{w.title}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: COLOR, marginBottom: 6 }}>{w.credits}</div>
                    <button style={{ padding: "5px 12px", borderRadius: 8, background: `${w.color}15`, border: `1px solid ${w.color}30`, color: w.color, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Start</button>
                  </div>
                </div>
              ))}
              <div style={{ padding: "14px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", marginTop: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#F9FAFB", marginBottom: 8 }}>Spend Everywhere</div>
                {["🏠 LightHouse", "📦 TrustTransport", "📇 Directory", "🪛 Foundation", "🔂 SocketRelay"].map((app) => (
                  <div key={app} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", fontSize: 13, color: "#9CA3AF" }}>
                    <CheckCircle size={12} style={{ color: "#22C55E" }} />{app}
                  </div>
                ))}
              </div>
            </>
          )}
          {activeNav === "send" && (
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#F9FAFB", marginBottom: 16 }}>Send Credits</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <input placeholder="Survivor username or ID…" style={{ width: "100%", padding: "12px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, fontSize: 14, color: "#E8EAF0", outline: "none", boxSizing: "border-box" }} />
                <input value={sendAmount} onChange={(e) => setSendAmount(e.target.value)} placeholder="Amount (e.g. 50)" style={{ width: "100%", padding: "12px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, fontSize: 14, color: "#E8EAF0", outline: "none", boxSizing: "border-box" }} />
                <textarea placeholder="Note (optional)" rows={2} style={{ width: "100%", padding: "12px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, fontSize: 14, color: "#E8EAF0", outline: "none", resize: "none", boxSizing: "border-box" }} />
                <button style={{ width: "100%", padding: "14px", borderRadius: 14, background: COLOR, border: "none", color: "#0F1117", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>Send {sendAmount || "0"} Credits</button>
                <div style={{ padding: "12px 14px", borderRadius: 12, background: `${COLOR}06`, border: `1px solid ${COLOR}18` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}><Shield size={11} style={{ color: COLOR }} /><span style={{ fontSize: 11, fontWeight: 700, color: COLOR }}>Formance Ledger</span></div>
                  <div style={{ fontSize: 11, color: "#6B7280" }}>Every transaction recorded on the open-source Formance ledger. Transparent and immutable.</div>
                </div>
              </div>
            </div>
          )}
          {activeNav === "home" && (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 64, marginBottom: 12 }}>⚙️</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#F9FAFB", marginBottom: 6 }}>Service Credits</div>
              <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 20 }}>Earn, spend, trade across all 12 mini-apps</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: COLOR }}>2,420</div>
              <div style={{ fontSize: 13, color: "#6B7280" }}>your balance</div>
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
