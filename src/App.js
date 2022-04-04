import React from "react";
// import ReactDOM from "react-dom";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { FAQ } from "./pages";
// import ShowBalance from "./pages/Balance/components/ShowBalance";
import RequestDonation from "./pages/RequestDonation/RequestDonation";
import CommunityPage from "./pages/Donation/CommunityPage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Login/Signup";
import Profile from "./pages/Profile/Profile";
import Onboard from "./pages/Onboard";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./pages/PrivateRoute";
import HomePage from "./pages/Home/Homepage";

import Vendor from "./pages/Roles/Vendor";
import Requester from "./pages/Roles/Requester";
import Donor from "./pages/Roles/Donor";
import MakeNewDonation from "./pages/Donation/MakeNewDonation";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { role } = useAuth();
  // console.log(role);

  return (
    <div>
      <div width="100%">
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/onboard" component={Onboard} />
          <PrivateRoute>
            <MainLayout>
              {role === "Vendor" && (
                <Vendor>
                  <Route exact path="/" component={HomePage} />
                  <Route exact path="/faq" component={FAQ} />
                  <Route exact path="/transaction" component={FAQ} />
                  <Route exact path="/request" component={RequestDonation} />
                  <Route path="/donation" component={CommunityPage} />
                  <Route exact path="/profile" component={Profile} />
                </Vendor>
              )}
              {role === "Requester" && (
                <Requester>
                  <Route exact path="/" component={HomePage} />
                  <Route exact path="/faq" component={FAQ} />
                  <Route exact path="/transaction" component={FAQ} />
                  <Route exact path="/request" component={RequestDonation} />
                  <Route path="/donation" component={CommunityPage} />
                  <Route exact path="/profile" component={Profile} />
                </Requester>
              )}
              {role === "Donor" && (
                <Donor>
                  <Route exact path="/" component={HomePage} />
                  <Route exact path="/faq" component={FAQ} />
                  <Route exact path="/transaction" component={FAQ} />
                  <Route exact path="/request" component={RequestDonation} />
                  <Route path="/donation" component={CommunityPage} />
                  <Route exact path="/profile" component={Profile} />
                  <Route
                    exact
                    path="/make-a-donation"
                    component={MakeNewDonation}
                  />
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
