import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';

import AddCompetition from './AddCompetition';
import ShowComp from './ShowComp';

class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state={
            showContent:''
        }
    }
    handleChange() {
        this.setState({showContent:'AddCompetition'})
      }

    handleChangeShow() {
        this.setState({showContent:'ShowCompetition'})
    }
    selectShowContent = (showContent) =>{
        if(showContent != null){
            if(showContent === 'AddCompetition'){
                return(<AddCompetition/>)
            }else if (showContent ==='ShowCompetition'){
                return(<ShowComp/>)
            }
        }
    }

    render() {
        return (
            <div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li className="active" onClick={() => this.handleChange()}><a>Add Competition</a></li>
                        <li className="active" onClick={() => this.handleChangeShow()}><a>Show Competition</a></li>
                        <li><a>Rule Setting</a></li>
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