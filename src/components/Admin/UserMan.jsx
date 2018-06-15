import React, { Component } from 'react';
import { db } from '../../firebase';

class UserMan extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }
    render() {
        return (
            <div>
                UID:
                <input type="text"
                     id="UID" 
                     onChange={event => this.setState({ ageUpperBound: event.target.value })}
                     />
                     <br/>
            </div>
        )

    }
    
}
export default UserMan;