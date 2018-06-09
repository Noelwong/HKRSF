import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import UpdateSchoolInfor from './UpdateSchoolInfor';
import AddSchoolMember from './AddSchoolMember';

class SchoolHome extends Component {
    constructor(props) {
        super(props);
        this.state={
            showContent:''
        }
    }

    selectShowContent = (showContent) =>{
        if(showContent != null){
            if(showContent === 'UpdateInformation'){
                return(<UpdateSchoolInfor/>)
        }else if(showContent ==='AddMember'){
            return(<AddSchoolMember/>)
        }
    }
}

    render(){
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a>SchoolHome</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <NavItem eventKey={1} onClick={() => this.setState({showContent:'UpdateInformation'})}>
                    Update Information
                     </NavItem>
                     <NavItem eventKey={2} onClick={() => this.setState({showContent:'AddMember'})}>
                     Add Student
                     </NavItem>
                    <Nav pullRight>
                        <NavItem eventKey={4} onClick={() => this.signOut()}>
                        登出<br />Sign Out
                     </NavItem>
                    </Nav>
                </Navbar>
                <br/>
                {this.selectShowContent(this.state.showContent)}
            </div>
        )
    }
    signOut() {
        firebaseApp.auth().signOut();
    }
    
}
export default SchoolHome;