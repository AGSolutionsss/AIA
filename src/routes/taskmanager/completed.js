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
        "Dead End Date",
        "Employee",
        "Task Details",
        "Status",
    ],
  };
  getData = () => {
    let result = [];
    axios({
      url: baseURL+"/panel-fetch-taskmanager-completed-list",
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
              title="Task Manager Completed List"
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
                  title={"Task Manager Completed List"}
                  data={this.state.studentData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.studentData.length <= 0 && (
                <MUIDataTable
                  title={"Task Manager Completed List"}
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
