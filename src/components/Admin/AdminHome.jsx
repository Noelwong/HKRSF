import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

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
                            AdminHome
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1} onClick={() => this.handleChangeFormat()}>
                        FormatSetting
                     </NavItem>
                       
                        <NavDropdown eventKey={2} title="比賽Competition" id="basic-nav-dropdown">
                            <MenuItem eventKey={2.1} onClick={() => this.handleChangeAddcomp()}>Add Competition</MenuItem>
                            <MenuItem eventKey={2.2} href={'/CompetitionIndex'} >比賽主頁<br/>Competition Index</MenuItem>
                        </NavDropdown>           
                    </Nav>
                    <NavItem eventKey={3} onClick={() => this.handleChangeUser()}>
                        用戶管理<br/>User Management
                     </NavItem>
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