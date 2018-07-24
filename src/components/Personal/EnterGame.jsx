import React, { Component } from 'react';
import {db, firebaseApp} from '../../firebase';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Column, Row } from 'simple-flexbox';

import '../../css/Form.css'

const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, index) => index).map(index => ({
        id: `item-${index + offset}`,
        content: `item ${index + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

/**
 * Moves an item from one list to another list.
 */



class EnterGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participantName: '',
            compItemName: '',
            allParticipant: [],
            allCompItem: [],
            items: [],
            // selected: [],
            newParticipant: [],
            participantSetID: [],
            participantSetName: [],
            Limit: ''
        };
        this.Ref = db.collection('competition').doc(sessionStorage.compID);
        this.getAll();
        this.handleSelectParticipant = this.handleSelectParticipant.bind(this);
        this.handleSelectComp = this.handleSelectComp.bind(this);
        this.submitButton = this.submitButton.bind(this);
        this.checkDuplicates = this.checkDuplicates.bind(this);



    };

    getAll() {
        let tempCompItem = sessionStorage.getItem("compItem");
        // console.log(sessionStorage.participant);
        // eslint-disable-next-line
        this.state.allCompItem = JSON.parse(tempCompItem);
        /*   const setComp = JSON.parse(tempCompItem);
        this.state.items = setComp.map((k,i) => ({
      id: `${k}`,
      content: setComp[i]
  }))*/

        db.collection('competition').doc(sessionStorage.compID).collection('participant').where("uid","==", firebaseApp.auth().currentUser.uid).get().then(snapshot=>{
           snapshot.forEach(doc =>{
               this.state.items.id= doc.id;
               this.state.items.content =doc.data().CName;

           });
            console.log(this.state.items);

        });

        /*  let tempParticipant = sessionStorage.getItem("participant");
          console.log(tempParticipant)
          const setP = JSON.parse(tempParticipant);
          this.state.allParticipant = JSON.parse(tempParticipant);*/

        let tempParticipantID = sessionStorage.getItem("participantSetID");
        /*console.log(tempParticipantID)*/
        const setPID = JSON.parse(tempParticipantID);

        let tempParticipantName = sessionStorage.getItem("participantSetName");
        // console.log(tempParticipantName)
        const setPName = JSON.parse(tempParticipantName);
        // eslint-disable-next-line
        this.state.selected = setPID.map((k, i) => ({
            id: setPID[i],
            content: setPName[i]
        }))

    }

    handleSelectParticipant(topic) {
        this.setState({ participantName: topic });
    }

    handleSelectComp(topic) {
        this.setState({ compItemName: topic });
        this.getCompLimit(topic);
    }

    getCompLimit(selectedcompItem) {
        console.log(selectedcompItem);
        db.collection('competition').doc(sessionStorage.compID).collection('competitionItem').onSnapshot(coll => {
            const temp = coll.docs.map(doc => doc.id);
            const temp2 = coll.docs.map(doc => doc.data().numOfPeople);
            for (var i = 0; i <= temp.length; i++) {
                if (selectedcompItem === temp[i]) {
                    var numberOfpeopleChecker = temp2[i];
                    // eslint-disable-next-line
                    db.collection('competitionFormat').doc('competitionItem').collection('numOfPeople').onSnapshot(coll => {
                        const temp3 = coll.docs.map(doc => doc.id);
                        const temp4 = coll.docs.map(doc => doc.data().limit);
                        for (var i = 0; i <= temp3.length; i++) {
                            if (numberOfpeopleChecker === temp3[i]) {
                                this.setState({ Limit: temp4[i] });
                            }
                        }
                    })
                }
            }
        })

    }

    submitButton() {
        if (this.state.compItemName === null ||
            this.state.items === null ||
            this.state.compItemName === undefined ||
            this.state.items === undefined ||
            this.state.compItemName === '' )  /*  confirm have data  */{
            alert("Have not select Competition item or Participants")
        } else {
            const selectedParticipant = this.state.items;
            const selectedCompItemName = this.state.compItemName;
            const numOfmember = this.state.Limit;
            const checkDuplicatesFunction = this.checkDuplicates;
            let i ;

            db.collection('competition').doc(sessionStorage.compID).collection('participant').doc(selectedParticipant.id).update({
                user_CompetitionItem: selectedCompItemName
            });

            db.collection('competition').doc(sessionStorage.compID).collection('competitionItem').doc(selectedCompItemName).collection('participantCollection').doc(selectedParticipant.id).set({
                ParticipantID: selectedParticipant.id,
                ParticipantName: selectedParticipant.content
            })




            // else { //team
            //     console.log("Correct");
            //     for (i = 0; i < selectedParticipant.length; i++) {
            //         const selectedParticipantID = selectedParticipant[i].id;
            //         // eslint-disable-next-line
            //         this.Ref.collection('participant').doc(selectedParticipantID).get().then(function (doc) {
            //             let tempArrayOfCompetitionItem = doc.data().user_CompetitionItem;
            //             // console.log(checkDuplicatesFunction(tempArrayOfCompetitionItem, selectedCompItemName));
            //             if (!checkDuplicatesFunction(tempArrayOfCompetitionItem, selectedCompItemName)) {
            //                 tempArrayOfCompetitionItem.push(selectedCompItemName);
            //                 db.collection('competition').doc(sessionStorage.compID).collection('participant').doc(selectedParticipantID).update({
            //                     user_CompetitionItem: tempArrayOfCompetitionItem
            //                 })
            //             }
            //
            //             if(i === selectedParticipant.length){
            //                 console.log('End');
            //                 console.log('L: '+selectedParticipant.length);
            //                 console.log('i:' + i);
            //             }else{
            //                 console.log(i);
            //             }
            //
            //         })
            //     }
            //
            //     db.collection('competition').doc(sessionStorage.compID).collection('competitionItem').doc(selectedCompItemName).collection('participantCollection').add({
            //         teamMember: selectedParticipant
            //     }).then(teamCode =>{
            //         console.log(teamCode.id);
            //         let tempTeamCodeArray = {
            //             itemName: selectedCompItemName,
            //             teamCode: teamCode.id
            //         };
            //
            //         for (i= 0;i< selectedParticipant.length;i++){
            //             const selectedParticipantID = selectedParticipant[i].id;
            //             this.Ref.collection('participant').doc(selectedParticipantID).get().then(function (doc) {
            //                 let tempArrayOfTeamCode = doc.data().teamCode;
            //                 tempArrayOfTeamCode.push(tempTeamCodeArray);
            //                 db.collection('competition').doc(sessionStorage.compID).collection('participant').doc(selectedParticipantID).update({
            //                     teamCode: tempArrayOfTeamCode
            //                 })
            //             })
            //         }
            //     });
            // }
        }
    }


    checkDuplicates (tempArray, tempAddItems){
        let checker = false;
        tempArray.forEach(function (value) {
            if (value === tempAddItems) {
                console.log("found Duplicates")
                checker = true;
            }
        });
        return checker;
    }


    checkQ(){

        // db.collection('competition').doc(sessionStorage.compID).collection('competitionItem')




    }



    render() {
        return (
            <div>

                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Column flexGrow={1}>
                        <Row horizontal='center'>
                            <Column>
                                <h4>Select Competition and Athletes</h4>
                            </Column>
                        </Row>

                        <Row horizontal='center'>
                            <h2>{this.state.compItemName}</h2>


                        </Row>
                        <Row horizontal='center'>

                            <h3>{this.state.Limit}</h3>

                        </Row>

                        <Row horizontal='center'>
                            <Column>
                                <Button bsStyle="danger" onClick={() => this.submitButton()} >Submit</Button>
                            </Column>

                            <Column flexGrow={0} horizontal='center'>
                                <ListGroup style={{ width: '80%' }} >
                                    {this.state.allCompItem.map((topic, index) =>
                                        <ListGroupItem key={topic} onClick={() => this.handleSelectComp(topic)}>{topic}</ListGroupItem>
                                    )}
                                </ListGroup>
                            </Column>
                        </Row>


                    </Column>
                </DragDropContext>

            </div>
        )

    }

}

export default EnterGame;

/*
                <Column flexGrow={1}>
                    <Row horizontal='center'>
                        <h1>HEADER</h1>
                    </Row>
                    <Row >
                        <Column flexGrow={1} horizontal='center'>
                            <ListGroup style={{width: '30%'}} >
                                {this.state.allCompItem.map((topic, index) =>
                                    <ListGroupItem key={topic} onClick={() => this.handleSelectComp(topic)}>{topic}</ListGroupItem>
                                )}
                            </ListGroup>
                        </Column>
                        <Column flexGrow={1} horizontal='center'>
                            <ListGroup style={{width: '30%'}}>
                                {this.state.allParticipant.map((topic, index) =>
                                    <ListGroupItem key={topic} onClick={() => this.handleSelectParticipant(topic)} >{topic}</ListGroupItem>
                                )}
                            </ListGroup>
                        </Column>
                    </Row>
                </Column>
                <br/>
                {this.state.compItemName}
                <br/>
                {this.state.participantName}
                <br/>
* */

/* this.Ref.collection('participant').doc(selectedParticipant[i].id).update({
                    user_CompetitionItem1 : ['test']
                }) */

/*  this.state.selected = setP.map((k,i) => ({
             id: `${k}`,
             content: setP[i]
         })) */

/* this.Ref.collection('participant').get()
     .then(onSnapshot => {

         onSnapshot.forEach(doc => {

             this.state.participantSetID.push(doc.id);
             this.state.participantSetName.push(doc.data().CName);

             console.log( this.state.participantSetID );
             console.log( this.state.participantSetName);
         })
     }
 )*/


/* this.state.selected = this.state.participantSetID.map((topic, index) => ({
      id:  this.state.participantSetID[index],
      content: this.state.participantSetName[index]
  })) */
