import React, { Component } from 'react';
import { db } from '../../firebase';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class AddParticipant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compItem:[],
            selectedCompItem:'',
            CName:'',
            EName:'',
            BDate:moment(),
            schoolName:'',
            ID:'',
            Limit:''
        }
        this.Ref = db.collection('competition').doc(sessionStorage.compID).collection('competitionItem');
        this.getCompItem();
        this.CompItemHandleChange = this.CompItemHandleChange.bind(this);

    }

    date(date) {
        this.setState({BDate: date});
    }

    CompItemHandleChange(event) {
        this.setState({ selectedCompItem: event.target.value });
        this.getCompLimit(event.target.value);
    }

    getCompItem(){
        this.Ref.onSnapshot(coll => {
            const compItem = coll.docs.map(doc => doc.id);
            this.setState({ compItem })
        })
    }

    getCompLimit(selectedcompItem){
        console.log(selectedcompItem);
        db.collection('competition').doc(sessionStorage.compID).collection('competitionItem').onSnapshot( coll => {
            const temp = coll.docs.map(doc => doc.id);
            const temp2 = coll.docs.map(doc => doc.data().numOfPeople);
            for (var i =0;i <= temp.length;i++)
            {
                if ( selectedcompItem === temp[i])
                {
                    var numberOfpeopleChecker = temp2[i];
                    // eslint-disable-next-line 
                    db.collection('competitionFormat').doc('competitionItem').collection('numOfPeople').onSnapshot(coll =>{
                        const temp3 = coll.docs.map(doc => doc.id);
                        const temp4 = coll.docs.map(doc => doc.data().limit);
                        for(var i= 0 ;i<= temp3.length;i++ ){
                            if ( numberOfpeopleChecker === temp3[i] ) {
                                this.setState({Limit : temp4[i]});
                            }
                        }
                    })
                }
            }
            })


        
    }

    addParticipant(state){
        db.collection("competition").doc(sessionStorage.compID).collection("participant").doc().set({
            CName: this.state.CName,
            EName: this.state.EName,
            BDate: new Date(this.state.BDate),
            schoolName: this.state.schoolName,
            ID: this.state.ID,
            user_CompetitionItem: [],
            teamCode:[],
            activate:false
        });

    }

        createParticipant (){
            let Participant1 =<div>
                <br/>
                中文姓名:
                <input type="text"
                       placeholder="中文姓名"
                       onChange={event => this.setState({ CName: event.target.value })}
                />
                <br/>
                Name in English:
                <input type="text"
                       placeholder="Name in English"
                       onChange={event => this.setState({ EName: event.target.value })}
                />
                <br/>
                出生日期:<br/>
                Date of Birth:
                <DatePicker
                    selected={this.state.BDate}
                    onChange={this.date.bind(this)}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                /><br/>
                學校名稱: <br/>
                School Name:
                <input type="text"
                       placeholder="學校名稱 School Name"
                       onChange={event => this.setState({ schoolName: event.target.value })}
                />
                <br/>
                身份證號碼:<br/>
                ID:
                <input type="text"
                       placeholder="ID number"
                       onChange={event => this.setState({ ID: event.target.value })}
                />
                <br/>
                <br/>
        </div>;
                return Participant1;
        }

    render() {
        return (
            <div>
                {this.createParticipant()}

            <button
                    className="btn btn-success"
                    type="button"
                    onClick={() => this.addParticipant(this.state)}
                >
                    Submit
                    </button>
            </div>
        )

    }

}
export default AddParticipant;



/* let Participant2 =
                <div>
                <br/>
                中文姓名:
                <input type="text"
                       placeholder="中文姓名"
                       onChange={event => this.setState({ CName: event.target.value })}
                />
                <br/>
                Name in English:
                <input type="text"
                       placeholder="Name in English"
                       onChange={event => this.setState({ EName: event.target.value })}
                />
                <br/>
                出生日期:<br/>
                Date of Birth:
                <DatePicker
                    selected={this.state.BDate}
                    onChange={this.date.bind(this)}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                /><br/>
                學校名稱: <br/>
                School Name:
                <input type="text"
                       placeholder="學校名稱 School Name"
                       onChange={event => this.setState({ schoolName: event.target.value })}
                />
                <br/>
                身份證號碼:<br/>
                ID:
                <input type="text"
                       placeholder="ID number"
                       onChange={event => this.setState({ ID: event.target.value })}
                />
                <br/>
                <br/>
                <br/>
                中文姓名:
                <input type="text"
                       placeholder="中文姓名"
                       onChange={event => this.setState({ CName: event.target.value })}
                />
                <br/>
                Name in English:
                <input type="text"
                       placeholder="Name in English"
                       onChange={event => this.setState({ EName: event.target.value })}
                />
                <br/>
                出生日期:<br/>
                Date of Birth:
                <DatePicker
                    selected={this.state.BDate}
                    onChange={this.date.bind(this)}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                /><br/>
                學校名稱: <br/>
                School Name:
                <input type="text"
                       placeholder="學校名稱 School Name"
                       onChange={event => this.setState({ EName: event.target.value })}
                />
                <br/>
                身份證號碼:<br/>
                ID:
                <input type="text"
                       placeholder="ID number"
                       onChange={event => this.setState({ ID: event.target.value })}
                />
                <br/>
                <br/>
            </div>;

            let Participant3 =
                <div>
                    <br/>
                    中文姓名:
                    <input type="text"
                           placeholder="中文姓名"
                           onChange={event => this.setState({ CName: event.target.value })}
                    />
                    <br/>
                    Name in English:
                    <input type="text"
                           placeholder="Name in English"
                           onChange={event => this.setState({ EName: event.target.value })}
                    />
                    <br/>
                    出生日期:<br/>
                    Date of Birth:
                    <DatePicker
                        selected={this.state.BDate}
                        onChange={this.date.bind(this)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                    /><br/>
                    學校名稱: <br/>
                    School Name:
                    <input type="text"
                           placeholder="學校名稱 School Name"
                           onChange={event => this.setState({ schoolName: event.target.value })}
                    />
                    <br/>
                    身份證號碼:<br/>
                    ID:
                    <input type="text"
                           placeholder="ID number"
                           onChange={event => this.setState({ ID: event.target.value })}
                    />
                    <br/>
                    <br/>

                    <br/>
                    中文姓名:
                    <input type="text"
                           placeholder="中文姓名"
                           onChange={event => this.setState({ CName: event.target.value })}
                    />
                    <br/>
                    Name in English:
                    <input type="text"
                           placeholder="Name in English"
                           onChange={event => this.setState({ EName: event.target.value })}
                    />
                    <br/>
                    出生日期:<br/>
                    Date of Birth:
                    <DatePicker
                        selected={this.state.BDate}
                        onChange={this.date.bind(this)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                    /><br/>
                    學校名稱: <br/>
                    School Name:
                    <input type="text"
                           placeholder="學校名稱 School Name"
                           onChange={event => this.setState({ schoolName: event.target.value })}
                    />
                    <br/>
                    身份證號碼:<br/>
                    ID:
                    <input type="text"
                           placeholder="ID number"
                           onChange={event => this.setState({ ID: event.target.value })}
                    />
                    <br/>
                    <br/>
                    <br/>
                    中文姓名:
                    <input type="text"
                           placeholder="中文姓名"
                           onChange={event => this.setState({ CName: event.target.value })}
                    />
                    <br/>
                    Name in English:
                    <input type="text"
                           placeholder="Name in English"
                           onChange={event => this.setState({ EName: event.target.value })}
                    />
                    <br/>
                    出生日期:<br/>
                    Date of Birth:
                    <DatePicker
                        selected={this.state.BDate}
                        onChange={this.date.bind(this)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                    /><br/>
                    學校名稱: <br/>
                    School Name:
                    <input type="text"
                           placeholder="學校名稱 School Name"
                           onChange={event => this.setState({ schoolName: event.target.value })}
                    />
                    <br/>
                    身份證號碼:<br/>
                    ID:
                    <input type="text"
                           placeholder="ID number"
                           onChange={event => this.setState({ ID: event.target.value })}
                    />
                    <br/>
                    <br/>
                </div>;


            let Participant4 =
                <div>
                    <br/>
                    中文姓名:
                    <input type="text"
                           placeholder="中文姓名"
                           onChange={event => this.setState({ CName: event.target.value })}
                    />
                    <br/>
                    Name in English:
                    <input type="text"
                           placeholder="Name in English"
                           onChange={event => this.setState({ EName: event.target.value })}
                    />
                    <br/>
                    出生日期:<br/>
                    Date of Birth:
                    <DatePicker
                        selected={this.state.BDate}
                        onChange={this.date.bind(this)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                    /><br/>
                    學校名稱: <br/>
                    School Name:
                    <input type="text"
                           placeholder="學校名稱 School Name"
                           onChange={event => this.setState({ schoolName: event.target.value })}
                    />
                    <br/>
                    身份證號碼:<br/>
                    ID:
                    <input type="text"
                           placeholder="ID number"
                           onChange={event => this.setState({ ID: event.target.value })}
                    />
                    <br/>
                    <br/>

                    <br/>
                    中文姓名:
                    <input type="text"
                           placeholder="中文姓名"
                           onChange={event => this.setState({ CName: event.target.value })}
                    />
                    <br/>
                    Name in English:
                    <input type="text"
                           placeholder="Name in English"
                           onChange={event => this.setState({ EName: event.target.value })}
                    />
                    <br/>
                    出生日期:<br/>
                    Date of Birth:
                    <DatePicker
                        selected={this.state.BDate}
                        onChange={this.date.bind(this)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                    /><br/>
                    學校名稱: <br/>
                    School Name:
                    <input type="text"
                           placeholder="學校名稱 School Name"
                           onChange={event => this.setState({ schoolName: event.target.value })}
                    />
                    <br/>
                    身份證號碼:<br/>
                    ID:
                    <input type="text"
                           placeholder="ID number"
                           onChange={event => this.setState({ ID: event.target.value })}
                    />
                    <br/>
                    <br/>
                    <br/>
                    中文姓名:
                    <input type="text"
                           placeholder="中文姓名"
                           onChange={event => this.setState({ CName: event.target.value })}
                    />
                    <br/>
                    Name in English:
                    <input type="text"
                           placeholder="Name in English"
                           onChange={event => this.setState({ EName: event.target.value })}
                    />
                    <br/>
                    出生日期:<br/>
                    Date of Birth:
                    <DatePicker
                        selected={this.state.BDate}
                        onChange={this.date.bind(this)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                    /><br/>
                    學校名稱: <br/>
                    School Name:
                    <input type="text"
                           placeholder="學校名稱 School Name"
                           onChange={event => this.setState({ schoolName: event.target.value })}
                    />
                    <br/>
                    身份證號碼:<br/>
                    ID:
                    <input type="text"
                           placeholder="ID number"
                           onChange={event => this.setState({ ID: event.target.value })}
                    />
                    <br/>
                    <br/>
                    <br/>
                    中文姓名:
                    <input type="text"
                           placeholder="中文姓名"
                           onChange={event => this.setState({ CName: event.target.value })}
                    />
                    <br/>
                    Name in English:
                    <input type="text"
                           placeholder="Name in English"
                           onChange={event => this.setState({ EName: event.target.value })}
                    />
                    <br/>
                    出生日期:<br/>
                    Date of Birth:
                    <DatePicker
                        selected={this.state.BDate}
                        onChange={this.date.bind(this)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                    /><br/>
                    學校名稱: <br/>
                    School Name:
                    <input type="text"
                           placeholder="學校名稱 School Name"
                           onChange={event => this.setState({ EName: event.target.value })}
                    />
                    <br/>
                    身份證號碼:<br/>
                    ID:
                    <input type="text"
                           placeholder="ID number"
                           onChange={event => this.setState({ ID: event.target.value })}
                    />
                    <br/>
                    <br/>
                </div>;

            let Participant8 =
                <div>
                    <br/>
                    中文姓名:
                    <input type="text"
                           placeholder="中文姓名"
                           onChange={event => this.setState({ CName: event.target.value })}
                    />
                    <br/>
                    Name in English:
                    <input type="text"
                           placeholder="Name in English"
                           onChange={event => this.setState({ EName: event.target.value })}
                    />
                    <br/>
                    出生日期:<br/>
                    Date of Birth:
                    <DatePicker
                        selected={this.state.BDate}
                        onChange={this.date.bind(this)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                    /><br/>
                    學校名稱: <br/>
                    School Name:
                    <input type="text"
                           placeholder="學校名稱 School Name"
                           onChange={event => this.setState({ schoolName: event.target.value })}
                    />
                    <br/>
                    身份證號碼:<br/>
                    ID:
                    <input type="text"
                           placeholder="ID number"
                           onChange={event => this.setState({ ID: event.target.value })}
                    />
                    <br/>
                    <br/>

                    <br/>
                    中文姓名:
                    <input type="text"
                           placeholder="中文姓名"
                           onChange={event => this.setState({ CName: event.target.value })}
                    />
                    <br/>
                    Name in English:
                    <input type="text"
                           placeholder="Name in English"
                           onChange={event => this.setState({ EName: event.target.value })}
                    />
                    <br/>
                    出生日期:<br/>
                    Date of Birth:
                    <DatePicker
                        selected={this.state.BDate}
                        onChange={this.date.bind(this)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                    /><br/>
                    學校名稱: <br/>
                    School Name:
                    <input type="text"
                           placeholder="學校名稱 School Name"
                           onChange={event => this.setState({ schoolName: event.target.value })}
                    />
                    <br/>
                    身份證號碼:<br/>
                    ID:
                    <input type="text"
                           placeholder="ID number"
                           onChange={event => this.setState({ ID: event.target.value })}
                    />
                    <br/>
                    <br/>
                    <br/>
                    中文姓名:
                    <input type="text"
                           placeholder="中文姓名"
                           onChange={event => this.setState({ CName: event.target.value })}
                    />
                    <br/>
                    Name in English:
                    <input type="text"
                           placeholder="Name in English"
                           onChange={event => this.setState({ EName: event.target.value })}
                    />
                    <br/>
                    出生日期:<br/>
                    Date of Birth:
                    <DatePicker
                        selected={this.state.BDate}
                        onChange={this.date.bind(this)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                    /><br/>
                    學校名稱: <br/>
                    School Name:
                    <input type="text"
                           placeholder="學校名稱 School Name"
                           onChange={event => this.setState({ schoolName: event.target.value })}
                    />
                    <br/>
                    身份證號碼:<br/>
                    ID:
                    <input type="text"
                           placeholder="ID number"
                           onChange={event => this.setState({ ID: event.target.value })}
                    />
                    <br/>
                    <br/>
                    <br/>
                    中文姓名:
                    <input type="text"
                           placeholder="中文姓名"
                           onChange={event => this.setState({ CName: event.target.value })}
                    />
                    <br/>
                    Name in English:
                    <input type="text"
                           placeholder="Name in English"
                           onChange={event => this.setState({ EName: event.target.value })}
                    />
                    <br/>
                    出生日期:<br/>
                    Date of Birth:
                    <DatePicker
                        selected={this.state.BDate}
                        onChange={this.date.bind(this)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                    /><br/>
                    學校名稱: <br/>
                    School Name:
                    <input type="text"
                           placeholder="學校名稱 School Name"
                           onChange={event => this.setState({ schoolName: event.target.value })}
                    />
                    <br/>
                    身份證號碼:<br/>
                    ID:
                    <input type="text"
                           placeholder="ID number"
                           onChange={event => this.setState({ ID: event.target.value })}
                    />
                    <br/>
                    <br/>
                    <br/>
                    中文姓名:
                    <input type="text"
                           placeholder="中文姓名"
                           onChange={event => this.setState({ CName: event.target.value })}
                    />
                    <br/>
                    Name in English:
                    <input type="text"
                           placeholder="Name in English"
                           onChange={event => this.setState({ EName: event.target.value })}
                    />
                    <br/>
                    出生日期:<br/>
                    Date of Birth:
                    <DatePicker
                        selected={this.state.BDate}
                        onChange={this.date.bind(this)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                    /><br/>
                    學校名稱: <br/>
                    School Name:
                    <input type="text"
                           placeholder="學校名稱 School Name"
                           onChange={event => this.setState({ schoolName: event.target.value })}
                    />
                    <br/>
                    身份證號碼:<br/>
                    ID:
                    <input type="text"
                           placeholder="ID number"
                           onChange={event => this.setState({ ID: event.target.value })}
                    />
                    <br/>
                    <br/>
                    <br/>
                    中文姓名:
                    <input type="text"
                           placeholder="中文姓名"
                           onChange={event => this.setState({ CName: event.target.value })}
                    />
                    <br/>
                    Name in English:
                    <input type="text"
                           placeholder="Name in English"
                           onChange={event => this.setState({ EName: event.target.value })}
                    />
                    <br/>
                    出生日期:<br/>
                    Date of Birth:
                    <DatePicker
                        selected={this.state.BDate}
                        onChange={this.date.bind(this)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                    /><br/>
                    學校名稱: <br/>
                    School Name:
                    <input type="text"
                           placeholder="學校名稱 School Name"
                           onChange={event => this.setState({ schoolName: event.target.value })}
                    />
                    <br/>
                    身份證號碼:<br/>
                    ID:
                    <input type="text"
                           placeholder="ID number"
                           onChange={event => this.setState({ ID: event.target.value })}
                    />
                    <br/>
                    <br/><select value={this.state.selectedCompItem} onChange={this.CompItemHandleChange}>
                        <option key='' >Please select 請選擇</option>
                        {this.state.compItem.map((topic, index) =>
                            <option key={topic} >{topic} </option>)}
                    </select>
                    <br/>

                    {this.state.selectedCompItem}
                    <br/>
                    {this.state.Limit}
                    <br/>
                    中文姓名:
                    <input type="text"
                           placeholder="中文姓名"
                           onChange={event => this.setState({ CName: event.target.value })}
                    />
                    <br/>
                    Name in English:
                    <input type="text"
                           placeholder="Name in English"
                           onChange={event => this.setState({ EName: event.target.value })}
                    />
                    <br/>
                    出生日期:<br/>
                    Date of Birth:
                    <DatePicker
                        selected={this.state.BDate}
                        onChange={this.date.bind(this)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                    /><br/>
                    學校名稱: <br/>
                    School Name:
                    <input type="text"
                           placeholder="學校名稱 School Name"
                           onChange={event => this.setState({ schoolName: event.target.value })}
                    />
                    <br/>
                    身份證號碼:<br/>
                    ID:
                    <input type="text"
                           placeholder="ID number"
                           onChange={event => this.setState({ ID: event.target.value })}
                    />
                    <br/>
                    <br/><select value={this.state.selectedCompItem} onChange={this.CompItemHandleChange}>
                        <option key='' >Please select 請選擇</option>
                        {this.state.compItem.map((topic, index) =>
                            <option key={topic} >{topic} </option>)}
                    </select>
                    <br/>

                    {this.state.selectedCompItem}
                    <br/>
                    {this.state.Limit}
                    <br/>
                    中文姓名:
                    <input type="text"
                           placeholder="中文姓名"
                           onChange={event => this.setState({ CName: event.target.value })}
                    />
                    <br/>
                    Name in English:
                    <input type="text"
                           placeholder="Name in English"
                           onChange={event => this.setState({ EName: event.target.value })}
                    />
                    <br/>
                    出生日期:<br/>
                    Date of Birth:
                    <DatePicker
                        selected={this.state.BDate}
                        onChange={this.date.bind(this)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                    /><br/>
                    學校名稱: <br/>
                    School Name:
                    <input type="text"
                           placeholder="學校名稱 School Name"
                           onChange={event => this.setState({ schoolName: event.target.value })}
                    />
                    <br/>
                    身份證號碼:<br/>
                    ID:
                    <input type="text"
                           placeholder="ID number"
                           onChange={event => this.setState({ ID: event.target.value })}
                    />
                    <br/>
                    <br/>
                </div>; */