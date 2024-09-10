import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {baseURL} from '../../api';
import Moment from 'moment';
import { FaWhatsapp } from "react-icons/fa";
import Tooltip from "@material-ui/core/Tooltip";

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
  
    const [student, setStudentDelivery] = useState({});
    const [studentnew, setStudent] = useState({});
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){

      window.location = "/signin";
      
      }else{

      }

      axios({
          url: baseURL+"/panel-fetch-delivery-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
          setStudentDelivery(res.data.studentDelivery);
          setStudent(res.data.student);
        });
      }, []);

      const onBack = (e) =>{
        e.preventDefault();
        history.goBack();
    }

    const whatsApp = (e) => {
      e.preventDefault();
      const fullName = studentnew.name;
      const phoneNumber = studentnew.mobile;
      const code = studentnew.user_country_code
      const message = `Hello dear,
      \n
      Your Books have been shipped!
      \n
      *Details:*
      \n
      *Books : * 1
      \n
      *Tracking No : * ${student.delivery_tracking_number}
      \n
      *Courier : * ${student.delivery_mode}
      \n
      * You can track your package here : * ${student.delivery_tracking_number}
      \n
      Best Regards,\n
      *Sadaf Choudhary*\n
      Sr. Officer-  Coordination\n
      Academy of Internal Audit\n
      C-826, Vipul Plaza, Sector-81\n
      Faridabad, Delhi-NCR, India\n
      www.aia.in.net\n
      Office No: 0129-417-4177\n
      Toll free: 1800-1600-2555`;
      const whatsappLink = `https://wa.me/${code}${phoneNumber}?text=${encodeURIComponent(message)}`;
      

      let data = {
          uid: student.user_uid,
      };
      axios({
          url: baseURL+"/panel-send-delivery-followup-whatsapp",
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

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="View Delivery" match={props.match} />
      <div className="donorbtns">
          <Tooltip title="On Conversion to Registered">
              <Button
                  onClick={(e) => whatsApp(e)}
                  className="mr-10 mb-10 btn-get-started"
                  color="warning"
                  style={{display:'flex',justifyContent:'center',alignItems:'center',color:'black'}}
              >
                  <FaWhatsapp style={{fontSize:'25px'}}/>&nbsp;&nbsp; &nbsp;WhatsApp
              </Button>
          </Tooltip>
      </div>
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>UID</label><br/>
                    <span style={span}>{student.user_uid}</span>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>Slip Shared </label><br/>
                    <span style={span}>{student.delivery_slip_shared}</span>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>Mode </label><br/>
                    <span style={span}>{student.delivery_mode}</span>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>Tracking Number</label><br/>
                    <span style={span}>{student.delivery_tracking_number}</span>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>Shipping Date</label><br/>
                    <span style={span}>{student.delivery_shipping_date == null ? '' : Moment(student.delivery_shipping_date).format('DD-MM-YYYY')}</span>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>Status</label><br/>
                    <span style={span}>{student.delivery_status}</span>
                </div>
            </div>
            
        </div>
        <div className="row mt-4">
            <div className="col-sm-12 col-md-12 col-xl-12">
                <div className="receiptbuttons" style={{textAlign:'center'}}>
                  <Button  onClick={(e) =>onBack(e)} className="mr-10 mb-10" color="success">
                      Back
                  </Button>
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
