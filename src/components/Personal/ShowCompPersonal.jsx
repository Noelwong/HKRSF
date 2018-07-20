import React, { Component } from 'react';
import {db, firebaseApp} from '../../firebase';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';


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

            compIndex: [],

            competitionInx: 'NULL',
            btnShow: 'true',

        }
        this.getCompInfor();
        // this.selectShowContent =this.selectShowContent.bind(this);
    }

    getCompInfor() {
        db.collection('competition').onSnapshot(coll => {
            const competition = coll.docs.map(doc => doc.data().name)
            const competitionID = coll.docs.map(doc => doc.id)
            const competitionLocation = coll.docs.map(doc => doc.data().location)

            this.setState({ competitionList: competition })
            this.setState({ competitionIDList: competitionID })
            this.setState({ competitionLocationList: competitionLocation })


            const competitionDeadDate = coll.docs.map(doc => doc.data().deadDate)
            const competitionStartDate = coll.docs.map(doc => doc.data().startDate)
            const competitionEndDate = coll.docs.map(doc => doc.data().endDate)


            const competitionDeadDateList = [];
            for (var i = 0; i < competitionDeadDate.length; i++) {
                competitionDeadDateList.push(competitionDeadDate[i].toString())
            }

            const competitionStartDateList = [];
            for (var j = 0; j < competitionStartDate.length; j++) {
                competitionStartDateList.push(competitionStartDate[j].toString())
            }

            const competitionEndDateList = [];
            for (var k = 0; j < competitionEndDate.length; k++) {
                competitionEndDateList.push(competitionEndDate[k].toString())
            }

            this.setState({ competitionDeadDateList: competitionDeadDateList })
            this.setState({ competitionStartDateList: competitionStartDateList })
            this.setState({ competitionEndDateList: competitionEndDateList })
        })


        db.collection('competition').onSnapshot(coll => {
            const compIndex = coll.docs.map(doc => doc.id)
            this.setState({ compIndex })
        })
    }


    handleSelect(index){
        const selected = this.state.compIndex[index];
        this.setState({competitionInx: selected});
        sessionStorage.compID=this.state.compIndex[index];
        db.collection('competition').doc(this.state.compIndex[index]).collection('participant').get()
            .then(onSnapshot => {
                    onSnapshot.forEach(doc => {
                        if (doc.data().uid === firebaseApp.auth().currentUser.uid)
                        {
                            console.log('Find');
                        }else {

                            console.log("Not Found: " +firebaseApp.auth().currentUser.uid);
                        }
                    })
                }
            )

    }

    // selectShowContent = (competitionInx) => {
    //     sessionStorage.compID = competitionInx;
    // };

    render() {

        return (
            <div>
                {
                    this.state.competitionList.map((topic, index) =>
                        <Link to="/CompetitionIndexPersonal" ><Button key={index} onClick={() => this.handleSelect(index)}>
                            比賽名稱: {topic}
                            <br />
                            比賽場地: {this.state.competitionLocationList[index]}
                            <br />
                            比賽時間:{this.state.competitionStartDateList[index]}
                        </Button></Link>)
                }
                {/*{this.selectShowContent(this.state.competitionInx)}*/}
            </div>
        )
    }

}
export default ShowCompPersonal;