import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';

class SchoolHome extends Component {
    render(){
        return (
            <div>SchoolHome
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
export default SchoolHome;