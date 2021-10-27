import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { FAQ } from "./pages";
import Home from './balance/components/App';
import SignUp from "./signup/components/App";
import Donate from "./donate/components/App";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={() => <div>Login</div>} />
        <MainLayout>
          <Route path="/" exact component={Home} />
          <Route path="/faq" component={FAQ} />
          <Route path="/transaction" component={FAQ} />
          <Route path="/signup" component={SignUp} />
          <Route path="/donate" component={Donate} />
        </MainLayout>
      </Switch>
    </Router>
  );
}

export default App;
