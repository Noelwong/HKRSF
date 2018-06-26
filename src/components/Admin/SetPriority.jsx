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
        this.Ref.onSnapshot(function (querySnapshot) {
            var district = [];
            var groupType = [];
            var itemType = [];
            var numOfPeople = [];
            var timeLimit = [];
            querySnapshot.forEach(function (doc) {
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
        });

    }

    setRank() {
        this.setState({ rank: [this.state.District, this.state.GroupType, this.state.ItemType, this.state.NumOfPeople, this.state.TimeLimit] });
    }


    render() {
        return (
            <div>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>地區:<br />
                District:
                <input type="number"
                    id="District"
                    min="1" max="5"
                    onChange={event => this.setState({ District: event.target.value })}
                /></th>
                            <th>比賽項目:<br />
                Item Type:
                <input type="number"
                    id="ItemType"
                    min="1" max="5"
                    onChange={event => this.setState({ ItemType: event.target.value })}
                /></th>
                            <th>參賽人數:<br />
                # Of People:
                <input type="number"
                    id="NumOfPeople"
                    min="1" max="5"
                    onChange={event => this.setState({ NumOfPeople: event.target.value })}
                /></th>
                            <th>時間限制:<br />
                Time Limit:
                <input type="number"
                    id="TimeLimit"
                    min="1" max="5"
                    onChange={event => this.setState({ TimeLimit: event.target.value })}
                /></th>
                <th> 組別:<br />
                Group Type:
                <input type="number"
                    id="GroupType"
                    min="1" max="5"
                    onChange={event => this.setState({ GroupType: event.target.value })}
                /></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>;
                     <br />
                <a target="_blank" href={this.state.url + JSON.stringify(this.state.rank)}><button
                    className="btn btn-success"
                    onClick={() => this.setRank()}
                >
                    Submit
                </button></a>
                <br />
                <br />
            </div>
        )

    }


}
export default SetPriority;