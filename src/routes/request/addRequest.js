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
import SelectPopup from "./selectpopup";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Add = (props) => {

    let history = useHistory();
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
    const [student, setRequest] = useState({
        user_uid: "",
        course_request: "",
        course_request_remarks: "",
    });
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){

      window.location = "/signin";
      
      }else{

      }

      
      }, []);

      const [userUID, setUserUID] = useState('');

      const getUserid = (userUID) => {

        setUserUID(userUID);
          setShowmodal(false);
       }

       const [showmodal, setShowmodal] = useState(false);
  const closegroupModal = () => {
    setShowmodal(false);
  };
  const openmodal = () => {
    setShowmodal(true);
  };

      const [requestType, setRequestType] = useState([]);
      useEffect(() => {
          axios({
              url: baseURL+"/panel-fetch-request-type",
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("login")}`,
              },
            }).then((res) => {
              
              setRequestType(res.data.requestType);
              
            });
          }, []);

    const onInputChange = (e) => {
        setRequest({
        ...student,
        [e.target.name]: e.target.value,
        });  

        if(e.target.name == 'user_uid'){

            setUserUID(e.target.value);
        }
    };

    const onSubmit = (e) => {
        let data = {
            user_uid: userUID,
            course_request: student.course_request,
            course_request_remarks: student.course_request_remarks,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/panel-create-request",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Request Added Sucessfully");
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
      <PageTitleBar title="Add Request" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-6">
                <div className="form-group">
                <TextField
                    fullWidth
                    label="Request Type"
                    required
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    name="course_request"
                    value={student.course_request}
                    onChange={(e) => onInputChange(e)}
                    >
                    {requestType.map((course_validitydata, key) => (
                        <MenuItem key={key} value={course_validitydata.user_request_type}>
                            {course_validitydata.user_request_type}
                        </MenuItem>
                    ))}
                    </TextField>
                </div>
            </div>
            
            <div className="col-sm-12 col-md-12 col-xl-6">
                <div className="form-group">
                <TextField
                    fullWidth
                    label="Student UID"
                    required
                    InputLabelProps={{
                        shrink: true,
                      }}
                    autoComplete="Name"
                    name="user_uid"
                    value={userUID}
                    onChange={(e) => onInputChange(e)}
                    onClick={() => openmodal()}
                    />
                </div>
            </div>
            
            <div className="col-sm-12 col-md-12 col-xl-12">
                <div className="form-group">
                <TextField
                    fullWidth
                    label="Remarks"
                    autoComplete="Name"
                    name="course_request_remarks"
                    value={student.course_request_remarks}
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
      <Modal isOpen={showmodal} toggle={() => closegroupModal()}>
        <ModalHeader toggle={() => closegroupModal()}>Student UID List</ModalHeader>
        <ModalBody>
          <SelectPopup getUserid={getUserid}/>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
};

export default Add;
