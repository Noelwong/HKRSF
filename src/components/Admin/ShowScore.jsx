import React, { Component } from 'react';
import { db } from '../../firebase';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { Column, Row } from 'simple-flexbox';


const getItemIndb =()=>{
    let tempCompItem = sessionStorage.getItem("compItem");
    return  JSON.parse(tempCompItem);
};

const testAll =()=>{
    let tempAll = sessionStorage.getItem("ArrayOfParticipantInItem");
    return JSON.parse(tempAll);

};

// const setBS =(name, index)=> {
//
//     let tempCompItem = JSON.parse(sessionStorage.getItem("compItem"));
//
//     this.Ref.collection('competitionItem').doc(tempCompItem[index]).collection('participantCollection').where("ParticipantName","==",name).get().then(
//         snapshot =>{
//             snapshot.forEach(doc => {
//                 if (doc.data().TotalMark === undefined) {
//                  return "info"
//                 }
//                 else
//                 {
//                     return "warning"
//                 }
//             })
//         })
//
//
//
//
// }


class ShowScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participantName: '',
            compItemName: '',
            allParticipant: [],
            allCompItem: getItemIndb(),
            items: [],
            selected: [],
            newParticipant: [],
            participantSetID: [],
            participantSetName: [],
            Limit: '',
            show: false,
            ArrayOfParticipantInItem: testAll(),
            marks:'',
            render: false
        };
        this.Ref = db.collection('competition').doc(sessionStorage.compID);

        this.handleSelectComp = this.handleSelectComp.bind(this);
        this.handleShowScore = this.handleShowScore.bind(this);
        this.showRanking = this.showRanking.bind(this);
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
        let tempMarkSet ={};
        this.Ref.collection('competitionItem').doc(this.state.allCompItem[index]).collection('participantCollection').where("ParticipantName","==",name).get().then(
            snapshot =>{
            snapshot.forEach(doc =>{
                if(doc.data().TotalMark === undefined) {
                    alert("This participant haven't finish the item");
                    }
                    else {
                    alert("In Competiton : "+
                        this.state.allCompItem[index] +
                        "  Participant: " +
                        name +
                        "\n GET  " +
                        " " +
                        doc.data().TotalMark +
                        " Marks");

                }
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

    showRanking(index){
        // eslint-disable-next-line 
        let tempMarks = 0;
        let tempMarkSet ={};
        this.Ref.collection('competitionItem').doc(this.state.allCompItem[index]).collection('participantCollection').get().then(snapshot =>{
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

            let newPName =[] ;
            let newPScore = [] ;
            for (let i =0; i<sortTable.length;i++){
                let temp =sortTable[i];
                newPName.push(temp[0]);
                newPScore.push(temp[1]);
            }

            if(newPScore[0] && newPScore[1] && newPScore[0] !==undefined) {
                alert("In " + this.state.allCompItem[index] + "\n\n" +
                    "The winner is : " + newPName[0] + " Score : " + newPScore[0] + "\n" +
                    "The second place is : " + newPName[1] + " Score : " + newPScore[1] + "\n" +
                    "The third place : " + newPName[2] + " Score : " + newPScore[2] + "\n"
                );
            }else {
                alert("The Competition haven't finish")
            }
            console.log(sortTable);
        })

    }





    render(){

        return(

            <div>
                <Column flexGrow={1}>
                    <Row horizontal='center'>

                        <Column>
                            <h3>Click on items to Show ranking, Click on athlete to show the Score</h3>
                        </Column>

                    </Row>

                    <Row >


                        <Column flexGrow={0} horizontal='center'>

                                {this.state.ArrayOfParticipantInItem.map((topic, index) =>
                                    <ListGroup key = {"ShowScoreList"+index} style={{ width: '80%' }} >
                                        <ListGroupItem key={topic[index]+index} onClick={()=>this.showRanking(index)} >{this.state.allCompItem[index]} </ListGroupItem>
                                    <ListGroupItem  >
                                        {topic.map((name,i)=>
                                        <Button key = {this.state.ArrayOfParticipantInItem[index]+name} onClick={() => this.handleShowScore(name,index)}
                                        >{name}</Button>
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