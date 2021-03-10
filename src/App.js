import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HomePage from './Home/HomePage.js';
import LoginPage from './Login/LoginPage.js';
import GamePage from './Game/GamePage.js';
import ResultsPage from './Results/ResultsPage.js';
import AboutPage from './About/AboutPage.js';
import Header from './Components/Header.js';
import PrivateRoute from './Components/PrivateRoute.js';
import { getUserFromLocalStorage, putUserInLocalStorage } from './Utils/LocalStorage-Utils.js';
import './App.css';

export default class App extends Component {
  state = {
    user: getUserFromLocalStorage()
  }

  handleUserChange = (user) => {
    this.setState({ user })
    
    putUserInLocalStorage(user);
  }

  handleLogout = () => {
    localStorage.clear();
    this.handleUserChange({});
  }

  render() {
    const { user } = this.state;
    return (
      <Router>
        <Header
          user={user}
          handleLogout={this.handleLogout}/>
        <Switch>
          <Route 
          path="/"
          exact
          render={(routerProps) =>
            <HomePage 
            user={user}
            {...routerProps}/>}
            />
          <Route 
          path="/login"
          exact
          render={(routerProps) =>
            <LoginPage handleUserChange = {this.handleUserChange} {...routerProps}/>}
          />
          <PrivateRoute 
            path="/game" 
            exact
            token={user && user.token}
            render={(routerProps) => 
              <GamePage 
                user={user}
                {...routerProps} 
              />} 
            />
          <PrivateRoute 
            path="/results" 
            exact
            token={user && user.token}
            render={(routerProps) => 
              <ResultsPage 
                user={user}
                {...routerProps} 
              />}
            />
          <Route 
          path="/about"
          exact
          render={(routerProps) => 
            <AboutPage {...routerProps}/>}
          />
        </Switch>
    </Router>
    )
  }
}
