import React, { Component } from 'react';
import { connect } from 'react-redux';
import { db } from '../firebase';

class AddGoal extends Component {
    constructor(props){
        super(props);
        this.state = {
            title:''
        }
    }

    addGoal(){
        console.log('this', this);
        const { title } = this.state;
        const { email } = this.props;
        var docRef = db.collection('users');
        docRef.add({email, title});
        
    }

    render() {
        return (
            <div className="form-inline">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder='Add a goal'
                        className="form-control"
                        style={{marginRight: '5px'}}
                        onChange={event => this.setState({title: event.target.value})}
                    />
                    <button
                        className="btn btn-success"
                        type="button"
                        onClick={() => this.addGoal()}
                    >
                        Submit
                    </button>
                    <button type="button" class="btn btn-login float-right" ><Link to={'/addinfor'}>HIHI</Link></button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { email } = state;
    return {
        email
    }
}

export default connect(mapStateToProps, null)(AddGoal);