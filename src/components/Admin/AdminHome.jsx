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
                AdminHome
                <br/>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li className="active" onClick={() => this.handleChange()}><a>Add Competition</a></li>
                        <li className="active" onClick={() => this.handleChangeShow()}><a>Show Competition</a></li>
                        <li><a href="">Rule Setting</a></li>
                        <li className="dropdown">
                            <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                <li><a href="">Action</a></li>
                                <li><a href="">Another action</a></li>
                                <li><a href="">Something else here</a></li>
                                <li role="separator" className="divider"></li>
                                <li className="dropdown-header">Nav header</li>
                                <li><a href="">Separated link</a></li>
                                <li><a href="">One more separated link</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="../navbar/">Default</a></li>
                        <li><a href="../navbar-static-top/">Static top</a></li>
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