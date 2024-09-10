import React from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import {baseURL} from '../../api';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import Moment from 'moment';
import VisibilityIcon from "@material-ui/icons/Visibility";

const option = {
  filterType: "dropDown",
  selectableRows: false,
  
};
export default class NewListClass extends React.Component {
  state = {
    loader: true,
    users: [],
    classData: [],
    columnData: [
      {
        name: "UID No",
        options: {
          filter: false,
          print:true,
          download:true,
        },
      },
      {
        name: "Slip Shared",
        options: {
          filter: false,
          print:true,
          download:true,
        },
      },
        
        "Mode",
        {
          name: "Tracking Number",
          options: {
            filter: false,
            print:true,
            download:true,
          },
        },
        {
          name: "Shipping Date",
          options: {
            filter: false,
            print:true,
            download:true,
          },
        },
        {
          name: "Delivery Date",
          options: {
            filter: false,
            print:true,
            download:true,
          },
        },
        {
          name: "Status",
          options: {
            filter: false,
            print:true,
            download:true,
          },
        },
      {
        name: "Actions",
        options: {
          filter: false,
          print:false,
          download:false,
          customBodyRender: (value) => {
            return (
                <div style={{ minWidth: "150px" , fontWeight: 800}}>
                  
                  <Tooltip title="Edit Delivery" placement="top">
                      <Link to={'edit?id='+value}>
                          <EditIcon />
                      </Link>
                  </Tooltip>
                  <Tooltip title="View Delivery" placement="top">
                      <Link to={'view?id='+value}>
                          <VisibilityIcon />
                      </Link>
                  </Tooltip>
                 </div>
            );
          },
        },
      },
    ],
  };

  

  

  

  sendclassEmail = (e,value) => {
    e.preventDefault();
    let data = {
      class_id: value,
    };
    axios({
      url: baseURL+"/panel-send-email-template-class",
      method: "post",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        if(res.data.code == '200'){
            NotificationManager.success("Email Sent Sucessfully");
            
        }else{
            NotificationManager.error("Email Not Sent Sucessfully");
            
        }
    })   
  };

  getData = () => {
    let result = [];
    axios({
      url: baseURL+"/panel-fetch-pending-delivery",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.delivery;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              response[i]["user_uid"],
              response[i]["delivery_slip_shared"],
              response[i]["delivery_mode"],
              response[i]["delivery_tracking_number"],
              Moment(response[i]["delivery_shipping_date"]).format('DD-MM-YYYY'),
              Moment(response[i]["delivery_date"]).format('DD-MM-YYYY'),
              response[i]["delivery_status"],
              response[i]["id"],
            ]);
          
        }
        this.setState({ classData: tempRows, loader: false });
      })
      .catch((res) => {
        this.setState({ loader: false });
      });
  };
  componentDidMount() {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }
    
    this.getData();
  }
  
  render() {
    const { loader } = this.state;
    let usertype = localStorage.getItem("user_type_id");
    return (
      <div className="data-table-wrapper">
        {loader && (
          <CircularProgress
            disableShrink
            style={{
              marginLeft: "600px",
              marginTop: "300px",
              marginBottom: "300px",
            }}
            color="secondary"
          />
        )}
        {!loader && (
          <>
            <PageTitleBar
              title="Delivery Pending List"
              match={this.props.match}
            />
            <div className="donorbtns">
                <Link to={'add'}>
                <Button
                  
                  className="mr-10 mb-10 btn-get-started"
                  color="warning"
                  style={{display:'flex',justifyContent:'center',alignItems:'center',color:'black'}}
                >
                  Add Delivery
                </Button>
              </Link>
            </div>
            <RctCollapsibleCard fullBlock>
              {this.state.classData.length > 0 && (
                <MUIDataTable
                  title={"Delivery Pending List"}
                  data={this.state.classData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.classData.length <= 0 && (
                <MUIDataTable
                  title={"Delivery Pending List"}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
            </RctCollapsibleCard>
          </>
        )}
      </div>
    );
  }
}
