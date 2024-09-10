import React, { Component } from "react";
import { Helmet } from "react-helmet";
import IntlMessages from 'Util/IntlMessages';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {baseURL} from '../../api';
import dateyear from '.././dateyear';
import {
  TotalSalesWidget,
  NetProfitWidget,
	TaxStatsWidget,
	ExpensesWidget,
  PendingTaskWidget,
  PendingOnboardingWidget,
  PendingDeliveryWidget,
  PendingRequestWidget,
  PendingExamWidget,
  PendingOfboardingWidget,
  PendingInterviewWidget,
} from "Components/Widgets";
import axios from "axios";

const totalSales = {
  label: 'Total Enquires',
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

const netProfit = {
  label: 'Total Student',
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

const taxStats = {
  label: 'Open Enquires',
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

const expenses = {
  label: 'Overdue Enquires',
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

const pendingtask = {
  label: 'Pending Task',
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

const pendingonboarding = {
  label: 'Pending Onboarding',
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

const pendingdelivery = {
  label: 'Pending Delivery',
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

const pendingrequest = {
  label: 'Pending Request',
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

const pendingexam = {
  label: 'Pending Exam',
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

const pendingofboarding = {
  label: 'Pending Exam',
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

const pendinginterview = {
  label: 'Pending Interview',
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

 export default class NewsDashboard extends Component {
   state = {
     results: [],
   };
   

   componentDidMount() {

    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      
      browserHistory.push("/logout");
      
    }else{

      
    }
     


     axios({
       url: baseURL+"/panel-fetch-dashboard-data/"+dateyear,
       method: "GET",
       headers: {
         Authorization: `Bearer ${localStorage.getItem("login")}`,
       },
     })
       .then((res) => {
         this.setState({ results: res.data });
         localStorage.setItem("total_enquiry",this.state.results.total_enquiry);
         localStorage.setItem("total_student",this.state.results.total_student);
         localStorage.setItem("open_enquiry",this.state.results.open_enquiry);
         localStorage.setItem("overdue_enquiry",this.state.results.overdue_enquiry);
         localStorage.setItem("pending_task",this.state.results.pending_task);
         localStorage.setItem("pending_onboard",this.state.results.pending_onboard);
         localStorage.setItem("pending_ofboard",this.state.results.pending_ofboard);
         localStorage.setItem("pending_delivery",this.state.results.pending_delivery);
         localStorage.setItem("pending_request",this.state.results.pending_request);
         localStorage.setItem("pending_exam",this.state.results.pending_exam);
         localStorage.setItem("pending_intreview",this.state.results.pending_intreview);
         
       })
       .catch((res) => {
         alert("Something Went Wrong!");
         
       });
   }

  render() {
    
     return (
       <div className="news-dashboard-wrapper">
         <Helmet>
           <title>AIA</title>
           <meta name="description" content="AIA" />
         </Helmet>
         <div className="row">
          {(localStorage.getItem('user_type_id') == '2' || localStorage.getItem('user_type_id') == '4') &&
            <div className="col-sm-2 col-md-2 col-6">
                <TotalSalesWidget
                  
                  label={totalSales.label}
                  chartdata={totalSales.chartdata}
                  labels={totalSales.labels}
                  value = {this.state.results.total_enquiry}
                />
            </div>
          }
          {(localStorage.getItem('user_type_id') == '2' || localStorage.getItem('user_type_id') == '4') &&
            <div className="col-sm-2 col-md-2 col-6">
                <NetProfitWidget
                  label={netProfit.label}
                  chartdata={netProfit.chartdata}
                  labels={netProfit.labels}
                  value = {this.state.results.total_student}
                />
            </div>
          }
          {(localStorage.getItem('user_type_id') == '2' || localStorage.getItem('user_type_id') == '4') &&
            <div className="col-sm-2 col-md-2 col-6">
                <TaxStatsWidget
                  label={taxStats.label}
                  chartdata={taxStats.chartdata}
                  labels={taxStats.labels}
                  value = {this.state.results.open_enquiry}
                />
            </div>
          }
          {(localStorage.getItem('user_type_id') == '2' || localStorage.getItem('user_type_id') == '4') &&
            <div className="col-sm-2 col-md-2 col-6">
                <ExpensesWidget
                  label={expenses.label}
                  chartdata={expenses.chartdata}
                  labels={expenses.labels}
                  value = {this.state.results.overdue_enquiry}
                />
            </div>
          }
          
            <div className="col-sm-2 col-md-2 col-6">
              <PendingTaskWidget
                  label={pendingtask.label}
                  chartdata={pendingtask.chartdata}
                  labels={pendingtask.labels}
                  value = {this.state.results.pending_task}
                />
            </div>
          
          {(localStorage.getItem('user_type_id') == '5' || localStorage.getItem('user_type_id') == '4') &&
            <div className="col-sm-2 col-md-2 col-6">
              <PendingOnboardingWidget
                  label={pendingonboarding.label}
                  chartdata={pendingonboarding.chartdata}
                  labels={pendingonboarding.labels}
                  value = {this.state.results.pending_onboard}
                />
            </div>
          }
          {(localStorage.getItem('user_type_id') == '5' || localStorage.getItem('user_type_id') == '4') &&
            <div className="col-sm-2 col-md-2 col-6">
              <PendingDeliveryWidget
                  label={pendingdelivery.label}
                  chartdata={pendingdelivery.chartdata}
                  labels={pendingdelivery.labels}
                  value = {this.state.results.pending_delivery}
                />
            </div>
  }
  {(localStorage.getItem('user_type_id') == '5' || localStorage.getItem('user_type_id') == '4') &&
            <div className="col-sm-2 col-md-2 col-6">
              <PendingRequestWidget
                  label={pendingrequest.label}
                  chartdata={pendingrequest.chartdata}
                  labels={pendingrequest.labels}
                  value = {this.state.results.pending_request}
                />
            </div>
  }
  {(localStorage.getItem('user_type_id') == '5' || localStorage.getItem('user_type_id') == '4') &&
            <div className="col-sm-2 col-md-2 col-6">
              <PendingExamWidget
                  label={pendingexam.label}
                  chartdata={pendingexam.chartdata}
                  labels={pendingexam.labels}
                  value = {this.state.results.pending_exam}
                />
            </div>
  }
  {(localStorage.getItem('user_type_id') == '5' || localStorage.getItem('user_type_id') == '4') &&
            <div className="col-sm-2 col-md-2 col-6">
              <PendingOfboardingWidget
                  label={pendingofboarding.label}
                  chartdata={pendingofboarding.chartdata}
                  labels={pendingofboarding.labels}
                  value = {this.state.results.pending_ofboard}
                />
            </div>
  }
  {(localStorage.getItem('user_type_id') == '5' || localStorage.getItem('user_type_id') == '4') &&
            <div className="col-sm-2 col-md-2 col-6">
              <PendingInterviewWidget
                  label={pendinginterview.label}
                  chartdata={pendinginterview.chartdata}
                  labels={pendinginterview.labels}
                  value = {this.state.results.pending_intreview}
                />
            </div>
  }
          </div>
        </div>
     );
   }
 }
 