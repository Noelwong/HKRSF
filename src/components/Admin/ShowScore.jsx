import React, { Component } from 'react';
import { db } from '../../firebase';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
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
            show: false,
            ArrayOfParticipantInItem:[],
            marks:''
        };
        this.Ref = db.collection('competition').doc(sessionStorage.compID);
        this.handleSelectComp = this.handleSelectComp.bind(this);
        this.handleShowScore = this.handleShowScore.bind(this);
        this.sortButton = this.sortButton.bind(this);
        this.reloadB = this.reloadB.bind(this);
        this.getAll();
    }
    
    getAll() {
        let tempCompItem = sessionStorage.getItem("compItem");
        // eslint-disable-next-line
        this.state.allCompItem = JSON.parse(tempCompItem);

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
                                    // console.log(doc2.data().CName);
                                    // console.log(doc.id);
                                    // console.log(tempUserCompetitionItem[i]);
                                    // console.log(ArrayOfParticipantInItem);
                                }

                        }
                        // ArrayOfParticipantInItem.push(tempArrayOfParticipantInItem)
                    })
                });
                if(tempArrayOfParticipantInItem[0] === null){
                    ArrayOfParticipantInItem.push("No Participant");
                } else{
                ArrayOfParticipantInItem.push(tempArrayOfParticipantInItem);
                }
                // console.log(doc.id);
            });
            this.state.ArrayOfParticipantInItem =ArrayOfParticipantInItem;
            console.log(this.state.ArrayOfParticipantInItem);
            // console.log(ArrayOfParticipantInItem);
        });



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

    handleShowScore(name, index){
        let tempMarks = 0;
        let tempMarkSet ={};
        this.Ref.collection('competitionItem').
        doc(this.state.allCompItem[index]).
        collection('participantCollection').
        where("ParticipantName","==",name).
        get().
        then(snapshot =>{
            snapshot.forEach(doc =>{
                tempMarks =doc.data().TotalMark;
                alert("In Competiton : "+
                    this.state.allCompItem[index] +
                    "  Participant: " +
                    name +
                    "\n GET  " +
                    " " +
                    doc.data().TotalMark +
                    " Marks");
                console.log(doc.data().TotalMark);
                tempMarkSet[doc.data().ParticipantName] = doc.data().TotalMark;
            });

            let sortTable =[];
            for ( let pName in tempMarkSet){
                sortTable.push([pName,tempMarkSet[pName]]);
            }
            sortTable.sort(function(a, b) {
                return b[1] - a[1];
            });

            console.log(tempMarkSet);
            console.log(sortTable);
        })


    }

    sortButton(index){
        let tempMarks = 0;
        let tempMarkSet ={};
        this.Ref.collection('competitionItem').
        doc(this.state.allCompItem[0]).
        collection('participantCollection').
        //where("ParticipantName","==",name).
        get().
        then(snapshot =>{
            snapshot.forEach(doc =>{
                tempMarks =doc.data().TotalMark;
                console.log(doc.data().TotalMark);
                tempMarkSet[doc.data().ParticipantName] = doc.data().TotalMark;
            });

            let sortTable =[];
            for ( let pName in tempMarkSet){
                sortTable.push([pName,tempMarkSet[pName]]);
            }
            sortTable.sort(function(a, b) {
                return b[1] - a[1];
            });

            console.log(tempMarkSet);
            console.log(sortTable);
        })


    }


    reloadB(){

        window.location.reload();
    }

    render(){

        return(
            <div>
                <Column flexGrow={1}>
                    <Row horizontal='center'>
                        <Column>

                            <h4> Show All Competitions and Athletes</h4>

                        </Column>
                    </Row>

                    <Row >

                        <Column flexGrow={0} horizontal='center'>

                                {this.state.ArrayOfParticipantInItem.map((topic, index) =>
                                    <ListGroup key = {"ShowScoreList"+topic} style={{ width: '80%' }} >
                                        <ListGroupItem key={topic+index}  >{this.state.allCompItem[index]} </ListGroupItem>

                                    <ListGroupItem >
                                        {topic.map((name,i)=>
                                        <Button key = {name+this.state.ArrayOfParticipantInItem[index]+name} onClick={() => this.handleShowScore(name,index)}>{name}</Button>
                                    )
                                        }</ListGroupItem>
                                    </ListGroup>
                                )}
                        </Column>
                    </Row>


                </Column>

            </div>
        )
    }

}
export default ShowScore;