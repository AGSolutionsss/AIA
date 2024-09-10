import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import Moment from 'moment';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import { NotificationContainer, NotificationManager,} from "react-notifications";
import {baseURL} from '../../../api';

const AttendanceDownload = (props) => {
  let history = useHistory();
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  var midate = "04/04/2022"
  var todayback = yyyy + "-" + mm + "-" + dd;

  const firstdate = Moment().startOf('month').format('YYYY-MM-DD');

  const [downloadDelivery, setAttendanceDownload] = useState({
    class_date_from: firstdate,
    class_date_to: todayback,
    student_uid: "",
    student_course: "",
  });

  const [student, setStudent] = useState([]);
      useEffect(() => {
          axios({
              url: baseURL+"/panel-fetch-student",
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("login")}`,
              },
            }).then((res) => {
              
                setStudent(res.data.student);
              
            });
          }, []);

  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

   useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){
  
        window.location = "/signin";
        
      }else{
  
      }
      
    });
    
  const onInputChange = (e) => {
   setAttendanceDownload({
      ...downloadDelivery,
      [e.target.name]: e.target.value,
    });
  
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
        class_date_from: downloadDelivery.class_date_from,
        class_date_to: downloadDelivery.class_date_to,
        student_uid: downloadDelivery.student_uid,
        student_course: downloadDelivery.student_course,
    };
    var v = document.getElementById('dowRecp').checkValidity();
    var v = document.getElementById('dowRecp').reportValidity();
    e.preventDefault();
    console.log("Data : ",data);
if(v){
  setIsButtonDisabled(true)
    axios({
      url: baseURL+"/panel-download-attendance",
      method: "POST",
      data,
     headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
     const url = window.URL.createObjectURL(new Blob([res.data]));
     const link = document.createElement('a');
     link.href = url;
     link.setAttribute('download', 'attendance_list.csv'); 
     document.body.appendChild(link);
     link.click();
      NotificationManager.success("Report is Downloaded Successfully");
        setIsButtonDisabled(false)
      //history.push('listing');
    }).catch((err) =>{
     NotificationManager.error("Report is Not Downloaded");
     setIsButtonDisabled(false)
   });
  }
  };

  const onReportView = (e) => {
    e.preventDefault();
    localStorage.setItem('class_date_from',downloadDelivery.class_date_from);
    localStorage.setItem('class_date_to',downloadDelivery.class_date_to);
    localStorage.setItem('student_uid',downloadDelivery.student_uid);
    localStorage.setItem('student_course',downloadDelivery.student_course);
    history.push("attendanceReport");
    
  }

  const [course, setCourse] = useState([]);
        useEffect(() => {
            axios({
                url: baseURL+"/panel-fetch-course",
                method: "GET",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("login")}`,
                },
              }).then((res) => {
                
                setCourse(res.data.course);
                
              });
            }, []);

  const onSubmit1 = (e) => {
    e.preventDefault();
    let data = {
        class_date_from: downloadDelivery.class_date_from,
        class_date_to: downloadDelivery.class_date_to,
        student_uid: downloadDelivery.student_uid,
        student_course: downloadDelivery.student_course,
    };
    var v = document.getElementById('dowRecp').checkValidity();
    var v = document.getElementById('dowRecp').reportValidity();
    e.preventDefault();
    console.log("Data : ",data);
if(v){
  setIsButtonDisabled(true)
    axios({
      url: baseURL+"/panel-download-notattend",
      method: "POST",
      data,
     headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
     const url = window.URL.createObjectURL(new Blob([res.data]));
     const link = document.createElement('a');
     link.href = url;
     link.setAttribute('download', 'notattend_list.csv'); 
     document.body.appendChild(link);
     link.click();
      NotificationManager.success("Report is Downloaded Successfully");
        setIsButtonDisabled(false)
      //history.push('listing');
    }).catch((err) =>{
     NotificationManager.error("Report is Not Downloaded");
     setIsButtonDisabled(false)
   });
  }
  };

  const onReportView1 = (e) => {
    e.preventDefault();
    localStorage.setItem('class_date_from',downloadDelivery.class_date_from);
    localStorage.setItem('class_date_to',downloadDelivery.class_date_to);
    localStorage.setItem('student_uid',downloadDelivery.student_uid);
    localStorage.setItem('student_course',downloadDelivery.student_course);
    history.push("notattendReport");
    
  }

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Download Attendance" match={props.match} />
      <RctCollapsibleCard>
        
        <form id="dowRecp" autoComplete="off">
          <h3 style={{color: 'red'}}>Leave blank if you want all records.</h3>
          <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
              <TextField
                  fullWidth
                  label="From Date"
                  required
                  type="date"
                  autoComplete="Name"
                  name="class_date_from"
                  InputLabelProps={{ shrink: true }}
                  value={downloadDelivery.class_date_from}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
              <TextField
                  fullWidth
                  label="To Date"
                  type="date"
                  required
                  autoComplete="Name"
                  name="class_date_to"
                  InputLabelProps={{ shrink: true }}
                  value={downloadDelivery.class_date_to}
                  onChange={(e) => onInputChange(e)}
                />
              
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
              <TextField
                  fullWidth
                  label="Course"
                 autoComplete="Name"
                 select
                 SelectProps={{
                    MenuProps: {},
                  }}
                  name="student_course"
                  value={downloadDelivery.student_course}
                  onChange={(e) => onInputChange(e)}
                  >
                  {course.map((option) => (
                    <MenuItem key={option.value} value={option.courses_name}>
                      {option.courses_name}
                    </MenuItem>
                  ))}
                </TextField>
              
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
              <TextField
                  fullWidth
                  label="Student"
                 autoComplete="Name"
                 select
                 SelectProps={{
                    MenuProps: {},
                  }}
                  name="student_uid"
                  value={downloadDelivery.student_uid}
                  onChange={(e) => onInputChange(e)}
                  >
                  {student.map((option) => (
                    <MenuItem key={option.user_uid} value={option.user_uid}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
            <Button
              className="mr-10 mb-10"
              color="primary"
              type="submit"
              style={{ width: "100%" }}
              onClick={(e) => onSubmit(e)}
              disabled={isButtonDisabled}
            >
              Download Attend
            </Button>
          </div>
          <div className="col-sm-6 col-md-6 col-xl-3">
            <Button
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onReportView(e)}
              disabled={isButtonDisabled}
            >
              View Attend
            </Button>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
            <Button
              className="mr-10 mb-10"
              color="primary"
              type="submit"
              style={{ width: "100%" }}
              onClick={(e) => onSubmit1(e)}
              disabled={isButtonDisabled}
            >
              Download Not Attend
            </Button>
          </div>
          <div className="col-sm-6 col-md-6 col-xl-3">
            <Button
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onReportView1(e)}
              disabled={isButtonDisabled}
            >
              View Not Attend
            </Button>
            </div>
          </div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default AttendanceDownload;
