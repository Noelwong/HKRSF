import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory }  from 'react-router';
import { firebaseApp } from './firebase';
import { logUser } from './actions';
import reducer from './reducers';

import '@firebase/firestore'

import App from './components/App';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ForgetPassword from './components/ForgetPassword';
import AddInfor from './components/AddInfor';

import CompetitionIndex from './components/Admin/CompetitionIndex';


const store = createStore(reducer);

firebaseApp.auth().onAuthStateChanged(user => {
    if(user) {
        console.log('user has signed in or up ', user);
        const { email } = user;
        store.dispatch(logUser(email));
        browserHistory.push('/app');//after sign in, go app page
    }else{
        console.log('user has signed out or still needs to sign in.');
        browserHistory.replace('/signin');
    }
})

ReactDOM.render(

    <Provider store={store}>
    <Router path="/" history={browserHistory}>
        <Route path="/app" component={App} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/forgetpassword" component={ForgetPassword} />
        <Route path="/addinfor" component={AddInfor} />

        <Route path="/CompetitionIndex" component={CompetitionIndex} />
    </Router>
    </Provider>, document.getElementById('root')
)

