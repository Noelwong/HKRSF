import React, { Component } from 'react';
import { db } from '../../firebase';

class SecachParticipant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PID: '',
        }
    }


    seach(){
        db.collection("competition").doc(sessionStorage.compID).collection('competitionItem').set({
            name: this.state.name,
            userType: this.state.userType
        });
     }

    render() {
        return (
            <div>
                參賽者編號:<br/>
                PID:
                <input type="text"
                     id="PID" 
                     onChange={event => this.setState({ UID: event.target.value })}
                     />
                     <br/>
                     <button
                    className="btn btn-success"
                    onClick={() => this.addnewUser()}
                >
                    Submit
                </button>
            </div>
        )

    }

    
}
export default SecachParticipant;