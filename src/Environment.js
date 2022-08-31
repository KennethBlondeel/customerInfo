import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Route, BrowserRouter, Switch } from "react-router-dom";
import App from "./App";
import Login from "./login";
import PasswordReset from "./PasswordReset";
import Signin from "./Signin";
import Main from "./Main";
import axios from "axios";

import "./index.css";
// import "@identitybuilding/idb-react-ui-elements/dist/styles/Colors.css";

const Environment = ({}) => {
  return (
    <BrowserRouter basename="/customerInfo_new">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/:ent">
          <Main />
        </Route>
        <Route exact path="/:ent/:est/login">
          <Login />
        </Route>
        <Route exact path="/:ent/:est/signin">
          <Signin />
        </Route>
        <Route path="/reset/:token">
          <PasswordReset />
        </Route>
        <Route exact path="/:ent/:est/">
          <App />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Environment;
