import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { firebaseApp } from '../../firebase';
import { Link } from 'react-router';

import ShowComp from './ShowComp';
import FormatSetting from './FormatSetting';
import AddCompItem from './AddCompItem';
import AddParticipant from './AddParticipant'; 
import SetPriority from './SetPriority';

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
            }else if (showContent === 'FormatSetting') {
                return (<FormatSetting />)
            }else if (showContent === 'scheduling') {
                return (<SetPriority />)
            }
        }
    }

    handleChangeScheduling(){
        this.setState({ showContent: 'scheduling' })
    }

    handleChangeItem() {
        this.setState({ showContent: 'AddCompItem' })
    }

    handleChangeAddParticipant() {
        this.setState({ showContent: 'AddParticipant' })
    }

    FormathandleChange() {
        this.setState({ showContent: 'FormatSetting' })
    }
  
    render() {
        return (
                <div>
                <Navbar>
                <Link to={'/App'}><Navbar.Header>
                        <Navbar.Brand>
                        Competition Index
                        </Navbar.Brand>
                    </Navbar.Header></Link>
                    <Nav>
                        <NavItem eventKey={1} onClick={() => this.FormathandleChange()}>
                        FormatSetting
                     </NavItem>
                       
                        <NavDropdown eventKey={2} title="比賽Competition" id="basic-nav-dropdown" >
                            <MenuItem eventKey={2.1} onClick={() => this.handleChangeItem()} >Add Competition Item</MenuItem>
                            <MenuItem eventKey={2.2} onClick={() => this.handleChangeAddParticipant()}>Add Participant</MenuItem>
                        </NavDropdown>   
                        <NavItem eventKey={3} >
                            評判
                     </NavItem>
                     <NavItem eventKey={4} onClick={() => this.handleChangeScheduling()}>
                            scheduling
                     </NavItem>      
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={5} onClick={() => this.signOut()}>
                        登出<br />Sign Out
                     </NavItem>
                    </Nav>
                </Navbar>
                <br />
                <ShowComp />
                <br />

                {this.selectShowContent(this.state.showContent)}
                <br/>
            
            </div>

        )
    }
    signOut() {
        firebaseApp.auth().signOut();
    }
}
export default CompetitionIndex;