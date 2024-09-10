import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {baseURL} from '../../api';
import Moment from 'moment';
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import { FaWhatsapp } from "react-icons/fa";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import {  NotificationManager,} from "react-notifications";

const label = {
  color:'blueviolet',
  fontSize:'13px',
  marginBottom:'0px'
}

const span = {
  color:'black',
  fontSize:'16px'
}

const View = (props) => {

    let history = useHistory();
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    const [classes, setClass] = useState({});
    const [attendance, setAttendance] = useState([]);
    const [notattend, setNotAttend] = useState([]);
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){

      window.location = "/signin";
      
      }else{

      }

      axios({
          url: baseURL+"/panel-fetch-class-view-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
          setClass(res.data.class);
          setAttendance(res.data.attendance);
          setNotAttend(res.data.notattend);
        });
      }, []);

    const   sendclassEmail = (e) => {
        e.preventDefault();
        let data = {
          class_id: id,
        };
        axios({
          url: baseURL+"/panel-send-email-template-not-attend-class",
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

      const columns = ["UID No", "Full Name", "Mobile", "Email",
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
                            <IconButton aria-label="Edit">
                                <Link  to={"Editattendance?id=" + value}>
                                    <EditIcon />
                                </Link>
                            </IconButton>
                        </Tooltip>
                    </div>
                );
              },
            },
          },
      ];

      const whatsApp1 = (e, value) => {
        e.preventDefault();
        
        const phoneNumber = value.split('#');
        
       
        const message = `Hello dear .
        \n
        We Missed You in Sunday’s online class, and we wanted to check in with you.
        \n
        Your participation is crucial to your success in the program, and we want to ensure you stay on track with your studies.
        \n
        Regular attendance and participation are key to getting the most out of your learning experience. If you are facing any challenges or have any concerns, please let us know so we can support you.
        \n
        We look forward to seeing you in the next class. Keep up the great work!
        \n
        Best Regards,\n
        *Sadaf Choudhary*\n
        Sr. Officer- Coordination\n
        Academy of Internal Audit\n
        C-826, Vipul Plaza, Sector-81\n
        Faridabad, Delhi-NCR, India\n
        www.aia.in.net\n
        Office No: 0129-417-4177\n
        Toll free: 1800-1600-2555`;
        const whatsappLink = `https://wa.me/${phoneNumber[0]}?text=${encodeURIComponent(message)}`;
        
        let data = {
            uid: value.substr(value.indexOf("#")+1, value.length-1),
      };
      axios({
          url: baseURL+"/panel-send-not-attend-whatsapp",
          method: "POST",
          data,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          if(res.data.code == '200'){
            window.open(whatsappLink, '_blank');
             
          }else{
            NotificationManager.error("Whats App Not Sent Sucessfully");
          }
      })
      }

      const columns1 = ["UID No", "Full Name", "Mobile", "Email",
        {
            name: "Actions",
            options: {
              filter: false,
              print:false,
              download:false,
              customBodyRender: (value) => {
                return (
                    <div style={{ minWidth: "150px" , fontWeight: 800}}>
                        <Tooltip title="Missed Class" placement="top">
                            <IconButton aria-label="Missed Class">
                                <a style={{color:'#5D92F4'}} onClick={(e) => whatsApp1(e,value)} >
                                    <i className="zmdi zmdi-whatsapp"></i>
                                </a>
                            </IconButton>
                        </Tooltip>
                    </div>
                );
              },
            },
          },
      ];

      const options = {
        filterType: "dropDown",
        selectableRows: false,
      };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="View Class" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
              <label style={label}>Course </label><br/>
              <span style={span}>{classes.class_subject}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
              <label style={label}>Date </label><br/>
              <span style={span}>{Moment(classes.class_date).format('DD-MM-YYYY')}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
              <label style={label}>From Time </label><br/>
              <span style={span}>{classes.class_time}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
              <label style={label}>To Time </label><br/>
              <span style={span}>{classes.class_to_time}</span>
              </div>
            </div>
          </div>
          <MUIDataTable 
            title={"Attendance List"}
            data={attendance.map(item => {
                 
                return [
                  item.user_uid,
                  item.name,
                  item.mobile,
                  item.email,
                  item.id
                ]
              })}
              columns={columns} 
              options={options} 
            />
            <MUIDataTable 
            title={"Not Attend List"}
            data={notattend.map(item => {
                 
                return [
                  item.user_uid,
                  item.name,
                  item.mobile,
                  item.email,
                  item.user_country_code+item.mobile+"#"+item.user_uid
                ]
              })}
              columns={columns1} 
              options={options} 
            />
         <div className="row mt-4">
            <div className="col-sm-12 col-md-12 col-xl-12">
                <div className="receiptbuttons" style={{textAlign:'center'}}>
                <Button
                  onClick={(e) => sendclassEmail(e)}
                  className="mr-10 mb-10 btn-get-started"
                  color="warning"
                  style={{color:'black'}}
                >
                  <i className="ti-email" style={{fontSize:'25px'}}/>&nbsp;&nbsp; &nbsp;Send Email to Not Attend
                </Button>
                    <Link to="listing">
                        <Button className="mr-10 mb-10" color="success">
                            Back
                        </Button>
                    </Link>
                </div>
            </div>
          </div>
          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default View;
