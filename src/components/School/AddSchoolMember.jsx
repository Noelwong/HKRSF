import React, { Component } from 'react';
import { firebaseApp, db } from '../../firebase';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class AddSchoolMember extends Component {
    constructor(props) {
        super(props);
        this.state={
        CName: '',
        EName: '',
        gender:'',
        BDate: moment(), 
        grade: ''
        }
        this.user = firebaseApp.auth().currentUser;
        this.handleChange = this.handleChange.bind(this);
        this.genderHandleChange = this.genderHandleChange.bind(this);
        this.gradeHandleChange = this.gradeHandleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            BDate: date,
        });
      }
      

    CName(event){
        this.setState({CName:event.target.value})
        var chineseName = /^[\u4e00-\u9fa5]{0,}$/;
        var val_CName = event.target.value;
        

        if(chineseName.test(val_CName)){
            this.setState({"checkCName":true})
            setTimeout(function(){
                this.setState({info_CName:""});
            }.bind(this), 1000);
        }else{ 
            this.setState({"checkCName":false})
            this.setState({info_CName:"請輸入正確的中文名字"});
        }
        
        this.setState({"val_CName":val_CName})
    }

    EName(event){
        this.setState({EName:event.target.value})
        var englishName = /^[A-Za-z]+$/;
        var val_EName = event.target.value;
        
        if(englishName.test(val_EName)){
            this.setState({"checkEName":true})
            setTimeout(function(){
                this.setState({info_EName:""});
            }.bind(this), 1000);
        }else{
            this.setState({"checkEName":false})
            this.setState({info_EName:"Please Input Correct English Name"})
        }
        this.setState({"val_EName":val_EName})
    }

    genderHandleChange(event) {
        this.setState({gender: event.target.value});
    }

    gradeHandleChange(event) {
        this.setState({grade: event.target.value});
    }

    render(){
        return (
            <div>
            <form>
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
                <select id = "gender" value={this.state.gender} onChange={this.genderHandleChange} >
                    <option value ="">Please Select Your Gender</option>
                    <option value ="male">男Male</option>
                    <option value="female">女Female</option>
                </select>
                <br/>
                出生日期<br/>
                Date of Birth
                <DatePicker
                        selected={this.state.BDate}
                        onChange={this.handleChange}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        /><br/>
                年級<br/>
                Grade
                <select id = "grade" value={this.state.grade} onChange={this.gradeHandleChange} >
                    <option value ="">Please Select the Grade</option>
                    <option value="p1">小一 Grade1</option>
                    <option value="p2">小二 Grade2</option>
                    <option value="p3">小三 Grade3</option>
                    <option value="p4">小四 Grade4</option>
                    <option value="p5">小五 Grade5</option>
                    <option value="p6">小六 Grade6</option>
                    <option value="s1">中一 Grade7</option>
                    <option value="s2">中二 Grade8</option>
                    <option value="s3">中三 Grade9</option>
                    <option value="s4">中四 Grade10</option>
                    <option value="s5">中五 Grade11</option>
                    <option value="s6">中六 Grade12</option>
                </select>
                </form>
                <br/>
                <button
                    className="btn btn-success"
                    onClick={() => this.addInfor(this.state)}    
                >
                    Submit
                </button>
                </div>
                
        )
    }
    addInfor(state) {
        
        if(this.state.checkCName === true && this.state.checkEName === true ){
        const uid = this.user.uid;
        db.collection("user").doc(uid).collection('members').doc().set({
            CName: this.state.CName,
            EName: this.state.EName,
            gender: this.state.gender,
            BDate: new Date(this.state.BDate),
            grade: this.state.grade
        });}else{
            this.setState({info:"ERROR"})
            setTimeout(function(){
                this.setState({info:""})
            }.bind(this),3000);
        }

    }

    
}
export default AddSchoolMember;