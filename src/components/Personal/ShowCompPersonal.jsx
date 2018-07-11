import React, { Component } from 'react';
import { db } from '../../firebase';
import { ListGroup, ListGroupItem} from 'react-bootstrap';

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
            const competitionDeadDate = coll.docs.map(doc => doc.data().deadDate)
            const competitionStartDate = coll.docs.map(doc => doc.data().startDate)
            const competitionEndDate = coll.docs.map(doc => doc.data().endDate)
            this.setState({ competitionList: competition})
            this.setState({ competitionIDList: competitionID})
            this.setState({ competitionLocationList: competitionLocation})
            this.setState({ competitionDeadDateList: Date(competitionDeadDate)})
            this.setState({ competitionStartDateList: Date(competitionStartDate)})
            this.setState({ competitionEndDateList: Date(competitionEndDate)})
        })

    }




    render() {


        return (
            <div>
                {
                    this.state.competitionList.map((topic, index) =>
                    
                    <ListGroup>
                            <ListGroupItem bsStyle="info">比賽名稱:{topic}</ListGroupItem>
                            <ListGroupItem>比賽場地:{this.state.competitionLocationList[index]}</ListGroupItem>
                            <ListGroupItem>{this.state.competitionStartDateList[index]}</ListGroupItem>
                            </ListGroup>)
                }

            </div>



        )

    }

}
export default ShowCompPersonal;