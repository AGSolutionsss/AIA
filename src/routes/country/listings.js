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
export default class NewListCountry extends React.Component {
  state = {
    loader: true,
    users: [],
    classData: [],
    columnData: [
        
        "Country",
        "Country Code",
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
                    <Tooltip title="Edit Country" placement="top"> 
                        <IconButton aria-label="Edit Country" style={{paddingTop:'0px',paddingBottom:'0px'}}>
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

  getData = () => {
    let result = [];
    axios({
      url: baseURL+"/panel-fetch-country-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.country;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
                
                response[i]["country_name"],
                response[i]["country_code"],
                response[i]["country_status"],
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
              title="Country List"
              match={this.props.match}
            />
            <div className="donorbtns">
                <Link to={'add'}>
                <Button
                  
                  className="mr-10 mb-10 btn-get-started"
                  color="warning"
                  style={{display:'flex',justifyContent:'center',alignItems:'center',color:'black'}}
                >
                  Add Country
                </Button>
              </Link>
            </div>
            <RctCollapsibleCard fullBlock>
              {this.state.classData.length > 0 && (
                <MUIDataTable
                  title={"Country List"}
                  data={this.state.classData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.classData.length <= 0 && (
                <MUIDataTable
                  title={"Country List"}
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
