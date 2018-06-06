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
            <section className="login-block" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 login-sec">
                            <h2 className="text-center">Login Now</h2>
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
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                                    <input
                                        className="form-control" id="exampleInputPassword1"
                                        type="password"
                                        style={{ marginRight: '5px' }}
                                        placeholder="Password"
                                        onChange={event => this.setState({ password: event.target.value })}

                                    />
                                </div>
                                <div className="form-check">
                                    <button type="button" className="btn btn-login float-right" onClick={() => this.signIn()}>登入<br/>Log-In</button>
                                    <div>{this.state.error.message}</div>
                                    <Link to={'/signup'}><button type="button" className="btn btn-login float-right" >註冊<br/>Sign Up</button></Link>
                                    <Link to={'/forgetpassword'}><button type="button" className="btn btn-login float-right" >忘記密碼<br/>Forget Password</button></Link>
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


export default SignIn;