import React, { Component } from 'react';
import { db } from '../../firebase';
import { ListGroup, ListGroupItem,Button } from 'react-bootstrap';




let allcompItem = [];
class GenRundown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allcompItem:[],
        };
        this.Ref = db.collection('competition').doc(sessionStorage.compID).collection('competitionItem');
        this.getAll();

    }


    getAll() {
            let temp = [];
        this.Ref.orderBy("totalPoint").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                const compItem = doc.id;
                temp.push(compItem)
            });
            allcompItem =temp;
        })
    }



    render() {
        
        return (
            <div>
                {allcompItem.map((topic, index) =>
                    <ListGroup key={topic} style={{ width: '30%' }}  >
                        <ListGroupItem key={topic} >{topic}</ListGroupItem>
                    </ListGroup>
                )}
                
            </div>
        )
    }

}
export default GenRundown;