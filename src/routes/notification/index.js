import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Listing from "./listings";
import Add from "./addNotification";

const NewListNotification = ({ match }) => (
  <div className="dashboard-wrapper">
    <Helmet>
      <title>AIA</title>
      <meta name="description" content="AIA" />
    </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/listing`} />
      <Route path={`${match.url}/listing`} component={Listing} />
      <Route path={`${match.url}/add`} component={Add} />
    </Switch>
  </div>
);

export default NewListNotification;