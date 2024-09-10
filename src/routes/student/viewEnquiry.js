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

const labelBorder = {
  paddingTop:'5px',
  border:'1px solid #4d4b4b',
}

const labelTableSub = {
  width:'15%',
  border: '1px solid black',
}

const labelTableSub1 = {
  width:'40%',
  border: '1px solid black',
}

const labelslabelSpan = {
  fontWeight: '500',
  fontSize: '16px',
  paddingTop:'5px',
  paddingBottom: '5px',
  paddingLeft: '10px',
  paddingRight: '10px',
}

const labelslabel = {
    
  fontSize: '16px',
  fontWeight: '400',
  paddingTop:'5px',
  paddingBottom: '5px',
  paddingLeft: '10px',
  paddingRight: '10px',
  height: '30px !important',
  margin: '0px !important',
  color: "rgb(0, 0, 0)",
};

const View = (props) => {

    let history = useHistory();
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    const [enquiry, setEnquiry] = useState({});
    const [followup, setFollowUp] = useState([]);
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){

      window.location = "/signin";
      
      }else{

      }

      axios({
          url: baseURL+"/panel-fetch-student-enquiry-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
          setEnquiry(res.data.enquiry);
          setFollowUp(res.data.followup);
        });
      }, []);

      const whatsApp1 = (e) => {
        e.preventDefault();
        const fullName = enquiry.enquiry_full_name;
        const phoneNumber = enquiry.enquiry_mobile;
        const code = enquiry.enquiry_country_code
        const message = `Hi ${fullName}\n\n Thank you for connecting with AIA. We are thrilled to help you achieve your academic and career goals.
        \n
        At AIA, we offer a range of programs (CFE, CIA & CAMS). Our experienced faculty, comprehensive study materials, and personalized support system ensure that every student receives the best guidance and support.
        \n
        We look forward to welcoming you to the AIA family and helping you reach your full potential.
        \n
        Best Regards,\n
        *Ruchi Bhat*\n
        Manager- Coordination\n
        Academy of Internal Audit\n
        C-826, Vipul Plaza, Sector-81\n
        Faridabad, Delhi-NCR, India\n
        www.aia.in.net\n
        Office No: 0129-417-4177\n
        Toll free: 1800-1600-2555`;
        const whatsappLink = `https://wa.me/${code}${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        let data = {
          eqid: enquiry.id,
      };
      axios({
          url: baseURL+"/panel-send-enquiry-whatsapp",
          method: "POST",
          data,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          if(res.data.code == '200'){
              window.open(whatsappLink, '_blank');
              history.push("listing");
          }else{
            NotificationManager.error("Whats App Not Sent Sucessfully");
          }
      })
      }

      const onBack = (e) =>{
        e.preventDefault();
        history.push(`/app/student/view?id=${localStorage.getItem('nid')}`);
    }

      const whatsApp2 = (e) => {
        e.preventDefault();
    
        const phoneNumber = enquiry.enquiry_mobile;
        const code = enquiry.enquiry_country_code
        const message = `Hello dear,
        \n
        Hope you are doing well!
        \n
        We tried reaching out to you but unfortunately couldn't connect. We are eager to discuss how our programs can help you achieve your academic and career goals.
        \n
        Thank you for considering AIA. We look forward to connecting with you soon and helping you reach your full potential.
        \n
        Best Regards,\n
        *Ruchi Bhat*\n
        Manager- Coordination\n
        Academy of Internal Audit\n
        C-826, Vipul Plaza, Sector-81\n
        Faridabad, Delhi-NCR, India\n
        www.aia.in.net\n
        Office No: 0129-417-4177\n
        Toll free: 1800-1600-2555`;
        const whatsappLink = `https://wa.me/${code}${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        let data = {
          eqid: enquiry.id,
      };
      axios({
          url: baseURL+"/panel-send-enquiry-followup-whatsapp",
          method: "POST",
          data,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          if(res.data.code == '200'){
              window.open(whatsappLink, '_blank');
              history.push("listing");
          }else{
            NotificationManager.error("Whats App Not Sent Sucessfully");
          }
      })
      }

      const sendEmail = (e) => {
        e.preventDefault();
        let data = {
          eqid: enquiry.id,
          enquiry_email : enquiry.enquiry_email
        };
        axios({
          url: baseURL+"/panel-send-enquiry-followup-email",
          method: "POST",
          data,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          if(res.data.code == '200'){
              NotificationManager.success("Email Sent Sucessfully");
              history.push("listing");
          }else{
            NotificationManager.error("Email Not Sent Sucessfully");
          }
          
          
        })
      }

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="View Enquiry" match={props.match} />
      {((enquiry.enquiry_status == 'New Enquiry')) &&(
            <div className="donorbtns">
                <Tooltip title="On creation of Enquiry">
                <Button
                  onClick={(e) => whatsApp1(e)}
                  className="mr-10 mb-10 btn-get-started"
                  color="warning"
                  style={{display:'flex',justifyContent:'center',alignItems:'center',color:'black'}}
                >
                  <FaWhatsapp style={{fontSize:'25px'}}/>&nbsp;&nbsp; &nbsp;WhatsApp
                </Button>
                </Tooltip>
            </div>
            )}
          {((enquiry.enquiry_status == 'In Process') || (enquiry.enquiry_status == 'Postponed')) &&(
            <div className="donorbtns">
              <Tooltip title="On Enquiry Follow Up">
                <Button
                  onClick={(e) => sendEmail(e)}
                  className="mr-10 mb-10 btn-get-started"
                  color="warning"
                  style={{display:'flex',justifyContent:'center',alignItems:'center',color:'black'}}
                >
                  <i className="ti-email" style={{fontSize:'25px'}}/>&nbsp;&nbsp; &nbsp;Send Email
                </Button>
                </Tooltip>
                <Tooltip title="On Enquiry Follow Up">
                <Button
                  onClick={(e) => whatsApp2(e)}
                  className="mr-10 mb-10 btn-get-started"
                  color="warning"
                  style={{display:'flex',justifyContent:'center',alignItems:'center',color:'black'}}
                >
                  <FaWhatsapp style={{fontSize:'25px'}}/>&nbsp;&nbsp; &nbsp;WhatsApp
                </Button>
                </Tooltip>
            </div>
            )}
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Enquiry No </label><br/>
                <span style={span}>{enquiry.enquiry_no}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Enquiry Date </label><br/>
                <span style={span}>{Moment(enquiry.enquiry_date).format('DD-MM-YYYY')}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Course</label><br/>
                <span style={span}>{enquiry.enquiry_course}</span>
              </div>
            </div>
            {enquiry.enquiry_course == 'Other' && 
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Course Other</label><br/>
                <span style={span}>{enquiry.enquiry_course_other}</span>
              </div>
            </div>
            }
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Source</label><br/>
                <span style={span}>{enquiry.enquiry_source}</span>
              </div>
            </div>
            
            {enquiry.enquiry_source == 'Other' && 
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Source Other</label><br/>
                <span style={span}>{enquiry.enquiry_source_other}</span>
              </div>
            </div>
            }
          <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Full Name</label><br/>
                <span style={span}>{enquiry.enquiry_title}{" "}{enquiry.enquiry_full_name}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Mobile</label><br/>
                <span style={span}>{enquiry.enquiry_country_code}{enquiry.enquiry_mobile}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Email</label><br/>
                <span style={span}>{enquiry.enquiry_email}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Category</label><br/>
                <span style={span}>{enquiry.enquiry_category}</span>
              </div>
            </div>
          
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>City/Country</label><br/>
                <span style={span}>{enquiry.enquiry_city} - {enquiry.enquiry_country}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Next Followup Date </label><br/>
                <span style={span}>{Moment(enquiry.enquiry_follow_date).format('DD-MM-YYYY')}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Status </label><br/>
                <span style={span}>{enquiry.enquiry_status}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-6">
              <div className="form-group">
                <label style={label}>Remarks</label><br/>
                <span style={span}>{enquiry.enquiry_remarks}</span>
              </div>
            </div>
            
            
          </div>
          
         <div className="row mt-4">
            <div className="col-sm-12 col-md-12 col-xl-12">
                <div className="receiptbuttons" style={{textAlign:'center'}}>
                <Button  onClick={(e) =>onBack(e)} className="mr-10 mb-10" color="warning" style={{color:'black'}}>
                      Back
                  </Button>
                </div>
            </div>
          </div>
          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
      <RctCollapsibleCard>
          <form id="addIndivss" autoComplete="off">
            <div className="d-flex pl-30" style={{justifyContent:'flex-start'}}>
                <div className="address text-center">
                    <h1>FOLLOW UP</h1>
                </div>
            </div>
            {
                followup.length > 0 && (
                    <div className="table-responsive" style={{padding:'20px'}}>
                        <div className="col-md-12 col-12">
                            <table>
                                <thead>
                                    <tr style={labelBorder}>
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Followup Date</span>    
                                        </th>  
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Next Followup Date</span>    
                                        </th>    
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Time</span>    
                                        </th>
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Type</span>    
                                        </th>
                                        <th style={labelTableSub1}>
                                            <span style={labelslabel}>Description</span>    
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {followup.map((dataSumm, key)=>
                                        <tr style={labelBorder}>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                {(dataSumm.follow_up_date == null ? "" : Moment(dataSumm.follow_up_date).format('DD-MM-YYYY'))}
                                                </span>
                                            </td>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                {(dataSumm.follow_up_next_date == null ? "" : Moment(dataSumm.follow_up_next_date).format('DD-MM-YYYY'))}
                                                </span>
                                            </td>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                    {dataSumm.follow_up_time}
                                                </span>
                                            </td>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                  {dataSumm.follow_up_type}
                                                </span>
                                            </td>
                                            <td style={labelTableSub1}>
                                                <span style={labelslabelSpan}>
                                                    {dataSumm.follow_up_sub_type}
                                                </span>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
            </form>
            </RctCollapsibleCard>
    </div>
  );
};

export default View;
