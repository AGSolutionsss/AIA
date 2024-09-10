import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import {baseURL} from '../api';
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "reactstrap";
import {  NotificationManager,} from "react-notifications";
import axios from "axios";
import QueueAnim from "rc-queue-anim";
import AppConfig from "Constants/AppConfig";
import "./enquiry.css";

const title = [
    {
      value: "Mr",
      label: "Mr",
    },
    {
      value: "Ms",
      label: "Ms",
    },
    {
        value: "Mrs",
        label: "Mrs",
    },
    {
        value: "MD",
        label: "MD",
    },
];

const category = [
    {
      value: "Indian",
      label: "Indian",
    },
    {
      value: "International",
      label: "International",
    },
];

const source = [
    {
      value: "Referral",
      label: "Referral",
    },
    {
      value: "Repeat Student",
      label: "Repeat Student",
    },
    {
        value: "WA",
        label: "WA",
    },
    {
        value: "Email",
        label: "Email",
    },
    {
        value: "Adv",
        label: "Adv",
    },
    {
        value: "Social Media",
        label: "Social Media",
    },
    {
        value: "Other",
        label: "Others(mention)",
    },
];

const Enquiry = (props) => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    var midate = "04/04/2022"
    var todayback = yyyy + "-" + mm + "-" + dd;
    var d = document.getElementById("datefield");
    


    const [booking, setEnquiry] = useState({
        enquiry_year: "2024-25",
        enquiry_title: "",
        enquiry_full_name: "",
        enquiry_mobile: "",
        enquiry_email: "",
        enquiry_country: "",
        enquiry_city: "",
        enquiry_category: "",
        enquiry_course: "",
        enquiry_course_other: "",
        enquiry_source: "",
        enquiry_source_other: "",
        
    });

    const [country, setCountry] = useState([]);
    useEffect(() => {
        axios({
            url: baseURL+"/panel-fetch-country",
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setCountry(res.data.country);
            
          });
        }, []);

        const [course, setCourse] = useState([]);
        useEffect(() => {
            axios({
                url: baseURL+"/panel-fetch-courses",
                method: "GET",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("login")}`,
                },
              }).then((res) => {
                
                setCourse(res.data.course);
                
              });
            }, []);

    const validateOnlyDigits = (inputtxt) => {
        var phoneno = /^\d+$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
          return true;
        }else{
          return false;
        }
    }

    const onInputChange = (e) => {
        if(e.target.name=="enquiry_mobile"){
  
            if(validateOnlyDigits(e.target.value)){
                setEnquiry({
                ...booking,
                [e.target.name]: e.target.value,
                });  
            }
        }else{
            setEnquiry({
                ...booking,
                [e.target.name]: e.target.value,
            });  
        }
    };

    

    const onSubmit = (e) => {
        let data = {
            
            enquiry_year : booking.enquiry_year,
            enquiry_title : booking.enquiry_title,
            enquiry_full_name: booking.enquiry_full_name,
            enquiry_mobile: booking.enquiry_mobile,
            enquiry_email: booking.enquiry_email,
            enquiry_country: booking.enquiry_country,
            enquiry_city: booking.enquiry_city,
            enquiry_category: booking.enquiry_category,
            enquiry_course: booking.enquiry_course,
            enquiry_source: booking.enquiry_source,
            enquiry_course_other: booking.enquiry_course_other,
            enquiry_source_other: booking.enquiry_source_other,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        
        axios({
            url: baseURL+"/panel-create-enquiry",
            method: "POST",
            data,
            
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Enquiry created Sucessfully");
                setEnquiry({
                    enquiry_year: "2024-25",
                    enquiry_title: "",
                    enquiry_full_name: "",
                    enquiry_mobile: "",
                    enquiry_email: "",
                    enquiry_country: "",
                    enquiry_city: "",
                    enquiry_category: "",
                    enquiry_course: "",
                    enquiry_source: "",
                    enquiry_source_other: "",
                    enquiry_course_other: "",
                })
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

    return (
        <QueueAnim type="bottom" duration={2000}>
            <div className="rct-session-wrapper">
                <div className="session-inner-wrapper" style={{marginTop:'-90px'}}>
                    <div className="container">
                        <div className="row row-eq-height mobileview">
                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <div className="session-body text-center" style={{padding:'2rem 2.25rem'}}>
                                    <div className="session-head mb-30">
                                        <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="350" height="150" />
                                    </div>
                                    <form id="addIndiv" autoComplete="off">
                                        <div className="row">
                                        
                                            <div className="col-sm-12 col-md-12 col-xl-1">
                                            <div className="form-group">
                                                <TextField
                                                fullWidth
                                                label="Title"
                                                autoComplete="Name"
                                                name="enquiry_title"
                                                select
                                                SelectProps={{
                                                    MenuProps: {},
                                                }}
                                                value={booking.enquiry_title}
                                                onChange={(e) => onInputChange(e)}
                                                >
                                                {title.map((titledata, key) => (
                                                    <MenuItem key={key} value={titledata.value}>
                                                        {titledata.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                            </div>
                                            </div>
                                            <div className="col-sm-12 col-md-12 col-xl-5">
                                                <div className="form-group">
                                                    <TextField
                                                    fullWidth
                                                    required
                                                    label="Full Name"
                                                    autoComplete="Name"
                                                    name="enquiry_full_name"
                                                    value={booking.enquiry_full_name}
                                                    onChange={(e) => onInputChange(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-12 col-xl-3">
                                                <div className="form-group">
                                                    <TextField
                                                    fullWidth
                                                    required
                                                    label="Mobile No"
                                                    autoComplete="Name"
                                                    name="enquiry_mobile"
                                                    inputProps={{ maxLength: 10, minLength: 10 }}
                                                    value={booking.enquiry_mobile}
                                                    onChange={(e) => onInputChange(e)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-12 col-xl-3">
                                                <div className="form-group">
                                                    <TextField
                                                    fullWidth
                                                    
                                                    type="email"
                                                    label="Email"
                                                    autoComplete="Name"
                                                    name="enquiry_email"
                                                    value={booking.enquiry_email}
                                                    onChange={(e) => onInputChange(e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-12 col-xl-4">
                                                <div className="form-group">
                                                    <TextField
                                                    fullWidth
                                                    required
                                                    label="Country"
                                                    autoComplete="Name"
                                                    name="enquiry_country"
                                                    select
                                                    SelectProps={{
                                                        MenuProps: {},
                                                    }}
                                                    value={booking.enquiry_country}
                                                    onChange={(e) => onInputChange(e)}
                                                    >
                                                    {country.map((countrydata, key) => (
                                                        <MenuItem key={key} value={countrydata.country_name}>
                                                            {countrydata.country_name}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                                </div>
                                            </div> 
                                            <div className="col-sm-12 col-md-12 col-xl-4">
                                                <div className="form-group">
                                                    <TextField
                                                    fullWidth
                                                    required
                                                    label="City"
                                                    autoComplete="Name"
                                                    name="enquiry_city"
                                                    value={booking.enquiry_city}
                                                    onChange={(e) => onInputChange(e)}
                                                    />
                                                </div>
                                            </div>  
                                            <div className="col-sm-12 col-md-12 col-xl-4">
                                                <div className="form-group">
                                                    <TextField
                                                    fullWidth
                                                    required
                                                    label="Category"
                                                    autoComplete="Name"
                                                    name="enquiry_category"
                                                    select
                                                    SelectProps={{
                                                        MenuProps: {},
                                                    }}
                                                    value={booking.enquiry_category}
                                                    onChange={(e) => onInputChange(e)}
                                                    >
                                                    {category.map((categorydata, key) => (
                                                        <MenuItem key={key} value={categorydata.value}>
                                                            {categorydata.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                                </div>
                                            </div> 
                                            <div className="col-sm-12 col-md-12 col-xl-4">
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
                                                    name="enquiry_course"
                                                    value={booking.enquiry_course}
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
                                            {
                                                booking.enquiry_course =='Other' &&
                                            
                                            <div className="col-sm-12 col-md-12 col-xl-4">
                                                <div className="form-group">
                                                    <TextField
                                                    fullWidth
                                                    required
                                                    label="Course Other"
                                                    autoComplete="Name"
                                                    name="enquiry_course_other"
                                                    value={booking.enquiry_course_other}
                                                    onChange={(e) => onInputChange(e)}
                                                    />
                                                    
                                                </div>
                                            </div>  
                                            }
                                            <div className="col-sm-12 col-md-12 col-xl-4">
                                                <div className="form-group">
                                                    <TextField
                                                    fullWidth
                                                    label="Source"
                                                    autoComplete="Name"
                                                    select
                                                    SelectProps={{
                                                        MenuProps: {},
                                                    }}
                                                    name="enquiry_source"
                                                    value={booking.enquiry_source}
                                                    onChange={(e) => onInputChange(e)}
                                                    >
                                                    {source.map((sourcedata, key) => (
                                                        <MenuItem key={key} value={sourcedata.value}>
                                                            {sourcedata.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                                </div>
                                            </div>   
                                            {
                                                booking.enquiry_source =='Other' &&
                                            
                                            <div className="col-sm-12 col-md-12 col-xl-4">
                                                <div className="form-group">
                                                    <TextField
                                                    fullWidth
                                                    required
                                                    label="Source Other"
                                                    autoComplete="Name"
                                                    name="enquiry_source_other"
                                                    value={booking.enquiry_source_other}
                                                    onChange={(e) => onInputChange(e)}
                                                    />
                                                    
                                                </div>
                                            </div>  
                                            }  
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-12 col-xl-12">
                                                <div className="receiptbuttons" style={{textAlign:'center'}}>
                                                    <Button
                                                        type="submit"
                                                        className="mr-10 mb-10"
                                                        color="primary"
                                                        onClick={(e) => onSubmit(e)}
                                                        
                                                    >
                                                        Submit
                                                    </Button>
                                                    <Link to="/">
                        <Button className="mr-10 mb-10" color="success">
                            Back
                        </Button>
                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="antifloat"></div>
                                        </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </QueueAnim>
    );

}
export default Enquiry;