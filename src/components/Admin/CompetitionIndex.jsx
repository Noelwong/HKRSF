import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import {db, firebaseApp} from '../../firebase';
import { Link } from 'react-router';

import FormatSetting from './FormatSetting';
import AddCompItem from './AddCompItem';
import AddParticipant from './AddParticipant'; 
import SetPriority from './SetPriority';
import EnterGame from './EnterGame';
import DeleteCompItem from './DeleteCompItem';
import ShowPart from './ShowParticipant';
import Score from './ShowScore';
import QR from './GenQR';

class CompetitionIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showContent: '',
            participantSetID :[],
            participantSetName : []
        };
        this.Ref = db.collection('competition').doc(sessionStorage.compID);
        this.getAll();
    }

    getAll(){
        this.Ref.collection('competitionItem').onSnapshot(coll => {
            const compItem = coll.docs.map(doc => doc.id);
            // eslint-disable-next-line
            sessionStorage.setItem("compItem", JSON.stringify(compItem));

        });

        this.Ref.collection('participant').onSnapshot(coll => {
            const participant = coll.docs.map(doc => doc.data().CName);
            // eslint-disable-next-line
            sessionStorage.setItem("participant", JSON.stringify(participant));

    });
        let localparticipantSetID = [];
        let localparticipantSetName = [];
        this.Ref.collection('participant').get()
            .then(onSnapshot => {
                    onSnapshot.forEach(doc => {
                        localparticipantSetID.push(doc.id);
                        localparticipantSetName.push(doc.data().CName);

                    })
                }
            );
        // eslint-disable-next-line
        this.state.participantSetID = localparticipantSetID ;
        // eslint-disable-next-line
        this.state.participantSetName = localparticipantSetName ;
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
            }else if (showContent === 'show') {
                return (<EnterGame />)
            }else if (showContent === 'DecCompItem') {
                return (<DeleteCompItem />)
            }else if (showContent === 'showPart') {
                return (<ShowPart />)
            }else if (showContent ==='Score') {
                return (<Score />)
            }else if (showContent ==='Try') {
                return (<QR />)
            }
        }
    };

    handleShow() {
        this.setState({ showContent: 'show' });
        sessionStorage.setItem("participantSetID", JSON.stringify(this.state.participantSetID));
        sessionStorage.setItem("participantSetName", JSON.stringify( this.state.participantSetName));
        console.log(sessionStorage.participantSetID);
        console.log(sessionStorage.participantSetName);
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
    
    handleDeleteItem(){
        this.setState({ showContent: 'DecCompItem' })
    }

    FormathandleChange() {
        this.setState({ showContent: 'FormatSetting' })
    }
  
    handleShowPart() {
        this.setState({ showContent: 'showPart' })
    }

    handleShowScore() {
        this.setState({ showContent: 'Score' })
    }

    handleTry(){
        this.setState({ showContent: 'Try' })
    }

    render() {
        return (
                <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                        <Link to={'/App'}>Competition Index</Link>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1} onClick={() => this.FormathandleChange()}>
                        FormatSetting
                     </NavItem>
                       
                        <NavDropdown eventKey={2} title="比賽Competition" id="basic-nav-dropdown">
                            <MenuItem eventKey={2.1} onClick={() => this.handleChangeItem()}>Add Competition Item</MenuItem>
                            <MenuItem eventKey={2.2} onClick={() => this.handleDeleteItem()}>Delete Competition Item</MenuItem>
                            <MenuItem eventKey={2.3} onClick={() => this.handleChangeAddParticipant()}>Add Participant</MenuItem>
                            <MenuItem eventKey={2.4} onClick={() => this.handleShow()}>Add player</MenuItem>
                            <MenuItem eventKey={2.5} onClick={() => this.handleShowPart()}>Show Competition Item</MenuItem>
                        </NavDropdown>   
                        {/* <NavItem eventKey={3} >
                            評判
                     </NavItem> */}
                     <NavItem eventKey={4} onClick={() => this.handleChangeScheduling()}>
                            scheduling
                     </NavItem>     
                     <NavItem eventKey={5} onClick={() => this.handleTry()}>
                        try
                    </NavItem>
                        <NavItem eventKey={8} onClick={() => this.handleShowScore()}>
                            Show Score
                        </NavItem>

                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={6} onClick={() => this.signOut()}>
                        登出<br />Sign Out
                     </NavItem>
                    </Nav>
                </Navbar>
                <br />
                {this.selectShowContent(this.state.showContent)}
                <br/>
                 {this.getAll()}
            </div>

        )
    }
    signOut() {
        firebaseApp.auth().signOut();
    }
}
export default CompetitionIndex;