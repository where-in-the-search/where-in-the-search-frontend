import React, { Component } from 'react';
import { loginOrSignup } from '../Utils/Auth-Utils.js';
import './LoginPage.css';

export default class LoginPage extends Component {
    state ={ 
        email: '',
        password: '',
        error: ''
    }

    handleEmailChange = (e) => this.setState({ email: e.target.value})
    
    handlePasswordChange = (e) => this.setState({ password: e.target.value})

    handleSubmit = async e => {
        e.preventDefault();

        try {
            const user = await loginOrSignup(this.state.email, this.state.password);

            this.props.handleUserChange(user);

            this.props.history.push('/');
        } catch(e) {
            this.setState({ error: e.response.body.error })
        }
    } 

    render() {
        return (
            <main className="loginMain">

            <h3 className="loginH3">Check in to begin your adventure!</h3>
            { this.state.error && 
                <h3 
                    className="loginH3" 
                    style={{color:'red'}}>
                        {this.state.error}</h3>}

            <form 
                className="loginForm" 
                onSubmit={this.handleSubmit}>

                <label className="loginLabel">
                    <p className="loginP">Email:</p>
                    <input 
                        className="loginInput"
                        value={this.state.email} 
                        onChange={this.handleEmailChange} />
                </label>
                
                <label className="loginLabel">
                    <p className="loginP">Password:</p>
                    <input 
                        className="loginInput"
                        value={this.state.password} 
                        type="password"
                        onChange={this.handlePasswordChange} />
                </label>
                <button className="loginButton">Submit</button>
             </form>

            </main>
        )
    }
}
