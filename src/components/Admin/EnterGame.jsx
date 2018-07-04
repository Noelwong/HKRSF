import React, { Component } from 'react';
import { db } from '../../firebase';

import { ListGroup, ListGroupItem } from 'react-bootstrap'

class EnterGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participantName: '',
            compItemName: '',
            allParticipant: [],
            allCompItem: []

        }
        this.Ref = db.collection('competition').doc(sessionStorage.compID);
        this.getAll();
        this.handleSelectParticipant = this.handleSelectParticipant.bind(this);
        this.handleSelectComp = this.handleSelectComp.bind(this);
    }

    getAll(){
            let tempCompItem = sessionStorage.getItem("compItem");
            this.state.allCompItem = JSON.parse(tempCompItem);

            let tempParticipant = sessionStorage.getItem("participant");
            this.state.allParticipant = JSON.parse(tempParticipant);
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
                <ListGroup style={{width: '30%'}}>
                {this.state.allCompItem.map((topic, index) =>
                      <ListGroupItem key={topic} onClick={() => this.handleSelectComp(topic)}>{topic}</ListGroupItem>
                )}
                </ListGroup>
                <ListGroup style={{width: '30%'}}>
                {this.state.allParticipant.map((topic, index) =>
                      <ListGroupItem key={topic} onClick={() => this.handleSelectParticipant(topic)} >{topic}</ListGroupItem>
                )}
                </ListGroup>
                <br/>
                {this.state.participantName}
                <br/>
                {this.state.compItemName}

            </div>
        )
        
    }

}
export default EnterGame;