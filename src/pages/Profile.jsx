import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { CartContext } from "../context/cartContext";

export default class Profile extends Component {
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
    return (
      <AuthContext.Consumer>
        {(auth) => (
          <CartContext.Consumer>
            {(cartCtx) => {
              const user = auth && auth.user;
              const cart = (cartCtx && cartCtx.cart) || [];
              const totalItems = Number((cartCtx && cartCtx.totalItems) || 0);
              const totalPrice = Number((cartCtx && cartCtx.totalPrice) || 0);

              if (!user) {
                return <Navigate to="/login" replace />;
              }

              return (
                <div className="page">
                  <section className="section reveal">
                    <div className="pageHeader">
                      <div className="pill">
                        <span className="dot" />
                        Protected Profile
                      </div>

                      <h1 className="pageTitle">
                        Welcome, <span className="gradText">{user.name || "User"}</span>
                      </h1>

                      <p className="pageSubtitle">
                        Your dashboard shows saved cart totals and quick actions.
                      </p>

                      <div className="headerActions">
                        <Link className="btn btn--primary" to="/products">
                          Continue shopping
                        </Link>

                        <Link className="btn btn--ghost" to="/cart">
                          Open cart
                        </Link>

                        <button className="btn btn--ghost" onClick={auth.logout}>
                          Logout
                        </button>
                      </div>
                    </div>
                  </section>

                  <section className="section reveal">
                    <div className="aboutGrid">
                      <div className="glassPanel">
                        <div className="panelHead">
                          <div>
                            <div className="panelTitle">Account</div>
                            <div className="panelDesc">Basic demo user (fake auth)</div>
                          </div>
                          <span className="tagRose">Signed in</span>
                        </div>

                        <div className="row" style={{ marginBottom: 10 }}>
                          <span className="tagGold">Name</span>
                          <span className="tag">{user.name || "User"}</span>
                        </div>

                        <div className="row">
                          <span className="tagGold">Status</span>
                          <span className="tag">Active</span>
                        </div>

                        <div className="hr" />

                        <div className="rowBetween">
                          <Link className="linkSoft" to="/about">
                            About project
                          </Link>

                          <Link className="linkSoft" to="/products">
                            Browse products
                          </Link>
                        </div>

                        <div className="noise" />
                      </div>

                      <div className="glassPanel">
                        <div className="panelHead">
                          <div>
                            <div className="panelTitle">Cart summary</div>
                            <div className="panelDesc">Persisted via LocalStorage</div>
                          </div>
                          <span className="tagPurple">Saved</span>
                        </div>

                        <div className="row" style={{ marginBottom: 10 }}>
                          <span className="tagGold">Items</span>
                          <span className="tag">{totalItems}</span>
                        </div>

                        <div className="row" style={{ marginBottom: 10 }}>
                          <span className="tagGold">Total</span>
                          <span className="tag">${Number(totalPrice || 0).toFixed(2)}</span>
                        </div>

                        <div className="hr" />

                        {cart.length === 0 ? (
                          <div className="alert">
                            Your cart is empty. Add a few games from Products.
                          </div>
                        ) : (
                          <div className="alert success">
                            You have {cart.length} different item(s) in the cart.
                          </div>
                        )}

                        <div className="noise" />
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
