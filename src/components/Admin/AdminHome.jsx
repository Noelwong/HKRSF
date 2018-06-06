import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';

import CompetitionBar from "./CompetitionBar"

class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state={
            showContent:''
        }
    }
    handleChange() {
        this.setState({showContent:'CompetitionBar'})
      }


    selectShowContent = (showContent) =>{
        if(showContent != null){
            if(showContent === 'CompetitionBar'){
                return(<CompetitionBar/>)
            }
        }
    }

    render() {
        return (
            <div>
                AdminHome
                <br/>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li className="active" onClick={() => this.handleChange()}><a>Competition</a></li>
                        <li className="active" ><a>Show Competition</a></li>
                        <li><a>Rule Setting</a></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a>Static top</a></li>
                        <li><button
                            className="btn btn-danger"
                            onClick={() => this.signOut()}
                        >
                            Sign Out
                        </button></li>
                    </ul>
                </div>
                <br/>
                {this.selectShowContent(this.state.showContent)}
            </div >

        )
    }
    signOut() {
        firebaseApp.auth().signOut();
    }

}
export default AdminHome;