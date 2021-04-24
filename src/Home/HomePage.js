import React, { Component } from 'react';
import { storeSessionInfo } from '../Utils/LocalStorage-Utils.js';
import './HomePage.css';

import ex_librarian from '../assets/ex_librarian.png';
import farmer from '../assets/farmer.png';
import aviator from '../assets/aviator.png';
import smuggler from '../assets/smuggler.png';


export default class HomePage extends Component {
    state = {
        name: '',
        character_id: '',
        // nice job finding this method
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

                            <div className="charactersWrapper">
                                <input 
                                    className="characterInput"
                                    type="radio"
                                    name="character"
                                    value="1"
                                    id="Ex-Librarian"
                                    onChange={this.handleCharacterChange} />
                                    {/* seems like these characters should live in json somewhere, to be iterated over and mapped into <Character /> components for DRYness. The next 70 or so lines could be almost entiedly replaced by:
                                    
                                    characters.map(character => <Character character={character} />)
                                    */}
                                <label 
                                    className="characterLabel"
                                    htmlFor="Ex-Librarian">
                                        <img className="characterImage" alt="Ex-Librarian" src={ex_librarian} />
                                        <h4 className="characterH4">Ex-Librarian</h4>
                                        <p className="characterP">Personality: Hopeful</p>
                                        <p className="characterP">Accessory: A carved yeti</p>
                                        <p className="characterP">Clothing: Long Coat</p>
                                        <p className="characterP">Catchphrase: Astound!</p>
                                        <p className="characterP">Why: Scanned a mystery barcode</p>
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
                                    <img className="characterImage" alt="Farmer" src={farmer} />
                                        <h4 className="characterH4">Chard Farmer</h4>
                                        <p className="characterP">Personality: Skeptical</p>
                                        <p className="characterP">Accessory: A hoe</p>
                                        <p className="characterP">Clothing: Spotless Sneakers</p>
                                        <p className="characterP">Catchphrase: Oh jeez</p>
                                        <p className="characterP">Why: Fell into the wrong chard crowd</p>
                                </label>

                                <input 
                                    className="characterInput"
                                    type="radio"
                                    name="character"
                                    value="4"
                                    id="Aviator"
                                    onChange={this.handleCharacterChange} />
                                <label 
                                    className="characterLabel"
                                    htmlFor="Aviator">
                                    <img className="characterImage" alt="Aviator" src={aviator} />
                                        <h4 className="characterH4">Aviator</h4>
                                        <p className="characterP">Personality: Hungry</p>
                                        <p className="characterP">Accessory: Chips</p>
                                        <p className="characterP">Clothing: Goggles</p>
                                        <p className="characterP">Catchphrase: *growls*</p>
                                        <p className="characterP">Why: Ran out of fuel</p>
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
                                    <img className="characterImage" alt="Smuggler" src={smuggler} />
                                        <h4 className="characterH4">Smuggler</h4>
                                        <p className="characterP">Personality: Surly</p>
                                        <p className="characterP">Accessory: A thimble</p>
                                        <p className="characterP">Clothing: Well-worn</p>
                                        <p className="characterP">Catchphrase: #!@;$x...</p>
                                        <p className="characterP">Why: Ended up in the wrong shipping container</p>
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
