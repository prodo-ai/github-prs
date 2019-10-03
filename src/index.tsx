import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import { model } from "./model";
import { createBrowserHistory } from "history";

import "./styles.css";

const history = createBrowserHistory();
const { Provider } = model.createStore({
  logger: true,
  route: {
    history,
  },
  initState: {
    pullRequests: {},
  },
});

const render = () => {
  ReactDOM.render(
    <Provider>
      <App />
    </Provider>,
    document.getElementById("root"),
  );
};

if (module.hot) {
  module.hot.accept("./App", () => {
    render();
  });
}

render();
