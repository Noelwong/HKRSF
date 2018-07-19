import React, { Component } from 'react';
import { db } from '../../firebase';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Column, Row } from 'simple-flexbox';


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
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: "4px",
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',
    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    flexWrap: 'wrap',
    padding: grid,
    width: 455
});


class EnterGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participantName: '',
            compItemName: '',
            allParticipant: [],
            allCompItem: [],
            items: [],
            selected: getItems(5, 10),
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
        /**
         * A semi-generic way to handle multiple lists. Matches
         * the IDs of the droppable container to the names of the
         * source arrays stored in the state.
         */
        this.id2List = {
            droppable: 'items',
            droppable2: 'selected'
        };

        this.getList = id => this.state[this.id2List[id]];

        this.onDragEnd = result => {
            const { source, destination } = result;
            // dropped outside the list
            if (!destination) {
                return;
            }

            if (source.droppableId === destination.droppableId) {
                const items = reorder(
                    this.getList(source.droppableId),
                    source.index,
                    destination.index
                );

                let state = { items };

                if (source.droppableId === 'droppable2') {
                    state = { selected: items };
                }
                this.setState(state);
            } else {
                const result = move(
                    this.getList(source.droppableId),
                    this.getList(destination.droppableId),
                    source,
                    destination
                );
                this.setState({
                    items: result.droppable,
                    selected: result.droppable2,
                });
            }
        }
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
            this.state.compItemName === '' ||
            this.state.items.length === 0)  /*  confirm have data  */ {
            // console.log("NULL");
            alert("Have not select Competition item or Participants")
        } else {
            // console.log("not NULL");
            const selectedParticipant = this.state.items;
            const selectedCompItemName = this.state.compItemName;
            const numOfmember = this.state.Limit;
            // console.log(selectedParticipant);
            // console.log(selectedCompItemName);
            const checkDuplicatesFunction = this.checkDuplicates;
            let i;
            if (numOfmember === 1) {
                for (i = 0; i < selectedParticipant.length; i++) {
                    const selectedParticipant1 = selectedParticipant[i].id;
                    const selectedParticipant2 = selectedParticipant[i].content;
                    this.Ref.collection('participant').doc(selectedParticipant1).get().then(function (doc) {
                        let tempArrayOfCompetitionItem = doc.data().user_CompetitionItem;
                        // console.log(checkDuplicatesFunction(tempArrayOfCompetitionItem, selectedCompItemName));
                        if (!checkDuplicatesFunction(tempArrayOfCompetitionItem, selectedCompItemName)) {
                            tempArrayOfCompetitionItem.push(selectedCompItemName);
                            db.collection('competition').doc(sessionStorage.compID).collection('participant').doc(selectedParticipant1).update({
                                user_CompetitionItem: tempArrayOfCompetitionItem
                            })
                            console.log("ADD");

                            db.collection('competition').doc(sessionStorage.compID).collection('competitionItem').doc(selectedCompItemName).collection('participantCollection').doc(selectedParticipant1).set({
                                ParticipantID: selectedParticipant1,
                                ParticipantName: selectedParticipant2
                            })

                        }
                    })
                }
            }
            else if (numOfmember !== selectedParticipant.length) {
                console.log("Please select correct number of people ");
            }
            else {
                console.log("Correct")
                for (i = 0; i < selectedParticipant.length; i++) {
                    const selectedParticipant1 = selectedParticipant[i].id;
                    // const selectedParticipant2 = selectedParticipant[i].content;
                    this.Ref.collection('participant').doc(selectedParticipant1).get().then(function (doc) {
                        let tempArrayOfCompetitionItem = doc.data().user_CompetitionItem;
                        // console.log(checkDuplicatesFunction(tempArrayOfCompetitionItem, selectedCompItemName));
                        if (!checkDuplicatesFunction(tempArrayOfCompetitionItem, selectedCompItemName)) {
                            tempArrayOfCompetitionItem.push(selectedCompItemName);
                            db.collection('competition').doc(sessionStorage.compID).collection('participant').doc(selectedParticipant1).update({
                                user_CompetitionItem: tempArrayOfCompetitionItem
                            })
                            console.log("ADD");
                        }
                    })
                }
                db.collection('competition').doc(sessionStorage.compID).collection('competitionItem').doc(selectedCompItemName).collection('participantCollection').doc().set({
                    teamMember: selectedParticipant
                })
            }

        }
    }

    checkDuplicates(tempArray, tempAddItems) {
        var checker = false;
        tempArray.forEach(function (value) {
            if (value === tempAddItems) {
                console.log("found Duplicates")
                checker = true;
            }
        });
        return checker;
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
                            <Column>
                                <Button bsStyle="danger" onClick={() => this.submitButton()} >Submit</Button>
                            </Column>
                        </Row>

                        <Row horizontal='center'>
                            <Column>
                                <h4> </h4>
                            </Column>
                        </Row>

                        <Row >
                            <Column flexGrow={0} horizontal='center'>
                                <ListGroup style={{ width: '80%' }} >
                                    {this.state.allCompItem.map((topic, index) =>
                                        <ListGroupItem key={topic} onClick={() => this.handleSelectComp(topic)}>{topic}</ListGroupItem>
                                    )}
                                </ListGroup>


                            </Column>

                            <Column flexGrow={0.5} horizontal='center' >

                                <Droppable droppableId="droppable" >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}>
                                            {this.state.items.map((item, index) => (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}>
                                                            {item.content}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>

                            </Column>

                            <Column flexGrow={0.5} horizontal='center'>

                                <Droppable droppableId="droppable2">

                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}>
                                            {this.state.selected.map((item, index) => (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}>
                                                            {item.content}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>

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