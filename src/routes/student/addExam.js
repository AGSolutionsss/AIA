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
    const [student, setStudentExam] = useState({
        user_uid: id,
        exam_subject: "",
        exam_date: "",
    });
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){

      window.location = "/signin";
      
      }else{

      }

      
      }, []);

    const onInputChange = (e) => {
        setStudentExam({
        ...student,
        [e.target.name]: e.target.value,
        });  
    };

    const onSubmit = (e) => {
        let data = {
            user_uid: student.user_uid,
            exam_subject: student.exam_subject,
            exam_date: student.exam_date,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/panel-create-exam",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Exam Added Sucessfully");
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
      <PageTitleBar title="Add Exam" match={props.match} />
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
                    label="Subject"
                    required
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
