import React, { Component } from 'react';
import {db } from '../../firebase';



class CompetitionIndex extends Component {
    constructor(props) {
        super(props);
        this.state={
            itemType: ["A"]
        }
        this.getCompetitionDetails();
    }

    getCompetitionDetails() {
        db.collection('competition').doc(sessionStorage.myValue).get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                const itemType = doc.get().map(doc => doc.data());
                 this.setState({ itemType })
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });


    }

    render() {
        return (
            <div>
                <p>
                    {sessionStorage.myValue}
                </p>
                {console.log(this.state.itemType)}
            </div>

        )
    }

}
export default CompetitionIndex;