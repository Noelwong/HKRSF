import React, { Component } from 'react';
import { db } from '../../firebase';
import { Table } from 'react-bootstrap';
import { Column, Row } from 'simple-flexbox';

class SetPriority extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rank: {},
            district: [],
            groupType: [],
            itemType: [],
            numOfPeople: [],
            timeLimit: [],

            districtpri: {},
            groupTypepri: {},
            itemTypepri: {},
            numOfPeoplepri: {},
            timeLimitpri: {},
            speedVenue: {},
            fancyVenue: {},
            pack: {},

            District: '',
            GroupType: '',
            ItemType: '',
            NumOfPeople: '',
            TimeLimit: '',
            url: 'https://us-central1-hkrsf-csci321.cloudfunctions.net/scheduling_test_02?req_object='
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
        this.addDistrict();
        this.addGroupType();
        this.addItemType();
        this.addNumOfPeople();
        this.addTimeLimit();
        this.addSpeedVenue();
        this.addFancyVenue();
        this.setPack();
    }
    setPack() {
        var VarPack = [];
        var rank = [];
        rank.push(this.state.District);
        rank.push(this.state.GroupType);
        rank.push(this.state.ItemType);
        rank.push(this.state.NumOfPeople);
        rank.push(this.state.TimeLimit);
        VarPack.push(rank);
        VarPack.push(this.state.districtpri);
        VarPack.push(this.state.groupTypepri);
        VarPack.push(this.state.itemTypepri);
        VarPack.push(this.state.numOfPeoplepri);
        VarPack.push(this.state.timeLimitpri);
        VarPack.push(sessionStorage.compID);
        VarPack.push(this.state.speedVenue);
        VarPack.push(this.state.fancyVenue);


        this.setState({ pack: VarPack })
    }



    addDistrict() {
        for (var i = 0; i < this.state.district.length; i++) {
            // eslint-disable-next-line 
            this.state.districtpri[this.state.district[i]] = Number(document.getElementById(this.state.district[i]).value)
        }
        var json = JSON.stringify(this.state.districtpri);
        console.log(json);
    }

    addGroupType() {
        for (var i = 0; i < this.state.groupType.length; i++) {
            // eslint-disable-next-line 
            this.state.groupTypepri[this.state.groupType[i]] = Number(document.getElementById(this.state.groupType[i]).value)
        }
        var json = JSON.stringify(this.state.groupTypepri);
        console.log(json);
    }

    addItemType() {
        for (var i = 0; i < this.state.itemType.length; i++) {
            // eslint-disable-next-line 
            this.state.itemTypepri[this.state.itemType[i]] = Number(document.getElementById(this.state.itemType[i]).value)
        }
        var json = JSON.stringify(this.state.itemTypepri);
        console.log(json);
    }

    addNumOfPeople() {
        for (var i = 0; i < this.state.numOfPeople.length; i++) {
            // eslint-disable-next-line 
            this.state.numOfPeoplepri[this.state.numOfPeople[i]] = Number(document.getElementById(this.state.numOfPeople[i]).value)
        }
        var json = JSON.stringify(this.state.numOfPeoplepri);
        console.log(json);
    }


    addTimeLimit() {
        for (var i = 0; i < this.state.timeLimit.length; i++) {
            // eslint-disable-next-line 
            this.state.timeLimitpri[this.state.timeLimit[i]] = Number(document.getElementById(this.state.timeLimit[i]).value)
        }
        var json = JSON.stringify(this.state.timeLimitpri);
        console.log(json);
    }

    addSpeedVenue() {
        for (var i = 0; i < this.state.numOfPeople.length; i++) {
            // eslint-disable-next-line
            this.state.speedVenue[this.state.numOfPeople[i]] = Number(document.getElementById(this.state.numOfPeople[i] + '速度賽').value)
        }
        var json = JSON.stringify(this.state.speedVenue);
        console.log(json);

    }

    addFancyVenue() {
        for (var i = 0; i < this.state.numOfPeople.length; i++) {
            // eslint-disable-next-line
            this.state.fancyVenue[this.state.numOfPeople[i]] = Number(document.getElementById(this.state.numOfPeople[i] + '花式賽').value)
        }
        var json = JSON.stringify(this.state.fancyVenue);
        console.log(json);
    }




    render() {
        return (
            <div>

                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <Column flexGrow={1}>
                                    <Row>

                                        <Column flexGrow={0.5}>
                                            <Table responsive bordered style={{ width: '70%' }}>
                                                <thead align="center">
                                                </thead>
                                                <tbody >
                                                    <tr key="District">
                                                        <td><font size="4">地區 (District):
                                            <input type="number"
                                                                id="District"
                                                                min="1" max="5"
                                                                onChange={event => this.setState({ District: event.target.value })}
                                                            /></font></td>
                                                    </tr>

                                                    {
                                                        this.state.district.map((topic, index) =>
                                                            <tr key={topic}>
                                                                <td align="left" colSpan="1"><font size="3">{topic}
                                                                    <input type="number"
                                                                        min="1" max={this.state.district.length}
                                                                        id={topic}
                                                                    />
                                                                </font></td>
                                                            </tr>)
                                                    }

                                                </tbody>
                                            </Table>
                                        </Column>

                                        <Column flexGrow={0.5}>
                                            <Table responsive bordered style={{ width: '70%' }}>
                                                <thead align="center">
                                                </thead>
                                                <tbody>
                                                    <tr key="ItemType">
                                                        <td><font size="4">比賽項目 (Item Type):
                                            <input type="number"
                                                                id="ItemType"
                                                                min="1" max="5"
                                                                onChange={event => this.setState({ ItemType: event.target.value })}
                                                            /></font></td>
                                                    </tr>
                                                    {
                                                        this.state.itemType.map((topic, index) =>
                                                            <tr key={topic}>
                                                                <td align="left" colSpan="1"><font size="3">{topic}
                                                                    <input type="number"
                                                                        min="1" max={this.state.itemType.length}
                                                                        id={topic}
                                                                    />
                                                                </font></td>
                                                            </tr>
                                                        )

                                                    }
                                                </tbody>
                                            </Table>
                                        </Column>

                                        <Column>
                                            <Table responsive bordered style={{ width: '60%' }}>
                                                <thead align="center">
                                                </thead>
                                                <tbody>
                                                    <tr key="NumOfPeople">

                                                        <td><font size="4">參賽人數 (# Of People):
                                        <input type="number"
                                                                id="NumOfPeople"
                                                                min="1" max="5"
                                                                onChange={event => this.setState({ NumOfPeople: event.target.value })}
                                                            /></font></td>

                                                        <td><font size="4">速度賽場區數目:
                                </font></td>
                                                        <td><font size="4">花式賽場區數目:
                                    </font></td>
                                                    </tr>
                                                    {
                                                        this.state.numOfPeople.map((topic, index) =>
                                                            <tr key={topic}>
                                                                <td align="left" colSpan="1"><font size="3">{topic}
                                                                    <input type="number"
                                                                        min="1" max={this.state.numOfPeople.length}
                                                                        id={topic}
                                                                    />
                                                                </font></td>

                                                                <td align="left" colSpan="1"><font size="3">
                                                                    <input type="number"
                                                                        id={topic + '速度賽'}
                                                                    />
                                                                </font></td>

                                                                <td align="left" colSpan="1"><font size="3">
                                                                    <input type="number"
                                                                        id={topic + '花式賽'}
                                                                    />
                                                                </font></td>
                                                            </tr>)

                                                    }
                                                </tbody>
                                            </Table>
                                        </Column>


                                    </Row>




                                </Column>

 <Column>
                                <Table responsive bordered style={{ width: '35%' }}>
                                    <thead align="center">
                                    </thead>
                                    <tbody>
                                        <tr key="TimeLimit">
                                            <td><font size="4"> 時間限制 (Time Limit):
                                <input type="number"
                                                    id="TimeLimit"
                                                    min="1" max="5"
                                                    onChange={event => this.setState({ TimeLimit: event.target.value })}
                                                /></font></td>
                                            <td><font size="4"> 場均時間:</font></td>
                                        </tr>
                                        {
                                            this.state.timeLimit.map((topic, index) =>
                                                <tr key={topic}>
                                                    <td align="left" colSpan="1"><font size="3">{topic}
                                                        <input type="number"
                                                            min="1" max={this.state.timeLimit.length}
                                                            id={topic}
                                                        />
                                                    </font></td>
                                                    <td align="left" colSpan="1">
                                                        <input type="number"
                                                            min="1"
                                                            id={topic + "time"}
                                                        />
                                                    </td>
                                                </tr>)
                                        }
                                    </tbody>

                                </Table>
                                </Column>
                                <Column>
                                <Table responsive bordered style={{ width: '35%' }}>
                                    <thead align="center">
                                    </thead>
                                    <tbody>
                                        <tr key="GroupType">
                                            <td><font size="4">組別 (Group Type):
                                <input type="number"
                                                    id="GroupType"
                                                    min="1" max="5"
                                                    onChange={event => this.setState({ GroupType: event.target.value })}
                                                /></font></td>
                                        </tr>
                                        {
                                            this.state.groupType.map((topic, index) =>
                                                <tr key={topic}>
                                                    <td align="left" colSpan="1"><font size="3">{topic}
                                                        <input type="number"
                                                            min="1" max={this.state.groupType.length}
                                                            id={topic}
                                                        />
                                                    </font></td>
                                                </tr>)
                                        }
                                    </tbody>
                                </Table>
                                </Column>

                                <br />
                                <a target="_blank" href={this.state.url + JSON.stringify(this.state.pack)}><button
                                    className="btn btn-success"
                                    onClick={() => this.setRank()}
                                >
                                    Submit
                </button></a>
                                <br />
                            </div>
                        </div>
                    </div>
        )

    }


}
export default SetPriority;