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

const course = [
    {
      value: "CFE",
      label: "CFE",
    },
    {
      value: "CIA",
      label: "CIA",
    },
    {
        value: "CIAC",
        label: "CIAC",
    },
    {
        value: "CAMS",
        label: "CAMS",
    },
    {
        value: "Other",
        label: "Other",
    },
];

const DeliveryDownload = (props) => {
  let history = useHistory();
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  var midate = "04/04/2022"
  var todayback = yyyy + "-" + mm + "-" + dd;

  const firstdate = Moment().startOf('month').format('YYYY-MM-DD');

  const [downloadDelivery, setDeliveryDownload] = useState({
    delivery_date_from: firstdate,
    delivery_date_to: todayback,
    student_uid: "",
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
   setDeliveryDownload({
      ...downloadDelivery,
      [e.target.name]: e.target.value,
    });
  
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
        delivery_date_from: downloadDelivery.delivery_date_from,
        delivery_date_to: downloadDelivery.delivery_date_to,
        student_uid: downloadDelivery.student_uid,
    };
    var v = document.getElementById('dowRecp').checkValidity();
    var v = document.getElementById('dowRecp').reportValidity();
    e.preventDefault();
    console.log("Data : ",data);
if(v){
  setIsButtonDisabled(true)
    axios({
      url: baseURL+"/panel-download-delivery",
      method: "POST",
      data,
     headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
     const url = window.URL.createObjectURL(new Blob([res.data]));
     const link = document.createElement('a');
     link.href = url;
     link.setAttribute('download', 'delivery_list.csv'); 
     document.body.appendChild(link);
     link.click();
      NotificationManager.success("Delivery is Downloaded Successfully");
        setIsButtonDisabled(false)
      //history.push('listing');
    }).catch((err) =>{
     NotificationManager.error("Delivery is Not Downloaded");
     setIsButtonDisabled(false)
   });
  }
  };

  const onReportView = (e) => {
    e.preventDefault();
    localStorage.setItem('delivery_date_from',downloadDelivery.delivery_date_from);
    localStorage.setItem('student_uid',downloadDelivery.student_uid);
    localStorage.setItem('delivery_date_to',downloadDelivery.delivery_date_to);
    history.push("deliveryReport");
    
  }

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Download Delivery" match={props.match} />
      <RctCollapsibleCard>
        
        <form id="dowRecp" autoComplete="off">
          <h3 style={{color: 'red'}}>Leave blank if you want all records.</h3>
          <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
              <TextField
                  fullWidth
                  label="From Date"
                  required
                  type="date"
                  autoComplete="Name"
                  name="delivery_date_from"
                  InputLabelProps={{ shrink: true }}
                  value={downloadDelivery.delivery_date_from}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
              <TextField
                  fullWidth
                  label="To Date"
                  type="date"
                  required
                  autoComplete="Name"
                  name="delivery_date_to"
                  InputLabelProps={{ shrink: true }}
                  value={downloadDelivery.delivery_date_to}
                  onChange={(e) => onInputChange(e)}
                />
              
              </div>
            </div>
            
            <div className="col-sm-6 col-md-6 col-xl-4">
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

export default DeliveryDownload;
