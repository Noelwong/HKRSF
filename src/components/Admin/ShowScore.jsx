import React, { Component } from 'react';
import { db } from '../../firebase';
import { Alert, Button } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Column, Row } from 'simple-flexbox';


class ShowScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participantName: '',
            compItemName: '',
            allParticipant: [],
            allCompItem: [],
            items: [],
            selected: [],
            newParticipant: [],
            participantSetID: [],
            participantSetName: [],
            Limit: '',
            show: false
        };
        this.Ref = db.collection('competition').doc(sessionStorage.compID);
        this.handleSelectComp = this.handleSelectComp.bind(this);
        this.getAll();
    }

    getAll() {
        let tempCompItem = sessionStorage.getItem("compItem");
        // eslint-disable-next-line
        this.state.allCompItem = JSON.parse(tempCompItem);
        let tempParticipantID = sessionStorage.getItem("participantSetID");
        const setPID = JSON.parse(tempParticipantID);
        let tempParticipantName = sessionStorage.getItem("participantSetName");
        const setPName = JSON.parse(tempParticipantName);
        // eslint-disable-next-line
        // this.state.selected = setPID.map((k, i) => ({
        //     id: setPID[i],
        //     content: setPName[i]
        // }))

    }


    getCompLimit(selectedcompItem) {
        console.log(selectedcompItem);
        db.collection('competition').doc(sessionStorage.compID).collection('competitionItem').onSnapshot(coll => {
            const temp = coll.docs.map(doc => doc.id);
            const temp2 = coll.docs.map(doc => doc.data().numOfPeople);
            for (let i = 0; i <= temp.length; i++) {
                if (selectedcompItem === temp[i]) {
                    let numberOfpeopleChecker = temp2[i];
                    // eslint-disable-next-line
                    db.collection('competitionFormat').doc('competitionItem').collection('numOfPeople').onSnapshot(coll => {
                        const temp3 = coll.docs.map(doc => doc.id);
                        const temp4 = coll.docs.map(doc => doc.data().limit);
                        for (let i = 0; i <= temp3.length; i++) {
                            if (numberOfpeopleChecker === temp3[i]) {
                                this.setState({ Limit: temp4[i] });
                            }
                        }
                    })
                }
            }
        })

    }

    handleSelectComp(topic) {
        this.setState({ compItemName: topic });
        this.getCompLimit(topic);
    }
    render(){

        return(
            <div>
                <Column flexGrow={1}>
                    <Row horizontal='center'>
                        <Column>
                            <h4>Select Competition and Athletes</h4>
                        </Column>
                    </Row>

                    <Row horizontal='center'>
                        <h2>{this.state.compItemName}</h2>

                    </Row>
                    <Row >
                        <Column flexGrow={0} horizontal='center'>
                            <ListGroup style={{ width: '80%' }} >
                                {this.state.allCompItem.map((topic, index) =>
                                    <ListGroupItem key={topic} onClick={() => this.handleSelectComp(topic)}>{topic}</ListGroupItem>
                                )}
                            </ListGroup>


                        </Column>
                    </Row>

                </Column>

            </div>
        )
    }

}
export default ShowScore;