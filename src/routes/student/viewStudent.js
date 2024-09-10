import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {baseURL} from '../../api';
import Moment from 'moment';
import IconButton from "@material-ui/core/IconButton";
import { FaWhatsapp } from "react-icons/fa";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {  NotificationManager,} from "react-notifications";

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

const labelslabelSpan = {
    fontWeight: '500',
    fontSize: '16px',
    paddingTop:'5px',
    paddingBottom: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
}

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
    width:'25%',
    border: '1px solid black',
}

const labelslabelSpannw = {
    display:'flex'
}

const View = (props) => {

    let history = useHistory();
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    localStorage.setItem('nid',id);
    
    const [student, setStudent] = useState({});
    const [studentCourse, setStudentCourse] = useState({});
    const [studentExam, setStudentExam] = useState({});
    const [studentRequest, setStudentRequest] = useState({});
    const [studentFollowUp, setStudentFollowUp] = useState({});
    const [studentFinal, setStudentFinal] = useState({});
    const [studentDelivery, setStudentDelivery] = useState({});

    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){

      window.location = "/signin";
      
      }else{

      }

      axios({
          url: baseURL+"/panel-fetch-student-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
          setStudent(res.data.studentData);
          setStudentCourse(res.data.studentCourse);
          setStudentFinal(res.data.studentCourse);
          setStudentExam(res.data.studentExam);
          setStudentRequest(res.data.studentRequest);
          setStudentFollowUp(res.data.studentFollowUp);
          setStudentDelivery(res.data.studentDelivery);
        });
      }, []);

      

    

    
    

    const whatsApp = (e) => {
        e.preventDefault();
        const fullName = student.name;
        const phoneNumber = student.mobile;
        const code = student.user_country_code
        const message = `Hello ${fullName}\n\n Congratulations and welcome to AIA.
        \n
        We are delighted to confirm your registration and look forward to being a part of your academic journey.
        \n
        *Next Steps:*
        \n
        *1.	Orientation Session:* Ms. Sadaf (M. No +91-93194-47197) with be in touch with you shortly and guide you everything about way ahead and answer any questions you might have.
        \n
        *2.	Study Materials:* We shall dispatch your study materials through courier. You want receive it asap subject to transit time. 
        \n
        *3.	Portal Access:* You will soon receive details over WhatsAp with your login credentials for our student portal, where you can access all study materials.
        \n
        If you have any questions or need further assistance, please do not hesitate to reach out to Ms. Sadaf or me.
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
            uid: student.user_uid,
        };
        axios({
            url: baseURL+"/panel-send-convert-followup-whatsapp",
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


    const sendresultEmail = (e, id) => {
        e.preventDefault();
        let data = {
            user_uid: student.user_uid,
            id: id,
        };
        axios({
          url: baseURL+"/panel-send-email-result",
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

    const resultwhatsApp = (e) => {
        e.preventDefault();
        const fullName = student.name;
        const phoneNumber = student.mobile;
        const code = student.user_country_code
        const message = `Dear ${fullName}\n\n Many congratulations on successfully passing the Exam and becoming officially certified!.
        \n
        This is a significant achievement, and we are incredibly proud of your hard work and dedication.
        \n
        Your commitment to excellence and your perseverance have truly paid off. We are honored to have been a part of your journey.
        \n
        Once again  *Congratulations on Your Success and stay in touch!*.
        \n
        Best Regards,\n
        *Puneet Garg*\n
        CEO & Faculty\n
        Academy of Internal Audit`;
        const whatsappLink = `https://wa.me/${code}${phoneNumber}?text=${encodeURIComponent(message)}`;
        

        let data = {
            uid: student.user_uid,
        };
        axios({
            url: baseURL+"/panel-send-email-result-whatsapp",
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

    const deliverywhatsApp = (e, value) => {
        e.preventDefault();
        axios({
            url: baseURL+"/panel-fetch-delivery-by-id/"+value,
            method: "get",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) =>{

          
        
            const fullName = student.name;
            const phoneNumber = student.mobile;
            const code = "+91";
        const message = `Hello dear,
        \n
        Your Books have been shipped!
        \n
        *Details:*
        \n
        *Books : * 1
        \n
        *Tracking No : * ${res.data.studentDelivery.delivery_tracking_number}
        \n
        *Courier : * ${res.data.studentDelivery.delivery_mode}
        \n
        * You can track your package here : * ${res.data.studentDelivery.delivery_tracking_number}
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
        const whatsappLink = `https://wa.me/${code}${res.data.student.mobile}?text=${encodeURIComponent(message)}`;
        
  
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
    })
    }

    const StudentStatus = (e) => {
        e.preventDefault();
        
        axios({
            url: baseURL+"/panel-update-student-new-status/"+student.id,
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Status Updated Sucessfully");
                setStudent(res.data.studentData);
          setStudentCourse(res.data.studentCourse);
          setStudentFinal(res.data.studentCourse);
          setStudentExam(res.data.studentExam);
          setStudentRequest(res.data.studentRequest);
          setStudentFollowUp(res.data.studentFollowUp);
          setStudentDelivery(res.data.studentDelivery);
                
            }else{
              NotificationManager.error("Status Not Updated Sucessfully");
            }
        })
    }

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="View Student" match={props.match} />
      <div className="donorbtns">
        {
            student.student_status != 'Offboarding' &&
        
            <Tooltip title="Student Status">
                <Button
                    onClick={(e) => StudentStatus(e)}
                    className="mr-10 mb-10 btn-get-started"
                    color="warning"
                    style={{display:'flex',justifyContent:'center',alignItems:'center',color:'black'}}
                >
                    {student.student_status == 'Pending' ?'Onboarding' : 'Offboarding'}
                </Button>
            </Tooltip>
            }
            <Link to={'edit?id='+id}>
                <Button
                  
                  className="mr-10 mb-10 btn-get-started"
                  color="warning"
                  style={{display:'flex',justifyContent:'center',alignItems:'center',color:'black'}}
                >
                  Edit Student
                </Button>
              </Link>
        {student.whatsapp_count == 0 &&
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

        }
              <Link to={'courseAdd?id='+student.user_uid}>
                <Button
                  
                  className="mr-10 mb-10 btn-get-started"
                  color="warning"
                  style={{display:'flex',justifyContent:'center',alignItems:'center',color:'black'}}
                >
                  Add Course
                </Button>
              </Link>
              <Link to={'deliveryAdd?id='+student.user_uid}>
                <Button
                  
                  className="mr-10 mb-10 btn-get-started"
                  color="warning"
                  style={{display:'flex',justifyContent:'center',alignItems:'center',color:'black'}}
                >
                  Add Delivery
                </Button>
              </Link>
              <Link to={'examAdd?id='+student.user_uid}>
                <Button
                  
                  className="mr-10 mb-10 btn-get-started"
                  color="warning"
                  style={{display:'flex',justifyContent:'center',alignItems:'center',color:'black'}}
                >
                  Add Exam
                </Button>
              </Link>
            </div>
      <RctCollapsibleCard>
        <form id="addIndivss" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>UID No </label><br/>
                <span style={span}>{student.user_uid}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Registration Date </label><br/>
                <span style={span}>{Moment(student.registration_date).format('DD-MM-YYYY')}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Full Name</label><br/>
                <span style={span}>{student.name}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Mobile</label><br/>
                <span style={span}>{student.mobile}</span>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Email</label><br/>
                <span style={span}>{student.email}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Mobile Device for Study</label><br/>
                <span style={span}>{student.mobile_device}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>PC Device for Study</label><br/>
                <span style={span}>{student.pc_device}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Admission Form Number</label><br/>
                <span style={span}>{student.admission_form_no}</span>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Qualification</label><br/>
                <span style={span}>{student.qualification}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-9">
              <div className="form-group">
                <label style={label}>Address</label><br/>
                <span style={span}>{student.address}</span>
              </div>
            </div>
            
            <div className="col-sm-12 col-md-12 col-xl-9">
              <div className="form-group">
                <label style={label}>Remarks</label><br/>
                <span style={span}>{student.remarks}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Onboarding / Offboarding Status</label><br/>
                <span style={span}>{student.student_status}</span>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-12 col-md-12 col-xl-12">
                <div className="receiptbuttons" style={{textAlign:'center'}}>
                    <Link to={"viewEnquiry?id="+student.user_uid}>
                        <Button className="mr-10 mb-10" color="warning" style={{color:'black'}}>
                            View Enquiry
                        </Button>
                    </Link>
                </div>
            </div>
          </div>
          </form>
          </RctCollapsibleCard>
          <RctCollapsibleCard>
          <form id="addIndiv" autoComplete="off">
            <div className="d-flex pl-30" style={{justifyContent:'flex-start'}}>
                <div className="address text-center">
                    <h1>COURSES</h1>
                </div>
            </div>
            {
                studentCourse.length > 0 && (
                    <div className="table-responsive" style={{padding:'20px'}}>
                        <div className="col-md-12 col-12">
                            <table>
                                <thead>
                                    <tr style={labelBorder}>
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Courses</span>    
                                        </th>    
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Validity</span>    
                                        </th>
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Expire Date</span>    
                                        </th>
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Status</span>    
                                        </th>
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Action</span>    
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentCourse.map((dataSumm, key)=>
                                        <tr style={labelBorder}>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                    {dataSumm.course_opted}
                                                </span>
                                            </td>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                    {dataSumm.course_validity}
                                                </span>
                                            </td>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                    {(dataSumm.course_expiry_date == null ? "" : Moment(dataSumm.course_expiry_date).format('DD-MM-YYYY'))}
                                                </span>
                                            </td>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                    {dataSumm.course_status}
                                                </span>
                                            </td>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                    <Tooltip title="Edit Course" placement="top">
                                                        <Link to={'courseEdit?id='+dataSumm.id}>
                                                            <EditIcon />
                                                        </Link>
                                                    </Tooltip>
                                                    <Tooltip title="View Course" placement="top">
                                                        <Link to={'courseView?id='+dataSumm.id}>
                                                            <VisibilityIcon />
                                                        </Link>
                                                    </Tooltip>
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
            <RctCollapsibleCard>
            <form id="addIndivdd" autoComplete="off">
            <div className="d-flex pl-30" style={{justifyContent:'flex-start'}}>
                <div className="address text-center">
                    <h1>DELIVERY</h1>
                </div>
            </div>
            {
                studentDelivery.length <=0 && (
                    <div className="table-responsive" style={{padding:'20px'}}>
                        <h1>No Data Available</h1>
                    </div>
                )
            }
            {
                studentDelivery.length > 0 && (
                    <div className="table-responsive" style={{padding:'20px'}}>
                        <div className="col-md-12 col-12">
                        <table>
                                <thead>
                                    <tr style={labelBorder}>
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Slip Shared</span>    
                                        </th>    
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Mode</span>    
                                        </th>
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Tracking Number</span>    
                                        </th>
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Shipping Date</span>    
                                        </th>
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Delivery Date</span>    
                                        </th>
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Status</span>    
                                        </th>
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Action</span>    
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentDelivery.map((dataSumm, key)=>
                                        <tr style={labelBorder}>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                    {dataSumm.delivery_slip_shared}
                                                </span>
                                            </td>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                    {dataSumm.delivery_mode}
                                                </span>
                                            </td>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                    {dataSumm.delivery_tracking_number}
                                                </span>
                                            </td>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                    {(dataSumm.delivery_shipping_date == null ? "" : Moment(dataSumm.delivery_shipping_date).format('DD-MM-YYYY'))}
                                                </span>
                                            </td>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                    {(dataSumm.delivery_date == null ? "" : Moment(dataSumm.delivery_date).format('DD-MM-YYYY'))}
                                                </span>
                                            </td>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                    {dataSumm.delivery_status}
                                                </span>
                                            </td>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpannw}>
                                                    <Tooltip title="Edit Delivery" placement="top">
                                                        <Link to={'deliveryEdit?id='+dataSumm.id}>
                                                            <EditIcon />
                                                        </Link>
                                                    </Tooltip>
                                                    <Tooltip title="View Delivery" placement="top">
                                                        <Link to={'deliveryView?id='+dataSumm.id}>
                                                            <VisibilityIcon />
                                                        </Link>
                                                    </Tooltip>
                                                    <Tooltip title="Send Whatsapp" placement="top">
                                                        <IconButton aria-label="Send Whatsapp">
                                                            <a style={{color:'#5D92F4'}} onClick={(e) => deliverywhatsApp(e,dataSumm.id)} >
                                                            <i className="zmdi zmdi-whatsapp"></i>
                                                            </a>
                                                        </IconButton>
                                                    </Tooltip>
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
            <RctCollapsibleCard>
            <form id="addIndivdd" autoComplete="off">
            <div className="d-flex pl-30" style={{justifyContent:'flex-start'}}>
                <div className="address text-center">
                    <h1>EXAM</h1>
                </div>
            </div>
            {
                studentExam.length <=0 && (
                    <div className="table-responsive" style={{padding:'20px'}}>
                        <h1>No Data Available</h1>
                    </div>
                )
            }
            {
                studentExam.length > 0 && (
                    <div className="table-responsive" style={{padding:'20px'}}>
                        <div className="col-md-12 col-12">
                            <table>
                                <thead>
                                    <tr style={labelBorder}>
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Subject</span>    
                                        </th>   
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Exam Date</span>    
                                        </th>  
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Status</span>    
                                        </th>
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Action</span>    
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentExam.map((dataSumm, key)=>
                                        <tr style={labelBorder}>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                    {dataSumm.exam_subject}
                                                </span>
                                            </td>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                    {(dataSumm.exam_date == null ? "" : Moment(dataSumm.exam_date).format('DD-MM-YYYY'))}
                                                </span>
                                            </td>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                    {dataSumm.exam_status}
                                                </span>
                                            </td>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                    <Tooltip title="Edit Exam" placement="top">
                                                        <Link to={'examEdit?id='+dataSumm.id}>
                                                            <EditIcon />
                                                        </Link>
                                                    </Tooltip>
                                                    <Tooltip title="View Exam" placement="top">
                                                        <Link to={'examView?id='+dataSumm.id}>
                                                            <VisibilityIcon />
                                                        </Link>
                                                    </Tooltip>
                                                    
                                                    
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
         
          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
      <RctCollapsibleCard>
            <form id="addIndivdd" autoComplete="off">
            <div className="d-flex pl-30" style={{justifyContent:'flex-start'}}>
                <div className="address text-center">
                    <h1>REQUEST</h1>
                </div>
            </div>
            {
                studentRequest.length <=0 && (
                    <div className="table-responsive" style={{padding:'20px'}}>
                        <h1>No Data Available</h1>
                    </div>
                )
            }
            {
                studentRequest.length > 0 && (
                    <div className="table-responsive" style={{padding:'20px'}}>
                        <div className="col-md-12 col-12">
                        <table>
                                <thead>
                                    <tr style={labelBorder}>
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Request Date</span>    
                                        </th>    
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Request For</span>    
                                        </th>
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Status</span>    
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentRequest.map((dataSumm, key)=>
                                        <tr style={labelBorder}>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                    {(dataSumm.course_request_date == null ? "" : Moment(dataSumm.course_request_date).format('DD-MM-YYYY'))}
                                                </span>
                                            </td>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                    {dataSumm.course_request}
                                                </span>
                                            </td>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                    {dataSumm.course_request_status}
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
            <RctCollapsibleCard>
            <form id="addIndivdd" autoComplete="off">
            <div className="d-flex pl-30" style={{justifyContent:'flex-start'}}>
                <div className="address text-center">
                    <h1>FOLLOW UP</h1>
                </div>
            </div>
            {
                studentFollowUp.length <=0 && (
                    <div className="table-responsive" style={{padding:'20px'}}>
                        <h1>No Data Available</h1>
                    </div>
                )
            }
            {
                studentFollowUp.length > 0 && (
                    <div className="table-responsive" style={{padding:'20px'}}>
                        <div className="col-md-12 col-12">
                        <table>
                                <thead>
                                    <tr style={labelBorder}>
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Date</span>    
                                        </th> 
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Time</span>    
                                        </th>    
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Type</span>    
                                        </th>
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Description</span>    
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentFollowUp.map((dataSumm, key)=>
                                        <tr style={labelBorder}>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                    {(dataSumm.follow_up_date == null ? "" : Moment(dataSumm.follow_up_date).format('DD-MM-YYYY'))}
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
                                            <td style={labelTableSub}>
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
      <RctCollapsibleCard>
            <form id="addIndivdd" autoComplete="off">
            <div className="d-flex pl-30" style={{justifyContent:'flex-start'}}>
                <div className="address text-center">
                    <h1>RESULT</h1>
                </div>
            </div>
            {
                studentFinal.length <=0 && (
                    <div className="table-responsive" style={{padding:'20px'}}>
                        <h1>No Data Available</h1>
                    </div>
                )
            }
            {
                studentFinal.length > 0 && (
                    <div className="table-responsive" style={{padding:'20px'}}>
                        <div className="col-md-12 col-12">
                            <table>
                                <thead>
                                    <tr style={labelBorder}>
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Course</span>    
                                        </th>   
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Status</span>    
                                        </th>
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Action</span>    
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentFinal.map((dataSumm, key)=>
                                        <tr style={labelBorder}>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                    {dataSumm.course_opted}
                                                </span>
                                            </td>
                                            
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                    {dataSumm.exam_status}
                                                </span>
                                            </td>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                    <Tooltip title="Edit Result" placement="top">
                                                        <Link to={'resultEdit?id='+dataSumm.id}>
                                                            <EditIcon />
                                                        </Link>
                                                    </Tooltip>
                                                    <Tooltip title="View Exam" placement="top">
                                                        <Link to={'resultView?id='+dataSumm.id}>
                                                            <VisibilityIcon />
                                                        </Link>
                                                    </Tooltip>
                                                    <Tooltip title="Send Email" placement="top">
                                                        <IconButton aria-label="Send Email" style={{padding:'2px',}}>
                                                            <a style={{color:'#5D92F4'}} onClick={(e) => sendresultEmail(e,dataSumm.id)} >
                                                            <i className="zmdi zmdi-email"></i>
                                                            </a>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Send Whatsapp" placement="top">
                                                        <IconButton aria-label="Send Whatsapp" style={{padding:'2px',}}>
                                                            <a style={{color:'#5D92F4'}} onClick={(e) => resultwhatsApp(e)} >
                                                            <i className="zmdi zmdi-whatsapp"></i>
                                                            </a>
                                                        </IconButton>
                                                    </Tooltip>
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
         <div className="row mt-4">
            <div className="col-sm-12 col-md-12 col-xl-12">
                <div className="receiptbuttons" style={{textAlign:'center'}}>
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
