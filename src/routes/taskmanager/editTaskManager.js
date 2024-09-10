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

const label = {
  color:'blueviolet',
  fontSize:'13px',
  marginBottom:'0px'
}

const span = {
  color:'black',
  fontSize:'16px'
}

const status = [
    {
      value: "Pending",
      label: "Pending",
    },
    {
      value: "Inspection",
      label: "Inspection",
    },
    {
      value: "Cancel",
      label: "Cancel",
    },
    {
      value: "Reschedule",
      label: "Reschedule",
    },
  ];

const Edit = (props) => {

    let history = useHistory();
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
    const [enquiry, setEnquiry] = useState({
        
        task_from_date: "",
       
        task_details: "",
        
        user_id: "",

        task_to_date: "",
        task_note: "",
        task_status: "",
        
    });
    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){
  
        window.location = "/signin";
        
        }else{
  
        }
  
        axios({
            url: baseURL+"/panel-fetch-taskmanager-by-id/" + id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setEnquiry(res.data.task);
            
          });
        }, []);
      

        const onInputChange = (e) => {
            
            setEnquiry({
                ...enquiry,
                [e.target.name]: e.target.value,
            });  
            
        };

   

    const onSubmit = (e) => {
        let data = {
           
            task_from_date: enquiry.task_from_date,
            
            task_details: enquiry.task_details,
            
            user_id: enquiry.user_id,

            task_to_date: enquiry.task_to_date,

            task_note: enquiry.task_note,

            task_status: enquiry.task_status,
            
        };
        
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true);
        axios({
            url: baseURL+"/panel-update-taskmanager-by-id/"+id,
            method: "PUT",
            data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Task Updated Sucessfully");
                history.push("pending-listing");
            }else{
                NotificationManager.error("Duplicate Entry");
                setIsButtonDisabled(false);
            }
            
        });
        }
    };

    const [userList, setUserList] = useState([]);
      useEffect(() => {
          axios({
              url: baseURL+"/panel-fetch-user-taskmanager",
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("login")}`,
              },
            }).then((res) => {
              
              setUserList(res.data.userList);
              
            });
          }, []);

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Edit Task" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                    <TextField
                    fullWidth
                    required
                    disabled
                    label="Assign Date"
                    InputLabelProps={{
                        shrink: true,
                      }}
                    type="date"
                    autoComplete="Name"
                    name="task_from_date"
                    value={enquiry.task_from_date}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                    <TextField
                    fullWidth
                    required
                    label="Due Date"
                    disabled
                    InputLabelProps={{
                        shrink: true,
                      }}
                    type="date"
                    autoComplete="Name"
                    name="task_to_date"
                    value={enquiry.task_to_date}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                    <TextField
                    fullWidth
                    required
                    disabled
                    label="Employee"
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    name="user_id"
                    value={enquiry.user_id}
                    onChange={(e) => onInputChange(e)}
                    >
                    {userList.map((userListdata, key) => (
                        <MenuItem key={key} value={userListdata.id}>
                            {userListdata.name}
                        </MenuItem>
                    ))}
                </TextField>
                </div>
            </div> 
            
            
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-12">
                <div className="form-group">
                    <TextField
                    multiline
                    disabled
                    fullWidth
                    required
                    label="Task Details"
                    autoComplete="Name"
                    name="task_details"
                    
                    value={enquiry.task_details}
                    onChange={(e) => onInputChange(e)}
                   />
                    
                </div>
            </div> 
             
        </div>
        <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-9">
                <div className="form-group">
                    <TextField
                    multiline
                    fullWidth
                    required
                    label="Comment"
                    autoComplete="Name"
                    name="task_note"
                    
                    value={enquiry.task_note}
                    onChange={(e) => onInputChange(e)}
                   />
                    
                </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-3">
            <div className="form-group">
              <TextField
                fullWidth
                required
                label="Status"
                autoComplete="Name"
                name="task_status"
                select
                SelectProps={{
                    MenuProps: {},
                }}
                value={enquiry.task_status}
                onChange={(e) => onInputChange(e)}
                >
                {status.map((statusdata, key) => (
                    <MenuItem key={key} value={statusdata.value}>
                        {statusdata.label}
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
