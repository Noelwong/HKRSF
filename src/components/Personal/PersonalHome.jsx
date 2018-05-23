import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';

class PersonalHome extends Component {
    render(){
        return (
            <div>PersonalHome
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
export default PersonalHome;