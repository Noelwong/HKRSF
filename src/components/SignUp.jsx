import React, { Component } from 'react';
import { Link } from 'react-router';
import { firebaseApp } from '../firebase';
import '../css/SignUp.css';

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
                <div class="card bg-light">
                <div style={{ maxWidth: 250 }}>
                        <h4 class="card-title mt-3 text-center">Create Account</h4>
                        <p class="text-center">Get started with your free account</p>
                        <p>
                            <a href="" class="btn btn-block btn-twitter"> <i class="fab fa-twitter"></i>   Login via Twitter</a>
                            <a href="" class="btn btn-block btn-facebook"> <i class="fab fa-facebook-f"></i>   Login via facebook</a>
                        </p>
                        <p class="divider-text">
                            <span class="bg-light">OR</span>
                        </p>
                        <form>
                            <div class="form-group input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                                </div>
                                <input name="" class="form-control" placeholder="Full name" type="text" />
                            </div>
                            <div class="form-group input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                                </div>
                                <input name="" class="form-control" placeholder="Email address" type="email" onChange={event => this.setState({ email: event.target.value })} />
                            </div>
                            <div class="form-group input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"> <i class="fa fa-phone"></i> </span>
                                </div>
                                <input name="" class="form-control" placeholder="Phone number" type="text" />
                            </div>
                            <div class="form-group input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"> <i class="fa fa-building"></i> </span>
                                </div>
                                <select class="form-control">
                                    <option selected=""> Select membership type</option>
                                    <option>個人 Personal</option>
                                    <option>學校 School</option>
                                    <option>團體 Organization</option>
                                </select>
                            </div>
                            <div class="form-group input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                                </div>
                                <input class="form-control" placeholder="Create password" type="password" />
                            </div>
                            <div class="form-group input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                                </div>
                                <input class="form-control" placeholder="Repeat password" type="password" onChange={event => this.setState({ password: event.target.value })} />
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block" onClick={() => this.signUp()}> Create Account  </button>
                            </div>
                            <p class="text-center">Have an account? <Link to={'/signin'}>Log In</Link> </p>
                        </form>

                </div>
                </div>
            </div>
        )
    }
}


export default SignUp;