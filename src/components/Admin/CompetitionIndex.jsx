import React, { Component } from 'react';
import {db } from '../../firebase';



class CompetitionIndex extends Component {
    constructor(props) {
        super(props);
        this.getCompetitionDetails();
    }

    getCompetitionDetails() {
        db.collection('competition').doc(sessionStorage.compID).onSnapshot(docSnapshot => {
            console.log(`Received doc snapshot: ${docSnapshot.data}`);
            // ...
          }, err => {
            console.log(`Encountered error: ${err}`);
          });
    }

    render() {
        return (
            <div>
                <p>
                    {sessionStorage.compID}
                </p>
            </div>

        )
    }

}
export default CompetitionIndex;