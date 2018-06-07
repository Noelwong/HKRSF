import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';

import UpdateSchoolInfor from './UpdateSchoolInfor';
import AddSchoolMember from './AddSchoolMember';

class SchoolHome extends Component {
    constructor(props) {
        super(props);
        this.state={
            showContent:''
        }
    }

    selectShowContent = (showContent) =>{
        if(showContent != null){
            if(showContent === 'UpdateInformation'){
                return(<UpdateSchoolInfor/>)
        }else if(showContent ==='AddMember'){
            return(<AddSchoolMember/>)
        }
    }
}

    render(){
        return (
            <div>SchoolHome
                <br/>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li class="active" onClick={() => this.setState({showContent:'UpdateInformation'})} ><a>Update Information</a></li>
                        <li onClick={() => this.setState({showContent:'AddMember'})}><a>Add Student</a></li>
                        <li><a>Contact</a></li>
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
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
            </div>
        )
    }
    signOut() {
        firebaseApp.auth().signOut();
    }
    
}
export default SchoolHome;