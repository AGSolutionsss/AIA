import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import examForm from "./examForm";
import examReport from './examReport';
import {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
 } from "Components/AsyncComponent/AsyncComponent";

const ExamDownload = ({ match }) => (
    <div className="dashboard-wrapper">
        <Helmet>
            <title>AIA</title>
            <meta name="description" content="AIA" />
        </Helmet>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/examForm`} />
            <Route path={`${match.url}/examForm`} component={examForm} />
            <Route path={`${match.url}/examReport`} component={examReport} />
        </Switch>
  </div>
);

export default ExamDownload;