import React, { Component } from 'react';
import { db } from '../../firebase';

class AddCompItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemType: [],
            numOfPeople: [],
            timeLimit: [],
            selecteditemType: ''
        }
        this.getitemType();
        this.itemTypeHandleChange = this.itemTypeHandleChange.bind(this);

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
        this.setState({selecteditemType: event.target.value});
    }


    render() {
        return (
            <div>
                
                {
                    this.state.itemType.map((topic, index) =>
                        <button className="btn btn-success" id={index}>{topic}</button>
                    )
                }
                <br />
                {
                    this.state.numOfPeople.map((topic, index) =>
                        <button className="btn btn-warning" id={index}>{topic}</button>
                    )
                }
                <br />
                {
                    this.state.timeLimit.map((topic, index) =>
                        <button className="btn btn-info" id={index}>{topic}</button>
                    )
                }


                    <select value={this.state.selecteditemType} onChange={this.itemTypeHandleChange}>
                        {this.state.itemType.map((topic, index) =>
                        <option value ={index} >{topic} </option>)}
                    </select>
            </div>
        )

    }

}
export default AddCompItem;