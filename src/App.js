import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { FAQ } from "./pages";
import Home from './balance/components/App';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={() => <div>Login</div>} />
        <MainLayout>
          <Route path="/" exact component={Home} />
          <Route path="/faq" component={FAQ} />
          <Route path="/transaction" component={FAQ} />
        </MainLayout>
      </Switch>
    </Router>
  );
}

export default App;
