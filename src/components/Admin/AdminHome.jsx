import React, { Component } from 'react';
import { Link } from 'react-router';
import { firebaseApp } from '../../firebase';

class AdminHome extends Component {
    render(){
        return (
            <div>
                AdminHome
                <Link to={'/AddCompetition'}><button>Add Competition</button></Link>
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
export default AdminHome;