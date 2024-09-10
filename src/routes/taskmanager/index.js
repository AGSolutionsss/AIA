import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Listing from "./listings";
import Add from "./addTaskManager";
import Completed from "./completed";
import Inspection from "./inspection";
import Edit from "./editTaskManager";

const NewListTaskManager = ({ match }) => (
  <div className="dashboard-wrapper">
    <Helmet>
      <title>AIA</title>
      <meta name="description" content="AIA" />
    </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/pending-listing`} />
      <Route path={`${match.url}/pending-listing`} component={Listing} />
      <Route path={`${match.url}/add`} component={Add} />
      <Route path={`${match.url}/edit`} component={Edit} />
      <Route path={`${match.url}/completed-listing`} component={Completed} />
      <Route path={`${match.url}/inspection-listing`} component={Inspection} />
    </Switch>
  </div>
);

export default NewListTaskManager;