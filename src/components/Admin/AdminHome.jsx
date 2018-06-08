import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';

import CompetitionBar from './CompetitionBar';
import FormatSetting from './FormatSetting';

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

      handleChangeFormat() {
        this.setState({showContent:'FormatSetting'})
      }

    selectShowContent = (showContent) =>{
        if(showContent != null){
            if(showContent === 'CompetitionBar'){
                return(<CompetitionBar/>)
            }else if(showContent === 'FormatSetting'){
                return(<FormatSetting/>)
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
                        <li className="active" onClick={() => this.handleChange()}><a>比賽<br/>Competition</a></li>
                        <li className="active" onClick={() => this.handleChangeFormat()}><a>Format Setting</a></li>
                        <li><a>Rule Setting</a></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="https://us-central1-hkrsf-csci321.cloudfunctions.net/readInfo?id=Daddy">Test</a></li>
                        <li><button
                            className="btn btn-outline-warning"
                            onClick={() => this.signOut()}
                        >
                            登出<br/>Sign Out
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