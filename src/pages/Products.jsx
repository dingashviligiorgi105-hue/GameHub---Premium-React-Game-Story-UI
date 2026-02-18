import React, { Component } from "react";
import { Link } from "react-router-dom";
import { games } from "../data/games";
import { CartContext } from "../context/cartContext";

const MAX_SLIDER = 200;

function getMaxPossible() {
  const prices = games.map((g) => Number(g.price || 0));
  return Math.max(0, ...prices);
}

function getCategories() {
  const set = new Set(games.map((g) => g.category));
  return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
}

function getFiltered(q, cat, max) {
  const query = String(q || "").trim().toLowerCase();

  return games
    .filter((g) => (cat === "All" ? true : g.category === cat))
    .filter((g) => Number(g.price || 0) <= Number(max))
    .filter((g) => {
      if (!query) return true;
      return String(g.title || "").toLowerCase().includes(query);
    });
}

export default class Products extends Component {
  static contextType = CartContext;

  constructor(props) {
    super(props);

    const maxPossible = getMaxPossible();
    const initialMax = Math.min(maxPossible || 100, MAX_SLIDER);

    this.state = {
      q: "",
      cat: "All",
      max: initialMax,
    };

    this.categories = getCategories();
    this.maxPossible = maxPossible;
    this.io = null;

    this.onQ = this.onQ.bind(this);
    this.onCat = this.onCat.bind(this);
    this.onMax = this.onMax.bind(this);
    this.scrollToList = this.scrollToList.bind(this);
  }

  componentDidMount() {
    this.setupReveal();
  }

  componentDidUpdate(prevProps, prevState) {
    const prevLen = getFiltered(prevState.q, prevState.cat, prevState.max).length;
    const nextLen = getFiltered(this.state.q, this.state.cat, this.state.max).length;

    if (
      prevState.q !== this.state.q ||
      prevState.cat !== this.state.cat ||
      prevState.max !== this.state.max ||
      prevLen !== nextLen
    ) {
      this.setupReveal();
    }
  }

  componentWillUnmount() {
    if (this.io) this.io.disconnect();
  }

  setupReveal() {
    const items = document.querySelectorAll(".reveal");
    if (this.io) this.io.disconnect();

    this.io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((el) => this.io.observe(el));
  }

  onQ(e) {
    this.setState({ q: e.target.value });
  }

  onCat(e) {
    this.setState({ cat: e.target.value });
  }

  onMax(e) {
    this.setState({ max: Number(e.target.value) });
  }

  scrollToList() {
    const el = document.getElementById("products-list");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    const cart = this.context || {};
    const addToCart = cart.addToCart || (() => {});
    const totalItems = Number(cart.totalItems || 0);

    const { q, cat, max } = this.state;
    const filtered = getFiltered(q, cat, max);

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
              <button className="btn btn--primary" onClick={this.scrollToList}>
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
              onChange={this.onQ}
              placeholder='Search... (ex: "detroit", "gta", "resident")'
            />

            <select value={cat} onChange={this.onCat}>
              {this.categories.map((c) => (
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
                onChange={this.onMax}
                style={{ width: 180 }}
              />
            </div>
          </div>

          <div className="productsGrid">
            {filtered.map((g) => (
              <div key={g.id} className="productCard reveal">
                <Link to={`/game/${g.id}`} className="productLink">
                  <img className="productMedia" src={g.image} alt={g.title} loading="lazy" />
                </Link>

                <div className="productBody">
                  <Link to={`/game/${g.id}`} className="productTitleLink">
                    <div className="productTitle">{g.title}</div>
                  </Link>

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
}
