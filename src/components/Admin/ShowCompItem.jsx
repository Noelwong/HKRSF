import React, { Component } from 'react';
import { db } from '../../firebase';

class ShowCompItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compItem: [],
            selectedCompItem: ''
        }
       this.getCompItem();
       this.CompItemHandleChange = this.CompItemHandleChange.bind(this);
    }

    CompItemHandleChange(event) {
        this.setState({ selectedCompItem: event.target.value });
    }

    getCompItem() {
        db.collection('competition').doc(sessionStorage.compID).collection('competitionItem').onSnapshot(coll => {
            const compItem = coll.docs.map(doc => doc.data().name)
            this.setState({ compItem })
            console.log(compItem);
        })
    }

    render() {

        return (
            <div>

                <select value={this.state.selectedCompItem} onChange={this.CompItemHandleChange}>
                    {this.state.compItem.map((topic, index) =>
                        <option value={topic} >{topic} </option>)}
                </select>
                <br/>
                {this.state.selectedCompItem}
            </div>
        )
    }

}
export default ShowCompItem;
