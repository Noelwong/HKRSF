import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';



class OrganizationInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userType:'Organization',
            CName: '',
            EName: '',
            CAddress: '',
            email:'',
            phone:'',
            fax:'',
            CertificateNumber:'',
            DOR: moment(),
            personCName:'',
            personEName:'',
            IDnum:'',
            contactNumber:'',
            contactEmail:'',
            contactAddress:'',
            error: {
                message: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(date) {
        this.setState({
            DOR: date,
        });
      }

    render(){

        return (
            <div>
                <form>
                團體會員申請表<br />
                Organization Membership Application Form<br />
                團體中文名稱:<br/>
                Organization name(Chinese)
                <input type="text"
                     id="CName" 
                     placeholder="團體中文名稱"  
                     /><br/>
                團體英文名稱:<br/>
                Organization name(English)
                <input type="text"
                    id="EName" 
                    placeholder="Organization name"  
                    /><br/>
                通訊地址<br/>
                Correspondence Address
                <input type="text"
                     id="CAddress" 
                     placeholder="Correspondence Address"  
                     /><br/>
                電郵地址<br/>
                Email Address
                <input type="text"
                     id="email" 
                     placeholder="Email Addressr"  
                     /><br/>
                電話(日間):<br/>
                Phone No
                <input type="text"
                     id="phone" 
                     placeholder="Phone No"  
                     /><br/>
                傳真:<br/>
                Fax:
                <input type="text"
                     id="fax" 
                     placeholder="Fax"  
                     /><br/>
                商業登記證/社團註冊證編號<br/>
                Certificate number of Business Registration/ Society 
                <input type="text"
                     id="CertificateNumber" 
                     placeholder="Certificate number of Business Registration/ Society "  
                     /><br/>
                有效日期<br/>
                Date of Registration
                <DatePicker
                    selected={this.state.DOR}
                    onChange={this.handleChange}
                    />
                <br/>
                <b>法定負責人資料<br/>
                Information of the person in charge of the organization
                </b><br/>

                負責人中文姓名:<br/>
                Name of Person in Charge(Chinese)
                <input type="text"
                     id="personCName" 
                     placeholder="負責人中文姓名"  
                     /><br/>
                負責人英文姓名:<br/>
                Name of Person in Charge(English) 
                <input type="text"
                     id="personEName" 
                     placeholder="Name of Person in Charge"  
                     /><br/>
                身份證號碼:<br/>
                ID number 
                <input type="text"
                     id="IDnum" 
                     placeholder="ID number"  
                     /><br/>
                聯絡電話<br/>
                Contact Number
                <input type="text"
                     id="contactNumber" 
                     placeholder="Contact Number"  
                     /><br/>
                電子郵件地址<br/>
                E-mail Address
                <input type="text"
                     id="contactEmail" 
                     placeholder="E-mail Address"  
                     /><br/>
                聯絡地址<br/>
                Correspondence Address of Person in Charge
                <input type="text"
                     id="contactAddress" 
                     placeholder="Correspondence Address of Person in Charge"  
                     /><br/>

                </form>
                <button
                    className="btn btn-danger"
                    onClick={() => this.signOut()}
                >
                    Sign Out
                </button>
            </div>
        )
    }
    signOut() {
        firebaseApp.auth().signOut();
    }
    
}
export default OrganizationInfor;