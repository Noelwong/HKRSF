import React, { Component } from 'react';
import { firebaseApp } from '../firebase';

/* import '../css/SignUp.css' */

class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            error: {
                message: ''
            }
        }
    }

    resetpassword() {
        console.log('this.state', this.state);
        var auth = firebaseApp.auth();
        console.log(this.state.email);
        auth.sendPasswordResetEmail(this.state.email).then(function() {
            // Email sent.
        }).catch(function(error) {
            console.log("ERROR");
        });

        /*firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            .catch(error => {
                this.setState({ error })
            })*/
    }


    render() {
        return (
            <section class="login-block" >
                <div class="container">
                    <div class="row">
                        <div class="col-md-4 login-sec">
                            <h2 class="text-center">Reset Paasword</h2>
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

                                <div class="form-check">
                                    <button class="btn btn-login float-right" type="submit" onClick={() => this.resetpassword()}>Reset</button>
                                    <p></p>
                                    <div>{this.state.error.message}</div>
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


export default ForgetPassword;