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

const ss = [
    {
      value: "Yes",
      label: "Yes",
    },
    {
      value: "No",
      label: "No",
    },
];

const mode = [
    {
      value: "Shree Maruti",
      label: "Shree Maruti",
    },
    {
      value: "Trackon",
      label: "Trackon",
    },
    {
        value: "DHL",
        label: "DHL",
    },
    {
        value: "FEDex",
        label: "FEDex",
    },
    {
        value: "DTDC",
        label: "DTDC",
    },
];

const status = [
    {
      value: "Pending",
      label: "Pending",
    },
    {
      value: "Delivered",
      label: "Delivered",
    },
    {
        value: "Returned",
        label: "Returned",
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
    const [student, setStudentDelivery] = useState({
        user_uid: "",
        delivery_slip_shared: "No",
        delivery_mode: "",
        delivery_tracking_number: "",
        delivery_shipping_date: "",
        delivery_status: "Pending",
    });
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){

      window.location = "/signin";
      
      }else{

      }

      
      }, []);

    const onInputChange = (e) => {
        setStudentDelivery({
        ...student,
        [e.target.name]: e.target.value,
        });  
    };

    const [useruid, setUserUID] = useState([]);
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){
  
        window.location = "/signin";
        
      }else{
  
      }
  
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken,
              }             
        };     
  
  
      fetch(baseURL+'/panel-fetch-user-delivery', requestOptions)
      .then(response => response.json())
      .then(data => setUserUID(data.useruid)); 
    }, []);

    const onSubmit = (e) => {
        let data = {
            user_uid: student.user_uid,
            delivery_slip_shared: student.delivery_slip_shared,
            delivery_mode: student.delivery_mode,
            delivery_tracking_number: student.delivery_tracking_number,
            delivery_shipping_date: student.delivery_shipping_date,
            delivery_status: student.delivery_status,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/panel-create-delivery",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Delivery Added Sucessfully");
                history.goBack();
            }else{
                NotificationManager.error("Duplicate Entry");
                setIsButtonDisabled(false);
            }
            
        });
        }
    };

    const onBack = (e) =>{
        e.preventDefault();
        history.goBack();
    }

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Add Delivery" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                <TextField
                    fullWidth
                    label="Student"
                    autoComplete="Name"
                    required
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    name="user_uid"
                    value={student.user_uid}
                    onChange={(e) => onInputChange(e)}
                    >
                    {useruid.map((uiddata, key) => (
                        <MenuItem key={key} value={uiddata.user_uid}>
                            {uiddata.user_uid+ " - "+uiddata.name}
                        </MenuItem>
                    ))}
                    </TextField>
                </div>
            </div>
            
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                    fullWidth
                    label="Mode"
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    name="delivery_mode"
                    value={student.delivery_mode}
                    onChange={(e) => onInputChange(e)}
                    >
                    {mode.map((course_validitydata, key) => (
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
                    label="Shipping Date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                      }}
                    autoComplete="Name"
                    name="delivery_shipping_date"
                    value={student.delivery_shipping_date}
                    onChange={(e) => onInputChange(e)}
                    />
                    
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                <TextField
                    fullWidth
                    label="Tracking Number"
                    autoComplete="Name"
                    name="delivery_tracking_number"
                    value={student.delivery_tracking_number}
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
