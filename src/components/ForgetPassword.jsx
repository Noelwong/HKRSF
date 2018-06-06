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
            <section className="login-block" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 login-sec">
                            <h2 className="text-center">Reset Paasword</h2>
                            <form className="login-form">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                                    <input
                                        className="form-control" id="exampleInputEmail1"
                                        type="text"
                                        style={{ marginRight: '5px' }}
                                        placeholder="Email"
                                        onChange={event => this.setState({ email: event.target.value })}
                                    />

                                </div>

                                <div className="form-check">
                                    <button className="btn btn-login float-right" type="submit" onClick={() => this.resetpassword()}>Reset</button>
                                    <p></p>
                                    <div>{this.state.error.message}</div>
                                </div>
                            </form>
                            <div className="copy-text">Created for <i className="fa fa-heart"></i>HKRSF</div>
                        </div>
                        <div className="col-md-8 banner-sec">
                            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}


export default ForgetPassword;