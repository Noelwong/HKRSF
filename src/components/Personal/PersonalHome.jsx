import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';

import UpdatePersonalInfor from './UpdatePersonalInfor';
import ShowCompPersonal from './ShowCompPersonal';


class PersonalHome extends Component {
    constructor(props) {
        super(props);
        this.state={
            showContent:''
        }
    }

    selectShowContent = (showContent) =>{
        if(showContent != null){
            if(showContent === 'UpdateInformation'){
                return(<UpdatePersonalInfor/>)
        }
        else if(showContent ==='ShowComp'){
                return (<ShowCompPersonal/>)
            }
    }
}

    render(){
        return (
            <div>PersonalHome
                <br/>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li class="active"onClick={() => this.setState({showContent:'UpdateInformation'})}><a>Update Information</a></li>
                        <li className="active" onClick={() => this.setState({showContent: 'ShowComp'})}><a>Show Competition</a></li>
                        <li><a>About</a></li>
                        <li><a>Contact</a></li>
                        <li class="dropdown">
                            <a  class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a>Action</a></li>
                                <li><a>Another action</a></li>
                                <li><a>Something else here</a></li>
                                <li role="separator" class="divider"></li>
                                <li class="dropdown-header">Nav header</li>
                                <li><a>Separated link</a></li>
                                <li><a>One more separated link</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a>Default</a></li>
                        <li><a>Static top</a></li>

                    </ul>
                </div>
                <br/>
                {this.selectShowContent(this.state.showContent)}
            </div>
        )
    }

    
}
export default PersonalHome;