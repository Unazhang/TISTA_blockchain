import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { FAQ } from "./pages";
import Home from './balance/components/App';
import Donation from './pages/Donation/Donationdraft';
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <MainLayout>
          <Route path="/" exact component={Home} />
          <Route path="/faq" component={FAQ} />
          <Route path="/transaction" component={FAQ} />
          <Route path="/donation" component={Donation} />
        </MainLayout>
      </Switch>
    </Router>
  );
}

export default App;
