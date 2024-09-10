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

const status = [
    {
      value: "New Enquiry",
      label: "New Enquiry",
    },
    {
      value: "Postponed",
      label: "Postponed",
    },
    {
      value: "In Process",
      label: "In Process",
    },
    {
      value: "Not Interested Closed",
      label: "Not Interested Closed",
    },
  ];

const EnquiryDownload = (props) => {
  let history = useHistory();
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  var midate = "04/04/2022"
  var todayback = yyyy + "-" + mm + "-" + dd;

  const firstdate = Moment().startOf('month').format('YYYY-MM-DD');

  const [downloadEnquiry, setEnquiryDownload] = useState({
    enquiry_date_from: firstdate,
    enquiry_date_to: todayback,
    enquiry_status: "",
    enquiry_course: "",
  });

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
   setEnquiryDownload({
      ...downloadEnquiry,
      [e.target.name]: e.target.value,
    });
  
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
        enquiry_date_from: downloadEnquiry.enquiry_date_from,
        enquiry_date_to: downloadEnquiry.enquiry_date_to,
        enquiry_status: downloadEnquiry.enquiry_status,
        enquiry_course: downloadEnquiry.enquiry_course,
      
    };
    var v = document.getElementById('dowRecp').checkValidity();
    var v = document.getElementById('dowRecp').reportValidity();
    e.preventDefault();
    console.log("Data : ",data);
if(v){
  setIsButtonDisabled(true)
    axios({
      url: baseURL+"/panel-download-enquiry",
      method: "POST",
      data,
     headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
     const url = window.URL.createObjectURL(new Blob([res.data]));
     const link = document.createElement('a');
     link.href = url;
     link.setAttribute('download', 'enquiry_list.csv'); 
     document.body.appendChild(link);
     link.click();
      NotificationManager.success("Enquiry is Downloaded Successfully");
        setIsButtonDisabled(false)
      //history.push('listing');
    }).catch((err) =>{
     NotificationManager.error("Enquiry is Not Downloaded");
     setIsButtonDisabled(false)
   });
  }
  };

  const onReportView = (e) => {
    e.preventDefault();
    localStorage.setItem('enquiry_date_from',downloadEnquiry.enquiry_date_from);
    localStorage.setItem('enquiry_date_to',downloadEnquiry.enquiry_date_to);
    localStorage.setItem('enquiry_status',downloadEnquiry.enquiry_status);
    localStorage.setItem('enquiry_course',downloadEnquiry.enquiry_course);
    history.push("enquiryReport");
    
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

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Download Enquiry" match={props.match} />
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
                  name="enquiry_date_from"
                  InputLabelProps={{ shrink: true }}
                  value={downloadEnquiry.enquiry_date_from}
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
                  name="enquiry_date_to"
                  InputLabelProps={{ shrink: true }}
                  value={downloadEnquiry.enquiry_date_to}
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
                  name="enquiry_course"
                  value={downloadEnquiry.enquiry_course}
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
                  label="Status"
                 autoComplete="Name"
                 select
                 SelectProps={{
                    MenuProps: {},
                  }}
                  name="enquiry_status"
                  value={downloadEnquiry.enquiry_status}
                  onChange={(e) => onInputChange(e)}
                  >
                  {status.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
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
              Download
            </Button>
          </div>
          <div className="col-sm-6 col-md-6 col-xl-3">
            <Button
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onReportView(e)}
              disabled={isButtonDisabled}
            >
              View
            </Button>
            </div>
          </div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default EnquiryDownload;
