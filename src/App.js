import React, { useState } from "react";
// import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { FAQ } from "./pages";
import ShowBalance from "./pages/Balance/components/ShowBalance";
import RequestDonation from "./pages/RequestDonation/RequestDonation";
import Donation from "./pages/Donation/Donationdraft";
import Login from "./pages/Login/Login";
import Signup from "./pages/Login/Signup";
import Profile from "./pages/Profile/Profile";
// import User from "./pages/Profile/User";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./pages/PrivateRoute";
import Onboard from "./pages/Onboard";
import "bootstrap/dist/css/bootstrap.min.css";

import Vendor from "./pages/Roles/Vendor";
import Requester from "./pages/Roles/Requester";
import Donor from "./pages/Roles/Donor";

// const role = "vendor";
const role = "requester";
// const role = "donor";

function App() {
  return (
    <div>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/onboard" component={Onboard} />
              <MainLayout>
                {role === "vendor" && (
                  <Vendor>
                    <PrivateRoute exact path="/" component={ShowBalance} />
                    <PrivateRoute exact path="/faq" component={FAQ} />
                    <PrivateRoute exact path="/transaction" component={FAQ} />
                    <PrivateRoute
                      exact
                      path="/request"
                      component={RequestDonation}
                    />
                    <PrivateRoute path="/donation" component={Donation} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                  </Vendor>
                )}
                {role === "requester" && (
                  <Requester>
                    <PrivateRoute exact path="/" component={ShowBalance} />
                    <PrivateRoute exact path="/faq" component={FAQ} />
                    <PrivateRoute exact path="/transaction" component={FAQ} />
                    <PrivateRoute
                      exact
                      path="/request"
                      component={RequestDonation}
                    />
                    <PrivateRoute path="/donation" component={Donation} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                  </Requester>
                )}
                {role === "donor" && (
                  <Donor>
                    <PrivateRoute exact path="/" component={ShowBalance} />
                    <PrivateRoute exact path="/faq" component={FAQ} />
                    <PrivateRoute exact path="/transaction" component={FAQ} />
                    <PrivateRoute
                      exact
                      path="/request"
                      component={RequestDonation}
                    />
                    <PrivateRoute path="/donation" component={Donation} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                  </Donor>
                )}
              </MainLayout>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </div>
  );
}

export default App;
