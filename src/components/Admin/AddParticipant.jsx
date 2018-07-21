import React, { Component } from 'react';
import { db } from '../../firebase';
import { Alert, Button } from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import '../../css/Form.css'

class AddParticipant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compItem: [],
            selectedCompItem: '',
            CName: '',
            EName: '',
            BDate: moment(),
            schoolName: '',
            ID: '',
            Limit: '',
            Gender: '',
            show: false
        }
        this.Ref = db.collection('competition').doc(sessionStorage.compID).collection('competitionItem');
        this.getCompItem();
        this.CompItemHandleChange = this.CompItemHandleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDismiss = this.handleDismiss.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    date(date) {
        this.setState({ BDate: date });
    }

    CompItemHandleChange(event) {
        this.setState({ selectedCompItem: event.target.value });
        this.getCompLimit(event.target.value);
    }

    handleChange(event) {
        this.setState({ Gender: event.target.value });
    }

    getCompItem() {
        this.Ref.onSnapshot(coll => {
            const compItem = coll.docs.map(doc => doc.id);
            this.setState({ compItem })
        })
    }

    getCompLimit(selectedcompItem) {
        console.log(selectedcompItem);
        db.collection('competition').doc(sessionStorage.compID).collection('competitionItem').onSnapshot(coll => {
            const temp = coll.docs.map(doc => doc.id);
            const temp2 = coll.docs.map(doc => doc.data().numOfPeople);
            for (var i = 0; i <= temp.length; i++) {
                if (selectedcompItem === temp[i]) {
                    var numberOfpeopleChecker = temp2[i];
                    // eslint-disable-next-line
                    db.collection('competitionFormat').doc('competitionItem').collection('numOfPeople').onSnapshot(coll => {
                        const temp3 = coll.docs.map(doc => doc.id);
                        const temp4 = coll.docs.map(doc => doc.data().limit);
                        for (var i = 0; i <= temp3.length; i++) {
                            if (numberOfpeopleChecker === temp3[i]) {
                                this.setState({ Limit: temp4[i] });
                            }
                        }
                    })
                }
            }
        })



    }

    addParticipant(state) {
        db.collection("competition").doc(sessionStorage.compID).collection("participant").doc().set({
            CName: this.state.CName,
            EName: this.state.EName,
            BDate: new Date(this.state.BDate),
            schoolName: this.state.schoolName,
            ID: this.state.ID,
            user_CompetitionItem: [],
            teamCode:[],
            activate:false,
            Gender: this.state.Gender,
        });
        this.setState({ show: false });
    }

    createParticipant() {
        let Participant1 = <div>
            <br />
            中文姓名:
                <input type="text"
                placeholder="中文姓名"
                onChange={event => this.setState({ CName: event.target.value })}
            />
            <br />
            Name in English:
                <input type="text"
                placeholder="Name in English"
                onChange={event => this.setState({ EName: event.target.value })}
            />
            <br />
            出生日期:<br />
            Date of Birth:
                <DatePicker
                selected={this.state.BDate}
                onChange={this.date.bind(this)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
            />
            性別: <br />
            Gender:
            <select value={this.state.Gender} onChange={this.handleChange} >
                <option value="">Please Select!</option>
                <option value="male">男 Male</option>
                <option value="female">女 Female</option>
            </select>
            <br/>
            學校名稱: <br />
            School Name:
                <input type="text"
                placeholder="學校名稱 School Name"
                onChange={event => this.setState({ schoolName: event.target.value })}
            />
            <br />
            身份證號碼:<br />
            ID:
                <input type="text"
                placeholder="ID number"
                onChange={event => this.setState({ ID: event.target.value })}
            />
            <br />
            <br />
        </div>;
        return Participant1;
    }
    handleDismiss() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        if (this.state.show) {
            return (
                <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                    <h4>You are adding a new participant!</h4>
                    <p>中文姓名:{this.state.CName}<span>  </span>EName: {this.state.EName}</p>
                    <p>BDate: {Date(this.state.BDate)}<span>  </span>schoolName: {this.state.schoolName}</p>
                    <p>ID: {this.state.ID}<span>  </span>Gender: {this.state.Gender}</p>
                    <p>
                        <Button bsStyle="danger" onClick={() => this.addParticipant(this.state)}>Confirm</Button>
                        <span> or </span>
                        <Button onClick={this.handleDismiss}>Cancel</Button>
                    </p>
                </Alert>
            )
        }
        return (
            <div className="row centered-form">
                <div className="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            {this.createParticipant()}

                            <button
                                className="btn btn-success"
                                type="button"
                                onClick={() => this.handleShow()}
                            >
                                Submit
                    </button>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}
export default AddParticipant;
