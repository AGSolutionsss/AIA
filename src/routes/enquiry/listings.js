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
export default class NewListEnquiry extends React.Component {
  state = {
    loader: true,
    users: [],
    enquiryData: [],
    columnData: [
        {
          name: "Enquiry No",
          options: {
            filter: false,
            print:false,
            download:true,
          },
        },
        "Enquiry Date",
        'Followup Date',
        {
          name: "Full Name",
          options: {
            filter: false,
            print:true,
            download:true,
          },
        },
        {
          name: "Mobile No",
          options: {
            filter: false,
            print:true,
            download:true,
          },
        },
        {
          name: "City",
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
                
                {(!value.startsWith('Student')) &&
                <Tooltip title="Edit" placement="top"> 
                  <IconButton
                    aria-label="Edit"
                    style={{paddingTop:'0px',paddingBottom:'0px'}}
                  >
                    <Link to={"edit?id=" + value.substr(value.indexOf("#")+1, value.length-1)}>
                      <EditIcon />
                    </Link>
                  </IconButton>
                </Tooltip>
                }
                <Tooltip title="View" placement="top">
                  <IconButton aria-label="View" style={{paddingTop:'0px',paddingBottom:'0px'}}>
                    <Link
                    
                      to={"view?id=" + value.substr(value.indexOf("#")+1, value.length-1)}
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
      url: baseURL+"/panel-fetch-enquiry-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.enquiry;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
                response[i]["enquiry_no"],
                Moment(response[i]["enquiry_date"]).format('DD-MM-YYYY'),
                Moment(response[i]["enquiry_follow_date"]).format('DD-MM-YYYY'),
                response[i]["enquiry_title"]+" "+response[i]["enquiry_full_name"],
                response[i]["enquiry_mobile"],
                response[i]["enquiry_city"],
                response[i]["enquiry_course"],
                response[i]["enquiry_status"],
                response[i]["enquiry_status"]+'#'+response[i]["id"],
            ]);
          
        }
        this.setState({ enquiryData: tempRows, loader: false });
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
              title="Enquiry Open List"
              match={this.props.match}
            />
            <div className="donorbtns">
                <Link to={'add'}>
                <Button
                  
                  className="mr-10 mb-10 btn-get-started"
                  color="warning"
                  style={{display:'flex',justifyContent:'center',alignItems:'center',color:'black'}}
                >
                  Add Enquiry 
                </Button>
              </Link>
            </div>
            <RctCollapsibleCard fullBlock>
              {this.state.enquiryData.length > 0 && (
                <MUIDataTable
                  title={"Enquiry Open List"}
                  data={this.state.enquiryData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.enquiryData.length <= 0 && (
                <MUIDataTable
                  title={"Enquiry Open List"}
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
