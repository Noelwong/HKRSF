import React, { Component } from 'react';
import { db } from '../../firebase';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class AddCompetition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            competitionName: '',
            startDate: moment(),
            endDate: moment(),
            deadDate: moment(),
            location: '',
            error: {
                message: ''
            }
        }
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
        this.handleChangeDeadDate = this.handleChangeDeadDate.bind(this);

    }
    
    handleChangeStartDate(date) {
        this.setState({
          startDate: date,
        });
      }

      handleChangeEndDate(date) {
        this.setState({
          endDate: date,
        });
      }
      handleChangeDeadDate(date) {
        this.setState({
          deadDate: date,
        });
      }

    addCompetition(state) {
        
        db.collection("competition").doc().set({
            name: this.state.competitionName,
            startDate: new Date(this.state.startDate),
            endDate: new Date(this.state.endDate),
            deadDate: new Date(this.state.deadDate),
            location: this.state.location
        })
    }

    render() {
        return (
            <div>
                <form>
                    比賽名稱:<br/>
                    Competition name:<br/>
                    <input type="text"
                     id="CompetitionName" 
                     placeholder="Competition Name"  
                     onChange={event => this.setState({ competitionName: event.target.value })}
                     />
                    <br/>
                    開始日期:<br/>
                    Start Date:<br/>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChangeStartDate}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="LLL"
                        timeCaption="time"
                        />
                    <br/>
                    結束日期:<br/>
                    End Date:<br/>
                    <DatePicker
                        selected={this.state.endDate}
                        onChange={this.handleChangeEndDate}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="LLL"
                        timeCaption="time"
                        />
                    <br/>
                    地點:<br/>
                    Location:<br/>
                    <input type="text" id="Location"placeholder="location"  
                    onChange={event => this.setState({ location: event.target.value })}/>
                    <br/>
                    截止報名日期<br/>
                    Deadline for registration<br/>
                    <DatePicker
                        selected={this.state.deadDate}
                        onChange={this.handleChangeDeadDate}
                        />
                        <br/>
                </form>
                <button
                    className="btn btn-success"
                    type="button"
                    onClick={() => this.addCompetition(this.state)}
                >
                    Submit
                    </button>

            </div>
        )

    }

}
export default AddCompetition;