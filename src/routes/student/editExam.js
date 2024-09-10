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
        exam_subject: "",
        exam_status: "",
        exam_date: "",
    });
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){

      window.location = "/signin";
      
      }else{

      }

      axios({
          url: baseURL+"/panel-fetch-exam-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
            setStudentExam(res.data.studentExam);
          
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
            exam_subject: student.exam_subject,
            exam_status: student.exam_status,
            exam_date: student.exam_date,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/panel-update-exam/"+id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Exam Updated Sucessfully");
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
      <PageTitleBar title="Edit Exam" match={props.match} />
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
                <TextField
                    fullWidth
                    label="Register for exam"
                    
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
                    label="Subject"
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    name="exam_subject"
                    value={student.exam_subject}
                    onChange={(e) => onInputChange(e)}
                    >
                    {subject.map((course_validitydata, key) => (
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
                    label="Exam Date"
                    type="date"
                    required
                    InputLabelProps={{
                        shrink: true,
                      }}
                    autoComplete="Name"
                    name="exam_date"
                    value={student.exam_date}
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
