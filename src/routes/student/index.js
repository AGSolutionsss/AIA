import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Listing from "./listings";
import Edit from "./editStudent";
import View from "./viewStudent";
import EditCourse from "./editCourse";
import ViewCourse from "./viewCourse";
import AddCourse from "./addCourse";
import AddDelivery from "./addDelivery";
import EditDelivery from "./editDelivery";
import ViewDelivery from "./viewDelivery";
import AddExam from "./addExam";
import EditExam from "./editExam";
import ViewExam from "./viewExam";
import EditResult from "./editResult";
import ViewResult from "./viewResult";
import ViewEnquiry from "./viewEnquiry";
import PendingOnboarding from "./onboarding";
import PendingOffboarding from "./offboarding";
import Exam from "./exam";
import Interview from "./interview";

const NewListStudent = ({ match }) => (
  <div className="dashboard-wrapper">
    <Helmet>
      <title>AIA</title>
      <meta name="description" content="AIA" />
    </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/listing`} />
      <Route path={`${match.url}/listing`} component={Listing} />
      <Route path={`${match.url}/edit`} component={Edit} />
      <Route path={`${match.url}/view`} component={View} />
      <Route path={`${match.url}/courseEdit`} component={EditCourse} />
      <Route path={`${match.url}/courseView`} component={ViewCourse} />
      <Route path={`${match.url}/courseAdd`} component={AddCourse} />
      <Route path={`${match.url}/deliveryAdd`} component={AddDelivery} />
      <Route path={`${match.url}/deliveryEdit`} component={EditDelivery} />
      <Route path={`${match.url}/deliveryView`} component={ViewDelivery} />
      <Route path={`${match.url}/examAdd`} component={AddExam} />
      <Route path={`${match.url}/examEdit`} component={EditExam} />
      <Route path={`${match.url}/examView`} component={ViewExam} />
      <Route path={`${match.url}/resultEdit`} component={EditResult} />
      <Route path={`${match.url}/resultView`} component={ViewResult} />
      <Route path={`${match.url}/viewEnquiry`} component={ViewEnquiry} />
      <Route path={`${match.url}/onboarding`} component={PendingOnboarding} />
      <Route path={`${match.url}/offboarding`} component={PendingOffboarding} />
      <Route path={`${match.url}/exam`} component={Exam} />
      <Route path={`${match.url}/interview`} component={Interview} />
    </Switch>
  </div>
);

export default NewListStudent;