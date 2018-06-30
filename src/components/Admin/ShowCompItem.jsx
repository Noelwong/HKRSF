import React, { Component } from 'react';
import { db } from '../../firebase';
import { ListGroup, ListGroupItem } from 'react-bootstrap'

class ShowCompItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compItem: [],
            selectedCompItem: ''
        }
        this.Ref = db.collection('competition').doc(sessionStorage.compID).collection('competitionItem');
        this.getCompItem();
       this.CompItemHandleChange = this.CompItemHandleChange.bind(this);
    }

    CompItemHandleChange(event) {
        this.setState({ selectedCompItem: event.target.value });
    }

    getCompItem(){
        this.Ref.onSnapshot(coll => {
            const compItem = coll.docs.map(doc => doc.id)
            this.setState({ compItem })
        })
    }

    render() {

        return (
            <div>
                <ListGroup style={{width: '30%'}}>
                {this.state.compItem.map((topic, index) =>
                      <ListGroupItem key={topic}  >{topic}</ListGroupItem>
                )}
                </ListGroup>

            </div>
        )
    }

}
export default ShowCompItem;
