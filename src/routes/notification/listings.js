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
        "Date",
        "Notification For",
        "Heading",
        "Details",
    ],
  };
  getData = () => {
    let result = [];
    axios({
      url: baseURL+"/panel-fetch-notification-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.notification;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
                Moment(response[i]["notification_date"]).format('DD-MM-YYYY'),
                response[i]["notification_course"],
                response[i]["notification_heading"],
                response[i]["notification_description"],
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
              title="Notification List"
              match={this.props.match}
            />
            <div className="donorbtns">
                <Link to={'add'}>
                <Button
                  
                  className="mr-10 mb-10 btn-get-started"
                  color="warning"
                  style={{display:'flex',justifyContent:'center',alignItems:'center',color:'black'}}
                >
                  Add Notification 
                </Button>
              </Link>
            </div>
            <RctCollapsibleCard fullBlock>
              {this.state.studentData.length > 0 && (
                <MUIDataTable
                  title={"Notification List"}
                  data={this.state.studentData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.studentData.length <= 0 && (
                <MUIDataTable
                  title={"Notification List"}
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
