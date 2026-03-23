import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Car, Package, Navigation, CheckCircle, Shield, AlertCircle, Phone, Home, MessageSquare, Clock } from "lucide-react";

const COLOR = "#F97316";

const DRIVERS = [
  { id: 1, name: "Jose Martinez", rating: 4.9, trips: 847, eta: "3 min", avatar: "JM", vehicle: "Toyota Camry", credits: true },
  { id: 2, name: "Aisha Thompson", rating: 5.0, trips: 612, eta: "6 min", avatar: "AT", vehicle: "Honda Civic", credits: true },
  { id: 3, name: "David Kim", rating: 4.8, trips: 1203, eta: "9 min", avatar: "DK", vehicle: "Ford Explorer", credits: false },
];

const NAV = [
  { icon: Car, label: "Ride", key: "ride" },
  { icon: Package, label: "Package", key: "package" },
  { icon: Navigation, label: "Track", key: "track" },
  { icon: MessageSquare, label: "Chat", key: "chat" },
];

export function MobileTrustTransport() {
  const [activeNav, setActiveNav] = useState("ride");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [booked, setBooked] = useState(false);

  return (
    <div style={{ width: 390, height: "100%", minHeight: "100vh", background: "#0F1117", fontFamily: "'Inter', system-ui, sans-serif", color: "#E8EAF0", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 44, background: "#090B0F", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>9:41</div><div style={{ fontSize: 12, color: "#9CA3AF" }}>100%</div>
      </div>
      <div style={{ padding: "14px 20px 12px", background: "#090B0F", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${COLOR}30`, display: "flex", alignItems: "center", justifyContent: "center" }}><Car size={18} style={{ color: COLOR }} /></div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#F9FAFB" }}>TrustTransport</div>
            <div style={{ fontSize: 11, color: COLOR }}>1,247 drivers online</div>
          </div>
        </div>
        <Badge style={{ background: "#22C55E20", color: "#22C55E", border: "1px solid #22C55E35", fontSize: 11 }}>● Live</Badge>
      </div>

      <ScrollArea style={{ flex: 1 }}>
        <div style={{ padding: "16px" }}>
          {activeNav === "ride" && (
            <>
              <div style={{ padding: "16px", borderRadius: 14, background: `${COLOR}08`, border: `1px solid ${COLOR}18`, marginBottom: 16 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#F9FAFB", marginBottom: 4 }}>Book a Safe Ride</div>
                <div style={{ fontSize: 12, color: "#6B7280" }}>Background-checked drivers · Trauma-informed · Credits OK</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 8, height: 8, borderRadius: "50%", background: "#22C55E" }} />
                  <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Pickup location (private)" style={{ width: "100%", padding: "14px 14px 14px 32px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, fontSize: 14, color: "#E8EAF0", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 8, height: 8, borderRadius: "50%", background: COLOR }} />
                  <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Where to?" style={{ width: "100%", padding: "14px 14px 14px 32px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, fontSize: 14, color: "#E8EAF0", outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>
              {(from || to) ? (
                <>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#9CA3AF", marginBottom: 10 }}>Nearby Drivers</div>
                  {DRIVERS.map((d) => (
                    <div key={d.id} style={{ padding: "14px", borderRadius: 14, background: "rgba(255,255,255,0.02)", border: `1px solid ${COLOR}20`, marginBottom: 10, display: "flex", gap: 12, alignItems: "center" }}>
                      <Avatar style={{ width: 44, height: 44 }}>
                        <AvatarFallback style={{ background: `${COLOR}20`, color: COLOR, fontSize: 15, fontWeight: 800 }}>{d.avatar}</AvatarFallback>
                      </Avatar>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#F9FAFB" }}>{d.name}</div>
                          {d.credits && <Badge style={{ background: "#F59E0B10", color: "#F59E0B", border: "1px solid #F59E0B25", fontSize: 10 }}>Credits</Badge>}
                        </div>
                        <div style={{ fontSize: 12, color: "#6B7280" }}>{d.vehicle} · ⭐ {d.rating}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 13, color: "#22C55E", fontWeight: 700, marginBottom: 6 }}>ETA {d.eta}</div>
                        <button onClick={() => setBooked(true)} style={{ padding: "7px 14px", borderRadius: 8, background: COLOR, border: "none", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Book</button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "24px 0" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
                  <div style={{ fontSize: 14, color: "#6B7280" }}>Enter pickup and destination to see drivers</div>
                </div>
              )}
              {booked && (
                <div style={{ padding: "16px", borderRadius: 14, background: "#22C55E10", border: "1px solid #22C55E30", marginTop: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle size={18} style={{ color: "#22C55E" }} />
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#22C55E" }}>Booked! Driver en route.</div>
                  </div>
                  <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 6 }}>Jose Martinez · ETA 8 min · All comms via GetStream</div>
                </div>
              )}
            </>
          )}
          {activeNav === "track" && (
            <div>
              <div style={{ padding: "14px", borderRadius: 14, background: `${COLOR}08`, border: `1px solid ${COLOR}25`, marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#F9FAFB" }}>Jose Martinez · En Route</div>
                  <Badge style={{ background: "#22C55E20", color: "#22C55E", border: "1px solid #22C55E40", fontSize: 11 }}>🔴 Live</Badge>
                </div>
                <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 12 }}>ETA 8 min · Toyota Camry · 12 credits</div>
                <div style={{ padding: "60px 20px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center", color: "#4B5563", fontSize: 13, marginBottom: 12 }}>
                  [Live Map — GetStream location feed]
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ flex: 1, padding: "10px", borderRadius: 10, background: `${COLOR}15`, border: `1px solid ${COLOR}30`, color: COLOR, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}><Phone size={13} /> Call</button>
                  <button style={{ flex: 1, padding: "10px", borderRadius: 10, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#EF4444", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}><AlertCircle size={13} /> SOS</button>
                </div>
              </div>
              <div style={{ padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#9CA3AF", marginBottom: 8 }}>Safety Features Active</div>
                {[{ icon: Shield, l: "Background checked", c: "#22C55E" }, { icon: Phone, l: "Emergency SOS", c: "#EF4444" }, { icon: CheckCircle, l: "ID verified", c: COLOR }].map(({ icon: Icon, l, c }) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0" }}>
                    <Icon size={13} style={{ color: c }} />
                    <span style={{ fontSize: 12, color: "#9CA3AF" }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {(activeNav === "package" || activeNav === "chat") && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>{activeNav === "package" ? "📦" : "💬"}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#F9FAFB", marginBottom: 4 }}>{activeNav === "package" ? "Package Delivery" : "Transport Chat"}</div>
              <div style={{ fontSize: 13, color: "#6B7280" }}>GetStream-powered · Safety-first</div>
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
