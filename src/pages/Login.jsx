import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default class Login extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      remember: true,
      error: "",
      redirect: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onEmail = this.onEmail.bind(this);
    this.onPassword = this.onPassword.bind(this);
    this.onRemember = this.onRemember.bind(this);

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

  canLogin() {
    const { email, password } = this.state;
    return String(email).trim().length > 3 && String(password).trim().length >= 4;
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ error: "" });

    if (!this.canLogin()) {
      this.setState({ error: "Please enter a valid email and password." });
      return;
    }

    const auth = this.context;

    if (!auth || typeof auth.login !== "function") {
      this.setState({ error: "Login is not available." });
      return;
    }

    const result = auth.login({
      email: this.state.email,
      password: this.state.password,
      remember: this.state.remember,
    });

    if (result && result.ok) {
      this.setState({ redirect: true });
      return;
    }

    this.setState({ error: (result && result.error) || "Invalid email or password." });
  }

  onEmail(e) {
    this.setState({ email: e.target.value });
  }

  onPassword(e) {
    this.setState({ password: e.target.value });
  }

  onRemember(e) {
    this.setState({ remember: e.target.checked });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to="/profile" replace />;
    }

    const { email, password, remember, error } = this.state;

    return (
      <div className="page">
        <section className="section reveal">
          <div className="authWrap">
            <div className="authCard">
              <div className="authHead">
                <div className="pill">
                  <span className="dot" />
                  Secure access
                </div>

                <h1 className="pageTitle">
                  Login to <span className="gradText">GameHub</span>
                </h1>

                <p className="pageSubtitle">Sign in to access your profile and manage your cart.</p>
              </div>

              <form className="form" onSubmit={this.onSubmit}>
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
                    autoComplete="current-password"
                  />
                </label>

                <div className="rowBetween">
                  <label className="check">
                    <input type="checkbox" checked={remember} onChange={this.onRemember} />
                    <span>Remember me</span>
                  </label>

                  <Link className="linkSoft" to="/signup">
                    Create account
                  </Link>
                </div>

                {error ? <div className="errorBox">{error}</div> : null}

                <button className="btn btn--primary btn--full" type="submit">
                  Log in
                </button>

                <div className="authFoot">
                  No account?{" "}
                  <Link className="linkSoft" to="/signup">
                    Signup
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
