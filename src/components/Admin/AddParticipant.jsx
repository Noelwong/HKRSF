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
            schoolName:''
        }
    
        this.getCompItem();
        this.CompItemHandleChange = this.CompItemHandleChange.bind(this);
    }

    date(date) {
        this.setState({BDate: date});
    }

    CompItemHandleChange(event) {
        this.setState({ selectedCompItem: event.target.value });
    }

    getCompItem(){
        db.collection('competition').doc('RXNe9XqYKTO0P9nzmHkx').collection('competitionItem').onSnapshot(coll => {
            const compItem = coll.docs.map(doc => doc.id)
            this.setState({ compItem })
        })
    }

    addParticipant(){
        return(
            <div>中文姓名:
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
            /></div>
        )
    }

    render() {
        return (
            <div>
                <select value={this.state.selectedCompItem} onChange={this.CompItemHandleChange}>
                    <option value='' >Please select 請選擇</option>
                    {this.state.compItem.map((topic, index) =>
                        <option value={topic} >{topic} </option>)}
                </select>
                <br/>
                {this.state.selectedCompItem}
                <br/>
                
            </div>
        )

    }

}
export default AddParticipant;