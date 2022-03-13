import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { FAQ } from "./pages";
import Home from "./balance/components/App";
import Request from "./request/components/App";
import Donation from "./pages/Donation/Donationdraft";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import Profile from "./pages/Profile/Profile";
import User from "./pages/Profile/User";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";

function App() {
  // const [openPopup, setOpenSend] = useState(true);
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

    // <Router>
    //   <Switch>
    //     <Route path="/login" component={Login} />
    //     <Route path="/signup" component={Signup} />
    // <MainLayout>
    //   <Route path="/" exact component={Home} />
    //   <Route path="/faq" component={FAQ} />
    //   <Route path="/transaction" component={FAQ} />
    //   <Route path="/request" component={Request} />
    //   {/* <Route path="/donation" component={Donation} /> */}
    //   <Route
    //     path="/donation"
    //     render={() => requireAuth.routeDisplay(<Donation />)}
    //   />
    //   <Route path="/profile" component={Profile} />
    // </MainLayout>
    //   </Switch>
    // </Router>
  );
}

export default App;
