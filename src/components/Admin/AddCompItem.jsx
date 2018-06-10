import React, { Component } from 'react';
import { db } from '../../firebase';

class AddCompItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemType: [],
            numOfPeople: [],
            timeLimit: [],
            groupType: [],
            selecteditemType: '',
            selectedtimeLimit: '',
            selectednumOfPeople: '',
            selectedgroupType:'',
            ageLowerBound: '',
            ageUpperBound: ''
        }
        this.getitemType();
        this.itemTypeHandleChange = this.itemTypeHandleChange.bind(this);
        this.timeLimitHandleChange = this.timeLimitHandleChange.bind(this);
        this.numOfPeopleHandleChange = this.numOfPeopleHandleChange.bind(this);
        this.groupTypeHandleChange = this.groupTypeHandleChange.bind(this);

    }

    addComptetionItem(state){
        const selectednumOfPeople = this.state.selectednumOfPeople;
        const selectedtimeLimit = this.state.selectedtimeLimit;
        const selecteditemType = this.state.selecteditemType;
        const age = this.state.ageLowerBound+'-'+this.state.ageUpperBound;
        const selectedgroupType = this.state.selectedgroupType;
        db.collection("competition").doc("RXNe9XqYKTO0P9nzmHkx").collection("competitionItem").doc(selectednumOfPeople+selectedtimeLimit+selectedgroupType+selecteditemType+age).set({
            itemType: this.state.selecteditemType,
            timeLimit: this.state.selectedtimeLimit,
            numOfPeople: this.state.selectednumOfPeople,
            groupType: this.state.selectedgroupType,
            ageLowerBound: this.state.ageLowerBound,
            ageUpperBound: this.state.ageUpperBound
        });

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
        db.collection('competitionFormat').doc('competitionItem').collection('groupType').onSnapshot(coll => {
            const groupType = coll.docs.map(doc => doc.id)
            this.setState({ groupType })
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

    groupTypeHandleChange(event) {
        this.setState({ selectedgroupType: event.target.value });
    }

    render() {
        return (
            <div>
                參賽人數:<br/>
                Number of participants:
                <select value={this.state.selectednumOfPeople} onChange={this.numOfPeopleHandleChange}>
                    <option value='' >Please select 請選擇</option>
                    {this.state.numOfPeople.map((topic, index) =>
                        <option value={topic} >{topic} </option>)}
                </select>
                <br />
                時間限制: <br/>
                Time limit:
                <select value={this.state.selectedtimeLimit} onChange={this.timeLimitHandleChange}>
                    <option value='' >Please select 請選擇</option>
                    {this.state.timeLimit.map((topic, index) =>
                        <option value={topic} >{topic} </option>)}
                </select>
                <br />
                組別選擇<br/>
                Group:
                <select value={this.state.selectedgroupType} onChange={this.groupTypeHandleChange}>
                    <option value='' >Please select 請選擇</option>
                    {this.state.groupType.map((topic, index) =>
                        <option value={topic} >{topic} </option>)}
                </select>
                <br />
                比賽項目: <br/>
                Competition item:
                <select value={this.state.selecteditemType} onChange={this.itemTypeHandleChange}>
                    <option value='' >Please select 請選擇</option>
                    {this.state.itemType.map((topic, index) =>
                        <option value={topic} >{topic} </option>)}
                </select>
                <br/>
                年齡下限<br/>
                Age Lower Bound:
                <input type="number"
                     id="ageLowerBound" 
                     min="3" max="80"
                     onChange={event => this.setState({ ageLowerBound: event.target.value })}
                     />
                     <br/>
                年齡上限<br/>
                Age Upper Bound:
                <input type="number"
                     id="ageUpperBound" 
                     min="3" max="80"
                     onChange={event => this.setState({ ageUpperBound: event.target.value })}
                     />
                     <br/>
                <button
                    className="btn btn-success"
                    onClick={() => this.addComptetionItem(this.state)}    
                >
                    Submit
                </button>
            </div>
        )

    }

}
export default AddCompItem;