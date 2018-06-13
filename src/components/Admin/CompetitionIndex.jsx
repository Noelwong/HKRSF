import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { firebaseApp } from '../../firebase';

import ShowComp from './ShowComp';
import AddCompItem from './AddCompItem';
import AddParticipant from './AddParticipant'; 

class CompetitionIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showContent: ''
        }
    }

    selectShowContent = (showContent) => {
        if (showContent != null) {
            if (showContent === 'AddCompItem') {
                return (<AddCompItem />)
            } else if (showContent === 'AddParticipant') {
                return (<AddParticipant />)
            }
        }
    }

    handleChangeItem() {
        this.setState({ showContent: 'AddCompItem' })
    }

    handleChangeAddParticipant() {
        this.setState({ showContent: 'AddParticipant' })
    }
  
    render() {
        return (
                <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a>Competition Index</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1} >
                        FormatSetting
                     </NavItem>
                       
                        <NavDropdown eventKey={2} title="比賽Competition" id="basic-nav-dropdown">
                            <MenuItem eventKey={2.1} onClick={() => this.handleChangeItem()}>Add Competition Item</MenuItem>
                            <MenuItem eventKey={2.2} onClick={() => this.handleChangeAddParticipant()}>Add Participant</MenuItem>
                        </NavDropdown>           
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={4} onClick={() => this.signOut()}>
                        登出<br />Sign Out
                     </NavItem>
                    </Nav>
                </Navbar>
                <br />
                <ShowComp />
                <br />
                {this.selectShowContent(this.state.showContent)}
            </div>

        )
    }
    signOut() {
        firebaseApp.auth().signOut();
    }
}
export default CompetitionIndex;