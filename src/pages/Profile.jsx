import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";

function useRevealOnScroll(deps = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, deps);
}

export default function Profile() {
  const nav = useNavigate();
  const auth = useAuth();
  const { cart, totalItems, totalPrice } = useCart();

  const safeCart = Array.isArray(cart) ? cart : [];
  useRevealOnScroll([totalItems, totalPrice, safeCart.length]);

  const emailLabel = auth?.user?.email || "player@gamehub.com";

  const userLabel = useMemo(() => {
    const name = (String(emailLabel).split("@")[0] || "Player").trim();
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : "Player";
  }, [emailLabel]);

  const avatarText = useMemo(() => {
    const t = String(userLabel || "P").trim();
    return (t.slice(0, 2) || "P").toUpperCase();
  }, [userLabel]);

  const previewItems = useMemo(() => safeCart.slice(0, 4), [safeCart]);

  function handleLogout() {
    if (typeof auth?.logout === "function") auth.logout();
    nav("/login");
  }

  return (
    <div className="page">
      <div className="container">
        <section className="section reveal">
          <div className="pageHeader">
            <div className="pill">
              <span className="dot" />
              Your dashboard
            </div>

            <h1 className="pageTitle">
              Welcome back, <span className="gradText">{userLabel}</span>
            </h1>

            <p className="pageSubtitle">
              Quick actions, cart preview, and a clean profile overview — premium UI.
            </p>
          </div>

          <div className="profileHero">
            <div className="glassPanel profileCard reveal">
              <div className="profileCard__top">
                <div className="avatar">
                  <div className="avatar__ring" />
                  <div className="avatar__inner">{avatarText}</div>
                </div>

                <div>
                  <div className="profileName">{userLabel}</div>
                  <div className="profileMeta">{emailLabel}</div>
                </div>
              </div>

              <div className="profileHero__actions">
                <Link className="btn btn--primary" to="/products">
                  Browse Games
                </Link>
                <Link className="btn btn--ghost" to="/cart">
                  Open Cart
                </Link>
                <button className="btn btn--danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>

              <hr className="sep" />

              <div className="sectionRow">
                <div>
                  <div className="sectionTitle" style={{ marginBottom: 6 }}>
                    Your cart preview
                  </div>
                  <div className="sectionText" style={{ marginBottom: 0 }}>
                    A quick view of items you added. Manage quantities in the Cart page.
                  </div>
                </div>

                <Link className="btn btn--ghost btn-sm" to="/cart">
                  Manage cart
                </Link>
              </div>

              <div style={{ height: 12 }} />

              {previewItems.length === 0 ? (
                <div className="emptyState">
                  <div className="emptyState__title">Your cart is empty</div>
                  <div className="emptyState__text">
                    Go to Products and add a few games — they’ll stay saved (LocalStorage).
                  </div>
                  <Link className="btn btn--primary" to="/products">
                    Explore Products
                  </Link>
                </div>
              ) : (
                <div className="miniList">
                  {previewItems.map((item, idx) => {
                    const img = item?.image || item?.img || item?.thumbnail || "";
                    const title = String(item?.title || "Item");
                    const qty = Number(item?.qty || item?.quantity || 1);
                    const price = Number(item?.price || 0);
                    const cat = String(item?.category || "game");

                    return (
                      <div className="miniRow reveal" key={`${item?.id ?? idx}-${title}`}>
                        {img ? (
                          <img className="miniRow__img" src={img} alt={title} loading="lazy" />
                        ) : (
                          <div className="miniRow__img" aria-hidden="true">
                            <span style={{ fontWeight: 900, opacity: 0.9 }}>{title.slice(0, 2).toUpperCase()}</span>
                          </div>
                        )}

                        <div>
                          <div className="miniRow__title">{title}</div>
                          <div className="miniRow__sub">
                            <span className="tag">{cat}</span>
                            <span className="miniRow__qty">Qty: {qty}</span>
                          </div>
                        </div>

                        <div className="miniRow__price">{price === 0 ? "FREE" : `$${price.toFixed(2)}`}</div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="noise" />
            </div>

            <div className="glassPanel reveal">
              <div className="glassPanel__top">
                <div className="panelTitle">Account stats</div>
                <div className="panelHint">Live summary</div>
              </div>

              <div className="profileStats">
                <div className="statCard">
                  <div className="statCard__label">Cart items</div>
                  <div className="statCard__value">{totalItems}</div>
                </div>

                <div className="statCard">
                  <div className="statCard__label">Cart total</div>
                  <div className="statCard__value">${Number(totalPrice || 0).toFixed(2)}</div>
                </div>

                <div className="statCard">
                  <div className="statCard__label">Status</div>
                  <div className="statCard__value">Active</div>
                </div>
              </div>

              <div className="profileHints">
                <div className="hint">Cart saved (LocalStorage)</div>
                <div className="hint">Smooth UI animations</div>
                <div className="hint">ProtectedRoute enabled</div>
              </div>

              <div style={{ height: 12 }} />

              <div className="ctaMini">
                <Link className="btn btn--ghost" to="/about">
                  Learn more
                </Link>
                <Link className="btn btn--primary" to="/products">
                  Add games
                </Link>
              </div>

              <div className="noise" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
