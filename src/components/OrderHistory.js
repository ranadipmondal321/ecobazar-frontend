import { useState, useEffect } from "react";
import { getOrders, cancelOrder } from "../api/order";
import { Link } from "react-router-dom";

/* ─── Ecobazar colour tokens ─── */
const G = "#00B307";
const G_DARK = "#008C05";
const G_LIGHT = "#EBF9EB";
const TEXT = "#1A1A1A";
const MUTED = "#7E7E7E";
const BORDER = "#E8E8E8";
const BG = "#F8F9FA";
const WHITE = "#FFFFFF";

const STATUS = {
  Pending:   { color: "#D97706", bg: "#FEF3C7", border: "#FDE68A" },
  Confirmed: { color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE" },
  Shipped:   { color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE" },
  Delivered: { color: "#00B307", bg: "#EBF9EB", border: "#BBF7BB" },
  Cancelled: { color: "#DC2626", bg: "#FEF2F2", border: "#FECACA" },
};

const STEPS = ["Pending", "Confirmed", "Shipped", "Delivered"];

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

function Badge({ status }) {
  const s = STATUS[status] || STATUS.Pending;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 10px", borderRadius: 99,
      background: s.bg, color: s.color,
      fontSize: 12, fontWeight: 600,
      border: `1px solid ${s.border}`,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
      {status}
    </span>
  );
}

function Tracker({ status }) {
  if (status === "Cancelled") return (
    <div style={{ marginTop: 14 }}>
      <span style={{
        fontSize: 12, fontWeight: 600, color: "#DC2626",
        background: "#FEF2F2", padding: "4px 10px", borderRadius: 6,
        border: "1px solid #FECACA",
      }}>✕ Order Cancelled</span>
    </div>
  );
  const cur = STEPS.indexOf(status);
  return (
    <div style={{ display: "flex", alignItems: "flex-start", marginTop: 16 }}>
      {STEPS.map((step, i) => {
        const done = i <= cur;
        const active = i === cur;
        return (
          <div key={step} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "none" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%",
                background: done ? G : WHITE,
                border: done ? `2px solid ${G}` : `2px solid ${BORDER}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700,
                color: done ? WHITE : "#BDBDBD",
                boxShadow: active ? `0 0 0 4px ${G_LIGHT}` : "none",
                flexShrink: 0, transition: "all 0.25s",
              }}>
                {i < cur ? "✓" : i + 1}
              </div>
              <span style={{
                fontSize: 10, fontWeight: 600, whiteSpace: "nowrap",
                color: done ? G_DARK : "#BDBDBD", letterSpacing: "0.03em",
              }}>{step}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{
                flex: 1, height: 2, margin: "0 6px", marginBottom: 16,
                background: i < cur ? G : BORDER, borderRadius: 2,
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function OrderRow({ order, onCancel, cancelling, onExpand, expanded }) {
  // ✅ Use saved symbol, fallback to $ if old order has none
  const sym = order.currencySymbol || "$";

  return (
    <>
      <tr style={{ borderBottom: `1px solid ${BORDER}`, background: expanded ? G_LIGHT : WHITE, transition: "background 0.2s" }}>
        <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 700, color: TEXT }}>
          #{order._id.slice(-6).toUpperCase()}
        </td>
        <td style={{ padding: "14px 16px", fontSize: 13, color: MUTED }}>{fmtDate(order.createdAt)}</td>
        <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 700, color: TEXT }}>
          {sym}{order.totalAmount.toLocaleString("en-IN")}   {/* ✅ was ₹ */}
          <span style={{ fontSize: 11, color: MUTED, fontWeight: 400, marginLeft: 4 }}>
            ({order.items.length} {order.items.length === 1 ? "Product" : "Products"})
          </span>
        </td>
        <td style={{ padding: "14px 16px" }}><Badge status={order.status} /></td>
        <td style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => onExpand(order._id)} style={{
              fontSize: 12, fontWeight: 700, color: G,
              background: "none", border: "none", cursor: "pointer", padding: 0,
              textDecoration: "underline", textUnderlineOffset: 3,
            }}>
              {expanded ? "Hide Details" : "View Details"}
            </button>
            {order.status === "Pending" && (
              <button onClick={() => onCancel(order._id)} disabled={cancelling === order._id} style={{
                fontSize: 12, fontWeight: 600, color: "#DC2626",
                background: "none", border: "1px solid #FECACA",
                borderRadius: 6, padding: "3px 10px",
                cursor: "pointer", opacity: cancelling === order._id ? 0.5 : 1,
              }}>
                {cancelling === order._id ? "…" : "Cancel"}
              </button>
            )}
          </div>
        </td>
      </tr>

      {expanded && (
        <tr style={{ background: G_LIGHT }}>
          <td colSpan={5} style={{ padding: "0 16px 20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, paddingTop: 4 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: "0.08em", marginBottom: 4 }}>ORDER PROGRESS</div>
                <Tracker status={order.status} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: "0.08em", marginBottom: 10 }}>ITEMS ORDERED</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {order.items.map((item, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      background: WHITE, borderRadius: 10, padding: "8px 12px", border: `1px solid ${BORDER}`,
                    }}>
                      {item.img
                        ? <img src={item.img} alt={item.name} style={{ width: 40, height: 40, borderRadius: 7, objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
                        : <div style={{ width: 40, height: 40, borderRadius: 7, background: G_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🥦</div>
                      }
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{item.name}</div>
                        <div style={{ fontSize: 11, color: MUTED }}>Qty: {item.quantity} × {sym}{item.price}</div>  {/* ✅ was ₹ */}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: G }}>{sym}{(item.price * item.quantity).toLocaleString("en-IN")}</div>  {/* ✅ was ₹ */}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: "0.08em", marginBottom: 8 }}>SHIPPING ADDRESS</div>
                <div style={{
                  display: "inline-flex", alignItems: "flex-start", gap: 10,
                  background: WHITE, borderRadius: 10, padding: "12px 16px", border: `1px solid ${BORDER}`, fontSize: 13,
                }}>
                  <span style={{ fontSize: 16, marginTop: 1 }}>📍</span>
                  <div style={{ color: TEXT, lineHeight: 1.6 }}>
                    <strong>{order.shippingAddress?.name}</strong>
                    {order.shippingAddress?.phone && <span style={{ color: MUTED }}> · {order.shippingAddress.phone}</span>}
                    <br />
                    {order.shippingAddress?.address}
                    {order.shippingAddress?.city && `, ${order.shippingAddress.city}`}
                    {order.shippingAddress?.pincode && ` - ${order.shippingAddress.pincode}`}
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

/* ════════════════════ MAIN PAGE ════════════════════ */
export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const fetchOrders = async () => {
    try { setLoading(true); setError(null);
      const res = await getOrders(); setOrders(res.data);
    } catch (e) { setError(e.response?.data?.message || "Failed to load orders."); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this order?")) return;
    try { setCancelling(id); await cancelOrder(id);
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status: "Cancelled" } : o));
    } catch (e) { alert(e.response?.data?.message || "Failed to cancel."); }
    finally { setCancelling(null); }
  };

  const toggleExpand = (id) => setExpanded(prev => prev === id ? null : id);

  const filters = ["All", "Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];
  const filtered = filterStatus === "All" ? orders : orders.filter(o => o.status === filterStatus);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div style={{ background: BG, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: TEXT }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        * { box-sizing: border-box; }
      `}</style>

      {/* breadcrumb banner */}
      <div style={{
        background: "#1A1A1A", padding: "28px 0", position: "relative",
        backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=60')",
        backgroundSize: "cover", backgroundPosition: "center",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
            <Link to="/">🏠</Link><span>›</span> 
            <span style={{ color: WHITE, fontWeight: 600 }}>Order History</span>
          </div>
          <h1 style={{ margin: "8px 0 0", fontSize: 26, fontWeight: 700, color: WHITE }}>Order History</h1>
        </div>
      </div>

      {/* layout */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px", display: "grid", gridTemplateColumns: "220px 1fr", gap: 28 }}>

        {/* SIDEBAR */}
                <div className="bg-[#0b1a2c] text-white p-6 rounded-xl">
                  <h2 className="text-xl font-bold mb-6">My Account</h2>
        
                  <ul className="space-y-4 text-sm">
                    <li><Link to="/dashboard">My Profile</Link></li>
                    <li><Link to="/wishlist">Wishlist</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/orders">Order History</Link></li>
                    <li><Link to="/returns">Returns</Link></li>
                    <li><Link to="/track-order">Track Order</Link></li>
                  </ul>
                </div>

        {/* main panel */}
        <main style={{ animation: "fadeUp 0.35s ease" }}>
          <div style={{ background: WHITE, borderRadius: 12, border: `1px solid ${BORDER}`, overflow: "hidden" }}>

            {/* header + filters */}
            <div style={{
              padding: "18px 24px", borderBottom: `1px solid ${BORDER}`,
              display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12,
            }}>
              <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: TEXT }}>Order History</h2>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {filters.map(f => (
                  <button key={f} onClick={() => { setFilterStatus(f); setPage(1); }} style={{
                    padding: "5px 13px", borderRadius: 99, fontSize: 12, fontWeight: 600,
                    cursor: "pointer", transition: "all 0.15s",
                    background: filterStatus === f ? G : "transparent",
                    color: filterStatus === f ? WHITE : MUTED,
                    border: filterStatus === f ? `1px solid ${G}` : `1px solid ${BORDER}`,
                  }}>{f}</button>
                ))}
              </div>
            </div>

            {/* loading */}
            {loading && (
              <div style={{ padding: 60, textAlign: "center" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  border: `3px solid ${G_LIGHT}`, borderTop: `3px solid ${G}`,
                  animation: "spin 0.7s linear infinite", margin: "0 auto 12px",
                }} />
                <p style={{ color: MUTED, fontSize: 14 }}>Loading your orders…</p>
              </div>
            )}

            {/* error */}
            {!loading && error && (
              <div style={{ padding: 40, textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>⚠️</div>
                <p style={{ color: "#DC2626", fontWeight: 600, marginBottom: 16 }}>{error}</p>
                <button onClick={fetchOrders} style={{
                  padding: "10px 24px", borderRadius: 8, background: G,
                  border: "none", color: WHITE, fontWeight: 700, cursor: "pointer", fontSize: 14,
                }}>Try Again</button>
              </div>
            )}

            {/* empty */}
            {!loading && !error && orders.length === 0 && (
              <div style={{ padding: 60, textAlign: "center" }}>
                <div style={{ fontSize: 52, marginBottom: 14 }}>🛒</div>
                <h3 style={{ fontWeight: 700, margin: "0 0 8px" }}>No orders yet</h3>
                <p style={{ color: MUTED, fontSize: 14 }}>Your order history will appear here once you place an order.</p>
              </div>
            )}

            {/* no filter results */}
            {!loading && !error && orders.length > 0 && filtered.length === 0 && (
              <div style={{ padding: 40, textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>🔍</div>
                <p style={{ color: MUTED }}>No {filterStatus.toLowerCase()} orders found.</p>
              </div>
            )}

            {/* table */}
            {!loading && !error && paginated.length > 0 && (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: BG, borderBottom: `2px solid ${BORDER}` }}>
                      {["ORDER ID", "DATE", "TOTAL", "STATUS", "ACTION"].map(h => (
                        <th key={h} style={{
                          padding: "11px 16px", textAlign: "left",
                          fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: "0.07em",
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map(order => (
                      <OrderRow
                        key={order._id}
                        order={order}
                        onCancel={handleCancel}
                        cancelling={cancelling}
                        expanded={expanded === order._id}
                        onExpand={toggleExpand}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* pagination */}
            {!loading && !error && totalPages > 1 && (
              <div style={{
                padding: "16px 24px", borderTop: `1px solid ${BORDER}`,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{
                  width: 32, height: 32, borderRadius: 8, border: `1px solid ${BORDER}`,
                  background: WHITE, cursor: page === 1 ? "not-allowed" : "pointer",
                  color: page === 1 ? BORDER : MUTED, fontSize: 14,
                }}>‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button key={n} onClick={() => setPage(n)} style={{
                    width: 32, height: 32, borderRadius: 8, fontSize: 13, fontWeight: 600,
                    border: `1px solid ${page === n ? G : BORDER}`,
                    background: page === n ? G : WHITE,
                    color: page === n ? WHITE : TEXT,
                    cursor: "pointer",
                  }}>{n}</button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{
                  width: 32, height: 32, borderRadius: 8, border: `1px solid ${BORDER}`,
                  background: WHITE, cursor: page === totalPages ? "not-allowed" : "pointer",
                  color: page === totalPages ? BORDER : MUTED, fontSize: 14,
                }}>›</button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}