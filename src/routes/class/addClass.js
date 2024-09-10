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

const Add = (props) => {

    let history = useHistory();
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
    const [student, setClass] = useState({
        class_date: "",
        class_subject: "",
        class_time: "",
        class_to_time: "",
        class_url: "",
    });
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){

      window.location = "/signin";
      
      }else{

      }

      
      }, []);

    const onInputChange = (e) => {
        setClass({
        ...student,
        [e.target.name]: e.target.value,
        });  
    };

    const onSubmit = (e) => {
        let data = {
            class_date: student.class_date,
            class_subject: student.class_subject,
            class_time: student.class_time,
            class_to_time: student.class_to_time,
            class_url: student.class_url,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/panel-create-class",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Class Added Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
                setIsButtonDisabled(false);
            }
            
        });
        }
    };

    const onBack = (e) =>{
        e.preventDefault();
        history.push(`/app/class`);
    }

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Add Class" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
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
                    name="class_subject"
                    value={student.class_subject}
                    onChange={(e) => onInputChange(e)}
                    >
                    {course.map((course_validitydata, key) => (
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
                    label="Date"
                    required
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                      }}
                    autoComplete="Name"
                    name="class_date"
                    value={student.class_date}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                <TextField
                    fullWidth
                    label="From Time"
                    required
                    type="time"
                    InputLabelProps={{
                        shrink: true,
                      }}
                    autoComplete="Name"
                    name="class_time"
                    value={student.class_time}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                <TextField
                    fullWidth
                    label="To Time"
                    required
                    type="time"
                    InputLabelProps={{
                        shrink: true,
                      }}
                    autoComplete="Name"
                    name="class_to_time"
                    value={student.class_to_time}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-12">
                <div className="form-group">
                <TextField
                    fullWidth
                    label="Class URL"
                    autoComplete="Name"
                    name="class_url"
                    value={student.class_url}
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
