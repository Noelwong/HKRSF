import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import FormatSetting from './FormatSetting';
import AddCompetition from './AddCompetition';
import ShowComp from './ShowComp';
import AddCompItem from './AddCompItem';

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

    handleChangeShow() {
        this.setState({ showContent: 'ShowCompetition' })
    }

    handleChangeAdd() {
        this.setState({ showContent: 'AddCompItem' })
    }

    selectShowContent = (showContent) => {
        if (showContent != null) {
            if (showContent === 'FormatSetting') {
                return (<FormatSetting />)
            } else if (showContent === 'AddCompetition') {
                return (<AddCompetition />)
            } else if (showContent === 'ShowCompetition') {
                return (<ShowComp />)
            } else if (showContent === 'AddCompItem') {
                return (<AddCompItem />)
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
                            <MenuItem eventKey={2.2} onClick={() => this.handleChangeShow()}>Show Competition</MenuItem>
                            <MenuItem eventKey={2.3} onClick={() => this.handleChangeAdd()}>Add item</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={2.4}>Separated link</MenuItem>
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