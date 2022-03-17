import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { FAQ } from "./pages";
import Home from "./pages/balance/components/ShowBalance";
import Request from "./pages/request/components/App";
import Donation from "./pages/Donation/Donationdraft";
import Login from "./pages/Login/Login";
import Signup from "./pages/Login/Signup";
import Profile from "./pages/Profile/Profile";
import User from "./pages/Profile/User";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./pages/PrivateRoute";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/dashboard" component={Dashboard} />
              <MainLayout>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/faq" component={FAQ} />
                <PrivateRoute exact path="/transaction" component={FAQ} />
                <PrivateRoute exact path="/request" component={Request} />
                <PrivateRoute path="/donation" component={Donation} />
                <PrivateRoute exact path="/profile" component={Profile} />
              </MainLayout>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </div>
  );
}

export default App;
