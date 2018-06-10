import React, { Component } from 'react';
import { db } from '../../firebase';

class AddParticipant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compItem:[],
            selectedCompItem:'',
            CName:'',
            EName:'',
            BDate:'',
            schoolName:''
        }
    
        this.getCompItem();
        this.CompItemHandleChange = this.CompItemHandleChange.bind(this);
    }

    CompItemHandleChange(event) {
        this.setState({ selectedCompItem: event.target.value });
    }

    getCompItem(){
        db.collection('competition').doc('RXNe9XqYKTO0P9nzmHkx').collection('competitionItem').onSnapshot(coll => {
            const compItem = coll.docs.map(doc => doc.id)
            this.setState({ compItem })
        })
    }

    render() {
        return (
            <div>
                <select value={this.state.selectedCompItem} onChange={this.CompItemHandleChange}>
                    <option value='' >Please select 請選擇</option>
                    {this.state.compItem.map((topic, index) =>
                        <option value={topic} >{topic} </option>)}
                </select>
                <br/>
                {this.state.selectedCompItem}
                <br/>
                <input type="text"
                    placeholder="比賽項目名稱 Competition Item Name"
                    onChange={event => this.setState({ itemIn: event.target.value })}
                />
            </div>
        )

    }

}
export default AddParticipant;