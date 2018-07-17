import React, { Component } from 'react';
import { db } from '../../firebase';
import { Link } from 'react-router';


class ShowComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            competition: [],
            compIndex: [],
            competitionInx: 'NULL',
            btnShow: 'true',
        }
        this.getCompInfor();
        this.selectShowContent =this.selectShowContent.bind(this);
        this.handleSelect =this.handleSelect.bind(this);
        this.handleDismiss = this.handleDismiss.bind(this);
    }

    getCompInfor() {
        db.collection('competition').onSnapshot(coll => {
            const competition = coll.docs.map(doc => doc.data().name)
            this.setState({ competition })
        })
        db.collection('competition').onSnapshot(coll => {
            const compIndex = coll.docs.map(doc => doc.id)
            this.setState({ compIndex })
        })
    }

    handleSelect(index){
        const selected = this.state.compIndex[index];
        this.setState({competitionInx: selected});
        this.handleDismiss();
    }


    selectShowContent = (competitionInx) => {
        sessionStorage.compID = competitionInx;
    }

    handleDismiss() {
        this.setState({ btnShow:  !'true'});
    }




    render() {


        return (
            <div>
                {
                    this.state.competition.map((topic, index) =>
                        <button className="btn btn-info" onClick={() => this.handleSelect(index)} key={index} >{topic}</button>
                    )
                }
                {this.selectShowContent(this.state.competitionInx)}
                <br/>
                <Link to="/CompetitionIndex" ><button className="btn btn-danger" disabled={this.state.btnShow}>比賽主頁<br/>Competition Index</button></Link>
            </div>
        )

    }

}
export default ShowComp;