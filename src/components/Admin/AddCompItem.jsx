import React, { Component } from 'react';
import { db } from '../../firebase';

class AddCompItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemType: [],
            numOfPeople: [],
            timeLimit: [],
            selecteditemType: '',
            selectedtimeLimit: '',
            selectednumOfPeople: ''
        }
        this.getitemType();
        this.itemTypeHandleChange = this.itemTypeHandleChange.bind(this);
        this.timeLimitHandleChange = this.timeLimitHandleChange.bind(this);
        this.numOfPeopleHandleChange = this.numOfPeopleHandleChange.bind(this);

    }

    getitemType() {
        db.collection('competitionFormat').doc('competitionItem').collection('itemType').onSnapshot(coll => {
            const itemType = coll.docs.map(doc => doc.id)
            this.setState({ itemType })
        })
        db.collection('competitionFormat').doc('competitionItem').collection('numOfPeople').onSnapshot(coll => {
            const numOfPeople = coll.docs.map(doc => doc.id)
            this.setState({ numOfPeople })
        })
        db.collection('competitionFormat').doc('competitionItem').collection('timeLimit').onSnapshot(coll => {
            const timeLimit = coll.docs.map(doc => doc.id)
            this.setState({ timeLimit })
        })

    }

    itemTypeHandleChange(event) {
        this.setState({ selecteditemType: event.target.value });
    }

    timeLimitHandleChange(event) {
        this.setState({ selectedtimeLimit: event.target.value });
    }

    numOfPeopleHandleChange(event) {
        this.setState({ selectednumOfPeople: event.target.value });
    }


    render() {
        return (
            <div>

                <br />
                <select value={this.state.selectednumOfPeople} onChange={this.numOfPeopleHandleChange}>
                    {this.state.numOfPeople.map((topic, index) =>
                        <option value={index} >{topic} </option>)}
                </select>
                <br />
                <select value={this.state.selectedtimeLimit} onChange={this.timeLimitHandleChange}>
                    {this.state.timeLimit.map((topic, index) =>
                        <option value={index} >{topic} </option>)}
                </select>
                <br />
                <select value={this.state.selecteditemType} onChange={this.itemTypeHandleChange}>
                    {this.state.itemType.map((topic, index) =>
                        <option value={index} >{topic} </option>)}
                </select>
            </div>
        )

    }

}
export default AddCompItem;