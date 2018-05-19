import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp, db } from '../firebase';
import { Link } from 'react-router';


class App extends Component {
    constructor(props) {
        super(props);
        this.user = firebaseApp.auth().currentUser;
        if (this.user != null) {
            this.uid = this.user.uid;

            var uidInString = this.uid;
            var userRef = db.collection('user').doc(uidInString);

            userRef.get().then(function (documentSnapshot) {
                
                // check and do something with the data here.
                if (documentSnapshot.exists) {
                    // do something with the data
                    
                    if (documentSnapshot.data().userType = 'Admin') {
                        db.collection('user').doc("ok").set({ userType: 'admin' });
                    }else if(documentSnapshot.data().userType = 'Organization'){

                    }
                } else {
                    userRef.set({ userType: 'admin' });
                }
            });
        }
    }

    signOut() {
        firebaseApp.auth().signOut();
    }

    render() {
        
        return (
            <div>
                <h3> Goals</h3>
                <div>{this.uid}</div>
                <div>{this.userState}</div>
                <div>Add Goals </div>
                <div>Goal List</div>
                <button
                    className="btn btn-danger"
                    onClick={() => this.signOut()}
                >

                    Sign Out
                </button>
                <button type="button" class="btn btn-login float-right" ><Link to={'/AddCompetition'}>HIHI</Link></button>
            </div>
        )
    }


}



function mapStateToProps(state) {
    console.log('state', state);
    return {}
}


export default connect(mapStateToProps, null)(App);