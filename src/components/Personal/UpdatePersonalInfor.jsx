import React, { Component } from 'react';
import { firebaseApp,db } from '../../firebase';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';


class UpdatePersonalInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userType:'Personal',
            CName: '',
            EName: '',
            gender:'',
            BDate: null,
            ID: '',
            homeAddress:'',
            schoolType:'',
            schoolName:'',
            sGroup:'',
            coachLevel:'',
            coachYear:'',
            judgeLevel:'',
            judgeYear:'',
            error: {
                message: ''
            },
            checkCName:true,
            checkEName:true,
            checkID:true,
            
        }
        this.user = firebaseApp.auth().currentUser;
    }
      
     
    CName(event){
        this.setState({CName:event.target.value})
        var chineseName = /^[\u4e00-\u9fa5]{0,}$/;
        var val_CName = event.target.value;
        
        if(val_CName.length > 0){
            if(chineseName.test(val_CName)){
                this.setState({"checkCName":true})
                setTimeout(function(){
                    this.setState({info_CName:""});
                }.bind(this), 1000);
            }else{ 
                this.setState({"checkCName":false})
                this.setState({info_CName:"請輸入正確的中文名字"});
            }
        }

        this.setState({"val_CName":val_CName})
    }

    EName(event){
        this.setState({EName:event.target.value})
        var englishName = /^[A-Za-z]+$/;
        var val_EName = event.target.value;
        
        if(val_EName.length>0){
            if(englishName.test(val_EName)){
                this.setState({"checkEName":true})
                setTimeout(function(){
                    this.setState({info_EName:""});
                }.bind(this), 1000);
            }else{
                this.setState({"checkEName":false})
                this.setState({info_EName:"Please Input Correct English Name"})
            }
        }
        this.setState({"val_EName":val_EName})
    }

    genderHandleChange(event) {
        this.setState({gender: event.target.value});
    }


    date(date) {
        this.setState({ BDate: date});
    }

    ID(event){
        this.setState({ID:event.target.value})
        var IDName = /[A-Z]{1,2}[0-9]{6}([0-9A])/;
        var val_ID = event.target.value;
        
        if(val_ID.length>0){
            if(IDName.test(val_ID)){
                this.setState({"checkID":true})
                setTimeout(function(){
                    this.setState({info_ID:""});
                }.bind(this), 1000);
                
            }else{
                this.setState({"checkID":false})
                this.setState({info_ID:"請輸入正確的身份證號碼/Please Input Correct ID Number"})
                
            }
        }
        this.setState({"val_ID":val_ID})

    }

    homeAddress(event){
        this.setState({ homeAddress: event.target.value });
    }
    


    schoolTypeHandleChange(event) {
        this.setState({schoolType: event.target.value});
    }

    schoolName(event){
        this.setState({schoolName: event.target.value});
    }

    sGroup(event){
        this.setState({sGroup:event.target.value});
    }

    coachLevelHandleChange(event) {
        this.setState({coachLevel: event.target.value});
    }

    coachYear(event){
        this.setState({coachYear:event.target.value});
    }

    judgeLevelHandleChange(event) {
        this.setState({judgeLevel: event.target.value});
    }

    judgeYear(event){
        this.setState({judgeYear: event.target.value});
    }

    render(){

        return (
            <div>
                <form>
                個人會員申請表<br />
                Personal Membership Application Form<br />
                姓名（中文）
              
                <input type="text"
                    id="CName" 
                    placeholder="姓名"  
                    value ={this.state.val_CName}
                    onChange={this.CName.bind(this)}
                    />&nbsp;
                <font for="title" color="red">{this.state.info_CName}</font>
                <br/><br/>
                Name (English)
                <input type="text"
                    id="EName" 
                    placeholder="Name"
                    value ={this.state.val_EName}  
                    onChange={this.EName.bind(this)}
                    />&nbsp;
                <font for="title" color="red">{this.state.info_EName}</font>
                <br/><br/>
                性別<br/>
                Gender 
                <select id = "gender" value={this.state.gender} onChange={this.genderHandleChange.bind(this)} >
                    <option value ="">Please Select Your School type</option>
                    <option value ="male">男Male</option>
                    <option value="female">女Female</option>
                </select>
                <br/>
                出生日期<br/>
                Date of Birth
                <DatePicker
                        selected={this.state.BDate}
                        onChange={this.date.bind(this)}
                        /><br/>
                身份證號碼<br/>
                Identification number
                <input type="text"
                     id="ID" 
                     placeholder="ID Number"  
                     value ={this.state.val_ID}  
                     onChange={this.ID.bind(this) }
                     />&nbsp;
                <font for="title" color="red">{this.state.info_ID}</font>
                <br/>
                住宅地址<br/>
                Home Address
                <input type="text"
                     id="home" 
                     placeholder="Home Address"  
                     onChange={this.homeAddress.bind(this)}
                     /><br/>
                就讀學校<br/>
                Current school
                <select id = "schoolType" value={this.state.schoolType} onChange={this.schoolTypeHandleChange.bind(this)} >
                    <option value ="">Please Select Your School type</option>
                    <option value ="PSchool">小學Primary School</option>
                    <option value="SSchool">中學Secondary Schooll</option>
                    <option value="College">大專College</option>
                </select>
                <input type="text"
                     id="schoolName" 
                     placeholder="School Name" 
                     onChange={this.schoolName.bind(this)} 
                     /><br/>
                所屬體育團體名稱<br/>
                The name of the sports group
                <input type="text"
                     id="sGroup" 
                     placeholder="Name"  
                     onChange={this.sGroup.bind(this)} 
                     /><br/>
                教練資歷及考獲年份<br/>
                Coaching qualifications and years of study
                <select id = "coachLevel" value={this.state.coachLevel} onChange={this.coachLevelHandleChange.bind(this)}>
                    <option value ="">沒有 NULL</option>
                    <option value ="Junior">初級Junior</option>
                    <option value="Intermediate">中級Intermediate</option>
                    <option value="Advanced">高級Advanced</option>
                    <option value="Senior">資深Senior</option>
                </select>
                <input type="text"
                     id="coachYear" 
                     placeholder="Years of study"  
                     onChange={this.coachYear.bind(this)} 
                     /><br/>
                裁判資歷及考獲年份<br/>
                Judge qualifications and years of study
                <select id = "judgeLevel" value={this.state.judgeLevel} onChange={this.judgeLevelHandleChange.bind(this)}>
                    <option value ="">沒有 NULL</option>
                    <option value ="Junior">初級Junior</option>
                    <option value="Intermediate">中級Intermediate</option>
                    <option value="Advanced">高級Advanced</option>
                    <option value="Senior">資深Senior</option>
                </select>
                <input type="text"
                     id="judgeYear" 
                     placeholder="Years of study" 
                     onChange={this.judgeYear.bind(this)}  
                     /><br/>
                </form>
                <button
                    className="btn btn-success"
                    onClick={() => this.addPersonalInfor(this.state)}    
                >
                    Submit
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() => this.signOut()}
                > 
                    Sign Out
                </button>
                <br/>
                <font for="title" color="red">{this.state.info}</font>
            </div>
        )
    }
    signOut() {
        firebaseApp.auth().signOut();
    }

    addPersonalInfor(state) {
        const uid = this.user.uid;
        if(this.state.checkCName === true && this.state.checkEName === true && this.state.checkID === true ){
            if(this.state.CName.length>0){
                db.collection("user").doc(uid).update({
                    CName: this.state.CName,
                }) 
            } 

            if(this.state.EName.length>0){
                db.collection("user").doc(uid).update({
                    EName: this.state.EName,
                })
            }

            if(this.state.gender !== ''){
                db.collection("user").doc(uid).update({
                    gender: this.state.gender,
                })
            }

            
            db.collection("user").doc(uid).update({
                BDate: new Date(this.state.BDate),
            })
            

            if(this.state.ID.length>0){
                db.collection("user").doc(uid).update({
                    ID: this.state.ID,
                })
            }

            if(this.state.homeAddress.length>0){
                db.collection("user").doc(uid).update({
                    home: this.state.home,
                })
            }

            if(this.state.schoolType !== ''){
                db.collection("user").doc(uid).update({
                    schoolType: this.state.schoolType,
                })
            }

            if(this.state.schoolName.length>0){
                db.collection("user").doc(uid).update({
                    schoolName: this.state.schoolName,
                })
            }

            if(this.state.sGroup.length>0){
                db.collection("user").doc(uid).update({
                    sGroup: this.state.sGroup,
                })
            }

            if(this.state.coachLevel !== ''){
                db.collection("user").doc(uid).update({
                    coachLevel: this.state.coachLevel,
                })
            }

            if(this.state.coachYear.length>0){
                db.collection("user").doc(uid).update({
                    coachYear: this.state.coachYear,
                })
            }
            
            if(this.state.judgeLevel !== ''){
                db.collection("user").doc(uid).update({
                    judgeLevel: this.state.judgeLevel,
                })
            }

            if(this.state.judgeYear.length>0){
                db.collection("user").doc(uid).update({
                    judgeYear: this.state.judgeYear,
                })
            }

        }else{
            this.setState({info:"ERROR"})
            setTimeout(function(){
                this.setState({info:""})
            }.bind(this),3000);
        }

    }
    
}
export default UpdatePersonalInfor;