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
            endDate: moment(),
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
          endDate: date,
        });
      }

    addCompetition(competitionInfor) {
        
        db.collection("competition").doc().set({
            name: this.competitionInfor.competitionName,
            startDate: new Date(this.competitionInfor.startDate),
            endDate: new Date(this.competitionInfor.endDate),
            location: this.competitionInfor.location
        })
    }

    render() {
        return (
            <div>
                <form>
                    Competition name:<br></br>
                    比賽名稱:<br></br>
                    <input type="text"
                     id="CompetitionName" 
                     placeholder="Competition Name"  
                     onChange={event => this.setState({ competitionName: event.target.value })}
                     />
                    <br></br>
                    Start Date:<br></br>
                    開始日期:<br></br>
                    <DatePicker
                        selected={this.competitionInfor.startDate}
                        onChange={this.handleChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="LLL"
                        timeCaption="time"
                        />
                    <br></br>
                    <br></br>
                    End Date:<br></br>
                    結束日期:<br></br>
                    <DatePicker
                        selected={this.competitionInfor.endDate}
                        onChange={this.handleChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="LLL"
                        timeCaption="time"
                        />
                    <br></br>
                    Location:<br></br>
                    地點:<br></br>
                    <input type="text" id="Location"placeholder="location"  
                    onChange={event => this.setState({ location: event.target.value })}/>
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