import React, { Component } from 'react';
import { loginOrSignup } from '../Utils/Auth-Utils.js';

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
            <div>
            <h3>Login!</h3>
            { this.state.error && <h3 style={{color:'red'}}>{this.state.error}</h3>}
            <form onSubmit={this.handleSubmit}>

                <label>Email:
                    <input value={this.state.email} onChange={this.handleEmailChange} />
                </label>
                
                <label>Password:
                    <input value={this.state.password} onChange={this.handlePasswordChange} />
                </label>
                <button>Submit</button>
             </form> 
            </div>
        )
    }
}
