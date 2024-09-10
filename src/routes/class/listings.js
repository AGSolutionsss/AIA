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
export default class NewListClass extends React.Component {
  state = {
    loader: true,
    users: [],
    classData: [],
    columnData: [
        "Date",
        "Time",
        "Subject",
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
                  {(value.startsWith('Active')) &&
                    <Tooltip title="Update Status" placement="top"> 
                        <IconButton aria-label="Update Status" style={{paddingTop:'0px',paddingBottom:'0px'}}>
                        <a style={{color:'#5D92F4'}} onClick={(e) => this.updateData(e,value.substr(value.indexOf("#")+1, value.length-1))} >
                            <EditIcon />
                        </a>
                        </IconButton>
                    </Tooltip>
                  }
                  {(value.startsWith('Active')) &&
                    <Tooltip title="Send Email" placement="top">
                      <IconButton aria-label="Send Email" style={{paddingTop:'0px',paddingBottom:'0px'}}>
                          <a style={{color:'#5D92F4'}} onClick={(e) => this.sendclassEmail(e,value.substr(value.indexOf("#")+1, value.length-1))} >
                          <i className="zmdi zmdi-email"></i>
                          </a>
                      </IconButton>
                    </Tooltip>
                  }
                    {(value.startsWith('Active')) &&
                    <Tooltip title="Send Whatsapp" placement="top">
                        <IconButton aria-label="Send Whatsapp" style={{paddingTop:'0px',paddingBottom:'0px'}}>
                            <a style={{color:'#5D92F4'}} onClick={(e) => this.classwhatsApp(e,value.substr(value.indexOf("#")+1, value.length-1))} >
                            <i className="zmdi zmdi-whatsapp"></i>
                            </a>
                        </IconButton>
                    </Tooltip>
                  }
                  {(value.startsWith('Active')) &&
                    <Tooltip title="Mobile Notification" placement="top">
                        <IconButton aria-label="Mobile Notification" style={{paddingTop:'0px',paddingBottom:'0px'}}>
                            <a style={{color:'#5D92F4'}} onClick={(e) => this.mobilenotification(e,value.substr(value.indexOf("#")+1, value.length-1))} >
                            <i className="zmdi zmdi-phone-msg"></i>
                            </a>
                        </IconButton>
                    </Tooltip>
                  }
                  {(value.startsWith('Active')) &&
                    <Tooltip title="Attendance" placement="top">
                      <IconButton aria-label="Attendance" style={{paddingTop:'0px',paddingBottom:'0px'}}>
                        <Link to={'attendance?id='+value.substr(value.indexOf("#")+1, value.length-1)} style={{color:'#5D92F4'}}>
                          <i className="zmdi zmdi-accounts"></i>
                        </Link>
                      </IconButton>
                    </Tooltip>
                  }
                  {(value.startsWith('Inactive')) &&
                    <Tooltip title="View Attendance" placement="top">
                      <IconButton aria-label="View Attendance" style={{paddingTop:'0px',paddingBottom:'0px'}}>
                        <Link to={'Viewattendance?id='+value.substr(value.indexOf("#")+1, value.length-1)} style={{color:'#5D92F4'}}>
                          <VisibilityIcon />
                        </Link>
                      </IconButton>
                    </Tooltip>
                  }
                </div>
            );
          },
        },
      },
    ],
  };

  updateData = (e,value) => {
    e.preventDefault();
    axios({
      url: baseURL+"/panel-update-class-status/"+value,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        this.getData();
      NotificationManager.success("Data Update Sucessfully");
      
      
      
    })
  };

  classwhatsApp = (e,value) => {
    e.preventDefault();
    
  axios({
      url: baseURL+"/panel-fetch-class-by-id/"+value,
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      
          const phoneNumber = "+91"
        const message = `Hello dear,
        \n
        *Reminder: Your next live class.*
        \n
        Details : 
        \n
        Date : ${res.data.class.class_date}
        \n
        Time : ${res.data.class.class_time} (please adjust for your time zone)
        \n
        Platform : Microsoft Teams
        \n
        Meeting Link : ${res.data.class.class_url}
        \n
        Please join on time. Let me know if you have any questions!
        \n
        Best Regards,\n
        *Sadaf Choudhary*\n
        Sr. Officer- Coordination\n
        Academy of Internal Audit\n
        C-826, Vipul Plaza, Sector-81`;
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');

      
    })
  };

  mobilenotification = (e,value) => {
    e.preventDefault();
    let data = {
      class_id: value,
    };
    axios({
      url: baseURL+"/panel-create-class-notification",
      method: "post",
      data,
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
      url: baseURL+"/panel-fetch-class-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.class;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
                Moment(response[i]["class_date"]).format('DD-MM-YYYY'),
                response[i]["class_time"]+" - "+response[i]["class_to_time"],
                response[i]["class_subject"],
                response[i]["class_status"],
                response[i]["class_status"]+"#"+response[i]["id"],
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
              title="Class List"
              match={this.props.match}
            />
            <div className="donorbtns">
                <Link to={'add'}>
                <Button
                  
                  className="mr-10 mb-10 btn-get-started"
                  color="warning"
                  style={{display:'flex',justifyContent:'center',alignItems:'center',color:'black'}}
                >
                  Add Class
                </Button>
              </Link>
            </div>
            <RctCollapsibleCard fullBlock>
              {this.state.classData.length > 0 && (
                <MUIDataTable
                  title={"Class List"}
                  data={this.state.classData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.classData.length <= 0 && (
                <MUIDataTable
                  title={"Class List"}
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
