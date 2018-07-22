import React, { Component } from 'react';
import { db } from '../../firebase';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap'

class ShowParticipant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compItem: [],
            compItemDetail: [],
            participant: [],
            partID: [],
            selectedComp: '',
            selectedPartID: ''
        }
        this.Ref = db.collection('competition').doc(sessionStorage.compID).collection('competitionItem');
        this.getAll();
        this.CompItemHandleChange = this.CompItemHandleChange.bind(this);
    }

    CompItemHandleChange(event) {
        this.setState({ selectedCompItem: event.target.value });
    }

    getAll() {
        var tempCompItem = [];
        this.Ref.where("numOfPeople", "==", "個人Personal").get().then(snapshot => {
            snapshot.forEach(doc => {
                var tempCompItemDetail = [];
                var tempName = []
                const compItem = doc.id
                tempCompItem.push(compItem);
                this.Ref.doc(compItem).collection("participantCollection").get().then(snapshot => {
                    snapshot.forEach(doc => {
                        
                        const partID = doc.id
                        const participant = doc.data().ParticipantName
                        tempName.push(participant)

                    })

                })
                tempCompItemDetail.push(tempName)
                this.state.compItemDetail.push(tempCompItemDetail)
            })

            this.setState({ compItem: tempCompItem })
        })
    }

    render() {
        console.log("Name" + this.state.compItemDetail)
        console.log("ID" + this.state.partID)
        return (
            <div>
                {this.state.compItem.map((topic, index) =>
                    <ListGroup key={topic} style={{ width: '30%' }}>
                        <ListGroupItem key={topic}  >{topic}</ListGroupItem>
                        <ListGroupItem>{this.state.compItemDetail[index].map((name, i) =>
                            <Button key={name}>{name}</Button>
                        )
                        }</ListGroupItem>
                    </ListGroup>
                )}
            </div>
        )
    }

}
export default ShowParticipant;
