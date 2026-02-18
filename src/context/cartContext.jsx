import React, { createContext, Component } from "react";

export const CartContext = createContext(null);

const CART_KEY = "gh_cart";

function normalizeCart(value) {
  const arr = Array.isArray(value) ? value : [];
  return arr
    .filter((x) => x && x.id != null)
    .map((x) => ({
      ...x,
      qty: Math.max(1, Number(x.qty || 1)),
      price: Number(x.price || 0),
    }));
}

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed = JSON.parse(raw || "[]");
    return normalizeCart(parsed);
  } catch {
    return [];
  }
}

function writeCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    return;
  }
}

export class CartProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
    };

    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.inc = this.inc.bind(this);
    this.dec = this.dec.bind(this);
  }

  componentDidMount() {
    this.setState({ cart: readCart() });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cart !== this.state.cart) {
      writeCart(this.state.cart);
    }
  }

  addToCart(item) {
    if (!item || !item.id) return;

    this.setState((state) => {
      const prev = state.cart;
      const found = prev.find((x) => x.id === item.id);

      if (found) {
        return {
          cart: prev.map((x) =>
            x.id === item.id ? { ...x, qty: Number(x.qty || 0) + 1 } : x
          ),
        };
      }

      return { cart: [...prev, { ...item, qty: 1 }] };
    });
  }

  removeFromCart(id) {
    this.setState((state) => ({
      cart: state.cart.filter((x) => x.id !== id),
    }));
  }

  inc(id) {
    this.setState((state) => ({
      cart: state.cart.map((x) =>
        x.id === id ? { ...x, qty: Number(x.qty || 0) + 1 } : x
      ),
    }));
  }

  dec(id) {
    this.setState((state) => ({
      cart: state.cart
        .map((x) =>
          x.id === id ? { ...x, qty: Number(x.qty || 0) - 1 } : x
        )
        .filter((x) => Number(x.qty || 0) > 0),
    }));
  }

  getTotalItems(cart) {
    return cart.reduce((s, x) => s + Number(x.qty || 0), 0);
  }

  getTotalPrice(cart) {
    return cart.reduce(
      (s, x) => s + Number(x.qty || 0) * Number(x.price || 0),
      0
    );
  }

  render() {
    const cart = this.state.cart;
    const totalItems = this.getTotalItems(cart);
    const totalPrice = this.getTotalPrice(cart);

    const value = {
      cart,
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
      inc: this.inc,
      dec: this.dec,
      totalItems,
      totalPrice,
    };

    return (
      <CartContext.Provider value={value}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export const CartConsumer = CartContext.Consumer;
