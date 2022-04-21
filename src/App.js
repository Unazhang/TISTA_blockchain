import React from "react";
// import ReactDOM from "react-dom";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
// import ShowBalance from "./pages/Balance/components/ShowBalance";
import RequestDonation from "./pages/RequestDonation/RequestDonation";
import CommunityPage from "./pages/Donation/CommunityPage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Login/Signup";
import Profile from "./pages/Profile/Profile";

import "bootstrap/dist/css/bootstrap.min.css";

import HomePage from "./pages/Home/Homepage";
import MakeNewDonation from "./pages/Donation/MakeNewDonation";


// import MakeNewDonation from "./pages/Donation/MakeNewDonation";

// import UploadImage from "./pages/RequestDonation/UploadImage";
function App() {
  // const { role } = useAuth();
  // console.log(role);

  return (
    <div>
      {/* <UploadImage /> */}
      {/* <RequestDonation /> */}
      <div width="100%">
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <MainLayout>
            <Route exact path="/" component={HomePage} />
            {/* <Route exact path="/faq" component={FAQ} />
            <Route exact path="/transaction" component={FAQ} /> */}
            <Route exact path="/request" component={RequestDonation} />
            <Route path="/donation" component={CommunityPage} />
            <Route exact path="/profile" component={Profile} />
            <Route
                    exact
                    path="/make-a-donation"
                    component={MakeNewDonation}
                  />
          </MainLayout>
        </Switch>
      </div>
    </div>
  );
}

export default App;
