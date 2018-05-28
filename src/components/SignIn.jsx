import React, { Component } from 'react';
import { Link } from 'react-router';
import { firebaseApp } from '../firebase';
import '../css/SignIn.css';

class SignIn extends Component {
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




    signIn() {
        console.log('this.state', this.state);
        const { email, password } = this.state;
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .catch(error => {
                this.setState({ error })
            })

    }


    render() {
        return (
            <section class="login-block" >
                <div class="container">
                    <div class="row">
                        <div class="col-md-4 login-sec">
                            <h2 class="text-center">Login Now</h2>
                            <form class="login-form">
                                <div class="form-group">
                                    <label for="exampleInputEmail1" class="text-uppercase">Email</label>
                                    <input
                                        className="form-control" id="exampleInputEmail1"
                                        type="text"
                                        style={{ marginRight: '5px' }}
                                        placeholder="Email"
                                        onChange={event => this.setState({ email: event.target.value })}
                                    />

                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1" class="text-uppercase">Password</label>
                                    <input
                                        className="form-control" id="exampleInputPassword1"
                                        type="password"
                                        style={{ marginRight: '5px' }}
                                        placeholder="Password"
                                        onChange={event => this.setState({ password: event.target.value })}

                                    />
                                </div>


                                <div class="form-check">
                                    <button type="button" class="btn btn-login float-right" onClick={() => this.signIn()}>Log-In</button>
                                    <p></p>
                                    <div>{this.state.error.message}</div>
                                    <Link to={'/signup'}><button type="button" class="btn btn-login float-right" >Sign Up</button></Link>
                                </div>
                            </form>
                            <div class="copy-text">Created for <i class="fa fa-heart"></i>HKRSF</div>
                        </div>
                        <div class="col-md-8 banner-sec">
                            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}


export default SignIn;