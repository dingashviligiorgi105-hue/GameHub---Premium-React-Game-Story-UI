import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";

export default function Cart() {
  const { cart, removeFromCart, inc, dec, totalItems, totalPrice } = useCart();

  const list = Array.isArray(cart) ? cart : [];
  const safeTotal = Number(totalPrice || 0);

  if (list.length === 0) {
    return (
      <div className="page">
        <section className="section reveal is-visible">
          <div className="pageHeader">
            <div className="pill">
              <span className="dot" />
              Your cart
            </div>

            <h1 className="pageTitle">
              Shopping <span className="gradText">Cart</span>
            </h1>

            <p className="pageSubtitle">Your cart is empty. Add a few games to start.</p>

            <div className="headerActions">
              <Link className="btn btn--primary" to="/products">
                Browse Products
              </Link>
              <Link className="btn btn--ghost" to="/">
                Back Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page">
      <section className="section reveal is-visible">
        <div className="pageHeader">
          <div className="pill">
            <span className="dot" />
            Your cart
          </div>

          <h1 className="pageTitle">
            Shopping <span className="gradText">Cart</span>
          </h1>

          <p className="pageSubtitle">
            Manage quantity, remove items, totals update instantly.
          </p>
        </div>

        <div className="cartLayout">
          {/* LEFT: LIST */}
          <div className="cartList">
            {list.map((x) => {
              const price = Number(x?.price || 0);
              const qty = Math.max(1, Number(x?.qty || 1));
              const lineTotal = price * qty;

              return (
                <div className="cartItem" key={x.id}>
                  <img src={x.image} alt={x.title} loading="lazy" />

                  <div style={{ minWidth: 0 }}>
                    <div className="cartItem__title">{x.title}</div>

                    <div className="cartItem__sub">
                      <span className="tag">{x.category}</span>
                      <span>${price === 0 ? "FREE" : price.toFixed(2)}</span>
                      <span>•</span>
                      <span style={{ opacity: 0.9 }}>
                        Line: ${lineTotal.toFixed(2)}
                      </span>
                    </div>

                    <div style={{ height: 10 }} />

                    <div className="qtyControls">
                      <button className="qtyBtn" onClick={() => dec(x.id)} aria-label="Decrease quantity">
                        −
                      </button>

                      <div className="qtyVal">{qty}</div>

                      <button className="qtyBtn" onClick={() => inc(x.id)} aria-label="Increase quantity">
                        +
                      </button>

                      <button
                        className="btn btn--danger btn-sm"
                        onClick={() => removeFromCart(x.id)}
                        style={{ marginLeft: 8 }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div style={{ fontWeight: 950, whiteSpace: "nowrap" }}>
                    ${lineTotal.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="glassPanel cartSummary">
            <div className="glassPanel__top">
              <div className="panelTitle">Summary</div>
              <div className="panelHint">Live</div>
            </div>

            <div className="summaryRow">
              <span>Items</span>
              <strong>{Number(totalItems || 0)}</strong>
            </div>

            <div className="summaryRow">
              <span>Total</span>
              <strong>${safeTotal.toFixed(2)}</strong>
            </div>

            <div style={{ height: 12 }} />

            <button className="btn btn--primary btn--full" onClick={() => alert("Demo checkout ✅")}>
              Checkout
            </button>

            <div style={{ height: 10 }} />

            <Link className="btn btn--ghost btn--full" to="/products">
              Add more games
            </Link>

            <div className="noise" />
          </div>
        </div>
      </section>
    </div>
  );
}
