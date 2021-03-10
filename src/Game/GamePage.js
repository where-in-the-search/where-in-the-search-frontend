import React, { Component } from 'react';
import './GamePage.css';
import { postLocation, postLocationGuesses } from '../Utils/API-Utils.js';
import { mungeGuess } from '../Utils/Munge-Utils.js';
import { getNewLocation } from '../Utils/Game-Utils.js'

export default class GamePage extends Component {
    state = {
        found: false,
        numberOfGuesses: 4,
        currentGuess: '',
        guesses: [],
        image_url: '',
        numberOfLocations: 4,
        mapLat: '',
        mapLon: ''
    }


    componentDidMount = async () => {
        this.setState({ loading: true });

        const newLocation = await getNewLocation();

        // await postLocation(newLocation);

        this.setState(
            {
                image_url: newLocation.image_url,
                mapLat: newLocation.latitude,
                mapLon: newLocation.longitude,
                loading: false
            }
        );
    }

    handleCurrentGuess = (e) => this.setState({ currentGuess: e.target.value });

    clearCurrentGuess = () => this.setState({ currentGuess: '' });

    handleSubmitGuess = (e) => {
        const currentGuesses = this.state.guesses;
        currentGuesses.push(this.state.currentGuess);
        this.setState({ guesses: currentGuesses });

        //compareAnswer()

        const updatedGuesses = this.state.numberOfGuesses - 1;
        this.setState({ numberOfGuesses: updatedGuesses });

        this.clearCurrentGuess();
    }

    handleNextLocation = (e) => {
        //needs to save location, the location guesses, found state
        const mungedGuess = mungeGuess();

        postLocationGuesses(mungedGuess, this.props.user.token)

        //calls getrandomlatlon, getnewlocation, 
        getNewLocation();

        // resets state to default
        this.setState({
            found: false,
            numberOfGuesses: 4,
            currentGuess: '',
            guesses: [],
            image_url: '',
        })

        //updates number of locations
        const updatedLocationNumber = this.state.numberOfLocations - 1;
        this.setState({ numberOfLocations: updatedLocationNumber });
    }

    render() {

        return (
            <main className="gameMain">
                <div className="locationWrapper">
                    <img
                        className="mapLocation"
                        alt="map location"
                        src={this.state.image_url} />

                    <input
                        className="guessInput"
                        value={this.state.currentGuess}
                        placeholder="guess here!"
                        onChange={this.handleCurrentGuess} />

                    <button
                        onClick={this.handleSubmitGuess}>Guess!</button>

                    <ul className="hintsWrapper">
                        <li>hint 1</li>
                        <li>hint 2</li>
                        <li>hint 3</li>
                    </ul>

                    {!this.state.found && this.state.numberOfGuesses > 0
                        ? <div className="feedbackWrapper">
                            <h4>Guesses remaining: {this.state.numberOfGuesses}</h4>

                            <p>Your guess was this far off: {this.someFunction}</p>
                        </div>
                        : <div>
                            <button
                                onClick={this.handleNextLocation}>go to next location</button>
                        </div>}


                </div>

            </main>
        )
    }
}
