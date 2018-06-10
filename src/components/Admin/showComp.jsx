import React, { Component } from 'react';
import { db } from '../../firebase';
import { Link } from 'react-router';

class ShowComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            competition: [],
            compIndex: [],
            competitionInx: ''
        }
        this.getCompInfor();
        this.handleSelect =this.handleSelect.bind(this);
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
        sessionStorage.compID = this.state.competitionInx;
    }





    render() {


        return (
            <div>
                {
                    this.state.competition.map((topic, index) =>
                    <Link to={'/CompetitionIndex'}><button className="btn btn-danger" onClick={() => this.handleSelect(index)} key={index} >{topic}</button></Link>
                    )
                }
            </div>



        )

    }

}
export default ShowComp;