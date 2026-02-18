import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import About from "../pages/About";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import ProtectedRoute from "../components/ProtectedRoute";
import Game from "../pages/Game";

export default class AppRoutes extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* NEW: game details */}
        <Route path="/game/:id" element={<Game />} />

        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
      </Routes>
    );
  }
}
