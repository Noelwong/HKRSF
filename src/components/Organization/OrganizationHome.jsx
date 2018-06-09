import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import UpdateOrganizationInfor from './UpdateOrganizationInfor';
import AddOrgMember from './AddOrgMember';

class OraganizationHome extends Component {
    constructor(props) {
        super(props);
        this.state={
            showContent:''
        }
    }

    selectShowContent = (showContent) =>{
        if(showContent != null){
            if(showContent === 'UpdateInformation'){
                return(<UpdateOrganizationInfor/>)
        }else if(showContent ==='AddMember'){
            return(<AddOrgMember/>)
        }
    }
}

    render(){
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a>OraganizationHome</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <NavItem eventKey={1} onClick={() => this.setState({showContent:'UpdateInformation'})}>
                    Update Information
                     </NavItem>
                     <NavItem eventKey={2} onClick={() => this.setState({showContent:'AddMember'})}>
                     Add member
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
export default OraganizationHome;