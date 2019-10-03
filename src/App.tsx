import * as React from "react";
import { Switch, Route } from "@prodo/route";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Repo from "./pages/Repo";

const App = () => (
  <div className="app">
    <Header />

    <div className="container">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:owner/:repo" component={Repo} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </div>
);

export default App;
