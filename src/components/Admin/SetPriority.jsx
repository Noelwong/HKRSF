import React, { Component } from 'react';
import { db } from '../../firebase';
import { Table } from 'react-bootstrap';

class SetPriority extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rank: [''],
            district: [],
            groupType: [],
            itemType: [],
            numOfPeople: [],
            timeLimit: [],
            District: '',
            GroupType: '',
            ItemType: '',
            NumOfPeople: '',
            TimeLimit: '',
            url: 'https://us-central1-hkrsf-csci321.cloudfunctions.net/scheduling_test?arr_1='
        }
        this.Ref = db.collection('competition').doc(sessionStorage.compID).collection('competitionItem');
        this.getAll();
    }

    getAll() {
        this.Ref.onSnapshot(coll => {
            let district = [];
            let groupType = [];
            let itemType = [];
            let numOfPeople = [];
            let timeLimit = [];
            coll.forEach(doc => {
                district.push(doc.data().district);
                groupType.push(doc.data().groupType);
                itemType.push(doc.data().itemType);
                numOfPeople.push(doc.data().numOfPeople);
                timeLimit.push(doc.data().timeLimit);
            });
            district = Array.from(new Set(district));
            itemType = Array.from(new Set(itemType));
            numOfPeople = Array.from(new Set(numOfPeople));
            timeLimit = Array.from(new Set(timeLimit));
            groupType = Array.from(new Set(groupType));

            console.log(district);
            console.log(itemType);
            console.log(numOfPeople);
            console.log(timeLimit);
            console.log(groupType);
            this.thisSetStatearray(district, itemType, numOfPeople, timeLimit, groupType);
        });
    }

    thisSetStatearray(district, itemType, numOfPeople, timeLimit, groupType) {
        // eslint-disable-next-line 
        this.state.district = district;
        // eslint-disable-next-line 
        this.state.itemType = itemType;
        // eslint-disable-next-line 
        this.state.numOfPeople = numOfPeople;
        // eslint-disable-next-line 
        this.state.timeLimit = timeLimit;
        // eslint-disable-next-line 
        this.state.groupType = groupType;
    }

    setRank() {
        this.setState({ rank: [this.state.District, this.state.GroupType, this.state.ItemType, this.state.NumOfPeople, this.state.TimeLimit] });

    }


    render() {
        return (
            <div>
                <Table responsive bordered>
                    <thead  align="center">
                        <tbody >
                            <tr>
                                <td><font size="4">地區 (District):
                                <input type="number"
                                        id="District"
                                        min="1" max="5"
                                        onChange={event => this.setState({ District: event.target.value })}
                                    /></font></td>
                            </tr>

                            {
                                this.state.district.map((topic, index) =>
                                    <tr>
                                        <td align="left" colSpan="1"><font size="3">{topic}
                                            <input type="number"
                                                min="1" max={this.state.district.length}
                                                id={topic}
                                            />
                                        </font></td>
                                    </tr>)
                            }

                        </tbody>
                    </thead>
                </Table>;
                    <Table responsive bordered>
                    <thead  align="center">
                        <tbody>
                            <tr>
                                <td><font size="4">比賽項目 (Item Type):
                                <input type="number"
                                        id="NumOfPeople"
                                        min="1" max="5"
                                        onChange={event => this.setState({ ItemType: event.target.value })}
                                    /></font></td>
                            </tr>
                            {
                                this.state.itemType.map((topic, index) =>
                                    <tr>
                                        <td align="left" colSpan="1"><font size="3">{topic}
                                            <input type="number"
                                                min="1" max={this.state.itemType.length}
                                                id={topic}
                                            />
                                        </font></td>
                                    </tr>)
                            }
                        </tbody>
                    </thead>
                </Table>;
                    <Table responsive bordered>
                    <thead  align="center">
                        <tbody>
                            <tr>

                                <td><font size="4">參賽人數 (# Of People):
                                <input type="number"
                                        id="NumOfPeople"
                                        min="1" max="5"
                                        onChange={event => this.setState({ NumOfPeople: event.target.value })}
                                    /></font></td>
                            </tr>
                            {
                                this.state.numOfPeople.map((topic, index) =>
                                    <tr>
                                        <td align="left" colSpan="1"><font size="3">{topic}
                                            <input type="number"
                                                min="1" max={this.state.numOfPeople.length}
                                                id={topic}
                                            />
                                        </font></td>
                                    </tr>)
                            }
                        </tbody>
                    </thead>
                </Table>;
                    <Table responsive bordered>
                    <thead  align="center">
                        <tbody>
                            <tr>
                                <td><font size="4"> 時間限制 (Time Limit):
                                <input type="number"
                                        id="TimeLimit"
                                        min="1" max="5"
                                        onChange={event => this.setState({ TimeLimit: event.target.value })}
                                    /></font></td>
                            </tr>
                            {
                                this.state.timeLimit.map((topic, index) =>
                                    <tr>
                                        <td align="left" colSpan="1"><font size="3">{topic}
                                            <input type="number"
                                                min="1" max={this.state.timeLimit.length}
                                                id={topic}
                                            />
                                        </font></td>
                                    </tr>)
                            }
                        </tbody>
                    </thead>
                </Table>;
                    <Table responsive bordered>
                    <thead  align="center">
                        <tbody>
                            <tr>
                                <td><font size="4">組別 (Group Type):
                                <input type="number"
                                        id="GroupType"
                                        min="1" max="5"
                                        onChange={event => this.setState({ GroupType: event.target.value })}
                                    /></font></td>
                            </tr>
                            {
                                this.state.groupType.map((topic, index) =>
                                    <tr>
                                        <td align="left" colSpan="1"><font size="3">{topic}
                                            <input type="number"
                                                min="1" max={this.state.groupType.length}
                                                id={topic}
                                            />
                                        </font></td>
                                    </tr>)
                            }
                        </tbody>
                    </thead>
                </Table>;

                     <br />
                <a target="_blank" href={this.state.url + JSON.stringify(this.state.rank)}><button
                    className="btn btn-success"
                    onClick={() => this.setRank()}
                >
                    Submit
                </button></a>
                <br />
            </div>
        )

    }


}
export default SetPriority;