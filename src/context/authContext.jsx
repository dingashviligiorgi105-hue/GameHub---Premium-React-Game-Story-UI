import React, { createContext, Component } from "react";

export const AuthContext = createContext(null);

const USERS_KEY = "gh_users";
const CURRENT_KEY = "gh_current_user";

function safeParse(json, fallback) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

function readUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  const list = safeParse(raw || "[]", []);
  return Array.isArray(list) ? list : [];
}

function writeUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    return;
  }
}

function readCurrentUser() {
  const raw = localStorage.getItem(CURRENT_KEY);
  const u = safeParse(raw || "null", null);
  if (!u || typeof u !== "object") return null;
  return u;
}

function writeCurrentUser(user) {
  try {
    if (!user) localStorage.removeItem(CURRENT_KEY);
    else localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
  } catch {
    return;
  }
}

export class AuthProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const current = readCurrentUser();
    if (current) this.setState({ user: current });
  }

  login(payload) {
    const email = payload && payload.email ? String(payload.email).trim().toLowerCase() : "";
    const password = payload && payload.password ? String(payload.password) : "";

    if (!email || !password) {
      return { ok: false, error: "Email and password are required." };
    }

    const users = readUsers();
    const found = users.find(
      (u) =>
        String(u.email || "").trim().toLowerCase() === email &&
        String(u.password || "") === password
    );

    if (!found) {
      return { ok: false, error: "Invalid email or password." };
    }

    const user = { name: found.name || "User", email: found.email };
    this.setState({ user });
    writeCurrentUser(user);

    return { ok: true };
  }

  signup(payload) {
    const name = payload && payload.name ? String(payload.name).trim() : "";
    const email = payload && payload.email ? String(payload.email).trim().toLowerCase() : "";
    const password = payload && payload.password ? String(payload.password) : "";

    if (name.length < 2) return { ok: false, error: "Please enter your name." };
    if (email.length < 4 || email.indexOf("@") === -1) return { ok: false, error: "Please enter a valid email." };
    if (password.length < 4) return { ok: false, error: "Password must be at least 4 characters." };

    const users = readUsers();
    const exists = users.some((u) => String(u.email || "").trim().toLowerCase() === email);

    if (exists) {
      return { ok: false, error: "This email is already registered." };
    }

    const newUser = { name, email, password };
    writeUsers([...users, newUser]);

    const safeUser = { name, email };
    this.setState({ user: safeUser });
    writeCurrentUser(safeUser);

    return { ok: true };
  }

  logout() {
    this.setState({ user: null });
    writeCurrentUser(null);
  }

  render() {
    const value = {
      user: this.state.user,
      login: this.login,
      signup: this.signup,
      logout: this.logout,
    };

    return <AuthContext.Provider value={value}>{this.props.children}</AuthContext.Provider>;
  }
}

export const AuthConsumer = AuthContext.Consumer;
