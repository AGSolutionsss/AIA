/**
 * Notification Component
 */
import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { Badge } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import "./setting.css";
// api
import api from 'Api';

// intl messages
import IntlMessages from 'Util/IntlMessages';

class Setting extends Component {
    textRef = React.createRef();

   state = {
      notifications: null,
      textToCopy: `Hello, I am looking for Academy of Internal Audit`,
     
   }

   componentDidMount() {
      
   }


   whatsApp = (e) => {
    e.preventDefault();

    const phoneNumber = ""
    const message = `Hello, I am looking for Academy of Internal Audit`;
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  }

  email = (e) => {
    e.preventDefault();
    const emailAddress = '';
    const subject = '';
    const body = '';

    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  }

  copy = (e) => {
    e.preventDefault();
    this.textRef.current.select();
    document.execCommand('copy');
  }

   render() {
      const { notifications } = this.state;
      return (
         <UncontrolledDropdown nav className="list-inline-item notification-dropdown">
            <DropdownToggle nav className="p-0">
               <Tooltip title="Share" placement="bottom">
                  <IconButton className="shakes" aria-label="bell">
                     <i className="zmdi zmdi-share" style={{color:'#41b58e'}}></i>
                     <small>Share</small>
                  </IconButton>
               </Tooltip>
            </DropdownToggle>
            <DropdownMenu right className='mobile_share'>
               <div className="dropdown-content">
                  <div className="dropdown-top d-flex justify-content-between rounded-top bg-primary">
                     <span className="text-white font-weight-bold">
                        <IntlMessages id="Share" />
                     </span>
                  </div>
                  <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={280}>
                    <ul className="list-unstyled dropdown-list">
                        <li>
                            <div className="media">
                                <div className="mr-10">
                                    <Button className="btn-xs bg-primary whatsapp" style={{borderRadius:'20px'}} onClick={(e) => this.whatsApp(e)}>
                                        <i className="zmdi zmdi-whatsapp" style={{color:'#fff', fontSize:'20px'}}></i> 
                                    </Button>
                                </div>
                                
                            </div>
                        </li>
                        <li>
                            <div className="media">
                                <div className="mr-10">
                                    <Button className="btn-xs bg-primary" style={{borderRadius:'20px'}} onClick={(e) => this.email(e)}>
                                        <i className="zmdi zmdi-email" style={{color:'#fff', fontSize:'20px'}}></i> 
                                    </Button>
                                </div>
                                
                            </div>
                        </li>
                        <li>
                            <div className="media">
                                <div className="mr-10">
                                    <Button className="btn-xs bg-primary" style={{borderRadius:'20px'}} onClick={(e) => this.copy(e)}>
                                        <i className="zmdi zmdi-copy" style={{color:'#fff', fontSize:'20px'}}></i> 
                                    </Button>
                                    <input className='fs-12 d-block' type="text" style={{border:'none',fontSize:'1px'}} value={this.state.textToCopy} ref={this.textRef} readOnly />
                                </div>
                            </div>
                        </li>
                    </ul>
                  </Scrollbars>
               </div>
               
            </DropdownMenu>
         </UncontrolledDropdown>
      );
   }
}

export default Setting;
