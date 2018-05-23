import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';

class OraganizationHome extends Component {
    render(){
        return (
            <div>OraganizationHome
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
export default OraganizationHome;