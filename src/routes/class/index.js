import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Listing from "./listings";
import Add from "./addClass";
import Attendance from "./addAttendance";
import View from "./viewAttendance";
import Edit from "./editAttendance";

const NewListClass = ({ match }) => (
  <div className="dashboard-wrapper">
    <Helmet>
      <title>AIA</title>
      <meta name="description" content="AIA" />
    </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/listing`} />
      <Route path={`${match.url}/listing`} component={Listing} />
      <Route path={`${match.url}/add`} component={Add} />
      <Route path={`${match.url}/attendance`} component={Attendance} />
      <Route path={`${match.url}/Viewattendance`} component={View} />
      <Route path={`${match.url}/Editattendance`} component={Edit} />
    </Switch>
  </div>
);

export default NewListClass;