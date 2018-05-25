import React, { Component } from 'react';
import { db } from '../../firebase';

class ShowComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.getCompInfor();
    }
getCompInfor(){
    this.com = new Array();
    db.collection('competition').get().then(snapshot => 
        {snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data().name);
                this.com.push(doc.id,doc.data().name);
                console.log(this.com);
            });
        }) 
        .catch(err => {
            console.log('Error getting documents', err);
        });
}

    render() {
        return (
           <div>{this.com}</div>
           
        )

    }

}
export default ShowComp;