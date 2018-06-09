import React, { Component } from 'react';
import { db } from '../../firebase';

class FormatSetting extends Component {
    constructor(props) {
        super(props);
        this.state={
            addType: "",
            itemIn: "",
            limitType: [],
            numOfPeople: [],
            timeLimit: [],
        }

        this.itemTypeChange = this.itemTypeChange.bind(this);
        
    }

    itemTypeChange (event){
        this.setState({ addType:event.target.value });
    }


    render() {


        return (
            <div>
                <br>Add Item</br>
                <p></p>
                <select value = {this.state.addType} onChange={this.itemTypeChange}>
                    <option value='' >Please select</option>
                    <option value='itemType' >itemType</option>
                    <option value='timeLimit' >timeLimit</option>
                    <option value='numOfPeople' >numOfPeople</option>
                </select>
                <input type="text"
                       id="itemAdd"
                       placeholder="Condition"
                       onChange={event => this.setState({ itemIn: event.target.value })}
                >
                </input>
                <button
                    className="btn btn-success"
                    OnClick={() => this.addnewitem()}
                >
                    Submit
                </button>
            </div>
            )

    }
addnewitem (){
        db.collection("competitionFormat").doc("competitionItem").set(
            {
            }
        )
}
}
export default FormatSetting;