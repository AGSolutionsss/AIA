import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import deliveryForm from "./deliveryForm";
import deliveryReport from './deliveryReport';
import {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
 } from "Components/AsyncComponent/AsyncComponent";

const DeliveryDownload = ({ match }) => (
    <div className="dashboard-wrapper">
        <Helmet>
            <title>AIA</title>
            <meta name="description" content="AIA" />
        </Helmet>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/deliveryForm`} />
            <Route path={`${match.url}/deliveryForm`} component={deliveryForm} />
            <Route path={`${match.url}/deliveryReport`} component={deliveryReport} />
        </Switch>
  </div>
);

export default DeliveryDownload;