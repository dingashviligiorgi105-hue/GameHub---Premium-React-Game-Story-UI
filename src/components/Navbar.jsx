import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { AuthContext } from "../context/authContext";

export default class Navbar extends Component {
  render() {
    return (
      <AuthContext.Consumer>
        {(auth) => (
          <CartContext.Consumer>
            {(cartCtx) => {
              const totalItems = Number((cartCtx && cartCtx.totalItems) || 0);
              const user = auth && auth.user;

              return (
                <header className="nav">
                  <div className="container navInner">
                    <Link to="/" className="brand">
                      <span className="brandDot" />
                      GameHub
                    </Link>

                    <nav className="navLinks">
                      <NavLink className="navLink" to="/">
                        Home
                      </NavLink>

                      <NavLink className="navLink" to="/products">
                        Products
                      </NavLink>

                      <NavLink className="navLink" to="/cart">
                        Cart <span className="badge">{totalItems}</span>
                      </NavLink>

                      <NavLink className="navLink" to="/about">
                        About
                      </NavLink>

                      {user ? (
                        <NavLink className="navLink" to="/profile">
                          Profile
                        </NavLink>
                      ) : (
                        <NavLink className="navLink" to="/login">
                          Login
                        </NavLink>
                      )}
                    </nav>
                  </div>
                </header>
              );
            }}
          </CartContext.Consumer>
        )}
      </AuthContext.Consumer>
    );
  }
}
