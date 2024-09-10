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

const video_lecture = [
    {
      value: "Given",
      label: "Given",
    },
    {
      value: "Pending",
      label: "Pending",
    },
];

const pq_issue = [
    {
        value: "Given",
        label: "Given",
    },
    {
    value: "Pending",
    label: "Pending",
    },
];

const letter_status = [
    {
      value: "Shared",
      label: "Shared",
    },
    {
        value: "Not Applicable",
        label: "Not Applicable",
    },
    {
      value: "Pending",
      label: "Pending",
    },
];

const add_wa = [
    {
      value: "Added",
      label: "Added",
    },
    {
        value: "Not Applicable",
        label: "Not Applicable",
    },
    {
      value: "Pending",
      label: "Pending",
    },
];

const wel_call = [
    {
      value: "Done",
      label: "Done",
    },
    {
        value: "Not Applicable",
        label: "Not Applicable",
    },
    {
      value: "Pending",
      label: "Pending",
    },
];

const lr = [
    {
      value: "Shared",
      label: "Shared",
    },
    {
        value: "Not Applicable",
        label: "Not Applicable",
    },
    {
      value: "Pending",
      label: "Pending",
    },
    {
        value: "Joined",
        label: "Joined",
    },
];

const mode = [
    {
      value: "Bank Transfer",
      label: "Bank Transfer",
    },
    {
        value: "Credit Card",
        label: "Credit Card",
    },
    {
      value: "International Payment",
      label: "International Payment",
    },
    {
        value: "Cash",
        label: "Cash",
    },
];

const mobile = [
    {
      value: "Approved",
      label: "Approved",
    },
    {
        value: "Rejected",
        label: "Rejected",
    },
    
];

const pc = [
    {
      value: "Approved",
      label: "Approved",
    },
    {
        value: "Rejected",
        label: "Rejected",
    },
    
];

const rc = [
    {
      value: "Approved",
      label: "Approved",
    },
    {
        value: "Rejected",
        label: "Rejected",
    },
    
];

const re = [
    {
      value: "Approved",
      label: "Approved",
    },
    {
        value: "Rejected",
        label: "Rejected",
    },
    
];

const course_validity = [
    {
      value: "6 Months",
      label: "6 Months",
    },
    {
        value: "12 Months",
        label: "12 Months",
    },
    {
      value: "18 Months",
      label: "18 Months",
    },
    {
      value: "Open",
      label: "Open",
    },
];

const course_status = [
    {
      value: "Ongoing",
      label: "Ongoing",
    },
    {
      value: "Qualified",
      label: "Qualified",
    },
    {
        value: "Course Expired",
        label: "Course Expired",
    },
    {
        value: "Blacklisted",
        label: "Blacklisted",
    },
    {
        value: "Extended",
        label: "Extended",
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
    const [student, setStudentCourse] = useState({
        user_uid: id,
        course_opted: "",
        course_opted_other: "",
        course_validity: "",
        course_fees: "",
        course_mode_payment: "",
        course_received_bank: "",
    });
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){

      window.location = "/signin";
      
      }else{

      }

      
      }, []);

    const onInputChange = (e) => {
        setStudentCourse({
        ...student,
        [e.target.name]: e.target.value,
        });  
    };

    const onSubmit = (e) => {
        let data = {
            user_uid: student.user_uid,
            course_opted: student.course_opted,
            course_opted_other: student.course_opted_other,
            course_validity: student.course_validity,
            course_fees: student.course_fees,
            course_mode_payment: student.course_mode_payment,
            course_received_bank: student.course_received_bank,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/panel-create-course",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Course Added Sucessfully");
                history.push(`/app/student/view?id=${localStorage.getItem('nid')}`);
            }else{
                NotificationManager.error("Duplicate Entry");
                setIsButtonDisabled(false);
            }
            
        });
        }
    };

    const onBack = (e) =>{
        e.preventDefault();
        history.push(`/app/student/view?id=${localStorage.getItem('nid')}`);
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
      <PageTitleBar title="Add Course" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>UID</label><br/>
                    <span style={span}>{id}</span>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                <TextField
                    fullWidth
                    label="Course"
                    required
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    name="course_opted"
                    value={student.course_opted}
                    onChange={(e) => onInputChange(e)}
                    >
                    {course.map((course_validitydata, key) => (
                        <MenuItem key={key} value={course_validitydata.courses_name}>
                            {course_validitydata.courses_name}
                        </MenuItem>
                    ))}
                    </TextField>
                </div>
            </div>
            {student.course_opted == 'Other' &&
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                <TextField
                    fullWidth
                    label="Course Other"
                    required
                    autoComplete="Name"
                    
                    name="course_opted_other"
                    value={student.course_opted_other}
                    onChange={(e) => onInputChange(e)}
                    />
                    
                </div>
            </div>
            }
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                    fullWidth
                    label="Validity of the Course"
                    required
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    name="course_validity"
                    value={student.course_validity}
                    onChange={(e) => onInputChange(e)}
                    >
                    {course_validity.map((course_validitydata, key) => (
                        <MenuItem key={key} value={course_validitydata.value}>
                            {course_validitydata.label}
                        </MenuItem>
                    ))}
                    </TextField>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                <TextField
                    fullWidth
                    label="Fees Paid"
                    required
                    autoComplete="Name"
                    name="course_fees"
                    value={student.course_fees}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                <TextField
                    fullWidth
                    label="Mode of Payment"
                    required
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    autoComplete="Name"
                    name="course_mode_payment"
                    value={student.course_mode_payment}
                    onChange={(e) => onInputChange(e)}
                    >
                    {mode.map((cmodedata, key) => (
                        <MenuItem key={key} value={cmodedata.value}>
                            {cmodedata.label}
                        </MenuItem>
                    ))}
                    </TextField>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-9">
                <div className="form-group">
                    <TextField
                    fullWidth
                    label="Receiving Bank Name"
                    autoComplete="Name"
                    name="course_received_bank"
                    value={student.course_received_bank}
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
                    
                        <Button onClick={(e) =>onBack(e)} className="mr-10 mb-10" color="success">
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

export default Add;
