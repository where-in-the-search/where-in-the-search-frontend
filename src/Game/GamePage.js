import React, { Component } from 'react';
import './GamePage.css';
import { getNewLocation, checkGuess } from '../Utils/Game-Utils.js'
import { putLocationInLocalStorage } from '../Utils/LocalStorage-Utils';

export default class GamePage extends Component {
    state = {
        found: false,
        numberOfGuesses: 4,
        currentGuess: '',
        guesses: [],
        image_url: '',
        locationIndex: 0,
        mapLat: '',
        mapLon: '',
        loading: false,
        locationObj: {}
    }

    componentDidMount = async () => {
        this.setState({ loading: true });

        const newLocation = await getNewLocation(this.state.locationIndex);

        this.setState(
            {
                image_url: newLocation.image_url,
                mapLat: newLocation.latitude,
                mapLon: newLocation.longitude,
                loading: false,
                locationObj: newLocation
            }
        );
    }

    handleCurrentGuess = e => this.setState({ currentGuess: e.target.value });

    clearCurrentGuess = () => this.setState({ currentGuess: '' });

    handleSubmitGuess = e => {
        const locationGuesses = this.state.guesses;
        locationGuesses.push(this.state.currentGuess);
        this.setState({ 
            guesses: locationGuesses, 
            found: checkGuess(this.state.currentGuess, this.state.locationObj) 
        });

        const updatedGuesses = this.state.numberOfGuesses - 1;
        this.setState({ numberOfGuesses: updatedGuesses });

        this.clearCurrentGuess();
    }

    handleNextLocation = async e => {
        const {
            id,
            image_url,
            city,
            region,
            country
        } = this.state.locationObj;

        const location = {
            id,
            image_url,
            city,
            region,
            country,
            found: this.state.found };

        putLocationInLocalStorage(location);

        const currentLocationIndex = this.state.locationIndex;
        this.setState({ locationIndex: currentLocationIndex + 1 });

        if (this.state.locationIndex >= 4) this.props.history.push('/results');

        const newLocation = await getNewLocation(this.state.locationIndex);
        
        // resets relevant state to default
        this.setState({
            found: false,
            numberOfGuesses: 4,
            currentGuess: '',
            guesses: [],
            image_url: newLocation.image_url,
            mapLat: newLocation.latitude,
            mapLon: newLocation.longitude,
            locationObj: newLocation
        });
    }

    render() {
        const { city, region, country } = this.state.locationObj;
     
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

                    {this.state.numberOfGuesses > 0 && !this.state.found
                        ? <button onClick={this.handleSubmitGuess}>Guess!</button>
                        : <button className="hiddenButton"></button>
                    }

                    {this.state.found && 
                    <p>You've found {city}, {region}, {country}!</p>}

                    {!this.state.found && this.state.numberOfGuesses === 0 && 
                    <p>How tragic! This place remains a mystery.</p>}

                    <ul className="hintsWrapper">
                        <li>hint 1</li>
                        <li>hint 2</li>
                        <li>hint 3</li>
                    </ul>

                    {!this.state.found && this.state.numberOfGuesses > 0
                        ? <div className="feedbackWrapper">
                            <h4>Guesses remaining: {this.state.numberOfGuesses}</h4>
                        </div>

                        : <div>
                            <button
                                onClick={this.handleNextLocation}>
                                {this.state.locationIndex >= 4
                                    ? <span> go to results </span>
                                    : <span> go to next location</span>
                                }
                            </button>
                        </div>}
                </div>

            </main >
        )
    }
}
