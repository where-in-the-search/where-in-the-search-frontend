import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <header>
              <NavLink to="/">Home</NavLink>  
              <NavLink to="/login">Login</NavLink>  
              <NavLink to="/results">Travel Log</NavLink>  
              <NavLink to="/about">About Devs</NavLink>
              <button
              onClick = {this.props.handleLogout}
              >Logout</button>  
            </header>
        )
    }
}
