import { NavLink } from "react-router-dom";
import { useCart } from "../context/cartContext";

export default function Navbar() {
  const { totalItems } = useCart();

  const count = Number(totalItems || 0);
  const badgeText = count > 99 ? "99+" : String(count);

  const navItemClass = ({ isActive }) => (isActive ? "active" : "");
  const pillClass = ({ isActive }) => `pill${isActive ? " active" : ""}`;

  return (
    <header className="nav">
      <div className="container nav-inner">
        <NavLink to="/" className="brand" aria-label="GameHub Home">
          <span className="brand-badge" aria-hidden="true" />
          <span>GameHub</span>
        </NavLink>

        <nav className="nav-links" aria-label="Primary navigation">
          <NavLink to="/" end className={navItemClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={navItemClass}>
            Products
          </NavLink>
          <NavLink to="/about" className={navItemClass}>
            About
          </NavLink>
        </nav>

        <div className="nav-right">
          <NavLink to="/cart" className={pillClass}>
            Cart <span className="badge">{badgeText}</span>
          </NavLink>

          <NavLink to="/login" className={pillClass}>
            Login
          </NavLink>
        </div>
      </div>
    </header>
  );
}
