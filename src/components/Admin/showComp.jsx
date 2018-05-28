import React, { Component } from 'react';
import { db } from '../../firebase';

class ShowComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            competition:[]
        }
        this.getCompInfor();
    }
getCompInfor(){
    this.com = [];
    db.collection('competition').onSnapshot(coll => {
        const competition = coll.docs.map(doc => doc.data().name)
        this.setState({ competition })
    })

}


    render() {


        return (
            <div>
                {this.state.competition.map((topic, index) =>
                <button className="btn btn-info" key={index}>{topic}</button>)}
            </div>


           
        )

    }

}
export default ShowComp;