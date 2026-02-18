import React, { Component } from "react";
import { Link } from "react-router-dom";
import { games } from "../data/games";
import { CartContext } from "../context/cartContext";

function getIdFromPathname(pathname) {
  const parts = String(pathname || "")
    .split("/")
    .filter(Boolean);

  const last = parts[parts.length - 1] || "";
  const id = Number(last);
  return Number.isFinite(id) ? id : null;
}

function buildFallbackDescription(game) {
  const title = String(game.title || "This game");
  const cat = String(game.category || "game").toUpperCase();
  const price = Number(game.price || 0);

  const priceLine =
    price === 0
      ? "It’s free to play, so you can jump in instantly."
      : "It offers a premium experience with solid replay value.";

  const vibe =
    cat === "HORROR"
      ? "Expect tense moments, dark atmosphere, and constant pressure to survive."
      : cat === "RPG"
      ? "Build your playstyle, explore at your pace, and grow stronger as you progress."
      : cat === "SHOOTER"
      ? "Fast action, sharp gameplay, and high-intensity encounters keep the pace strong."
      : cat === "RACING"
      ? "Smooth driving, speed, and clean progression make every race feel rewarding."
      : cat === "STORY"
      ? "Story and characters are the main focus, with cinematic pacing and memorable moments."
      : "A balanced mix of action, exploration, and satisfying progression keeps it engaging.";

  return (
    `${title} is a ${cat} title designed to feel clean, immersive, and easy to enjoy. ` +
    `${vibe} ` +
    `${priceLine} ` +
    `Perfect for players who want a minimal UI with a strong game focus.`
  );
}

function withGta6Note(game, text) {
  const title = String((game && game.title) || "").trim().toLowerCase();
  if (title !== "gta 6") return text;

  // თუ აღწერაში უკვე არსებობს ეს მესიჯი, მეორედ აღარ დავამატოთ
  if (String(text).includes("თამაში ჯერ არ გამოსულა")) return text;

  return (
    String(text) +
    "<div class='descNote'><strong>თამაში ჯერ არ გამოსულა და ჩემ საიტზე უკვე შეგიძლიათ ყიდვა</strong></div>"
  );
}

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pathname: window.location.pathname,
      id: getIdFromPathname(window.location.pathname),
    };

    this._tick = null;
    this.io = null;
  }

  componentDidMount() {
    this._tick = setInterval(() => {
      const p = window.location.pathname;
      if (p !== this.state.pathname) {
        this.setState({ pathname: p, id: getIdFromPathname(p) });
      }
    }, 200);

    const els = document.querySelectorAll(".reveal");
    if (els && els.length) {
      this.io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("is-visible");
          });
        },
        { threshold: 0.12 }
      );
      els.forEach((el) => this.io.observe(el));
    }
  }

  componentWillUnmount() {
    if (this._tick) clearInterval(this._tick);
    if (this.io) this.io.disconnect();
  }

  buildDescription(game) {
    const d1 = game && game.description ? String(game.description) : "";
    if (d1.trim()) return withGta6Note(game, d1.trim());

    const d2 = game && game.desc ? String(game.desc) : "";
    if (d2.trim()) return withGta6Note(game, d2.trim());

    return withGta6Note(game, buildFallbackDescription(game || {}));
  }

  renderNotFound() {
    return (
      <div className="page">
        <section className="section reveal">
          <div className="glassPanel" style={{ padding: 18 }}>
            <div className="panelTitle">Game not found</div>
            <p className="sectionText" style={{ margin: "8px 0 0" }}>
              This game ID doesn’t exist.
            </p>
            <div className="row" style={{ marginTop: 12 }}>
              <Link className="btn btn--primary" to="/products">
                Back to Products
              </Link>
              <Link className="btn btn--ghost" to="/">
                Home
              </Link>
            </div>
            <div className="noise" />
          </div>
        </section>
      </div>
    );
  }

  render() {
    const id = this.state.id;
    const game = games.find((g) => Number(g.id) === Number(id));

    if (!game) return this.renderNotFound();

    const description = this.buildDescription(game);
    const price = Number(game.price || 0);

    return (
      <CartContext.Consumer>
        {(cartCtx) => {
          const addToCart = (cartCtx && cartCtx.addToCart) || (() => {});
          const totalItems = Number((cartCtx && cartCtx.totalItems) || 0);

          return (
            <div className="page">
              <section className="section reveal">
                <div className="gameDetail">
                  <div className="gameLeft">
                    <div className="gamePoster">
                      <img src={game.image} alt={game.title} loading="lazy" />
                    </div>

                    <div className="gameTitleBlock">
                      <h1 className="gameTitle">{game.title}</h1>
                      <div className="row" style={{ gap: 10, marginTop: 10 }}>
                        <span className="tag">{game.category}</span>
                        <span className="pill">
                          Cart <span className="badge">{totalItems}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="gameRight">
                    <div className="glassPanel gamePanel">
                      <div className="panelTitle">Overview</div>

                      {/* აქ მთავარია HTML render, რომ GTA6 note ცალკე ბლოკად გამოჩნდეს */}
                      <div
                        className="sectionText"
                        style={{ marginTop: 8 }}
                        dangerouslySetInnerHTML={{ __html: description }}
                      />

                      <div className="hr" />

                      <div className="gameBuyRow">
                        <div className="gamePrice">
                          {price === 0 ? (
                            <span className="tagGold">FREE</span>
                          ) : (
                            <span className="priceBig">${price.toFixed(2)}</span>
                          )}
                        </div>

                        <button className="btn btn--primary" onClick={() => addToCart(game)}>
                          Add to cart
                        </button>
                      </div>

                      <div className="gameLinks">
                        <Link className="btn btn--ghost" to="/products">
                          Back to products
                        </Link>
                        <Link className="btn btn--ghost" to="/cart">
                          Open cart
                        </Link>
                      </div>

                      <div className="noise" />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          );
        }}
      </CartContext.Consumer>
    );
  }
}
