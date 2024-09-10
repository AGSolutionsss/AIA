import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Listing from "./pending";
import delivered from "./delivered";
import Add from "./adddelivery";
import Edit from "./editdelivery";
import View from "./viewdelivery";

const NewListDelivery = ({ match }) => (
  <div className="dashboard-wrapper">
    <Helmet>
      <title>AIA</title>
      <meta name="description" content="AIA" />
    </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/listing`} />
      <Route path={`${match.url}/listing`} component={Listing} />
      <Route path={`${match.url}/add`} component={Add} />
      <Route path={`${match.url}/delivered`} component={delivered} />
      <Route path={`${match.url}/edit`} component={Edit} />
      <Route path={`${match.url}/view`} component={View} />
    </Switch>
  </div>
);

export default NewListDelivery;