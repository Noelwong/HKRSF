import React, { Component } from 'react';
import { Link } from 'react-router';
import { firebaseApp } from '../firebase';

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
        this.memberType = '';
        
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
            <div className="form-inline" style={{ margin: '5%' }}>
                <h2>Sign Up</h2>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        style={{ marginRight: '5px' }}
                        placeholder="email"
                        onChange={event => this.setState({ email: event.target.value })}
                    /><p></p>
                    <input
                        className="form-control"
                        type="password"
                        style={{ marginRight: '5px' }}
                        placeholder="password"
                        onChange={event => this.setState({ password: event.target.value })}

                    /><p></p>
                    <select value={this.state.value} onChange={this.memberType}  > 
                        <option value="PersonalMem">個人 Personal</option>
                        <option value="SchoolMem">學校 School</option>
                        <option value="OrganMem">團體 Organization</option>
                    </select>
                    <div>{ this.memberType }</div>
                    <p></p>
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => this.signUp()}
                    >
                        Sign Up
                    </button>
                </div>
                <div>{this.state.error.message}</div>
                <div><Link to={'/signin'}> Sign in page</Link></div>
            </div>
        )
    }
}


export default SignUp;