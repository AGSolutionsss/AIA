import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import axios from "axios";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { RctCard } from "Components/RctCard/index";
import CircularProgress from '@material-ui/core/CircularProgress';
import {baseURL} from '../../../api';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { NotificationContainer, NotificationManager,} from "react-notifications";
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import NumberFormat from 'react-number-format';
import Moment from 'moment';

const table_row_count = {
  border: "1px solid black",
  textAlign: "center",
  fontSize: "11px"
};

const table_head = {
  border: "1px solid black",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "12px"
};



const EnquiryReport = (props) => {
  const componentRef = useRef();
  const [teamsummary, setSummary] = useState({});
  const [loader, setLoader]= useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  useEffect(() => {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){
      window.location = "/signin";
    }else{
    }

    var url = new URL(window.location.href);
    let data = {
        enquiry_date_from:localStorage.getItem("enquiry_date_from"),
        enquiry_date_to: localStorage.getItem("enquiry_date_to"), 
        enquiry_status: localStorage.getItem("enquiry_status"), 
        enquiry_course: localStorage.getItem("enquiry_course"), 
    };
    

    axios({
      url: baseURL+"/fetch-enquiry-report",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        setSummary(res.data.enquiry);
        
        setLoader(false)
      
    });
  }, []);
 

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
        enquiry_date_from:localStorage.getItem("enquiry_date_from"),
        enquiry_date_to: localStorage.getItem("enquiry_date_to"), 
        enquiry_status: localStorage.getItem("enquiry_status"), 
        enquiry_course: localStorage.getItem("enquiry_course"), 
    };
    
  
    setIsButtonDisabled(true)
      axios({
        url: baseURL+"/panel-download-enquiry",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }).then((res) => {
          
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'enquiry_list.csv'); 
          document.body.appendChild(link);
          link.click();
          NotificationManager.success("Report is Downloaded Successfully");
          setIsButtonDisabled(false)
        }).catch((err) =>{
          NotificationManager.error("Report is Not Downloaded");
          setIsButtonDisabled(false)
        });
  
  };

const  handleExportWithFunction  = (e) => {
  savePDF(componentRef.current, { 
    paperSize:  "A4", 
    orientation: "vertical",
      scale: 0.8,
  });
}

  return (
    <div>
      { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
      <div className="invoice-wrapper">
        <PageTitleBar title="Enquiry List" match={props.match} />
        <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-12 mx-auto" style={{width:'auto'}}>
          
            <RctCard>
              <div 
        
                className="invoice-head text-right">
                <ul className="list-inline">
                
                  <li>
                    <a  onClick={(e) => onSubmit(e)}>
                      <i className="mr-10 ti-download"></i> Download
                    </a>
                  </li>
                  
                </ul>
              </div>
              
              <div className="p-10" ref={componentRef} style={{margin: '5px'}}>
                <div className="d-flex justify-content-between" style={{fontSize: '16px' }}>
                  <div className="invoice-logo ">
                    
                  </div>
                  <div className="address text-center">
                    
                    <h2 style={{paddingTop: '5px'}}>
                      <strong>
                        <b style={{fontSize: '20px'}}>Enquiry List</b>
                      </strong>
                    </h2>
                  </div>
                  <div className="invoice-logo text-right">
                    
                  </div>
                </div>
                
                <div className="table-responsive">
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table" style={{border: '2px solid black', marginTop: '20px'}}>
                      <TableHead>          
                        <TableRow>
                          <TableCell style={table_head}>Enquiry Date</TableCell>
                          <TableCell style={table_head}>Followup Date</TableCell>
                          <TableCell style={table_head}>Full Name</TableCell>
                          <TableCell style={table_head}>Mobile No</TableCell>
                          <TableCell style={table_head}>City</TableCell>
                          <TableCell style={table_head}>Course</TableCell>
                          <TableCell style={table_head}>Status</TableCell>
                         </TableRow>
                      </TableHead>
                      <TableBody>
                        {teamsummary.map((dataSumm, key)=>(
                          <TableRow key={key}>
                            <TableCell style={table_row_count}>{Moment(dataSumm.enquiry_date).format('DD-MM-YYYY')}</TableCell>
                            <TableCell style={table_row_count}>{Moment(dataSumm.enquiry_follow_date).format('DD-MM-YYYY')}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.enquiry_title+" "+dataSumm.enquiry_full_name}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.enquiry_mobile}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.enquiry_city}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.enquiry_course}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.enquiry_status}</TableCell>
                            
                          </TableRow>
                        ))}
                       </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
              
            </RctCard>
            
          </div>
        </div>
      </div>
      </>}
    </div>
  );
};
export default EnquiryReport;