import React, { Component } from 'react';

class AddInfor extends Component {

        constructor(props) {
          super(props);
          this.handleChange = '';
        }

    render() {
        return (
            <div>
                <select onChange={this.handleChange} >
                    <option value="Personal">個人Personal</option>
                    <option value="School">學校School</option>
                    <option value="Organization">組織Organization</option>
                </select>
                <b>{this.handleChange}</b>
            </div>
        )
    }

}
export default AddInfor;