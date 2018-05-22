import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp, db } from '../../firebase';
import { Link } from 'react-router';

class AddCompetition extends Component {
    constructor(props) {
        super(props);
        this.competitionInfor = {
            competitionName: '',
            date: '',
            time: '',
            location: '',
            error: {
                message: ''
            }
        }

    }

    addCompetition(competitionInfor) {
        db.collection("competition").doc().set({
            name: this.competitionInfor.competitionName,
            date: this.competitionInfor.date,
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
                    <input type="text" id="date" placeholder="date"  />
                    <br></br>
                    Time:<br></br>
                    時間:<br></br>
                    <input type="text" id="time" placeholder="time"  />
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
            </div>
        )

    }

}
export default AddCompetition;