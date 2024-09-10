import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import enquiryForm from "./enquiryForm";
import enquiryReport from './enquiryReport';
import {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
 } from "Components/AsyncComponent/AsyncComponent";

const EnquiryDownload = ({ match }) => (
    <div className="dashboard-wrapper">
        <Helmet>
            <title>AIA</title>
            <meta name="description" content="AIA" />
        </Helmet>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/enquiryForm`} />
            <Route path={`${match.url}/enquiryForm`} component={enquiryForm} />
            <Route path={`${match.url}/enquiryReport`} component={enquiryReport} />
        </Switch>
  </div>
);

export default EnquiryDownload;