import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';

import FormatSetting from './FormatSetting';
import AddCompetition from './AddCompetition';


class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showContent: ''
        }
    }

    handleChangeFormat() {
        this.setState({ showContent: 'FormatSetting' })
    }

    handleChangeAddcomp() {
        this.setState({ showContent: 'AddCompetition' })
    }

    selectShowContent = (showContent) => {
        if (showContent != null) {
            if (showContent === 'FormatSetting') {
                return (<FormatSetting />)
            } else if (showContent === 'AddCompetition') {
                return (<AddCompetition />)
            }
        }
    }

    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a>AdminHome</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1} onClick={() => this.handleChangeFormat()}>
                        FormatSetting
                     </NavItem>
                       
                        <NavDropdown eventKey={2} title="比賽Competition" id="basic-nav-dropdown">
                            <MenuItem eventKey={2.1} onClick={() => this.handleChangeAddcomp()}>Add Competition</MenuItem>
                            <Link to={'/CompetitionIndex'}><MenuItem eventKey={2.2}>比賽主頁<br/>Competition Index</MenuItem></Link>
                        </NavDropdown>           
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={4} onClick={() => this.signOut()}>
                        登出<br />Sign Out
                     </NavItem>
                    </Nav>
                </Navbar>
                <br />
                {this.selectShowContent(this.state.showContent)}
            </div >

        )
    }
    signOut() {
        firebaseApp.auth().signOut();
    }

}
export default AdminHome;