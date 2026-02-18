import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class About extends Component {
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
      <div className="page">
        <section className="section reveal">
          <div className="pageHeader">
            <div className="pill">
              <span className="dot" />
              About this project
            </div>

            <h1 className="pageTitle">
              Premium <span className="gradText">GameHub</span> UI
            </h1>

            <p className="pageSubtitle">
              A small React storefront UI that focuses on clean layout, strong colors, and simple cart logic.
              This build is made for learning and practicing component structure.
            </p>

            <div className="headerActions">
              <Link className="btn btn--primary" to="/products">
                Explore products
              </Link>

              <Link className="btn btn--ghost" to="/">
                Back home
              </Link>
            </div>
          </div>
        </section>

        <section className="section reveal">
          <div className="aboutGrid">
            <div className="glassPanel">
              <h2 className="h2" style={{ marginTop: 0 }}>
                What you can do
              </h2>

              <ul className="list">
                <li>Browse games and filter by category</li>
                <li>Add / remove items from the cart</li>
                <li>Cart persists via LocalStorage</li>
                <li>Protected profile route (login required)</li>
              </ul>

              <div className="hr" />

              <div className="row">
                <span className="tagGold">UI</span>
                <span className="tagRose">Cart</span>
                <span className="tag">Routing</span>
              </div>

              <div className="noise" />
            </div>

            <div className="glassPanel">
              <h2 className="h2" style={{ marginTop: 0 }}>
                Notes
              </h2>

              <p className="sectionText">
                This project uses a simple fake login flow for learning purposes. You can extend it with a real backend
                later. The main goal is to practice page routing, shared state (Context), and clean UI.
              </p>

              <div className="hr" />

              <div className="rowBetween">
                <Link className="linkSoft" to="/login">
                  Login
                </Link>

                <Link className="linkSoft" to="/signup">
                  Signup
                </Link>
              </div>

              <div className="noise" />
            </div>
          </div>
        </section>
      </div>
    );
  }
}
