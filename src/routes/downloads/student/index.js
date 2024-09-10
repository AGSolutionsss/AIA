import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import studentForm from "./studentForm";
import studentReport from './studentReport';
import {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
 } from "Components/AsyncComponent/AsyncComponent";

const StudentDownload = ({ match }) => (
    <div className="dashboard-wrapper">
        <Helmet>
            <title>AIA</title>
            <meta name="description" content="AIA" />
        </Helmet>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/studentForm`} />
            <Route path={`${match.url}/studentForm`} component={studentForm} />
            <Route path={`${match.url}/studentReport`} component={studentReport} />
        </Switch>
  </div>
);

export default StudentDownload;