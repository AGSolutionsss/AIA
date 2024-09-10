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
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){

      window.location = "/signin";
      
      }else{

      }

      
      }, []);

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
                    ...enquiry,
                    [e.target.name]: e.target.value,
                    });  
                }
            }else{
                setEnquiry({
                    ...enquiry,
                    [e.target.name]: e.target.value,
                });  
            }
        };

        const onBack = (e) => {
            e.preventDefault();
            history.goBack();
        }

    const onSubmit = (e) => {
        let data = {
            enquiry_year : enquiry.enquiry_year,
            enquiry_title : enquiry.enquiry_title,
            enquiry_full_name: enquiry.enquiry_full_name,
            enquiry_mobile: enquiry.enquiry_mobile,
            enquiry_email: enquiry.enquiry_email,
            enquiry_country: enquiry.enquiry_country,
            enquiry_city: enquiry.enquiry_city,
            enquiry_category: enquiry.enquiry_category,
            enquiry_course: enquiry.enquiry_course,
            enquiry_source: enquiry.enquiry_source,
            enquiry_course_other: enquiry.enquiry_course_other,
            enquiry_source_other: enquiry.enquiry_source_other,
        };
        
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true);
        axios({
            url: baseURL+"/panel-create-enquiry",
            method: "POST",
            data,
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Enquiry created Sucessfully");
                history.goBack();
            }else{
                NotificationManager.error("Duplicate Entry");
                setIsButtonDisabled(false);
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Add Enquiry" match={props.match} />
      <RctCollapsibleCard>
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
                    value={enquiry.enquiry_title}
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
                    value={enquiry.enquiry_full_name}
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
                    value={enquiry.enquiry_mobile}
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
                    value={enquiry.enquiry_email}
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
                    value={enquiry.enquiry_country}
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
                    value={enquiry.enquiry_city}
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
                    value={enquiry.enquiry_category}
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
                    value={enquiry.enquiry_course}
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
                enquiry.enquiry_course =='Other' &&
            
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                    <TextField
                    fullWidth
                    required
                    label="Course Other"
                    autoComplete="Name"
                    name="enquiry_course_other"
                    value={enquiry.enquiry_course_other}
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
                    value={enquiry.enquiry_source}
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
                enquiry.enquiry_source =='Other' &&
            
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                    <TextField
                    fullWidth
                    required
                    label="Source Other"
                    autoComplete="Name"
                    name="enquiry_source_other"
                    value={enquiry.enquiry_source_other}
                    onChange={(e) => onInputChange(e)}
                    />
                    
                </div>
            </div>  
            }  
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
                    {/* <Link to="listing"> */}
                        <Button onClick={(e) => onBack(e)} className="mr-10 mb-10" color="success">
                            Back
                        </Button>
                    {/* </Link> */}
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
