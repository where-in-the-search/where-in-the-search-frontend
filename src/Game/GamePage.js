import React, { Component } from 'react';
import './GamePage.css';
import { postLocation, postLocationGuesses } from '../Utils/API-Utils.js';
import { mungeGuess } from '../Utils/Munge-Utils.js';
import { getNewLocation, getSessionCoordinates } from '../Utils/Game-Utils.js'

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
        mapCoords: []
    }


    componentDidMount = async () => {
        this.setState({ loading: true });

        const newCoords = await getSessionCoordinates();

        const newLocation = await getNewLocation(newCoords, this.state.locationIndex);

        // await postLocation(newLocation);

        this.setState(
            {
                image_url: newLocation.image_url,
                mapLat: newLocation.latitude,
                mapLon: newLocation.longitude,
                loading: false,
                mapCoords: newCoords
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

    handleNextLocation = async(e) => {
        //needs to save location, the location guesses, found state

        // const mungedGuess = mungeGuess();

        // postLocationGuesses(mungedGuess, this.props.user.token)
        console.log(this.state.mapCoords)
        const updatedLocationIndex = this.state.locationIndex;
        this.setState({ locationIndex: updatedLocationIndex + 1})
        if(this.state.locationIndex >= 4) this.props.history.push('/results')

        //calls getrandomlatlon, getnewlocation, 
        const newLocation = await getNewLocation(this.state.mapCoords, this.state.locationIndex);
        console.log('IMAGE', newLocation.image_url);

        // resets state to default
        this.setState({
            found: false,
            numberOfGuesses: 4,
            currentGuess: '',
            guesses: [],
            image_url: newLocation.image_url,
            mapLat: newLocation.latitude,
            mapLon: newLocation.longitude,
        })

    }

    render() {
        console.log(this.state.mapCoords)
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
