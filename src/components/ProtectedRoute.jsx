import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default class ProtectedRoute extends Component {
  render() {
    const element = this.props.element;

    return (
      <AuthContext.Consumer>
        {(auth) => {
          const user = auth && auth.user;

          if (!user) {
            return <Navigate to="/login" replace />;
          }

          return element;
        }}
      </AuthContext.Consumer>
    );
  }
}
