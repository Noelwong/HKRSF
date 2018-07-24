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
            participantSetName : [],
            ArrayOfParticipantInItem:[]
        }
        ;
        this.Ref = db.collection('competition').doc(sessionStorage.compID);
        this.getAll();
        sessionStorage.compItemDetail = [];
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

        let ArrayOfParticipantInItem =[];
        db.collection('competition').doc(sessionStorage.compID).collection('competitionItem').onSnapshot(coll => {
            coll.forEach(doc=>{
                let tempArrayOfParticipantInItem = [];
                db.collection('competition').doc(sessionStorage.compID).collection('participant').onSnapshot(coll2 =>{
                    coll2.forEach(doc2 =>{
                        const tempUserCompetitionItem =doc2.data().user_CompetitionItem;
                        for (let i = 0; i < tempUserCompetitionItem.length;i++){
                            if(tempUserCompetitionItem[i]===doc.id){
                                tempArrayOfParticipantInItem.push(doc2.data().CName);
                            }
                        }
                    })
                });
                if(tempArrayOfParticipantInItem[0] === null){
                    ArrayOfParticipantInItem.push("No Participant");
                } else{
                    ArrayOfParticipantInItem.push(tempArrayOfParticipantInItem);
                }
            });
            // console.log(ArrayOfParticipantInItem);
            // console.log(this.state.ArrayOfParticipantInItem);
            // return ArrayOfParticipantInItem;

            // eslint-disable-next-line 
            this.state.ArrayOfParticipantInItem =ArrayOfParticipantInItem;

            console.log(sessionStorage.ArrayOfParticipantInItem)
        });

        sessionStorage.setItem("ArrayOfParticipantInItem", JSON.stringify(this.state.ArrayOfParticipantInItem));


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
                        <Link to={'/App'}>
                        比賽主頁
                        <br/>
                        Competition Index</Link>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1} onClick={() => this.FormathandleChange()}>
                        格式設定
                        <br/>
                        FormatSetting
                     </NavItem>
                       
                        <NavDropdown eventKey={2} title="比賽Competition" id="basic-nav-dropdown">
                            <MenuItem eventKey={2.1} onClick={() => this.handleChangeItem()}>增加比賽項目 <br/> Add Competition Item</MenuItem>
                            <MenuItem eventKey={2.2} onClick={() => this.handleDeleteItem()}>刪除比賽項目 <br/> Delete Competition Item</MenuItem>
                            <MenuItem eventKey={2.3} onClick={() => this.handleChangeAddParticipant()}>增加參賽者(比賽) <br/> Add Participant</MenuItem>
                            <MenuItem eventKey={2.4} onClick={() => this.handleShow()}>增加參賽者(比賽項目) <br/> Add player</MenuItem>
                            <MenuItem eventKey={2.5} onClick={() => this.handleShowPart()}>所有比賽項目 <br/> Show Competition Item</MenuItem>
                        </NavDropdown>   
                        {/* <NavItem eventKey={3} >
                            評判
                     </NavItem> */}
                     <NavItem eventKey={4} onClick={() => this.handleChangeScheduling()}>
                            排程
                            <br/>
                            Scheduling
                     </NavItem>     
                     <NavItem eventKey={5} onClick={() => this.handleTry()}>
                        參賽者QRcode
                        <br/>
                        Generate QRcode
                    </NavItem>
                        <NavItem eventKey={8} onClick={() => this.handleShowScore()}>
                        成績公佈
                        <br/>
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