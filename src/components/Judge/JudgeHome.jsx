import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class JudgeHome extends Component {
    render(){
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a>JudgeHome</a>
                        </Navbar.Brand>
                    </Navbar.Header>

                    <Nav pullRight>
                        <NavItem eventKey={4} onClick={() => this.signOut()}>
                        登出<br />Sign Out
                     </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
    signOut() {
        firebaseApp.auth().signOut();
    }
    
}
export default JudgeHome;