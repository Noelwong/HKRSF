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
            selectedComp: '',
            selectedPartID: ''
        };
        this.Ref = db.collection('competition').doc(sessionStorage.compID).collection('competitionItem');
        this.getAll();
        this.CompItemHandleChange = this.CompItemHandleChange.bind(this);
    }

    CompItemHandleChange(event) {
        this.setState({ selectedCompItem: event.target.value });
    }

    getAll() {
        let tempCompItem = [];
        this.Ref.where("numOfPeople", "==", "個人Personal").get().then(snapshot => {
            snapshot.forEach(doc => {
                let tempName = [];
                const compItem = doc.id;
                tempCompItem.push(compItem);
                this.Ref.doc(compItem).collection("participantCollection").get().then(snapshot => {
                    snapshot.forEach(doc => {
                        
                        const partID = doc.id;
                        const participant = doc.data().ParticipantName;
                        let dataSet = {partID:partID,
                            participant:participant};
                        tempName.push(JSON.stringify(dataSet))

                    })

                });
                this.state.compItemDetail.push(tempName)
                
            });
            console.log(this.state.compItemDetail);
            this.setState({ compItem: tempCompItem })
        })
    }

    render() {
        console.log(this.state.compItemDetail);
        return (
            <div>
                {this.state.compItem.map((topic, index) =>
                    <ListGroup key={topic} style={{ width: '30%' }}>
                        <ListGroupItem key={topic}  >{topic}</ListGroupItem>
                        
                        <ListGroupItem>{this.state.compItemDetail[index].map((name, i) =>
                            <Button key={JSON.parse(name).participant}>{JSON.parse(name).participant}</Button>
                        )


                        }</ListGroupItem>
                    </ListGroup>
                )}
            </div>
        )
    }

}
export default ShowParticipant;
