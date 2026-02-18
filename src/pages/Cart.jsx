import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cartContext";

export default class Cart extends Component {
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

  renderEmpty() {
    return (
      <div className="glassPanel" style={{ padding: 16 }}>
        <div className="panelTitle">Your cart is empty</div>
        <p className="sectionText" style={{ margin: "8px 0 0" }}>
          Go to Products and add a few games.
        </p>

        <div className="row" style={{ marginTop: 12 }}>
          <Link className="btn btn--primary" to="/products">
            Browse products
          </Link>
          <Link className="btn btn--ghost" to="/">
            Back home
          </Link>
        </div>

        <div className="noise" />
      </div>
    );
  }

  render() {
    return (
      <CartContext.Consumer>
        {(cartCtx) => {
          const cart = (cartCtx && cartCtx.cart) || [];
          const inc = (cartCtx && cartCtx.inc) || (() => {});
          const dec = (cartCtx && cartCtx.dec) || (() => {});
          const removeFromCart = (cartCtx && cartCtx.removeFromCart) || (() => {});
          const totalItems = Number((cartCtx && cartCtx.totalItems) || 0);
          const totalPrice = Number((cartCtx && cartCtx.totalPrice) || 0);

          return (
            <div className="page">
              <section className="section reveal">
                <div className="pageHeader">
                  <div className="pill">
                    <span className="dot" />
                    Shopping Cart
                  </div>

                  <h1 className="pageTitle">
                    Your <span className="gradText">Cart</span>
                  </h1>

                  <p className="pageSubtitle">
                    Review items, change quantity, and check totals.
                  </p>

                  <div className="headerActions">
                    <Link className="btn btn--primary" to="/products">
                      Continue shopping
                    </Link>

                    <div className="pill" style={{ gap: 12 }}>
                      <div>
                        <div style={{ fontWeight: 950 }}>Items</div>
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
                {cart.length === 0 ? (
                  this.renderEmpty()
                ) : (
                  <div className="glassPanel" style={{ padding: 16 }}>
                    <table className="table">
                      <thead>
                        <tr>
                          <th style={{ width: "52%" }}>Item</th>
                          <th style={{ width: "16%" }}>Price</th>
                          <th style={{ width: "18%" }}>Qty</th>
                          <th style={{ width: "14%" }}>Remove</th>
                        </tr>
                      </thead>

                      <tbody>
                        {cart.map((x) => {
                          const price = Number(x.price || 0);
                          const qty = Number(x.qty || 0);
                          const lineTotal = price * qty;

                          return (
                            <tr key={x.id}>
                              <td>
                                <div className="row" style={{ gap: 12 }}>
                                  <div style={{ width: 70, borderRadius: 14, overflow: "hidden" }}>
                                    <img src={x.image} alt={x.title} loading="lazy" />
                                  </div>
                                  <div>
                                    <div style={{ fontWeight: 900 }}>{x.title}</div>
                                    <div className="muted" style={{ fontSize: 13 }}>
                                      {x.category}
                                    </div>
                                    <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>
                                      Line: ${Number(lineTotal || 0).toFixed(2)}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td>
                                {price === 0 ? (
                                  <span className="tagGold">FREE</span>
                                ) : (
                                  <span style={{ fontWeight: 900 }}>
                                    ${price.toFixed(2)}
                                  </span>
                                )}
                              </td>

                              <td>
                                <div className="row" style={{ gap: 8 }}>
                                  <button
                                    className="btn btn--ghost"
                                    type="button"
                                    onClick={() => dec(x.id)}
                                  >
                                    -
                                  </button>

                                  <span className="pill" style={{ minWidth: 54, justifyContent: "center" }}>
                                    {qty}
                                  </span>

                                  <button
                                    className="btn btn--ghost"
                                    type="button"
                                    onClick={() => inc(x.id)}
                                  >
                                    +
                                  </button>
                                </div>
                              </td>

                              <td>
                                <button
                                  className="btn btn--ghost"
                                  type="button"
                                  onClick={() => removeFromCart(x.id)}
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    <div className="hr" />

                    <div className="rowBetween">
                      <div>
                        <div className="panelTitle">Summary</div>
                        <div className="panelDesc">
                          {totalItems} item(s) • ${Number(totalPrice || 0).toFixed(2)}
                        </div>
                      </div>

                      <div className="row" style={{ gap: 10 }}>
                        <Link className="btn btn--ghost" to="/products">
                          Add more
                        </Link>
                        <button className="btn btn--primary" type="button">
                          Checkout
                        </button>
                      </div>
                    </div>

                    <div className="noise" />
                  </div>
                )}
              </section>
            </div>
          );
        }}
      </CartContext.Consumer>
    );
  }
}
