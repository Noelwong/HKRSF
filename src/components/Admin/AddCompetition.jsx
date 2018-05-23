import React, { Component } from 'react';
import { firebaseApp, db } from '../../firebase';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class AddCompetition extends Component {
    constructor(props) {
        super(props);
        this.competitionInfor = {
            competitionName: '',
            startDate: moment(),
            time: moment(),
            location: '',
            error: {
                message: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);

    }
    
    handleChange(date) {
        this.setState({
          startDate: date,
          time: date
        });
      }

    addCompetition(competitionInfor) {
        db.collection("competition").doc().set({
            name: this.competitionInfor.competitionName,
            date: this.competitionInfor.startDate,
            time: this.competitionInfor.time,
            location: this.competitionInfor.location
        })
    }

    render() {
        return (
            <div>
                <form>
                    Competition name:<br></br>
                    比賽名稱:<br></br>
                    <input type="text" id="competitionName" placeholder="Competition Name"  />
                    <br></br>
                    Date:<br></br>
                    日期:<br></br>
                    <DatePicker
                        selected={this.competitionInfor.startDate}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    Time:<br></br>
                    時間:<br></br>
                    <DatePicker
    selected={this.competitionInfor.time}
    onChange={this.handleChange}
    showTimeSelect
    showTimeSelectOnly
    timeIntervals={15}
    dateFormat="LT"
    timeCaption="Time"
/>
                    <br></br>
                    Location:<br></br>
                    地點:<br></br>
                    <input type="text" id="location"placeholder="location"  />
                </form>
                <button
                    className="btn btn-success"
                    type="button"
                    onClick={() => this.addCompetition(this.competitionInfor)}
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

}
export default AddCompetition;