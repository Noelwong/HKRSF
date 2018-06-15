import React, { Component } from 'react';
import { db } from '../../firebase';

class UserMan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UID: '',
            userType: '',
            name: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ userType: event.target.value });
    }
     addnewUser(){
        db.collection("user").doc(this.state.UID).set({
            name: this.state.name,
            userType: this.state.userType
        });
     }
    render() {
        return (
            <div>
                UID:
                <input type="text"
                     id="UID" 
                     onChange={event => this.setState({ UID: event.target.value })}
                     />
                <br/>
                用戶類型: <br/>
                User Type:
                <select value={this.state.userType} onChange={this.handleChange} >
                    <option value="">Please Select User type</option>
                    <option value="Admin">管理員 Admin</option>
                    <option value="Judge">評判 Judge</option>
                </select>
                <br/>
                姓名: <br/>
                Name:
                <input type="text"
                     id="name" 
                     onChange={event => this.setState({ name: event.target.value })}
                     />
                     <br/>
                     <button
                    className="btn btn-success"
                    onClick={() => this.addnewUser()}
                >
                    Submit
                </button>
            </div>
        )

    }

    
}
export default UserMan;