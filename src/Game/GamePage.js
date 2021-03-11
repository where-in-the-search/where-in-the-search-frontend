import React, { Component } from 'react';
import './GamePage.css';
// import { mungeGuess } from '../Utils/Munge-Utils.js';
import { getNewLocation, checkGuess } from '../Utils/Game-Utils.js'

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
        locationObj: {}
    }


    componentDidMount = async () => {
        this.setState({ loading: true });

        // const newCoords = await getSessionCoordinates();

        const newLocation = await getNewLocation(this.state.locationIndex);
        // await postLocation(newLocation);

        // const currentLocationIndex = this.state.locationIndex;

        this.setState(
            {
                image_url: newLocation.image_url,
                mapLat: newLocation.latitude,
                mapLon: newLocation.longitude,
                loading: false,
                locationObj: newLocation,
                // locationIndex: currentLocationIndex + 1
            }
        );
    }

    handleCurrentGuess = (e) => this.setState({ currentGuess: e.target.value });

    clearCurrentGuess = () => this.setState({ currentGuess: '' });

    handleSubmitGuess = (e) => {
        const locationGuesses = this.state.guesses;
        locationGuesses.push(this.state.currentGuess);
        this.setState({ guesses: locationGuesses, found: checkGuess(this.state.currentGuess, this.state.locationObj) });

        const updatedGuesses = this.state.numberOfGuesses - 1;
        this.setState({ numberOfGuesses: updatedGuesses });

        this.clearCurrentGuess();
    }

    handleNextLocation = async (e) => {
        //needs to save location, the location guesses, found state

        // const mungedGuess = mungeGuess();

        // postLocationGuesses(mungedGuess, this.props.user.token)
        
        const updatedLocationIndex = this.state.locationIndex;

        this.setState({ locationIndex: updatedLocationIndex + 1 });

        if (this.state.locationIndex >= 4) this.props.history.push('/results');

        //calls getrandomlatlon, getnewlocation, 
        const newLocation = await getNewLocation(this.state.locationIndex);

        //somewhere here we'll post to sessions

        // resets state to default
        this.setState({
            found: false,
            numberOfGuesses: 4,
            currentGuess: '',
            guesses: [],
            image_url: newLocation.image_url,
            mapLat: newLocation.latitude,
            mapLon: newLocation.longitude,
            locationObj: newLocation
        })

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
