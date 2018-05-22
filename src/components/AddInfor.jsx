import React, { Component } from 'react';

class AddInfor extends Component {

        constructor(props) {
          super(props);
          this.changepage;
        }




    render() {

        return (
            <div>
                <select id = "typeselect" onChange= {this.changepage} >
                    <option value ="Personal">個人Personal</option>
                    <option value="School">學校School</option>
                    <option value="Organization">組織Organization</option>
                </select>
                <b id = "test"></b>
            </div>

        )
    }
    changepage = () => {
        var x = document.getElementById("typeselect").value;
        document.getElementById("test").innerHTML = "You selected: " + x;

    }
}
export default AddInfor;