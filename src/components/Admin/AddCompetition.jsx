import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp, db } from '/Users/user/HKRSF/src/firebase.js';
import { Link } from 'react-router';

class AddCompetition extends Component {
    constructor(props){
        super(props);
        this.competitionInfor= {
            competitionName: '',
            date: '',
            time: '',
            location: '',
            error: {
                message: ''
            }
        }
    }

    addCompetition(){

    }

    render(){
        return (
            <div>
                <form>
            Competition name:<br></br>
            比賽名稱:<br></br>
            <input type="text" name="competitionName" />
            <br></br>
            Date:<br></br>
            日期:<br></br>
            <input type="text" name="date" />
            <br></br>
            Time:<br></br>
            時間:<br></br>
            <input type="text" name="time" />
            <br></br>
            Location:<br></br>
            地點:<br></br>
            <input type="text" name="location" />

            
          </form>
          </div>
        )
    }
    
}
export default AddCompetition;