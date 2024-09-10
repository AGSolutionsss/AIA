import React from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { NotificationContainer, NotificationManager,} from "react-notifications";
import {baseURL} from '../../api';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { useHistory, useParams } from "react-router-dom";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import Add from "./addRequest";
// intl messages
import IntlMessages from "Util/IntlMessages";


const option = {
  filterType: "textField",
  print: false,
  viewColumns: false,
  filter: false,
  searchOpen:true,
  download:false,
  selectableRows: false,
};



export default class AddToGroup extends React.Component {
  
  state = {
    loader: true,
    message:'',
    users: [],
    donorData: [],
    columnData: [
      "UID",
      "Full Name",
      "Mobile",
      {
        name: "Actions",
        options: {
          filter: true,
          customBodyRender: (value) => {
            return (
              <div style={{ minWidth: "150px" }}>
                {/* {alert(value)} */}

                <Button onClick={() => this.addDonorToReceipt(value)}>
                  Selectd
                </Button>
              </div>
            );
          },
        },
      },
    ],
  };
  
  addDonorToReceipt(fts_id) {
      //console.log('hh'+fts_id);
      this.setState({
        message: fts_id, loader: false
    });
        console.log(this.state.message);

        this.props.getUserid(fts_id);

        <Add message={this.state.message} />


    
  }

  getData = () => {
    let result = [];
    axios({
      url: baseURL+"/panel-fetch-user-request",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
        let singleData = [];
        
        let response = res.data.useruid;
        
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          tempRows.push([
            response[i]["user_uid"],
            response[i]["name"],
            response[i]["mobile"],
            response[i]["user_uid"],
          ]);
        }
        this.setState({ donorData: tempRows, loader: false });
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
    let usertype = localStorage.getItem("id");
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
           

            <RctCollapsibleCard fullBlock>
              {this.state.donorData.length > 0 && (
                <MUIDataTable
                  data={this.state.donorData}
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
