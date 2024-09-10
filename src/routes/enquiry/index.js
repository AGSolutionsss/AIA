import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Listing from "./listings";
import Add from "./addEnquiry";
import Edit from "./editEnquiry";
import View from "./viewEnquiry";
import AddStudent from "../student/addStudent";
import Overdue from "./overdue";
import EditPersonal from "./edit";
import Close from "./close";

const NewListEnquiry = ({ match }) => (
  <div className="dashboard-wrapper">
    <Helmet>
      <title>AIA</title>
      <meta name="description" content="AIA" />
    </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/listing`} />
      <Route path={`${match.url}/listing`} component={Listing} />
      <Route path={`${match.url}/add`} component={Add} />
      <Route path={`${match.url}/edit`} component={Edit} />
      <Route path={`${match.url}/view`} component={View} />
      <Route path={`${match.url}/addStudent`} component={AddStudent} />
      <Route path={`${match.url}/overdue`} component={Overdue} />
      <Route path={`${match.url}/editPersonal`} component={EditPersonal} />
      <Route path={`${match.url}/close`} component={Close} />
    </Switch>
  </div>
);

export default NewListEnquiry;