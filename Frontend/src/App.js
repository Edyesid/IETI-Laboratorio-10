import React, {Component} from 'react';
import DrawerLeft from './components/DrawerLeft';
import {Login} from './components/Login';
import { UserProfile } from './components/UserProfile';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {

    render() {
        const LoginView = () => (
            <Login/>
        );

        const UserProfileView = () => (
            <UserProfile/>
        );

        return (
            <Router>
                <div className="App">
                    <div>
                        <Route exact path="/" component={localStorage.getItem("isLoggedIn") ? DrawerLeft: LoginView}/>
                        <Route exact path="/home" component={localStorage.getItem("isLoggedIn") ? DrawerLeft: LoginView}/>
                        <Route exact path="/signup" component={localStorage.getItem("isLoggedIn") ? DrawerLeft: UserProfileView}/>
                    </div>
                </div>
            </Router>
        );
    }
}
export default App;