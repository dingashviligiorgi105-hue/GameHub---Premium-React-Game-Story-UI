import { useEffect } from "react";
import { Link } from "react-router-dom";

function useRevealOnScroll(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
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

export default function About() {
  useRevealOnScroll([]);

  return (
    <div className="page">
      <div className="container">
        {/* HERO */}
        <section className="section">
          <div className="pageHeader reveal">
            <div className="pill">
              <span className="dot" />
              About GameHub
            </div>

            <h1 className="pageTitle">
              A premium <span className="gradText">game store</span> UI
            </h1>

            <p className="pageSubtitle">
              This project simulates a real video-game marketplace: products, cart, login, protected
              profile, and modern visuals.
            </p>

            <div className="headerActions">
              <Link className="btn btn--primary" to="/products">
                Explore Products
              </Link>
              <Link className="btn btn--ghost" to="/login">
                Sign in
              </Link>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section">
          <div className="sectionRow reveal">
            <h2 className="howTitle">
              How it <span className="howAccent">works</span>
            </h2>

            <div className="howHint">Simple flow • Fast UI • Smooth animations</div>
          </div>

          <div className="howGrid">
            <div className="howCard reveal">
              <div className="howBadge">1</div>
              <div>
                <div className="howCardTitle">Browse games</div>
                <div className="howCardText">
                  Products page shows games with posters, category and price. Use filters + search.
                </div>

                <div className="howMiniRow">
                  <span className="howMiniPill">Search</span>
                  <span className="howMiniPill">Category</span>
                  <span className="howMiniPill">Price</span>
                </div>
              </div>
            </div>

            <div className="howCard reveal">
              <div className="howBadge">2</div>
              <div>
                <div className="howCardTitle">Add to cart</div>
                <div className="howCardText">
                  Add items, change quantity, remove items. Totals update instantly.
                </div>

                <div className="howMiniRow">
                  <span className="howMiniPill">+ / − qty</span>
                  <span className="howMiniPill">Remove</span>
                  <span className="howMiniPill">Total</span>
                </div>
              </div>
            </div>

            <div className="howCard reveal">
              <div className="howBadge">3</div>
              <div>
                <div className="howCardTitle">Login & profile</div>
                <div className="howCardText">
                  Login unlocks Profile. ProtectedRoute blocks it if user is not logged in.
                </div>

                <div className="howMiniRow">
                  <span className="howMiniPill">Auth</span>
                  <span className="howMiniPill">Protected</span>
                  <span className="howMiniPill">Profile</span>
                </div>
              </div>
            </div>

            <div className="howCard reveal">
              <div className="howBadge">4</div>
              <div>
                <div className="howCardTitle">Persistent state</div>
                <div className="howCardText">
                  Cart is saved to LocalStorage — refresh and items stay.
                </div>

                <div className="howMiniRow">
                  <span className="howMiniPill">LocalStorage</span>
                  <span className="howMiniPill">Saved cart</span>
                  <span className="howMiniPill">No loss</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TECH + FEATURES */}
        <section className="section">
          <h2 className="sectionTitle reveal">Tech + features</h2>

          <div className="cards3">
            <div className="infoCard reveal">
              <div className="infoCard__icon">⚛️</div>
              <div className="infoCard__title">React + Router</div>
              <div className="infoCard__text">
                Pages, navigation, protected routes, clean component structure.
              </div>
            </div>

            <div className="infoCard reveal">
              <div className="infoCard__icon">🧠</div>
              <div className="infoCard__title">Context API</div>
              <div className="infoCard__text">AuthContext + CartContext for global state.</div>
            </div>

            <div className="infoCard reveal">
              <div className="infoCard__icon">🎨</div>
              <div className="infoCard__title">Premium UI</div>
              <div className="infoCard__text">
                Glass effect, gradients, hover/press animations, scroll reveals.
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section">
          <div className="cta reveal">
            <div>
              <h2 className="cta__title">Want to test the flow?</h2>
              <p className="cta__text">
                Add a few games to the cart, then login and open your profile page.
              </p>
            </div>

            <div className="cta__actions">
              <Link className="btn btn--primary" to="/products">
                Add games
              </Link>
              <Link className="btn btn--ghost" to="/cart">
                Open cart
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
