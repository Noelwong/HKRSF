import React, { Component } from 'react';
import { db } from '../../firebase';

class ShowComp extends Component {
    constructor(props) {
        super(props);
        this.getCompInfor();
    }
    getCompInfor() {

        var citiesRef = db.collection('competition');
        var allCities = citiesRef.get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    console.log(doc.id, '=>', doc.data().name);
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    render() {
        return (
            <div>1234</div>
        )

    }

}
export default ShowComp;