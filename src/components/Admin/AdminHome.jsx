import React, { Component } from 'react';

import { firebaseApp } from '../../firebase';

import AddCompetition from './AddCompetition';

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
    selectShowContent = (showContent) =>{
        if(showContent != null){
            if(showContent === 'AddCompetition'){
                return(<AddCompetition/>)
            }
        }
    }

    render() {
        return (
            <div>
                AdminHome
                <br/>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li class="active" onClick={() => this.handleChange()}><a>Competition</a></li>
                        <li><a href="">Rule Setting</a></li>
                        <li class="dropdown">
                            <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="">Action</a></li>
                                <li><a href="">Another action</a></li>
                                <li><a href="">Something else here</a></li>
                                <li role="separator" class="divider"></li>
                                <li class="dropdown-header">Nav header</li>
                                <li><a href="">Separated link</a></li>
                                <li><a href="">One more separated link</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
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