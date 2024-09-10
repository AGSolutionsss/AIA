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

const Edit = (props) => {

    let history = useHistory();
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
    const [student, setStudentCourse] = useState({
        course_validity: "",
        course_fees: "",
        course_mode_payment: "",
        course_received_bank: "",
        course_vlis: "",
        course_pqis: "",
        course_status: "",
        course_wls: "",
        course_awag: "",
        course_wc: "",
        course_lr: "",
        
    });
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){

      window.location = "/signin";
      
      }else{

      }

      axios({
          url: baseURL+"/panel-fetch-course-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
          setStudentCourse(res.data.studentCourse);
          
        });
      }, []);

    const onInputChange = (e) => {
        setStudentCourse({
        ...student,
        [e.target.name]: e.target.value,
        });  
    };

    const onSubmit = (e) => {
        let data = {
            course_validity: student.course_validity,
            course_fees: student.course_fees,
            course_mode_payment: student.course_mode_payment,
            course_received_bank: student.course_received_bank,
            course_vlis: student.course_vlis,
            course_pqis: student.course_pqis,
            course_status: student.course_status,
            course_wls: student.course_wls,
            course_awag: student.course_awag,
            course_wc: student.course_wc,
            course_lr: student.course_lr,
            
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/panel-update-course/"+id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Course Updated Sucessfully");
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

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Edit Course" match={props.match} />
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
                    <label style={label}>Course</label><br/>
                    <span style={span}>{student.course_opted}{student.course_opted =='Other'? ' ( '+student.course_opted_other + ' )' : ''}</span>
                </div>
            </div>
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
        <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                    fullWidth
                    label="Video Lectures Issue Status"
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    name="course_vlis"
                    value={student.course_vlis}
                    onChange={(e) => onInputChange(e)}
                    >
                    {video_lecture.map((pcdata, key) => (
                        <MenuItem key={key} value={pcdata.value}>
                            {pcdata.label}
                        </MenuItem>
                    ))}
                    </TextField>
                    
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                    fullWidth
                    label="PQ Issue Status"
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    name="course_pqis"
                    value={student.course_pqis}
                    onChange={(e) => onInputChange(e)}
                    >
                    {pq_issue.map((pcdata, key) => (
                        <MenuItem key={key} value={pcdata.value}>
                            {pcdata.label}
                        </MenuItem>
                    ))}
                    </TextField>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                    fullWidth
                    label="Welcome Letter Status"
                    autoComplete="Name"
                    name="course_wls"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    value={student.course_wls}
                    onChange={(e) => onInputChange(e)}
                    >
                    {letter_status.map((pcdata, key) => (
                        <MenuItem key={key} value={pcdata.value}>
                            {pcdata.label}
                        </MenuItem>
                    ))}
                    </TextField>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                    fullWidth
                    label="Add to the WA Group"
                    autoComplete="Name"
                    name="course_awag"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    value={student.course_awag}
                    onChange={(e) => onInputChange(e)}
                    >
                    {add_wa.map((pcdata, key) => (
                        <MenuItem key={key} value={pcdata.value}>
                            {pcdata.label}
                        </MenuItem>
                    ))}
                    </TextField>
                </div>
            </div>
        </div>
        <div className="row">
        
          <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                    fullWidth
                    label="Welcome Call"
                    autoComplete="Name"
                    name="course_wc"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    value={student.course_wc}
                    onChange={(e) => onInputChange(e)}
                    >
                    {wel_call.map((pcdata, key) => (
                        <MenuItem key={key} value={pcdata.value}>
                            {pcdata.label}
                        </MenuItem>
                    ))}
                    </TextField>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                    fullWidth
                    label="LinkedIn Request"
                    autoComplete="Name"
                    name="course_lr"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    value={student.course_lr}
                    onChange={(e) => onInputChange(e)}
                    >
                    {lr.map((pcdata, key) => (
                        <MenuItem key={key} value={pcdata.value}>
                            {pcdata.label}
                        </MenuItem>
                    ))}
                    </TextField>
              </div>
            </div>
            
            <div className="col-sm-12 col-md-12 col-xl-3">
            <div className="form-group">
              <TextField
                fullWidth
                required
                label="Course Status"
                autoComplete="Name"
                name="course_status"
                select
                SelectProps={{
                    MenuProps: {},
                }}
                value={student.course_status}
                onChange={(e) => onInputChange(e)}
                >
                {course_status.map((course_statusdata, key) => (
                    <MenuItem key={key} value={course_statusdata.value}>
                        {course_statusdata.label}
                    </MenuItem>
                ))}
              </TextField>
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
                        Update
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

export default Edit;
