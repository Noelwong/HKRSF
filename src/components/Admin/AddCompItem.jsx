import React, { Component } from 'react';
import { db } from '../../firebase';
import { Alert, Button } from 'react-bootstrap';

import ShowCompItem from './ShowCompItem';

class AddCompItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemType: [],
            numOfPeople: [],
            timeLimit: [],
            groupType: [],
            district: [],
            selecteddistrict: '',
            selecteditemType: '',
            selectedtimeLimit: '',
            selectednumOfPeople: '',
            selectedgroupType: '',
            ageLowerBound: '',
            ageUpperBound: '',
            show: false
        }
        this.getitemType();
        this.itemTypeHandleChange = this.itemTypeHandleChange.bind(this);
        this.timeLimitHandleChange = this.timeLimitHandleChange.bind(this);
        this.numOfPeopleHandleChange = this.numOfPeopleHandleChange.bind(this);
        this.groupTypeHandleChange = this.groupTypeHandleChange.bind(this);
        this.districtHandleChange = this.districtHandleChange.bind(this);
        this.handleDismiss = this.handleDismiss.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    addComptetionItem(state) {
        const selectednumOfPeople = this.state.selectednumOfPeople;
        const selectedtimeLimit = this.state.selectedtimeLimit;
        const selecteditemType = this.state.selecteditemType;
        const selecteddistrict = this.state.selecteddistrict;
        const age = this.state.ageLowerBound + '-' + this.state.ageUpperBound;
        const selectedgroupType = this.state.selectedgroupType;
        db.collection("competitionFormat").doc("competitionItem").collection("itemType").doc(selecteditemType).get().then(doc => {

            const itemType = doc.data().type;

            if (this.state.selecteddistrict === 'NULL') {
                db.collection("competition").doc(sessionStorage.compID).collection("competitionItem").doc(selectednumOfPeople + selectedtimeLimit + selectedgroupType + selecteditemType + age).set({
                    district: this.state.selecteddistrict,
                    itemType: this.state.selecteditemType,
                    timeLimit: this.state.selectedtimeLimit,
                    numOfPeople: this.state.selectednumOfPeople,
                    groupType: this.state.selectedgroupType,
                    ageLowerBound: Number(this.state.ageLowerBound),
                    ageUpperBound: Number(this.state.ageUpperBound),
                    areaType: itemType
                });
            } else {
                db.collection("competition").doc(sessionStorage.compID).collection("competitionItem").doc(selecteddistrict + selectednumOfPeople + selectedtimeLimit + selectedgroupType + selecteditemType + age).set({
                    district: this.state.selecteddistrict,
                    itemType: this.state.selecteditemType,
                    timeLimit: this.state.selectedtimeLimit,
                    numOfPeople: this.state.selectednumOfPeople,
                    groupType: this.state.selectedgroupType,
                    ageLowerBound: Number(this.state.ageLowerBound),
                    ageUpperBound: Number(this.state.ageUpperBound),
                    areaType: itemType
                });
            }
        })
        this.setState({ show: false });

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
        db.collection('competitionFormat').doc('competitionItem').collection('district').onSnapshot(coll => {
            const district = coll.docs.map(doc => doc.id)
            this.setState({ district })
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

    districtHandleChange(event) {
        this.setState({ selecteddistrict: event.target.value });
    }

    handleDismiss() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        if (this.state.show) {
            const selectednumOfPeople = this.state.selectednumOfPeople;
            const selectedtimeLimit = this.state.selectedtimeLimit;
            const selecteditemType = this.state.selecteditemType;
            const age = this.state.ageLowerBound + '-' + this.state.ageUpperBound;
            const selectedgroupType = this.state.selectedgroupType;
            return (
                <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                    <h4>You are adding a new competition item!</h4>
                    <p>Item name: {selectednumOfPeople + selectedtimeLimit + selectedgroupType + selecteditemType + age}</p>
                    <p>District: {this.state.selecteddistrict}<span>  </span>ItemType: {this.state.selecteditemType}</p>
                    <p>Time Limit: {this.state.selectedtimeLimit}<span>  </span>Number Of People: {this.state.selectednumOfPeople}</p>
                    <p>Group Type: {this.state.selectedgroupType}<span>  </span>Age group: {age}</p>
                    <p>
                        <Button bsStyle="danger" onClick={() => this.addComptetionItem(this.state)}>Confirm</Button>
                        <span> or </span>
                        <Button onClick={this.handleDismiss}>Cancel</Button>
                    </p>
                </Alert>
            );
        }
        return (
            <div>
                <ShowCompItem />
                <br />
                地區限制:<br />
                Distant:
                <select value={this.state.selecteddistrict} onChange={this.districtHandleChange}>
                    <option key='' >Please select 請選擇</option>
                    <option value='NULL' >沒有指定地區</option>
                    {this.state.district.map((topic, index) =>
                        <option key={topic} >{topic} </option>)}
                </select>
                <br />
                參賽人數:<br />
                Number of participants:
                <select value={this.state.selectednumOfPeople} onChange={this.numOfPeopleHandleChange}>
                    <option key='' >Please select 請選擇</option>
                    {this.state.numOfPeople.map((topic, index) =>
                        <option key={topic} >{topic} </option>)}
                </select>
                <br />
                時間限制: <br />
                Time limit:
                <select value={this.state.selectedtimeLimit} onChange={this.timeLimitHandleChange}>
                    <option key='' >Please select 請選擇</option>
                    {this.state.timeLimit.map((topic, index) =>
                        <option key={topic} >{topic} </option>)}
                </select>
                <br />
                組別選擇<br />
                Group:
                <select value={this.state.selectedgroupType} onChange={this.groupTypeHandleChange}>
                    <option key='' >Please select 請選擇</option>
                    {this.state.groupType.map((topic, index) =>
                        <option key={topic} >{topic} </option>)}
                </select>
                <br />
                比賽項目: <br />
                Competition item:
                <select value={this.state.selecteditemType} onChange={this.itemTypeHandleChange}>
                    <option key='' >Please select 請選擇</option>
                    {this.state.itemType.map((topic, index) =>
                        <option key={topic} >{topic} </option>)}
                </select>
                <br />
                年齡下限<br />
                Age Lower Bound:
                <input type="number"
                    id="ageLowerBound"
                    min="3" max="80"
                    onChange={event => this.setState({ ageLowerBound: event.target.value })}
                />
                <br />
                年齡上限<br />
                Age Upper Bound:
                <input type="number"
                    id="ageUpperBound"
                    min="3" max="80"
                    onChange={event => this.setState({ ageUpperBound: event.target.value })}
                />
                <br />
                <button
                    className="btn btn-success"
                    onClick={() => this.handleShow()}
                >
                    Submit
                </button>
            </div>
        )

    }

}
export default AddCompItem;