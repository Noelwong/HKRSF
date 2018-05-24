import React, { Component } from 'react';
import { firebaseApp,db } from '../../firebase';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class PersonalInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userType:'Personal',
            CName: '',
            EName: '',
            gender:'',
            BDate: moment(),
            ID: '',
            home:'',
            schoolType:'',
            schoolName:'',
            sGroup:'',
            coachLevel:'',
            coachYear:'',
            judgeLevel:'',
            judgeYear:'',
            error: {
                message: ''
            }
        }
        this.user = firebaseApp.auth().currentUser;

        this.handleChange = this.handleChange.bind(this);
        this.genderHandleChange = this.genderHandleChange.bind(this);
        this.schoolTypeHandleChange = this.schoolTypeHandleChange.bind(this);
        this.coachLevelHandleChange = this.coachLevelHandleChange.bind(this);
        this.judgeLevelHandleChange = this.judgeLevelHandleChange.bind(this);

    }
    


    handleChange(date) {
        this.setState({
            BDate: date,
        });
      }
    
      genderHandleChange(event) {
        this.setState({gender: event.target.value});
      }

      schoolTypeHandleChange(event) {
        this.setState({schoolType: event.target.value});
      }

      coachLevelHandleChange(event) {
        this.setState({coachLevel: event.target.value});
      }

      judgeLevelHandleChange(event) {
        this.setState({judgeLevel: event.target.value});
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
                     onChange={event => this.setState({ CName: event.target.value })}
                     /><br/>
                Name (English)
                <input type="text"
                    id="EName" 
                    placeholder="Name"  
                    onChange={event => this.setState({ EName: event.target.value })}
                    /><br/>
                性別<br/>
                Gender 
                <select id = "gender" value={this.state.gender} onChange={this.genderHandleChange} >
                    <option value ="">Please Select Your School type</option>
                    <option value ="male">男Male</option>
                    <option value="female">女Female</option>
                </select>
                <br/>
                出生日期<br/>
                Date of Birth
                <DatePicker
                        selected={this.state.BDate}
                        onChange={this.handleChange}
                        /><br/>
                身份證號碼<br/>
                Identification number
                <input type="text"
                     id="ID" 
                     placeholder="ID Number"  
                     onChange={event => this.setState({ ID: event.target.value })}
                     /><br/>
                住宅地址<br/>
                Home Address
                <input type="text"
                     id="home" 
                     placeholder="Home Addressr"  
                     onChange={event => this.setState({ home: event.target.value })}
                     /><br/>
                就讀學校<br/>
                Current school
                <select id = "schoolType" value={this.state.schoolType} onChange={this.schoolTypeHandleChange} >
                    <option value ="">Please Select Your School type</option>
                    <option value ="PSchool">小學Primary School</option>
                    <option value="SSchool">中學Secondary Schooll</option>
                    <option value="College">大專College</option>
                </select>
                <input type="text"
                     id="schoolName" 
                     placeholder="School Name" 
                     onChange={event => this.setState({ schoolName: event.target.value })} 
                     /><br/>
                所屬體育團體名稱<br/>
                The name of the sports group
                <input type="text"
                     id="sGroup" 
                     placeholder="Name"  
                     onChange={event => this.setState({ sGroup: event.target.value })} 
                     /><br/>
                教練資歷及考獲年份<br/>
                Coaching qualifications and years of study
                <select id = "coachLevel" value={this.state.coachLevel} onChange={this.coachLevelHandleChange}>
                    <option value ="">沒有 NULL</option>
                    <option value ="Junior">初級Junior</option>
                    <option value="Intermediate">中級Intermediate</option>
                    <option value="Advanced">高級Advanced</option>
                    <option value="Senior">資深Senior</option>
                </select>
                <input type="text"
                     id="coachYear" 
                     placeholder="Years of study"  
                     onChange={event => this.setState({ coachYear: event.target.value })} 
                     /><br/>
                裁判資歷及考獲年份<br/>
                Judge qualifications and years of study
                <select id = "judgeLevel" value={this.state.judgeLevel} onChange={this.judgeLevelHandleChange}>
                    <option value ="">沒有 NULL</option>
                    <option value ="Junior">初級Junior</option>
                    <option value="Intermediate">中級Intermediate</option>
                    <option value="Advanced">高級Advanced</option>
                    <option value="Senior">資深Senior</option>
                </select>
                <input type="text"
                     id="judgeYear" 
                     placeholder="Years of study" 
                     onChange={event => this.setState({ judgeYear: event.target.value })}  
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
            </div>
        )
    }
    signOut() {
        firebaseApp.auth().signOut();
    }

    addPersonalInfor(state) {
        const uid = this.user.uid;
        db.collection("user").doc(uid).set({
            userType:'Personal',
            CName: this.state.CName,
            EName: this.state.EName,
            gender: this.state.gender,
            BDate: new Date(this.state.BDate),
            ID: this.state.ID,
            home: this.state.home,
            schoolType: this.state.schoolType,
            schoolName: this.state.schoolName,
            sGroup: this.state.sGroup,
            coachLevel: this.state.coachLevel,
            coachYear: this.state.coachYear,
            judgeLevel: this.state.judgeLevel,
            judgeYear: this.state.judgeYear
        });
    }
    
}
export default PersonalInfor;