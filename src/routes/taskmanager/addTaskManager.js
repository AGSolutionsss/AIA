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

const Add = (props) => {

    let history = useHistory();
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
    const [enquiry, setEnquiry] = useState({
        
        task_from_date: "",
       
        task_details: "",
        
        user_id: "",

        task_to_date: "",
        
    });
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){

      window.location = "/signin";
      
      }else{

      }

      
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
            
        };
        
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true);
        axios({
            url: baseURL+"/panel-create-taskmanager",
            method: "POST",
            data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Task created Sucessfully");
                history.goBack();
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
      <PageTitleBar title="Add Task" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                    <TextField
                    fullWidth
                    required
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
