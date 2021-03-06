import React, { Component } from 'react';
import { db } from '../../firebase';

class ShowComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            competition: [],
            compIndex: [],
            competitionInx: 'NULL'
        }
        this.getCompInfor();
        this.selectShowContent =this.selectShowContent.bind(this);
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
    }


    selectShowContent = (competitionInx) => {
        sessionStorage.compID = competitionInx;
    }



    render() {


        return (
            <div>
                {
                    this.state.competition.map((topic, index) =>
                        <button className="btn btn-danger" onClick={() => this.handleSelect(index)} key={index} >{topic}</button>
                    )
                }
                {this.selectShowContent(this.state.competitionInx)}
            </div>



        )

    }

}
export default ShowComp;
