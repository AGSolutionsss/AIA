import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import attendanceForm from "./attendanceForm";
import attendanceReport from './attendanceReport';
import notattendReport from './notattendReport';
import {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
 } from "Components/AsyncComponent/AsyncComponent";

const AttendanceDownload = ({ match }) => (
    <div className="dashboard-wrapper">
        <Helmet>
            <title>AIA</title>
            <meta name="description" content="AIA" />
        </Helmet>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/attendanceForm`} />
            <Route path={`${match.url}/attendanceForm`} component={attendanceForm} />
            <Route path={`${match.url}/attendanceReport`} component={attendanceReport} />
            <Route path={`${match.url}/notattendReport`} component={notattendReport} />
        </Switch>
  </div>
);

export default AttendanceDownload;