import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

export default class Header extends Component {
    render() {
        return (
            <header>
                <h1 className="headerTitle">ELSE BY ELSEWHERE</h1>

                <div className="linkWrapper">
                    {(!this.props.user || !this.props.user.token) && <>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/about">About Devs</NavLink>
                        <NavLink to="/login">Login</NavLink>
                    </>} 
                
                    {(this.props.user && this.props.user.token) && <>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/about">About Devs</NavLink>
                        <NavLink to="/results">Travel Log</NavLink>
                        <button
                            className="logoutButton"
                            onClick = {this.props.handleLogout}
                            >Logout</button>
                    </>}
                </div>
            </header>
        )
    }
}
