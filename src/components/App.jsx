import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp, db } from '../firebase';
import { Link } from 'react-router';
import { QRCode } from 'react-qr-svg';


import JudgeHome from './Judge/JudgeHome';
import OrganizationHome from './Organization/OrganizationHome';
import AdminHome from './Admin/AdminHome';
import SchoolHome from './School/SchoolHome';
import PersonalHome from './Personal/PersonalHome';
import AddInfor from './AddInfor';
class App extends Component {

    constructor(props) {

        super(props);
        this.state={
            userType: '',
            jumppath: '',
            uid:''
        };
        
        this.user = firebaseApp.auth().currentUser;
        this.roleIdentifier(this.user);
    }

    roleIdentifier = (user) => {
        if (user != null) {

            const uid = this.user.uid;

            const uidInString = uid;
            const userRef = db.collection('user').doc(uidInString);
           
            userRef.get().then((documentSnapshot) => {

                // check and do something with the data here.
                if (documentSnapshot.exists) {
                    // do something with the data

                    if (documentSnapshot.data().userType === 'Admin') {
                        this.setState({userType: 'Admin', jumppath: '/AdminHome', uid: uidInString });
                        
                    }else if(documentSnapshot.data().userType === 'Organization'){
                        this.setState({userType: 'Organization', jumppath: '/OrganizationHome', uid: uidInString });
                        
                    }else if(documentSnapshot.data().userType === 'Judge'){
                        this.setState({userType: 'Judge', jumppath: '/JudgeHome', uid: uidInString });
                       
                    }else if(documentSnapshot.data().userType === 'Personal'){
                        this.setState({userType: 'Personal', jumppath: '/PersonalHome', uid: uidInString });
                        
                    }else if(documentSnapshot.data().userType === 'School'){
                        this.setState({userType: 'School', jumppath: '/SchoolHome', uid: uidInString });
                        
                    }
                }
                else
                    {
                    this.setState({jumppath: '/addinfor', uid: uidInString })
                    return(<AddInfor/>)
                }
            });
        }
    };

    roleBasePage = (userType) =>{
        if (userType != null) {
            if (userType === 'Personal') {
                return(<PersonalHome/>)
            } else if (userType === 'School') {
                return(<SchoolHome/>)
            } else if (userType === 'Organization') {
                return(<OrganizationHome/>)
            }else if (userType === 'Admin') {
                return(<AdminHome/>)
            }else if (userType === 'Judge') {
                return(<JudgeHome/>)
            }
        }else{
            return(<AddInfor/>)
        }
    }

    signOut() {
        firebaseApp.auth().signOut();
    }

    render() {

        return (
            <div>
                <h3>Home</h3>
                <div>Uid : <br/>
                    <QRCode
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    level="Q"
                    style={{ width: 128 }}
                    value={ this.state.uid }
                />
                </div>
                <div>User type :{this.state.userType}</div>
                <br/>
                 {this.roleBasePage(this.state.userType)}
                <br/>
                <button
                    className="btn btn-danger"
                    onClick={() => this.signOut()}
                >
                    Sign Out
                </button>

                <Link to={this.state.jumppath}>
                    <button type="button" class="btn btn-login float-right" >
                        Try
                    </button>
                </Link>
            </div>
        )
    }


}



function mapStateToProps(state) {
    console.log('state', state);
    return {}
}


export default connect(mapStateToProps, null)(App);