import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { games } from "../data/games";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";

function useRevealOnScroll(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, deps);
}

export default function Home() {
  const auth = useAuth();
  const { cart, totalItems, totalPrice, addToCart } = useCart();

  const featured = useMemo(() => {
    return Array.isArray(games) ? games.slice(0, 6) : [];
  }, []);

  const inCart = Array.isArray(cart) ? cart.length : 0;

  useRevealOnScroll([totalItems, totalPrice, inCart]);

  return (
    <div className="page">
      <section className="section reveal">
        <div className="pageHeader">
          <div className="pill">
            <span className="dot" />
            Next-Gen Video Games Marketplace
          </div>

          <h1 className="pageTitle">
            GameHub <span className="gradText">Store</span>
          </h1>

          <p className="pageSubtitle">
            Premium UI • Smooth animations • Cart + LocalStorage • Protected profile.
          </p>

          <div className="headerActions">
            <Link className="btn btn--primary" to="/products">
              Browse Products
            </Link>

            <Link className="btn btn--ghost" to="/about">
              Learn More
            </Link>

            <div className="pill" style={{ gap: 12 }}>
              <div>
                <div style={{ fontWeight: 950 }}>Games</div>
                <div className="muted">{Array.isArray(games) ? games.length : 0}</div>
              </div>

              <div>
                <div style={{ fontWeight: 950 }}>In cart</div>
                <div className="muted">{totalItems}</div>
              </div>

              <div>
                <div style={{ fontWeight: 950 }}>Total</div>
                <div className="muted">${Number(totalPrice || 0).toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="sectionTitle">Recommended for you</div>
        <p className="sectionText" style={{ marginBottom: 14 }}>
          Based on your library and popular picks. (Simple demo recommendations.)
        </p>

        <div className="cta">
          <div>
            <div className="cta__title">Build your library</div>
            <p className="cta__text">Add a few games, then open cart and test the flow.</p>
          </div>

          <div className="cta__actions">
            <Link className="btn btn--primary" to="/products">
              Go to Products
            </Link>

            {auth?.user ? (
              <Link className="btn btn--ghost" to="/profile">
                Go to Profile
              </Link>
            ) : (
              <Link className="btn btn--ghost" to="/login">
                Login
              </Link>
            )}

            <Link className="btn btn--ghost" to="/cart">
              Open cart
            </Link>
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="sectionTitle">Featured games</div>
        <p className="sectionText" style={{ marginBottom: 14 }}>
          Quick picks — press “Add to cart” to test LocalStorage + totals update.
        </p>

        <div className="productsGrid">
          {featured.map((g) => (
            <div key={g.id} className="productCard reveal">
              <img className="productMedia" src={g.image} alt={g.title} loading="lazy" />

              <div className="productBody">
                <div className="productTitle">{g.title}</div>

                <div className="productMeta">
                  <span className="tag">{g.category}</span>
                  {Number(g.price) === 0 ? (
                    <span className="productPrice">FREE</span>
                  ) : (
                    <span className="productPrice">${Number(g.price).toFixed(2)}</span>
                  )}
                </div>
              </div>

              <div className="productActions">
                <button className="btn btn--ghost btn--full" onClick={() => addToCart(g)}>
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
