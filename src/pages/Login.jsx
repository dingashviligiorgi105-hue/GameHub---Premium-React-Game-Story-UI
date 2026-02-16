import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

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

export default function Login() {
  const nav = useNavigate();
  const auth = useAuth();

  const [email, setEmail] = useState("player@gamehub.com");
  const [password, setPassword] = useState("123456");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  const canLogin = useMemo(() => {
    return String(email).trim().length > 3 && String(password).trim().length >= 3;
  }, [email, password]);

  useRevealOnScroll([email, password, remember, error]);

  function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!canLogin) {
      setError("Please enter a valid email and password.");
      return;
    }

    if (typeof auth?.login === "function") {
      auth.login({ email, remember });
      nav("/profile");
      return;
    }

    setError("AuthContext-ში login() ფუნქცია არ ჩანს. მომწერე authContext.jsx და დაგიფიქსავ.");
  }

  return (
    <div className="page">
      <section className="section reveal">
        <div className="authWrap">
          {/* LEFT: FORM */}
          <div className="authCard">
            <div className="authHead">
              <div className="pill">
                <span className="dot" />
                Secure access
              </div>

              <h1 className="pageTitle">
                Login to <span className="gradText">GameHub</span>
              </h1>

              <p className="pageSubtitle">
                Sign in to access your profile, manage your cart, and keep the checkout flow smooth.
              </p>
            </div>

            <form className="form" onSubmit={onSubmit}>
              <label className="field">
                <span>Email</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  autoComplete="email"
                />
              </label>

              <label className="field">
                <span>Password</span>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  type="password"
                  autoComplete="current-password"
                />
              </label>

              <div className="rowBetween">
                <label className="check">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
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
                <span className="muted">Tip:</span> after login open{" "}
                <Link className="linkSoft" to="/profile">
                  /profile
                </Link>{" "}
                (ProtectedRoute).
              </div>
            </form>
          </div>

          {/* RIGHT: PREMIUM PANEL */}
          <div className="authSide reveal">
            <div className="loginSideCard">
              <div className="loginSideTop">
                <div>
                  <div className="pill" style={{ marginBottom: 10 }}>
                    <span className="dot" />
                    Premium perks
                  </div>
                  <div className="loginSideTitle">Unlock your dashboard</div>
                  <div className="loginSideDesc">
                    Your profile + cart become fully interactive after authentication.
                  </div>
                </div>

                <div className="loginSideChip">Protected</div>
              </div>

              <div className="loginSideGrid">
                <div className="loginSideStat">
                  <div className="loginSideStatLabel">Access</div>
                  <div className="loginSideStatValue">Profile</div>
                </div>
                <div className="loginSideStat">
                  <div className="loginSideStatLabel">Cart</div>
                  <div className="loginSideStatValue">Saved</div>
                </div>
                <div className="loginSideStat">
                  <div className="loginSideStatLabel">UI</div>
                  <div className="loginSideStatValue">Premium</div>
                </div>
              </div>

              <ul className="loginSideList">
                <li className="loginSideItem">
                  <span className="loginSideIcon">✓</span>
                  <div>
                    <div className="loginSideItemTitle">Protected Profile page</div>
                    <div className="loginSideItemText">Only logged-in users can open /profile.</div>
                  </div>
                </li>

                <li className="loginSideItem">
                  <span className="loginSideIcon">✓</span>
                  <div>
                    <div className="loginSideItemTitle">Cleaner checkout flow</div>
                    <div className="loginSideItemText">Cart stays consistent with LocalStorage.</div>
                  </div>
                </li>

                <li className="loginSideItem">
                  <span className="loginSideIcon">✓</span>
                  <div>
                    <div className="loginSideItemTitle">Fast browsing experience</div>
                    <div className="loginSideItemText">Search + filters keep products navigation smooth.</div>
                  </div>
                </li>
              </ul>

              <div className="loginSideActions">
                <Link className="btn btn--ghost" to="/products">
                  Back to Products
                </Link>
                <Link className="btn btn--primary" to="/cart">
                  Open Cart
                </Link>
              </div>

              <div className="loginSideFooter">
                Test account: <b>player@gamehub.com</b> / <b>123456</b>
              </div>

              <div className="noise" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
