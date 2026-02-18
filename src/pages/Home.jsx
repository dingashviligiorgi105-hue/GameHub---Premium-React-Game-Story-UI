import React, { Component } from "react";
import { Link } from "react-router-dom";
import { games } from "../data/games";
import { CartContext } from "../context/cartContext";
import { AuthContext } from "../context/authContext";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.io = null;
  }

  componentDidMount() {
    const els = document.querySelectorAll(".reveal");
    if (!els || !els.length) return;

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

  componentWillUnmount() {
    if (this.io) this.io.disconnect();
  }

  render() {
    const allGamesCount = Array.isArray(games) ? games.length : 0;

    return (
      <AuthContext.Consumer>
        {(auth) => (
          <CartContext.Consumer>
            {(cartCtx) => {
              const cart = (cartCtx && cartCtx.cart) || [];
              const totalItems = Number((cartCtx && cartCtx.totalItems) || 0);
              const totalPrice = Number((cartCtx && cartCtx.totalPrice) || 0);

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

                        <div className="pill statsPill">
                          <div>
                            <div className="statsLabel">Games</div>
                            <div className="statsValue">{allGamesCount}</div>
                          </div>

                          <div>
                            <div className="statsLabel">In cart</div>
                            <div className="statsValue">{totalItems}</div>
                          </div>

                          <div>
                            <div className="statsLabel">Total</div>
                            <div className="statsValue">${Number(totalPrice || 0).toFixed(2)}</div>
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

                        {auth && auth.user ? (
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
                </div>
              );
            }}
          </CartContext.Consumer>
        )}
      </AuthContext.Consumer>
    );
  }
}
