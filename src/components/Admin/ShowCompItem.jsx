import React, { Component } from 'react';
import { db } from '../../firebase';

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
                <ul>
                {this.state.compItem.map((topic, index) =>
                     <li key={topic}  >{topic}</li>
                )}
                </ul>

            </div>
        )
    }

}
export default ShowCompItem;
