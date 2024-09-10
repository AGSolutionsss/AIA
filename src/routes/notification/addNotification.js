import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {  NotificationManager,} from "react-notifications";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {baseURL} from '../../api';
import MenuItem from "@material-ui/core/MenuItem";
import Moment from 'moment';


const label = {
  color:'blueviolet',
  fontSize:'13px',
  marginBottom:'0px'
}

const span = {
  color:'black',
  fontSize:'16px'
}

const Add = (props) => {

    let history = useHistory();
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
    const [enquiry, setEnquiry] = useState({
        
        notification_heading: "",
       
        notification_description: "",
        
        notification_course: "",
        
    });
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){

      window.location = "/signin";
      
      }else{

      }

      
      }, []);

      

        const onInputChange = (e) => {
            
            setEnquiry({
                ...enquiry,
                [e.target.name]: e.target.value,
            });  
            
        };

   

    const onSubmit = (e) => {
        let data = {
           
            notification_heading: enquiry.notification_heading,
            
            notification_description: enquiry.notification_description,
            
            notification_course: enquiry.notification_course,
            
        };
        
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true);
        axios({
            url: baseURL+"/panel-create-notification",
            method: "POST",
            data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Notification created Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
                setIsButtonDisabled(false);
            }
            
        });
        }
    };

    const [course, setCourse] = useState([]);
        useEffect(() => {
            axios({
                url: baseURL+"/panel-fetch-notification-course",
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
      <PageTitleBar title="Add Notification" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
           
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                    fullWidth
                    required
                    label="Course"
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    name="notification_course"
                    value={enquiry.notification_course}
                    onChange={(e) => onInputChange(e)}
                    >
                    {course.map((coursedata, key) => (
                        <MenuItem key={key} value={coursedata.courses_name}>
                            {coursedata.courses_name}
                        </MenuItem>
                    ))}
                </TextField>
                </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-9">
                <div className="form-group">
                    <TextField
                    fullWidth
                    required
                    label="Heading"
                    autoComplete="Name"
                    name="notification_heading"
                    value={enquiry.notification_heading}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div>
            
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-12">
                <div className="form-group">
                    <TextField
                    multiline
                    fullWidth
                    required
                    label="Description"
                    autoComplete="Name"
                    name="notification_description"
                    
                    value={enquiry.notification_description}
                    onChange={(e) => onInputChange(e)}
                   />
                    
                </div>
            </div> 
             
        </div>
          
         <div className="row mt-4">
            <div className="col-sm-12 col-md-12 col-xl-12">
                <div className="receiptbuttons" style={{textAlign:'center'}}>
                    <Button
                        type="submit"
                        className="mr-10 mb-10"
                        color="primary"
                        onClick={(e) => onSubmit(e)}
                        disabled={isButtonDisabled}
                    >
                        Submit
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

export default Add;
