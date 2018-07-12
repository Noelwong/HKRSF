import React, { Component } from 'react';
import { db } from '../../firebase';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ReactDOM from 'react-dom';


import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Column, Row } from 'simple-flexbox';



const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
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
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});


class EnterGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participantName: '',
            compItemName: '',
            allParticipant: [],
            allCompItem: [],
            items: getItems(0),
            selected: getItems(5, 10),
        };
        this.Ref = db.collection('competition').doc(sessionStorage.compID);
        this.getAll();
        this.handleSelectParticipant = this.handleSelectParticipant.bind(this);
        this.handleSelectComp = this.handleSelectComp.bind(this);

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

            console.log(this.state.items);
            console.log(this.state.selected);
            console.log(this.state.selectedItem);
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
                    console.log(items);
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

    getAll(){
            let tempCompItem = sessionStorage.getItem("compItem");
            const setComp = JSON.parse(tempCompItem);
            this.state.allCompItem = JSON.parse(tempCompItem);

            /*this.state.items = setComp.map((k,i) => ({
                id: `${k}`,
                content: setComp[i]
            }))*/


            let tempParticipant = sessionStorage.getItem("participant");
            const setP = JSON.parse(tempParticipant);
            this.state.allParticipant = JSON.parse(tempParticipant);

            this.state.selected = setP.map((k,i) => ({
                id: `${k}`,
                content: setP[i]
            }))


    }
    
    handleSelectParticipant(topic){
        this.setState({participantName: topic});
    }

    handleSelectComp(topic){
        this.setState({compItemName: topic});
    }


    render() {
        return (
            <div>

                <DragDropContext onDragEnd={this.onDragEnd}>
                <Column flexGrow={1}>
                    <Row horizontal='center'>
                        <h1>Select Competition and Athletes</h1>
                    </Row>
                    <Row horizontal='center'>
                        <h1>{this.state.compItemName}</h1>
                    </Row>
                    <Row >
                        <Column flexGrow={1} horizontal='center'>
                            <ListGroup style={{width: '40%'}} >
                                {this.state.allCompItem.map((topic, index) =>
                                    <ListGroupItem key={topic} onClick={() => this.handleSelectComp(topic)}>{topic}</ListGroupItem>
                                )}
                            </ListGroup>


                        </Column>

                        <Column flexGrow={1} horizontal='center'>

                            <Droppable droppableId="droppable">
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

                        <Column flexGrow={1} horizontal='center'>

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