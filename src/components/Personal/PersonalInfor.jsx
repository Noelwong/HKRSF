import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class PersonalInfor extends Component {
    constructor(props) {
        super(props);
        this.PersonalInfor = {
            CName: '',
            EName: '',
            BDate: moment(),
            ID: '',
            email:'',
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
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(date) {
        this.setState({
          startDate: date,
          endDate: date,
        });
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
                     /><br/>
                Name (English)
                <input type="text"
                    id="EName" 
                    placeholder="Name"  
                    /><br/>
                出生日期<br/>
                Date of Birth
                <DatePicker
                        selected={this.PersonalInfor.BDate}
                        onChange={this.handleChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="LLL"
                        timeCaption="time"
                        /><br/>
                身份證號碼<br/>
                Identification number
                <input type="text"
                     id="ID" 
                     placeholder="ID Number"  
                     /><br/>
                電郵地址<br/>
                Email Address
                <input type="text"
                     id="email" 
                     placeholder="Email Addressr"  
                     /><br/>
                住宅地址<br/>
                Home Address
                <input type="text"
                     id="home" 
                     placeholder="Home Addressr"  
                     /><br/>
                就讀學校<br/>
                Current school
                <select id = "schoolType" >
                    <option value ="dfv">Please Select Your School type</option>
                    <option value ="PSchool">小學Primary School</option>
                    <option value="SSchool">中學Secondary Schooll</option>
                    <option value="College">大專College</option>
                </select>
                <input type="text"
                     id="schoolName" 
                     placeholder="School Name"  
                     /><br/>
                所屬體育團體名稱<br/>
                The name of the sports group
                <input type="text"
                     id="sGroup" 
                     placeholder="Name"  
                     /><br/>
                教練資歷及考獲年份<br/>
                Coaching qualifications and years of study
                <select id = "coachLevel" >
                    <option value ="No">沒有 NULL</option>
                    <option value ="Junior">初級Junior</option>
                    <option value="Intermediate">中級Intermediate</option>
                    <option value="Advanced">高級Advanced</option>
                    <option value="Senior">資深Senior</option>
                </select>
                <input type="text"
                     id="coachYear" 
                     placeholder="Years of study"  
                     /><br/>
                裁判資歷及考獲年份<br/>
                Judge qualifications and years of study
                <select id = "judgeLevel" >
                    <option value ="No">沒有 NULL</option>
                    <option value ="Junior">初級Junior</option>
                    <option value="Intermediate">中級Intermediate</option>
                    <option value="Advanced">高級Advanced</option>
                    <option value="Senior">資深Senior</option>
                </select>
                <input type="text"
                     id="judgeYear" 
                     placeholder="Years of study"  
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
export default PersonalInfor;