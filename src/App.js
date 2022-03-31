import React, { useState } from "react";
// import ReactDOM from "react-dom";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { FAQ } from "./pages";
import ShowBalance from "./pages/Balance/components/ShowBalance";
import RequestDonation from "./pages/RequestDonation/RequestDonation";
import CommunityPage from "./pages/Donation/CommunityPage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Login/Signup";
import Profile from "./pages/Profile/Profile";
import Onboard from "./pages/Onboard";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./pages/PrivateRoute";

import Vendor from "./pages/Roles/Vendor";
import Requester from "./pages/Roles/Requester";
import Donor from "./pages/Roles/Donor";

import { useAuth } from "./contexts/AuthContext";
import axios from "axios";

function App() {
  const [role, setRole] = useState("vendor");
  const { currentUser } = useAuth();

  const getRole = async () => {
    await axios
      .post("http://localhost:4000/app/role", {
        uid: currentUser.uid,
      })
      .then((response) => {
        setRole(response.data);
      });
  };

  if (currentUser) {
    getRole();
  }

  return (
    <div>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/onboard" component={Onboard} />
          <PrivateRoute>
            <MainLayout>
              {role === "vendor" && (
                <Vendor>
                  <Route exact path="/" component={ShowBalance} />
                  <Route exact path="/faq" component={FAQ} />
                  <Route exact path="/transaction" component={FAQ} />
                  <Route exact path="/request" component={RequestDonation} />
                  <Route path="/donation" component={Donation} />
                  <Route exact path="/profile" component={Profile} />
                </Vendor>
              )}
              {role === "requester" && (
                <Requester>
                  <Route exact path="/" component={ShowBalance} />
                  <Route exact path="/faq" component={FAQ} />
                  <Route exact path="/transaction" component={FAQ} />
                  <Route exact path="/request" component={RequestDonation} />
                  <Route path="/donation" component={Donation} />
                  <Route exact path="/profile" component={Profile} />
                </Requester>
              )}
              {role === "donor" && (
                <Donor>
                  <Route exact path="/" component={ShowBalance} />
                  <Route exact path="/faq" component={FAQ} />
                  <Route exact path="/transaction" component={FAQ} />
                  <Route exact path="/request" component={RequestDonation} />
                  <Route path="/donation" component={Donation} />
                  <Route exact path="/profile" component={Profile} />
                </Donor>
              )}
            </MainLayout>
          </PrivateRoute>
        </Switch>
      </div>
    </div>
  );
}

export default App;
