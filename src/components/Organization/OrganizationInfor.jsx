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
            EName:'',
            CAddress: '',
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

    CName(event){
        this.setState({CName:event.target.value})
        var chineseName = /^[\u4e00-\u9fa5]{0,}$/;
        var val_CName = event.target.value

        if(chineseName.test(val_CName)){
            setTimeout(function(){
                this.setState({info_CName:""});
            }.bind(this), 1000);
        }else{ 
            //val_CName = _val;
            this.setState({info_CName:"請輸入正確的中文名字"});
        }
        this.setState({"val_CName":val_CName})
    }

    EName(event){
        this.setState({EName:event.target.value})
        var englishName = /^[A-Za-z]+$/;
        var val_EName = event.target.value

        if(englishName.test(val_EName)){
            setTimeout(function(){
                this.setState({info_EName:""});
            }.bind(this), 1000);
        }else{
            //val_EName = _val;
            this.setState({info_EName:"Please Input Correct English Name"})
        }
        this.setState({"val_EName":val_EName})
    }

    phone(event){
        this.setState({phone:event.target.value})
        var phone = /^[0-9]*$/;
        var val_phone = event.target.value

        if(phone.test(val_phone)){
            setTimeout(function(){
                this.setState({info_phone:""});
            }.bind(this), 1000);
        }else{
            //val_phone = _val;
            this.setState({info_phone:"請輸入正確的電話號碼/Please Input Correct Phone Number"})
        }
        this.setState({"val_phone":val_phone})
    }
   
    fax(event){
        this.setState({fax:event.target.value})
        var fax = /^[0-9]*$/;
        var val_fax = event.target.value

        if(fax.test(val_fax)){
            setTimeout(function(){
                this.setState({info_fax:""});
            }.bind(this), 1000);
        }else{
            //val_fax = _val;
            this.setState({info_fax:"請輸入正確的傳真號碼/Please Input Correct Fax Number"})
        }
        this.setState({"val_fax":val_fax})
    }
    
    personCName(event){
        this.setState({personCName:event.target.value})
        var personCName = /^[\u4e00-\u9fa5]{0,}$/;
        var val_personCName = event.target.value

        if(personCName.test(val_personCName)){
            setTimeout(function(){
                this.setState({info_personCName:""});
            }.bind(this), 1000);
        }else{ 
            //val_personCName = _val;
            this.setState({info_personCName:"請輸入正確的中文名字"});
        }
        this.setState({"val_personCName":val_personCName})
    }

    personEName(event){
        this.setState({personEName:event.target.value})
        var personEName = /^[A-Za-z]+$/;
        var val_personEName = event.target.value

        if(personEName.test(val_personEName)){
            setTimeout(function(){
                this.setState({info_personEName:""});
            }.bind(this), 1000);
        }else{
            //val_personEName = _val;
            this.setState({info_personEName:"Please Input Correct English Name"})
        }
        this.setState({"val_personEName":val_personEName})
    }

    IDnum(event){
        this.setState({IDnum:event.target.value})
        var IDnum = /[A-Z]{1,2}[0-9]{6}([0-9A])/;
        var val_IDnum = event.target.value

        if(IDnum.test(val_IDnum)){
            setTimeout(function(){
                this.setState({info_IDnum:""});
            }.bind(this), 1000);
            
        }else{
            //val_ID = _val;
            this.setState({info_IDnum:"請輸入正確的身份證號碼/Please Input Correct ID Number"})
            
        }
        this.setState({"val_IDnum":val_IDnum})

    }

    contactNumber(event){
        this.setState({contactNumber:event.target.value})
        var contactNumber = /^[0-9]*$/;
        var val_contactNumber = event.target.value

        if(contactNumber.test(val_contactNumber)){
            setTimeout(function(){
                this.setState({info_contactNumber:""});
            }.bind(this), 1000);
        }else{
            //val_contactNumber = _val;
            this.setState({info_contactNumber:"請輸入正確的聯繫號碼/Please Input Correct Contact Number"})
        }
        this.setState({"val_contactNumber":val_contactNumber})
    }

    contactEmail(event){
        this.setState({contactEmail:event.target.value})
        var contactEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        var val_contactEmail = event.target.value

        if(contactEmail.test(val_contactEmail)){
            setTimeout(function(){
                this.setState({info_contactEmail:""});
            }.bind(this), 1000);
        }else{ 
            //val_contactEmail = _val;
            this.setState({info_contactEmail:"請輸入正確的郵箱地址/Please Input Correct Email Address"});
        }
        this.setState({"val_contactEmail":val_contactEmail})
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
                     value ={this.state.val_CName}
                     onChange={this.CName.bind(this)}
                     />&nbsp;
                <font for="title" color="red">{this.state.info_CName}</font>
                <br/>
                團體英文名稱:<br/>
                Organization name(English)
                <input type="text"
                    id="EName" 
                    placeholder="Organization name"  
                    value ={this.state.val_EName}  
                    onChange={this.EName.bind(this)}
                    />&nbsp;
                <font for="title" color="red">{this.state.info_EName}</font>
                <br/><br/>
                通訊地址<br/>
                Correspondence Address
                <input type="text"
                     id="CAddress" 
                     placeholder="Correspondence Address"  
                     onChange={event => this.setState({ CAddress: event.target.value })}
                     /><br/><br/>
                電話(日間):<br/>
                Phone No
                <input type="text"
                     id="phone" 
                     placeholder="Phone No"  
                     value ={this.state.val_phone}  
                    onChange={this.phone.bind(this)}
                    />&nbsp;
                <font for="title" color="red">{this.state.info_phone}</font>
                <br/><br/>
                傳真:<br/>
                Fax:
                <input type="text"
                     id="fax" 
                     placeholder="Fax"  
                     value ={this.state.val_fax}
                     onChange={this.fax.bind(this)}
                     />&nbsp;
                <font for="title" color="red">{this.state.info_fax}</font>
                <br/><br/>
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
                     value ={this.state.val_personCName}
                     onChange={this.personCName.bind(this)}
                     />&nbsp;
                <font for="title" color="red">{this.state.info_personCName}</font>
                <br/>
                負責人英文姓名:<br/>
                Name of Person in Charge(English) 
                <input type="text"
                     id="personEName" 
                     placeholder="Name of Person in Charge"  
                     value ={this.state.val_personEName}
                     onChange={this.personEName.bind(this)}
                     />&nbsp;
                <font for="title" color="red">{this.state.info_personEName}</font>
                <br/><br/>
                身份證號碼:<br/>
                ID number 
                <input type="text"
                     id="IDnum" 
                     placeholder="ID number"  
                     value ={this.state.val_IDnum}  
                     onChange={this.IDnum.bind(this) }
                     />&nbsp;
                <font for="title" color="red">{this.state.info_IDnum}</font>
                <br/>
                聯絡電話<br/>
                Contact Number
                <input type="text"
                     id="contactNumber" 
                     placeholder="Contact Number"
                     value ={this.state.val_contactNumber}
                     onChange={this.contactNumber.bind(this)}
                     />&nbsp;
                <font for="title" color="red">{this.state.info_contactNumber}</font>
                <br/><br/>
                電子郵件地址<br/>
                E-mail Address
                <input type="text"
                     id="contactEmail" 
                     placeholder="E-mail Address"  
                     value ={this.state.val_contactEmail}
                     onChange={this.contactEmail.bind(this)}
                     />&nbsp;
                <font for="title" color="red">{this.state.info_contactEmail}</font>
                <br/><br/>
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
                    className="btn btn-success"
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
            EName: this.state.EName,
            CAddress: this.state.CAddress,
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