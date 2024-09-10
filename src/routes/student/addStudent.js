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

const mobile = [
    {
      value: "IOS",
      label: "IOS",
    },
    {
      value: "Android",
      label: "Android",
    },
];

const pc = [
    {
      value: "Windows",
      label: "Windows",
    },
    {
      value: "Mac",
      label: "Mac",
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
    const [student, setStudent] = useState({
        ids: id,
        address: "",
        mobile_device: "",
        admission_form_no: "",
        qualification: "",
        remarks: "",
        pc_device: "",
    });
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){

      window.location = "/signin";
      
      }else{

      }

      axios({
          url: baseURL+"/panel-fetch-enquiry-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
          setStudent(res.data.enquiry);
          
        });
      }, []);

    const onInputChange = (e) => {
        setStudent({
        ...student,
        [e.target.name]: e.target.value,
        });  
    };

    const onSubmit = (e) => {
        let data = {
            ids: student.id,
            address: student.address,
            admission_form_no: student.admission_form_no,
            qualification: student.qualification,
            remarks: student.remarks,
            mobile_device: student.mobile_device,
            pc_device: student.pc_device,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/panel-create-student",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Student Created Sucessfully");
                history.push("/app/student/listing");
            }else{
                NotificationManager.error("Duplicate Entry");
                setIsButtonDisabled(false);
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Add Student" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>Full Name</label><br/>
                    <span style={span}>{student.enquiry_title}{" "}{student.enquiry_full_name}</span>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>Mobile</label><br/>
                    <span style={span}>{student.enquiry_mobile}</span>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>Email</label><br/>
                    <span style={span}>{student.enquiry_email}</span>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>Course</label><br/>
                    <span style={span}>{student.enquiry_course}</span>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-12">
                <div className="form-group">
                    <TextField
                    fullWidth
                    label="Address"
                    multiline
                    required
                    autoComplete="Name"
                    name="address"
                    value={student.address}
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
                    label="Mobile Device for Study"
                    required
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    name="mobile_device"
                    value={student.mobile_device}
                    onChange={(e) => onInputChange(e)}
                    >
                    {mobile.map((mobiledata, key) => (
                        <MenuItem key={key} value={mobiledata.value}>
                            {mobiledata.label}
                        </MenuItem>
                    ))}
                    </TextField>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                    fullWidth
                    label="PC Device for Study"
                    required
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    name="pc_device"
                    value={student.pc_device}
                    onChange={(e) => onInputChange(e)}
                    >
                    {pc.map((pcdata, key) => (
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
                    label="Admission Form Number"
                    required
                    autoComplete="Name"
                    name="admission_form_no"
                    value={student.admission_form_no}
                    onChange={(e) => onInputChange(e)}
                    />
                   
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                    fullWidth
                    label="Qualification"
                    required
                    autoComplete="Name"
                    name="qualification"
                    value={student.qualification}
                    onChange={(e) => onInputChange(e)}
                    />
                   
                </div>
            </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-12">
              <div className="form-group">
                <TextField
                    fullWidth
                    label="Remarks"
                    multiline
                    autoComplete="Name"
                    name="remarks"
                    value={student.remarks}
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
