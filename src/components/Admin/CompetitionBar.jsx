import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';

import AddCompetition from './AddCompetition';
import ShowComp from './ShowComp';
import AddCompItem from './AddCompItem'

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

    handleChangeAdd() {
        this.setState({showContent:'AddCompItem'})
    }
    selectShowContent = (showContent) =>{
        if(showContent != null){
            if(showContent === 'AddCompetition'){
                return(<AddCompetition/>)
            }else if (showContent ==='ShowCompetition'){
                return(<ShowComp/>)
            }else if (showContent ==='AddCompItem'){
                return(<AddCompItem/>)
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
                        <li className="active" onClick={() => this.handleChangeAdd()}><a>Add item</a></li>
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