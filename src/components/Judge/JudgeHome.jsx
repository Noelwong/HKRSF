import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';

class JudgeHome extends Component {
    render(){
        return (
            <div>JudgeHome
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
export default JudgeHome;