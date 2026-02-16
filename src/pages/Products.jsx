import { useEffect, useMemo, useState } from "react";
import { games } from "../data/games";
import { useCart } from "../context/cartContext";

function useScrollReveal(deps = []) {
  useEffect(() => {
    const items = document.querySelectorAll(".reveal");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, deps);
}

export default function Products() {
  const { addToCart, totalItems } = useCart();

  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const MAX_SLIDER = 200;

  const maxPossible = useMemo(() => {
    const prices = games.map((g) => Number(g.price || 0));
    return Math.max(0, ...prices);
  }, []);

  const [max, setMax] = useState(Math.min(maxPossible || 100, MAX_SLIDER));

  const categories = useMemo(() => {
    const set = new Set(games.map((g) => g.category));
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return games
      .filter((g) => (cat === "All" ? true : g.category === cat))
      .filter((g) => Number(g.price || 0) <= Number(max))
      .filter((g) => {
        if (!query) return true;
        return String(g.title || "").toLowerCase().includes(query);
      });
  }, [q, cat, max]);

  useScrollReveal([q, cat, max, filtered.length]);

  useEffect(() => {
    setMax((prev) => {
      const nextDefault = Math.min(maxPossible || 100, MAX_SLIDER);
      if (!prev) return nextDefault;
      return Math.min(prev, MAX_SLIDER);
    });
  }, [maxPossible]);

  return (
    <div className="page">
      <section className="section reveal">
        <div className="pageHeader">
          <div className="pill">
            <span className="dot" />
            Video Games Store
          </div>

          <h1 className="pageTitle">
            Discover <span className="gradText">Products</span>
          </h1>

          <p className="pageSubtitle">
            Search any game name, filter by category, set max price, and build your cart with a premium UI.
          </p>

          <div className="headerActions">
            <button
              className="btn btn--primary"
              onClick={() => document.getElementById("products-list")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore games
            </button>

            <div className="pill">
              Cart items <span className="badge">{totalItems}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section reveal" id="products-list">
        <div className="filtersBar">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder='Search... (ex: "detroit", "gta", "resident")'
          />

          <select value={cat} onChange={(e) => setCat(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <div className="pill" style={{ gap: 10 }}>
            <span style={{ opacity: 0.85, fontWeight: 900 }}>Max</span>
            <span style={{ fontWeight: 950 }}>${max}</span>
            <input
              type="range"
              min="0"
              max={MAX_SLIDER}
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
              style={{ width: 180 }}
            />
          </div>
        </div>

        <div className="productsGrid">
          {filtered.map((g) => (
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
                <button className="btn btn-add btn-sm" onClick={() => addToCart(g)}>
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="glassPanel" style={{ padding: 16, marginTop: 14 }}>
            <div className="panelTitle">No results</div>
            <p className="sectionText" style={{ margin: 0 }}>
              Try another search, switch category, or increase max price.
            </p>
            <div className="noise" />
          </div>
        )}
      </section>
    </div>
  );
}
