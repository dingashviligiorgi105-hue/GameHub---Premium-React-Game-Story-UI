import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default class Signup extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirm: "",
      error: "",
      redirect: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onName = this.onName.bind(this);
    this.onEmail = this.onEmail.bind(this);
    this.onPassword = this.onPassword.bind(this);
    this.onConfirm = this.onConfirm.bind(this);

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
      { threshold: 0.15 }
    );

    els.forEach((el) => this.io.observe(el));
  }

  componentWillUnmount() {
    if (this.io) this.io.disconnect();
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ error: "" });

    const { name, email, password, confirm } = this.state;

    if (String(name).trim().length < 2) {
      this.setState({ error: "Please enter your name." });
      return;
    }

    if (String(email).trim().length < 4 || String(email).indexOf("@") === -1) {
      this.setState({ error: "Please enter a valid email." });
      return;
    }

    if (String(password).trim().length < 4) {
      this.setState({ error: "Password must be at least 4 characters." });
      return;
    }

    if (password !== confirm) {
      this.setState({ error: "Passwords do not match." });
      return;
    }

    const auth = this.context;

    if (!auth || typeof auth.signup !== "function") {
      this.setState({ error: "Signup is not available." });
      return;
    }

    const result = auth.signup({
      name: name.trim(),
      email: email.trim(),
      password,
    });

    if (result && result.ok) {
      this.setState({ redirect: true });
      return;
    }

    this.setState({ error: (result && result.error) || "Signup failed. Please try again." });
  }

  onName(e) {
    this.setState({ name: e.target.value });
  }

  onEmail(e) {
    this.setState({ email: e.target.value });
  }

  onPassword(e) {
    this.setState({ password: e.target.value });
  }

  onConfirm(e) {
    this.setState({ confirm: e.target.value });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to="/profile" replace />;
    }

    const { name, email, password, confirm, error } = this.state;

    return (
      <div className="page">
        <section className="section reveal">
          <div className="authWrap">
            <div className="authCard">
              <div className="authHead">
                <div className="pill">
                  <span className="dot" />
                  Create account
                </div>

                <h1 className="pageTitle">
                  Sign up for <span className="gradText">GameHub</span>
                </h1>

                <p className="pageSubtitle">Create an account to unlock profile and keep your cart saved.</p>
              </div>

              <form className="form" onSubmit={this.onSubmit}>
                <label className="field">
                  <span>Name</span>
                  <input value={name} onChange={this.onName} placeholder="Your name" type="text" autoComplete="name" />
                </label>

                <label className="field">
                  <span>Email</span>
                  <input
                    value={email}
                    onChange={this.onEmail}
                    placeholder="you@example.com"
                    type="email"
                    autoComplete="email"
                  />
                </label>

                <label className="field">
                  <span>Password</span>
                  <input
                    value={password}
                    onChange={this.onPassword}
                    placeholder="••••••••"
                    type="password"
                    autoComplete="new-password"
                  />
                </label>

                <label className="field">
                  <span>Confirm password</span>
                  <input
                    value={confirm}
                    onChange={this.onConfirm}
                    placeholder="••••••••"
                    type="password"
                    autoComplete="new-password"
                  />
                </label>

                {error ? <div className="errorBox">{error}</div> : null}

                <button className="btn btn--primary btn--full" type="submit">
                  Create account
                </button>

                <div className="authFoot">
                  Already have an account?{" "}
                  <Link className="linkSoft" to="/login">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
