import React from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import {baseURL} from '../../api';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import Moment from 'moment';
import { Button } from "reactstrap";
import {  NotificationManager,} from "react-notifications";

const option = {
  filterType: "dropDown",
  selectableRows: false,
  
};
export default class NewListPendingRequest extends React.Component {
  state = {
    loader: true,
    users: [],
    requestData: [],
    columnData: [
      {
        name: "Date",
        options: {
          filter: false,
          print:true,
          download:true,
        },
      },
      {
        name: "Full Name",
        options: {
          filter: false,
          print:true,
          download:true,
        },
      },
      {
        name: "Course",
        options: {
          filter: false,
          print:true,
          download:true,
        },
      },
        
        "Request Type",
        {
          name: "Remark",
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
                <Tooltip title="Approved" placement="top"> 
                  <IconButton
                    aria-label="Approved"
                    
                  >
                    <a style={{color:'#5D92F4'}} onClick={(e) => this.updateData(e,value)} >
                        <EditIcon />
                    </a>
                    
                  </IconButton>
                </Tooltip>
                <Tooltip title="Cancel" placement="top"> 
                  <IconButton
                    aria-label="Cancel"
                    style={{paddingTop:'0px',paddingBottom:'0px'}}
                  >
                    <a style={{color:'#5D92F4'}} onClick={(e) => this.updateDataCancel(e,value)} >
                    <i class="zmdi zmdi-arrow-missed"></i>

                    </a>
                    
                  </IconButton>
                </Tooltip>
              </div>
            );
          },
        },
      },
    ],
  };
  updateData = (e,value) => {
    e.preventDefault();
    let data= {
      course_request_status : "Approved"
    }
    axios({
      url: baseURL+"/panel-update-request/"+value,
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        this.getData();
      NotificationManager.success("Data Update Sucessfully");
    })
  };

  updateDataCancel = (e,value) => {
    e.preventDefault();
    let data= {
      course_request_status : "Cancel"
    }
    axios({
      url: baseURL+"/panel-update-request/"+value,
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        this.getData();
      NotificationManager.success("Data Update Sucessfully");
    })
  };
  getData = () => {
    let result = [];
    axios({
      url: baseURL+"/panel-fetch-request-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.urequest;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
                Moment(response[i]["course_request_date"]).format('DD-MM-YYYY'),
                response[i]["name"],
                (response[i]["course_opted"] == 'Other' ? response[i]["course_opted_other"] : response[i]["course_opted"]),
                response[i]["course_request"],
                response[i]["course_request_remarks"],
                response[i]["course_request_status"],
                response[i]["id"],
            ]);
          
        }
        this.setState({ requestData: tempRows, loader: false });
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
              title="Request Pending List"
              match={this.props.match}
            />
            <div className="donorbtns">
                <Link to={'add'}>
                <Button
                  
                  className="mr-10 mb-10 btn-get-started"
                  color="warning"
                  style={{display:'flex',justifyContent:'center',alignItems:'center',color:'black'}}
                >
                  Add Request
                </Button>
              </Link>
            </div>
            <RctCollapsibleCard fullBlock>
              {this.state.requestData.length > 0 && (
                <MUIDataTable
                  title={"Request Pending List"}
                  data={this.state.requestData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.requestData.length <= 0 && (
                <MUIDataTable
                  title={"Request Pending List"}
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
