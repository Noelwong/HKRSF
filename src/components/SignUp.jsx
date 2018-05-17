import React, { Component } from 'react';
import { firebaseApp } from '../firebase';

import '../css/SignUp.css'

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: {
                message: ''
            }
        }
    }

    signUp() {
        console.log('this.state', this.state);
        const { email, password } = this.state;

        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            .catch(error => {
                this.setState({ error })
            })
    }


    render() {
        return (
            <div class="container">
                <div class="col-md-6">
                    <div class="row myborder">
                        <h4>Sign Up Now</h4>
                        <div class="input-group margin-bottom-20">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-user mycolor"></i></span>
                            <input size="60" maxlength="255" class="form-control" placeholder="email"
                                onChange={event => this.setState({ email: event.target.value })} type="text" />
                        </div>
                        <div class="input-group margin-bottom-20">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-lock mycolor"></i></span>
                            <input size="60" maxlength="255" class="form-control" placeholder="password"
                                onChange={event => this.setState({ password: event.target.value })} type="password" />
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <button class="btn-u pull-left" type="submit" onClick={() => this.signUp()}>Sign Up</button>
                            </div>
                            <div>{this.state.error.message}</div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


export default SignUp;