import React, { Component } from 'react';
import { firebaseApp,db } from '../../firebase';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';



class OrganizationInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userType:'Organization',
            CName: '',
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
        this.user = firebaseApp.auth().currentUser;
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
                     onChange={event => this.setState({ CName: event.target.value })}
                     /><br/>
                團體英文名稱:<br/>
                Organization name(English)
                <input type="text"
                    id="EName" 
                    placeholder="Organization name"  
                    onChange={event => this.setState({ EName: event.target.value })}
                    /><br/>
                通訊地址<br/>
                Correspondence Address
                <input type="text"
                     id="CAddress" 
                     placeholder="Correspondence Address"  
                     onChange={event => this.setState({ CAddress: event.target.value })}
                     /><br/>
                電話(日間):<br/>
                Phone No
                <input type="text"
                     id="phone" 
                     placeholder="Phone No"  
                     onChange={event => this.setState({ phone: event.target.value })}
                     /><br/>
                傳真:<br/>
                Fax:
                <input type="text"
                     id="fax" 
                     placeholder="Fax"  
                     onChange={event => this.setState({ fax: event.target.value })}
                     /><br/>
                商業登記證/社團註冊證編號<br/>
                Certificate number of Business Registration/ Society 
                <input type="text"
                     id="CertificateNumber" 
                     placeholder="Certificate number of Business Registration/ Society "  
                     onChange={event => this.setState({ CertificateNumber: event.target.value })}
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
                     onChange={event => this.setState({ personCName: event.target.value })}
                     /><br/>
                負責人英文姓名:<br/>
                Name of Person in Charge(English) 
                <input type="text"
                     id="personEName" 
                     placeholder="Name of Person in Charge"  
                     onChange={event => this.setState({ personEName: event.target.value })}
                     /><br/>
                身份證號碼:<br/>
                ID number 
                <input type="text"
                     id="IDnum" 
                     placeholder="ID number"  
                     onChange={event => this.setState({ IDnum: event.target.value })}
                     /><br/>
                聯絡電話<br/>
                Contact Number
                <input type="text"
                     id="contactNumber" 
                     placeholder="Contact Number"  
                     onChange={event => this.setState({ contactNumber: event.target.value })}
                     /><br/>
                電子郵件地址<br/>
                E-mail Address
                <input type="text"
                     id="contactEmail" 
                     placeholder="E-mail Address"  
                     onChange={event => this.setState({ contactEmail: event.target.value })}
                     /><br/>
                聯絡地址<br/>
                Correspondence Address of Person in Charge
                <input type="text"
                     id="contactAddress" 
                     placeholder="Correspondence Address of Person in Charge"
                     onChange={event => this.setState({ contactAddress: event.target.value })}  
                     /><br/>

                </form>
                <br/>
                <button
                    className="btn btn-danger"
                    onClick={() => this.addOrganizationInfor(this.state)}
                >
                    Submit
                </button>
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

    addOrganizationInfor(state) {
        const uid = this.user.uid;
        db.collection("user").doc(uid).set({
            userType:'Organization',
            CName: this.state.CName,
            CAddress: this.state.CAddress,
            email: this.state.email,
            phone:this.state.phone,
            fax: this.state.fax,
            CertificateNumber: this.state.CertificateNumber,
            DOR: new Date(this.state.DOR),
            personCName: this.state.personCName,
            personEName: this.state.personEName,
            IDnum: this.state.IDnum,
            contactNumber: this.state.contactNumber,
            contactEmail: this.state.contactEmail,
            contactAddress: this.state.contactAddress
        })
    }
}
export default OrganizationInfor;