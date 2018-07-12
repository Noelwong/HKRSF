import React, { Component } from 'react';
import { db } from '../../firebase';
import { Alert, Button } from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class AddCompetition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            competitionName: '',
            startDate: moment(),
            endDate: moment(),
            deadDate: moment(),
            publishDate: moment(),
            location: '',
            selectedCompType: '',
            comType: [],
            show: false,
            error: {
                message: ''
            }
        }
        this.getCompType();
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
        this.handleChangeDeadDate = this.handleChangeDeadDate.bind(this);
        this.handleChangePublishDate = this.handleChangePublishDate.bind(this);
        this.CompTypehandleChange = this.CompTypehandleChange.bind(this);
        this.handleDismiss = this.handleDismiss.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }
    
    getCompType() {
        let length = 0;
        let compType = [];
        db.collection('competitionFormat').doc('competitionType').get().then(function(doc) {
                console.log("Document data:", doc.data().competitionType);
                length = doc.data().competitionType.length-1;
                for(let i=0; i<= length; i++){
                    compType.push(doc.data().competitionType[i]);
                }
           
        })
        console.log(compType);
        // eslint-disable-next-line 
        this.state.comType = compType; // have warning
        console.log("show state",this.state.comType);
}

CompTypehandleChange(event) {
    this.setState({
        selectedCompType: event.target.value,
    });
}

    handleChangeStartDate(date) {
        this.setState({
            startDate: date,
        });
    }

    handleChangeEndDate(date) {
        this.setState({
            endDate: date,
        });
    }
    handleChangeDeadDate(date) {
        this.setState({
            deadDate: date,
        });
    }

    handleChangePublishDate(date) {
        this.setState({
            publishDate: date,
        });
    }

    addCompetition(state) {

        db.collection("competition").doc().set({
            name: this.state.competitionName,
            startDate: new Date(this.state.startDate),
            endDate: new Date(this.state.endDate),
            deadDate: new Date(this.state.deadDate),
            publishDate: new Date(this.state.publishDate),
            location: this.state.location,
            competitionType: this.state.selectedCompType
        })
        this.setState({ show: false });
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
                    <h4>You are adding a new competition!</h4>
                    <p>Competition name: {this.state.competitionName}</p>
                    <p>Start Date: {Date(this.state.startDate)}<span>  </span>End Date: {Date(this.state.endDate)}</p>
                    <p>Dead Date: {Date(this.state.deadDate)}<span>  </span>Publish Date: {Date(this.state.publishDate)}</p>
                    <p>Location: {this.state.location}<span>  </span>Competition Type: {this.state.selectedCompType}</p>
                    <p>
                        <Button bsStyle="danger" onClick={() => this.addCompetition(this.state)}>Confirm</Button>
                        <span> or </span>
                        <Button onClick={this.handleDismiss}>Cancel</Button>
                    </p>
                </Alert>
            );
        }
        return ( 
            <div>
                <form>
                    比賽名稱:<br />
                    Competition name:<span>  </span>
                    <input type="text"
                        id="CompetitionName"
                        placeholder="competitionName"
                        onChange={event => this.setState({ competitionName: event.target.value })}
                    />
                    <br/>
                    <br/>
                    開始日期:<br />
                    Start Date:<span>  </span>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChangeStartDate}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="LLL"
                        timeCaption="time"
                    />
                    <br />
                    結束日期:<br />
                    End Date:<span>  </span>
                    <DatePicker
                        selected={this.state.endDate}
                        onChange={this.handleChangeEndDate}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="LLL"
                        timeCaption="time"
                    />
                    <br />
                    地點:<br />
                    Location:<span>  </span>
                    <input type="text" id="Location" placeholder="location"
                        onChange={event => this.setState({ location: event.target.value })} />
                    <br />
                    截止報名日期<br />
                    Deadline for registration:<span>  </span>
                    <DatePicker
                        selected={this.state.deadDate}
                        onChange={this.handleChangeDeadDate}
                    />
                    <br />
                    公佈日期:<br />
                    Publish Date:<span>  </span>
                    <DatePicker
                        selected={this.state.publishDate}
                        onChange={this.handleChangePublishDate}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="LLL"
                        timeCaption="time"
                    />
                    <br />
                    比賽類型<br/>
                    Competition type:
                    <select value={this.state.selectedCompType} onChange={this.CompTypehandleChange}>
                    <option key='' >Please select 請選擇</option>
                    {this.state.comType.map((topic, index) =>
                        <option key={topic} >{topic} </option>)}
                </select>

                </form>
                <button
                    className="btn btn-success"
                    type="button"
                    onClick={() => this.handleShow()}
                >
                    Submit
                    </button>
            </div>
        )

    }

}
export default AddCompetition;