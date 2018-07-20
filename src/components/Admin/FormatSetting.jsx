import React, { Component } from 'react';
import { db } from '../../firebase';

import '../../css/Form.css'

class FormatSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addType: '',
            itemIn: '',
            district: '',
            ItemType: ''
        }

        this.itemTypeChange = this.itemTypeChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    itemTypeChange(event) {
        this.setState({ addType: event.target.value });
    }

    handleChange(event) {
        this.setState({ ItemType: event.target.value });
    }

    selectItem() {
        const addType = this.state.addType;
        if (addType != null) {
            if (addType === "itemType") {
                return (
                    <div>
                        <input type="text"
                            placeholder="比賽項目名稱 Competition Item Name"
                            onChange={event => this.setState({ itemIn: event.target.value })}
                        />
                        <br />
                        <select value={this.state.ItemType} onChange={this.handleChange} >
                            <option value="">Please Select !!</option>
                            <option value="speed">速度賽 Speed</option>
                            <option value="fancy">花式賽 Fancy</option>
                        </select>
                    </div>
                )
            } else if (addType === "timeLimit") {
                return (
                    <input type="number"
                        placeholder="秒 seconds"
                        onChange={event => this.setState({ itemIn: event.target.value })}
                    />
                )
            } else if (addType === "numOfPeople") {
                return (
                    <input type="number"
                        placeholder="人數 people"
                        onChange={event => this.setState({ itemIn: event.target.value })}
                    />
                )
            } else if (addType === "groupType") {
                return (
                    <input type="text"
                        placeholder="組別 Group"
                        onChange={event => this.setState({ itemIn: event.target.value })}
                    />
                )
            } else if (addType === "district") {
                return (
                    <div>
                        <input type="text"
                            placeholder="地區 District"
                            onChange={event => this.setState({ district: event.target.value })}
                        />
                        <br />
                        <input type="text"
                            placeholder="包括 Include"
                            onChange={event => this.setState({ itemIn: event.target.value })}
                        />
                    </div>
                )
            }
        }
    }

    render() {
        return (
            <div class="row centered-form">
                <div class="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <select value={this.state.addType} onChange={this.itemTypeChange}>
                                <option value='' >Please select 請選擇</option>
                                <option value='itemType' >比賽項目 Competition Item</option>
                                <option value='timeLimit' >時間限制 Time Limit</option>
                                <option value='numOfPeople' >參賽人數 Participants</option>
                                <option value='groupType' >組別 Group</option>
                                <option value='district' >地區 District</option>
                            </select>
                            <br />
                            {this.selectItem()}
                            <br />
                            <button
                                className="btn btn-success"
                                onClick={() => this.addnewitem()}
                            >
                                Submit
                </button>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
    addnewitem() {
        const addType = this.state.addType;
        const itemIn = this.state.itemIn;
        const district = this.state.district;
        const ItemType = this.state.ItemType;
        if (addType != null && itemIn != null) {
            if (addType === "itemType") {
                db.collection("competitionFormat").doc("competitionItem").collection(addType).doc(itemIn).set({
                    name: itemIn,
                    type: ItemType
                })
            } else if (addType === "timeLimit") {
                db.collection("competitionFormat").doc("competitionItem").collection(addType).doc(itemIn + 'sec').set({
                    limit: Number(itemIn)
                })
            } else if (addType === "numOfPeople") {
                db.collection("competitionFormat").doc("competitionItem").collection(addType).doc('Group' + itemIn).set({
                    limit: Number(itemIn)
                })
            } else if (addType === "groupType") {
                db.collection("competitionFormat").doc("competitionItem").collection(addType).doc(itemIn).set({
                    gender: itemIn
                })
            } else if (addType === "district") {
                db.collection("competitionFormat").doc("competitionItem").collection(addType).doc(district).set({
                    include: itemIn
                })
            }
        }
    }
}
export default FormatSetting;