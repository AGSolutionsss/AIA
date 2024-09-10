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
  filter: false,
  
};
export default class NewListNotification extends React.Component {
  state = {
    loader: true,
    users: [],
    studentData: [],
    columnData: [
        "Assign Date",
        "Due Date",
        "Employee",
        "Task Details",
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
                    <Tooltip title="Edit" placement="top"> 
                      <IconButton
                        aria-label="Edit"
                        
                      >
                       <Link to={"edit?id=" + value}>
                      <EditIcon />
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
  updateData = (e,value) => {
    e.preventDefault();
    let data= {
        task_status : "Inspection"
    }
    axios({
      url: baseURL+"/panel-update-taskmanager/"+value,
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
        task_status : "Cancel"
    }
    axios({
      url: baseURL+"/panel-update-taskmanager/"+value,
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
      url: baseURL+"/panel-fetch-taskmanager-pending-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.taskmanager;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
                Moment(response[i]["task_from_date"]).format('DD-MM-YYYY'),
                Moment(response[i]["task_to_date"]).format('DD-MM-YYYY'),
                response[i]["name"],
                response[i]["task_details"],
                response[i]["task_status"],
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
              title="Task Manager Pending List"
              match={this.props.match}
            />
            <div className="donorbtns">
                <Link to={'add'}>
                <Button
                  
                  className="mr-10 mb-10 btn-get-started"
                  color="warning"
                  style={{display:'flex',justifyContent:'center',alignItems:'center',color:'black'}}
                >
                  Add Task 
                </Button>
              </Link>
            </div>
            <RctCollapsibleCard fullBlock>
              {this.state.studentData.length > 0 && (
                <MUIDataTable
                  title={"Task Manager Pending List"}
                  data={this.state.studentData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.studentData.length <= 0 && (
                <MUIDataTable
                  title={"Task Manager Pending List"}
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
