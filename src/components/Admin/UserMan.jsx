import React, { Component } from 'react';
import { db } from '../../firebase';
import { Alert, Button } from 'react-bootstrap';

import '../../css/Form.css'

class UserMan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UID: '',
            userType: '',
            name: '',
            show: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDismiss = this.handleDismiss.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    handleChange(event) {
        this.setState({ userType: event.target.value });
    }
    addnewUser() {
        db.collection("user").doc(this.state.UID).set({
            name: this.state.name,
            userType: this.state.userType
        });
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
                    <h4>You adding a new account to the system!</h4>
                    <p>name: {this.state.name}</p>
                    <p>userType: {this.state.userType}</p>
                    <p>
                        <Button bsStyle="danger" onClick={() => this.addnewUser()}>Confirm</Button>
                        <span> or </span>
                        <Button onClick={this.handleDismiss}>Cancel</Button>
                    </p>
                </Alert>
            );
        }
        return (
            <div class="row centered-form">
                <div class="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            UID:
                <input type="text"
                                id="UID"
                                onChange={event => this.setState({ UID: event.target.value })}
                            />
                            <br />
                            用戶類型: <br />
                            User Type:
                <select value={this.state.userType} onChange={this.handleChange} >
                                <option value="">Please Select User type</option>
                                <option value="Admin">管理員 Admin</option>
                                <option value="Judge">評判 Judge</option>
                            </select>
                            <br />
                            姓名: <br />
                            Name:
                <input type="text"
                                id="name"
                                onChange={event => this.setState({ name: event.target.value })}
                            />
                            <br />
                            <br />
                            <Button bsStyle="success"
                                onClick={() => this.handleShow()}
                            >
                                Submit
                </Button>
                        </div>
                    </div>
                </div>
            </div>
        )

    }


}
export default UserMan;