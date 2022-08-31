import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import AllReducers from "./reducers";
import Environment from "./Environment";


const store = createStore(
  AllReducers,
  // Development only: Allows debugging in React Store browser extension
  process.env.NODE_ENV === "development" ?
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      : undefined
);

ReactDOM.render(
  <Provider store={store}>
    {/* <BrowserRouter basename="/customerInfo_new">
      <Switch>
        <Route exact path="/:ent"><Main /></Route>
        <Route exact path="/:ent/:est/login"><Login /></Route>
        <Route exact path="/:ent/:est/signin"><Signin /></Route>
        <Route exact path="/:ent/:est/"><App /></Route>
      </Switch>
    </BrowserRouter> */}
    <Environment />
  </Provider>,
  document.getElementById("root")
);
