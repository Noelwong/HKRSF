import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';

class JudgeHome extends Component {
    render(){
        return (
            <div>JudgeHome
                <br/>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
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
                        <li><a href="">Default</a></li>
                        <li><a href="">Static top</a></li>
                        <li><button
                            className="btn btn-outline-warning"
                            onClick={() => this.signOut()}
                        >
                            登出<br/>Sign Out
                        </button></li>
                    </ul>
                </div>
            </div>
        )
    }
    signOut() {
        firebaseApp.auth().signOut();
    }
    
}
export default JudgeHome;