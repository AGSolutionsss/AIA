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
import {  NotificationManager,} from "react-notifications";

const option = {
  filterType: "dropDown",
  selectableRows: false,
  filter: false,
  
};
export default class NewListStudent extends React.Component {
  state = {
    loader: true,
    users: [],
    studentData: [],
    columnData: [
        "UID",
        "Date",
        "Full Name",
        "Mobile",
        "Qualification",
        "Admission No",
        "Status",
      {
        name: "Actions",
        options: {
          filter: false,
          print:false,
          download:false,
          customBodyRender: (value) => {
            return (
              <div style={{ minWidth: "150px" , fontWeight: 800}}>
                <Tooltip title="View" placement="top">
                  <IconButton aria-label="View" style={{paddingTop:'0px',paddingBottom:'0px'}}>
                    <Link
                    
                      to={"view?id=" + value}
                    >
                      <VisibilityIcon />
                    </Link>
                  </IconButton>
                </Tooltip>
              </div>
            );
          },
        },
      },
    ],
  };
  getData = () => {
    let result = [];
    axios({
      url: baseURL+"/panel-fetch-student-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.student;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
                response[i]["user_uid"],
                Moment(response[i]["registration_date"]).format('DD-MM-YYYY'),
                response[i]["name"],
                response[i]["mobile"],
                response[i]["qualification"],
                response[i]["admission_form_no"],
                response[i]["status"],
                response[i]["id"],
            ]);
          
        }
        this.setState({ studentData: tempRows, loader: false });
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

  emailnotification = (e) => {
    e.preventDefault();
    
    axios({
      url: baseURL+"/panel-send-email-notification",
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        if(res.data.code == '200'){
            NotificationManager.success("Notification Sent Sucessfully");
            
        }else{
            NotificationManager.error("Notification Not Sent Sucessfully");
            
        }
    })  
  };
  
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
              title="Student List"
              match={this.props.match}
            />
            <div className="donorbtns">
                
                <Button
                  onClick={(e) => this.emailnotification(e)}
                  className="mr-10 mb-10 btn-get-started"
                  color="warning"
                  style={{display:'flex',justifyContent:'center',alignItems:'center',color:'black'}}
                >
                  Month End Email Notification
                </Button>
              
            </div>

            <RctCollapsibleCard fullBlock>
              {this.state.studentData.length > 0 && (
                <MUIDataTable
                  title={"Student List"}
                  data={this.state.studentData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.studentData.length <= 0 && (
                <MUIDataTable
                  title={"Student List"}
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
