import React, { Component } from 'react';
import { firebaseApp } from '../firebase';

import OrganizationInfor from './Organization/OrganizationInfor';
import SchoolInfor from './School/SchoolInfor';
import PersonalInfor from './Personal/PersonalInfor';

class AddInfor extends Component {

        constructor(props) {
          super(props);
          this.state={
            changepage:''
          };
          this.handleChange = this.handleChange.bind(this);
        }

        handleChange(event) {
            this.setState({ changepage: event.target.value });
            console.log(this.state.changepage);
          }
          
    roleIdentifier = () => {
        var x = this.state.changepage ; 
        console.log(x);
        if (x !== 'dfv'){
            if (x === 'Personal'){
                return(
                    < PersonalInfor/>
                )
            }else if(x === 'School'){
                return(
                    < SchoolInfor/>
                )
            }else if(x === 'Organization'){
                return(
                    < OrganizationInfor/>
                )
        }
    }
}

    render() {

        return (
            <div class = "pickerdiv">
                <select id = "typeselect" onChange= {(event) => this.handleChange()} >
                    <option value ="dfv">Please Select Your User type</option>
                    <option value ="Personal">個人Personal</option>
                    <option value="School">學校School</option>
                    <option value="Organization">組織Organization</option>
                </select>
                </div>
                )
                this.roleIdentifier();
        return(
                <div>
                <button
                    className="btn btn-danger"
                    onClick={() => this.signOut()}
                >
                    Sign Out
                </button>
            </div>



        )
    }

    signOut() {
        firebaseApp.auth().signOut();
    }



}
export default AddInfor;