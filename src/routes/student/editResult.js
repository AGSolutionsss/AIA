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

const subject = [
    {
      value: "M1",
      label: "M1",
    },
    {
      value: "M2",
      label: "M2",
    },
    {
        value: "M3",
        label: "M3",
      },
      {
        value: "M4",
        label: "M4",
      },
      {
        value: "CAMS",
        label: "CAMS",
      },
      {
        value: "CIAC",
        label: "CIAC",
      },
      {
        value: "CIAP1",
        label: "CIAP1",
      },
      {
        value: "CIAP2",
        label: "CIAP2",
      },
      {
        value: "CIAP3",
        label: "CIAP3",
      },
      {
        value: "Other",
        label: "Other",
      },
];

const cc = [
    {
      value: "Done",
      label: "Done",
    },
    {
      value: "Pending",
      label: "Pending",
    },
    {
        value: "Not Applicable",
        label: "Not Applicable",
    },
];

const wG = [
    {
      value: "Done",
      label: "Done",
    },
    {
      value: "Pending",
      label: "Pending",
    },
    {
        value: "Not Applicable",
        label: "Not Applicable",
    },
];

const aa = [
    {
      value: "Done",
      label: "Done",
    },
    {
      value: "Pending",
      label: "Pending",
    },
    {
        value: "Not Applicable",
        label: "Not Applicable",
    },
];

const lo = [
    {
      value: "Done",
      label: "Done",
    },
    {
      value: "Pending",
      label: "Pending",
    },
    {
        value: "Not Applicable",
        label: "Not Applicable",
    },
];

const cs = [
    {
      value: "Done",
      label: "Done",
    },
    {
      value: "Pending",
      label: "Pending",
    },
    {
        value: "Not Applicable",
        label: "Not Applicable",
    },
];

const smp = [
    {
      value: "Done",
      label: "Done",
    },
    {
      value: "Pending",
      label: "Pending",
    },
    {
        value: "Not Applicable",
        label: "Not Applicable",
    },
];

const Gr = [
    {
      value: "Done",
      label: "Done",
    },
    {
      value: "Pending",
      label: "Pending",
    },
    {
        value: "Not Applicable",
        label: "Not Applicable",
    },
];

const ra = [
    {
      value: "Done",
      label: "Done",
    },
    {
      value: "Pending",
      label: "Pending",
    },
    {
        value: "Not Applicable",
        label: "Not Applicable",
    },
];

const ravl = [
    {
      value: "Done",
      label: "Done",
    },
    {
      value: "Pending",
      label: "Pending",
    },
    {
        value: "Not Applicable",
        label: "Not Applicable",
    },
];

const rfsG = [
    {
      value: "Done",
      label: "Done",
    },
    {
      value: "Pending",
      label: "Pending",
    },
    {
        value: "Not Applicable",
        label: "Not Applicable",
    },
];

const is = [
    {
      value: "Not interested",
      label: "Not interested",
    },
    {
      value: "Pending",
      label: "Pending",
    },
    {
        value: "Not Applicable",
        label: "Not Applicable",
    },
    {
        value: "Recorded",
        label: "Recorded",
    },
    {
        value: "Published",
        label: "Published",
    },
];

const status = [
    {
        value: "Pending",
        label: "Pending",
    },
    {
      value: "Quaified",
      label: "Quaified",
    },
    {
      value: "Not Qualified",
      label: "Not Qualified",
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
    const [student, setStudentExam] = useState({
        course_opted: "",
        exam_status: "",
        exam_congratulation_call: "",
        exam_wishes_on_group: "",
        exam_add_to_alumnus: "",
        exam_linkedIn_obtained: "",
        exam_certificate_status: "",
        exam_social_media_post: "",
        exam_google_review: "",
        exam_remove_access_of_pq: "",
        exam_remove_access_of_vl: "",
        exam_remove_from_study_group: "",
        exam_interview_status: "",
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
          
            setStudentExam(res.data.studentCourse);
          
        });
      }, []);

    const onInputChange = (e) => {
        setStudentExam({
        ...student,
        [e.target.name]: e.target.value,
        });  
    };

    const onSubmit = (e) => {
        let data = {
            exam_status: student.exam_status,
            exam_congratulation_call: student.exam_congratulation_call,
            exam_wishes_on_group: student.exam_wishes_on_group,
            exam_add_to_alumnus: student.exam_add_to_alumnus,
            exam_linkedIn_obtained: student.exam_linkedIn_obtained,
            exam_certificate_status: student.exam_certificate_status,
            exam_social_media_post: student.exam_social_media_post,
            exam_google_review: student.exam_google_review,
            exam_remove_access_of_pq: student.exam_remove_access_of_pq,
            exam_remove_access_of_vl: student.exam_remove_access_of_vl,
            exam_remove_from_study_group: student.exam_remove_from_study_group,
            exam_interview_status: student.exam_interview_status,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/panel-update-result/"+id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Result Updated Sucessfully");
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
      <PageTitleBar title="Edit Result" match={props.match} />
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
                    <span style={span}>{student.course_opted}</span>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                <TextField
                    fullWidth
                    label="Result of Exam"
                    
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    name="exam_status"
                    value={student.exam_status}
                    onChange={(e) => onInputChange(e)}
                    >
                    {status.map((course_validitydata, key) => (
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
                    label="Congratulation Call"
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    name="exam_congratulation_call"
                    value={student.exam_congratulation_call}
                    onChange={(e) => onInputChange(e)}
                    >
                    {cc.map((course_validitydata, key) => (
                        <MenuItem key={key} value={course_validitydata.value}>
                            {course_validitydata.label}
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
                    label="Wishes on Group"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    autoComplete="Name"
                    name="exam_wishes_on_group"
                    value={student.exam_wishes_on_group}
                    onChange={(e) => onInputChange(e)}
                    >
                    {wG.map((course_validitydata, key) => (
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
                    label="Add to Alumnus"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    autoComplete="Name"
                    name="exam_add_to_alumnus"
                    value={student.exam_add_to_alumnus}
                    onChange={(e) => onInputChange(e)}
                    >
                    {wG.map((course_validitydata, key) => (
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
                    label="LinkedIn Obtained"
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    
                    name="exam_linkedIn_obtained"
                    value={student.exam_linkedIn_obtained}
                    onChange={(e) => onInputChange(e)}
                    >
                    {lo.map((course_validitydata, key) => (
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
                    label="Certificate Status"
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    
                    name="exam_certificate_status"
                    value={student.exam_certificate_status}
                    onChange={(e) => onInputChange(e)}
                    >
                    {cs.map((course_validitydata, key) => (
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
                    label="Social Media Post"
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    
                    name="exam_social_media_post"
                    value={student.exam_social_media_post}
                    onChange={(e) => onInputChange(e)}
                    >
                    {smp.map((course_validitydata, key) => (
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
                    label="Google Review"
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    
                    name="exam_google_review"
                    value={student.exam_google_review}
                    onChange={(e) => onInputChange(e)}
                    >
                    {Gr.map((course_validitydata, key) => (
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
                    label="Remove Access of PQ"
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    
                    name="exam_remove_access_of_pq"
                    value={student.exam_remove_access_of_pq}
                    onChange={(e) => onInputChange(e)}
                    >
                    {ra.map((course_validitydata, key) => (
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
                    label="Remove Access of VL"
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    
                    name="exam_remove_access_of_vl"
                    value={student.exam_remove_access_of_vl}
                    onChange={(e) => onInputChange(e)}
                    >
                    {ravl.map((course_validitydata, key) => (
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
                    label="Remove from Study Group"
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    
                    name="exam_remove_from_study_group"
                    value={student.exam_remove_from_study_group}
                    onChange={(e) => onInputChange(e)}
                    >
                    {rfsG.map((course_validitydata, key) => (
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
                    label="Interview Status"
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    
                    name="exam_interview_status"
                    value={student.exam_interview_status}
                    onChange={(e) => onInputChange(e)}
                    >
                    {is.map((course_validitydata, key) => (
                        <MenuItem key={key} value={course_validitydata.value}>
                            {course_validitydata.label}
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
