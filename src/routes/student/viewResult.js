import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {baseURL} from '../../api';
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

const View = (props) => {

    let history = useHistory();
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
  
    const [student, setStudentExam] = useState({});
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

      const onBack = (e) =>{
        e.preventDefault();
        history.push(`/app/student/view?id=${localStorage.getItem('nid')}`);
    }

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="View Result" match={props.match} />
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
                    <label style={label}>Course </label><br/>
                    <span style={span}>{student.course_opted}</span>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>Result of Exam </label><br/>
                    <span style={span}>{student.exam_status}</span>
                </div>
            </div>
            
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>Congratulation Call</label><br/>
                    <span style={span}>{student.exam_congratulation_call}</span>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>Wishes on Group</label><br/>
                    <span style={span}>{student.exam_wishes_on_group}</span>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>Add to Alumnus</label><br/>
                    <span style={span}>{student.exam_add_to_alumnus}</span>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>LinkedIn Obtained</label><br/>
                    <span style={span}>{student.exam_linkedIn_obtained}</span>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>Certificate Status</label><br/>
                    <span style={span}>{student.exam_certificate_status}</span>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>Social Media Post</label><br/>
                    <span style={span}>{student.exam_social_media_post}</span>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>Google Review</label><br/>
                    <span style={span}>{student.exam_google_review}</span>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>Remove Access of PQ</label><br/>
                    <span style={span}>{student.exam_remove_access_of_pq}</span>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>Remove Access of VL</label><br/>
                    <span style={span}>{student.exam_remove_access_of_vl}</span>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>Remove from Study Group</label><br/>
                    <span style={span}>{student.exam_remove_from_study_group}</span>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <label style={label}>Interview Status</label><br/>
                    <span style={span}>{student.exam_interview_status}</span>
                </div>
            </div>
        </div>
        <div className="row mt-4">
            <div className="col-sm-12 col-md-12 col-xl-12">
                <div className="receiptbuttons" style={{textAlign:'center'}}>
                    
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

export default View;
