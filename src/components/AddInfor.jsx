import React, { Component } from 'react';
import { firebaseApp } from '../firebase';

import OrganizationInfor from './Organization/OrganizationInfor';
import SchoolInfor from './School/SchoolInfor';
import PersonalInfor from './Personal/PersonalInfor';

class AddInfor extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '', test: '' };
        this.handleChange = this.handleChange.bind(this);

    }
    roleIdentifier = (value) => {
        if (value != null) {
            if (value === 'Personal') {
                return (<PersonalInfor />)
            } else if (value === 'School') {
                return (<SchoolInfor />)
            } else if (value === 'Organization') {
                return (<OrganizationInfor />)
            }
        }
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {

        return (
            <div className="pickerdiv">
                <select value={this.state.value} onChange={this.handleChange} >
                    <option value="">Please Select Your User type</option>
                    <option value="Personal">個人Personal</option>
                    <option value="School">學校School</option>
                    <option value="Organization">組織Organization</option>
                </select>
                <br />
                {this.roleIdentifier(this.state.value)}
                <br />

            </div>



        )
    }

    signOut() {
        firebaseApp.auth().signOut();
    }



}
export default AddInfor;