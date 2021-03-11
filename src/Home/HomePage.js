import React, { Component } from 'react';
import { storeSessionInfo } from '../Utils/LocalStorage-Utils.js';

export default class HomePage extends Component {
    state = {
        name: '',
        character: '',
        date: new Date().toDateString()
    }

    handleNameChange = (e) => this.setState({ name: e.target.value });

    handleCharacterChange = (e) => this.setState({ character: e.target.value });

    handleSignIn = (e) => this.props.history.push('/login');

    handleSubmit = (e) => {
        e.preventDefault();

        storeSessionInfo(this.state);

        this.props.history.push('/game');
    }


    render() {
        return (
            <div>
                <h3>GeoGuesser!!!</h3>
                <p>This is a game. You go around the world. And guess things.</p>

                {!this.props.user || !this.props.user.token
                    ? <button
                        onClick={this.handleSignIn}>Sign in to start</button>
                    : <form>
                        <label>
                            <span>Your name:</span>
                            <input
                                value={this.state.name}
                                onChange={this.handleNameChange} />
                        </label>
                        <label>
                            <span>Choose your character:</span>

                            <input
                                type="radio"
                                name="character"
                                value="ex-librarian"
                                id="ex-librarian"
                                onChange={this.handleCharacterChange} />
                            <label htmlFor="ex-librarian">
                                Ex-Librarian
                        </label>

                            <input
                                type="radio"
                                name="character"
                                value="smuggler"
                                id="smuggler"
                                onChange={this.handleCharacterChange} />
                            <label htmlFor="smuggler">
                                Smuggler
                        </label>

                            <input
                                type="radio"
                                name="character"
                                value="chard farmer"
                                id="farmer"
                                onChange={this.handleCharacterChange} />
                            <label htmlFor="farmer">
                                Chard Farmer
                        </label>

                            <input
                                type="radio"
                                name="character"
                                value="pilot"
                                id="pilot"
                                onChange={this.handleCharacterChange} />
                            <label htmlFor="pilot">
                                Pilot
                        </label>

                        </label>
                        <button
                            onClick={this.handleSubmit}>Journey forth!</button>
                    </form>
                }
            </div>
        )
    }
}
