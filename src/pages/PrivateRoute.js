import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


// wrapper for current route
export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return (
    <Route
      render={() => {
        return currentUser ? { ...children } : <Redirect to="/onboard" />;
      }}
    ></Route>
  );
}
