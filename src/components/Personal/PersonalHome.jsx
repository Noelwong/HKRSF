import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { firebaseApp } from '../../firebase';

import UpdatePersonalInfor from './UpdatePersonalInfor';
import ShowCompPersonal from './ShowCompPersonal';


class PersonalHome extends Component {
    constructor(props) {
        super(props);
        this.state={
            showContent:''
        }
    }

    selectShowContent = (showContent) =>{
        if(showContent != null){
            if(showContent === 'UpdateInformation'){
                return(<UpdatePersonalInfor/>)
        }
        else if(showContent ==='ShowComp'){
                return (<ShowCompPersonal/>)
            }
    }
}

    render(){
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                        主頁
                        <br/>
                            <a>PersonalHome</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                    <NavItem eventKey={1} onClick={() => this.setState({showContent:'UpdateInformation'})}>
                    更新個人資料
                    <br/>
                    Update Information
                     </NavItem>
                     <NavItem eventKey={2} onClick={() => this.setState({showContent: 'ShowComp'})}>
                     所有比賽
                     <br/>
                     Show Competition
                     </NavItem>
                     </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={3} onClick={() => this.signOut()}>
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
export default PersonalHome;