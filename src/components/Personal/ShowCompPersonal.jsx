import React, { Component } from 'react';
import { db } from '../../firebase';
import { ListGroup, ListGroupItem} from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class ShowCompPersonal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            competitionList: [],
            competitionIDList: [],
            competitionLocationList: [],
            competitionDeadDateList: [],
            competitionStartDateList: [],
            competitionEndDateList: [], 

        }
        this.getCompInfor();
    }

    getCompInfor() {
        db.collection('competition').onSnapshot(coll => {
            const competition = coll.docs.map(doc => doc.data().name)
            const competitionID = coll.docs.map(doc => doc.id)
            const competitionLocation = coll.docs.map(doc => doc.data().location)

            this.setState({ competitionList: competition})
            this.setState({ competitionIDList: competitionID})
            this.setState({ competitionLocationList: competitionLocation})


            const competitionDeadDate = coll.docs.map(doc => doc.data().deadDate)
            const competitionStartDate = coll.docs.map(doc => doc.data().startDate)
            const competitionEndDate = coll.docs.map(doc => doc.data().endDate)


            const competitionDeadDateList = [];
            for (var i =0; i<competitionDeadDate.length;i++){
                competitionDeadDateList.push(competitionDeadDate[i].toString())
            }

            const competitionStartDateList = [];
            for (var j =0; j<competitionStartDate.length;j++){
                competitionStartDateList.push(competitionStartDate[j].toString())
            }

            const competitionEndDateList = [];
            for (var k =0; j<competitionEndDate.length;k++){
                competitionEndDateList.push(competitionEndDate[k].toString())
            }

           this.setState({ competitionDeadDateList:competitionDeadDateList})
           this.setState({ competitionStartDateList:competitionStartDateList})
           this.setState({ competitionEndDateList: competitionEndDateList})
        })

    }

    check(){
        console.log(this.state.competitionDeadDateList);
        console.log(this.state.competitionStartDateList);
        console.log(this.state.competitionEndDateList);
    }





    render() {

        return (
            <div>
                {
                    this.state.competitionList.map((topic, index) =>
                    <ListGroup >
                            <ListGroupItem bsStyle="info">比賽名稱: {topic}</ListGroupItem>
                            <ListGroupItem>比賽場地: {this.state.competitionLocationList[index]}</ListGroupItem>
                            <ListGroupItem>{this.state.competitionStartDateList[index]}</ListGroupItem>
                    </ListGroup>)
                }
                <Button bsStyle="danger" onClick={()=> this.check()}></Button>

            </div>



        )

    }

}
export default ShowCompPersonal;