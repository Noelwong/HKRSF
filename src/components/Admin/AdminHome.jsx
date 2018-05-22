import React, { Component } from 'react';
import { Link } from 'react-router';

class AdminHome extends Component {
    render(){
        return (
            <div>
                AdminHome
                <Link to={'/AddCompetition'}><button>Add Competition</button></Link>
                </div>
            
        )
    }
    
}
export default AdminHome;