import React, { Component } from 'react';
import { db } from '../../firebase';

class showComp extends Component {
    constructor(props) {
        super(props);
        this.getCompInfor();
    }
    getCompInfor(){
        const compRef = db.collection('competition');
        compRef.getCollections().then(collections => {
            collections.forEach(collection => {
              console.log('Found subcollection with id:', collection.id);
            });
          });
    }

    render() {
        return (
            <div>1234</div>
        )

    }

}
export default showComp;