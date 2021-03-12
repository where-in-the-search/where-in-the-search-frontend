import React, { Component } from 'react';
import { storeSessionInfo } from '../Utils/LocalStorage-Utils.js';
import './HomePage.css';

export default class HomePage extends Component {
    state = {
        name: '',
        character_id: '',
        date: new Date().toDateString(),
        profession: '' 
    }

    handleNameChange = e => this.setState({ name: e.target.value });

    handleCharacterChange = e => this.setState({ character_id: e.target.value, profession: e.target.id });

    handleSignIn = e => this.props.history.push('/login');

    handleSubmit = e => {
        e.preventDefault();

        storeSessionInfo(this.state);

        this.props.history.push('/game');
    }

    render() {
        return (
            <main className="homeMain">
                <h3 className="homeH3">Welcome to Else By Elsewhere,</h3>
                <h3 className="homeH3">a game that will take you around the world</h3>
                <p className="homeP">You've been dropped in a random location, can you figure out where you are?</p>

                {!this.props.user || !this.props.user.token
                    ? <button
                        className="homeButton"
                        onClick={this.handleSignIn}>sign in to play</button>
                    : <form className="homeForm">

                        <label className="homeLabel">
                            <p className="homeP">Enter your name:</p>
                            <input 
                                className="homeInput"
                                value={this.state.name}
                                onChange={this.handleNameChange} />
                        </label>

                        <label className="homeLabel">
                            <p className="homeP">Choose your character:</p>

                            <div className="characterWrapper">
                                <input 
                                    className="characterInput"
                                    type="radio"
                                    name="character"
                                    value="1"
                                    id="Ex-Librarian"
                                    onChange={this.handleCharacterChange} />
                                <label 
                                    className="characterLabel"
                                    htmlFor="Ex-Librarian">
                                    Ex-Librarian
                                </label>

                                <input 
                                    className="characterInput"
                                    type="radio"
                                    name="character"
                                    value="2"
                                    id="Smuggler"
                                    onChange={this.handleCharacterChange} />
                                <label 
                                    className="characterLabel"
                                    htmlFor="Smuggler">
                                    Smuggler
                                </label>

                                <input 
                                    className="characterInput"
                                    type="radio"
                                    name="character"
                                    value="3"
                                    id="Farmer"
                                    onChange={this.handleCharacterChange} />
                                <label 
                                    className="characterLabel"
                                    htmlFor="Farmer">
                                    Chard Farmer
                                </label>

                                <input 
                                    className="characterInput"
                                    type="radio"
                                    name="character"
                                    value="4"
                                    id="Pilot"
                                    onChange={this.handleCharacterChange} />
                                <label 
                                    className="characterLabel"
                                    htmlFor="Pilot">
                                    Pilot
                                </label>
                            </div>
                        </label>
                        <button
                            className="homeButton"
                            onClick={this.handleSubmit}>journey forth!</button>
                    </form>
                }
            </main>
        )
    }
}
