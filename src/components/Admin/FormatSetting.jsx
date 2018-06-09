import React, { Component } from 'react';
import { db } from '../../firebase';

class FormatSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addType: '',
            itemIn: ''
        }

        this.itemTypeChange = this.itemTypeChange.bind(this);

    }

    itemTypeChange(event) {
        this.setState({ addType: event.target.value });
    }

    selectItem() {
        const addType = this.state.addType;
        if (addType != null) {
            if(addType === "itemType"){
                return(
                    <input type="text"
                    placeholder="比賽項目名稱 Competition Item Name"
                    onChange={event => this.setState({ itemIn: event.target.value })}
                />
                )
            }else if(addType === "timeLimit"){
                return(
                    <input type="number"
                    placeholder="秒 seconds"
                    onChange={event => this.setState({ itemIn: event.target.value })}
                />
                )
            }else if(addType === "numOfPeople"){
                return(
                    <input type="number"
                    placeholder="人數 people"
                    onChange={event => this.setState({ itemIn: event.target.value })}
                />
                )
            }else if(addType === "groupType"){
                return(
                    <input type="text"
                    placeholder="組別 Group"
                    onChange={event => this.setState({ itemIn: event.target.value })}
                />
                )
            }
        }
    }

    render() {
        return (
            <div>
                <select value={this.state.addType} onChange={this.itemTypeChange}>
                    <option value='' >Please select 請選擇</option>
                    <option value='itemType' >比賽項目 Competition Item</option>
                    <option value='timeLimit' >時間限制 Time Limit</option>
                    <option value='numOfPeople' >參賽人數 Participants</option>
                    <option value='groupType' >組別 Group</option>
                </select>
                <br/>
                {this.selectItem()}
                <br />
                <button
                    className="btn btn-success"
                    onClick={() => this.addnewitem()}
                >
                    Submit
                </button>
            </div>
        )

    }
    addnewitem() {
        const addType = this.state.addType;
        const itemIn = this.state.itemIn;
        if (addType != null && itemIn != null) {
            if(addType === "itemType"){
                db.collection("competitionFormat").doc("competitionItem").collection(addType).doc(itemIn).set({
                    name: itemIn
                })
            }else if(addType === "timeLimit"){
                db.collection("competitionFormat").doc("competitionItem").collection(addType).doc(itemIn+'sec').set({
                    limit: itemIn
                })
            }else if(addType === "numOfPeople"){
                db.collection("competitionFormat").doc("competitionItem").collection(addType).doc('Group'+itemIn).set({
                    limit: itemIn
                })
            }else if(addType === "groupType"){
                db.collection("competitionFormat").doc("competitionItem").collection(addType).doc(itemIn).set({
                    gender: itemIn
                })
            }
        }
    }
}
export default FormatSetting;