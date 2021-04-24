// this important and huge comopnent should probably be broken into multiple files

import React, { Component } from 'react';
import './GamePage.css';
import { getNewLocation, checkGuess, changeImageURL } from '../Utils/Game-Utils.js'
import { putLocationInLocalStorage } from '../Utils/LocalStorage-Utils';
import Spinner from '../Components/Spinner.js';
import '../App.css'

import zoom_in from '../assets/zoom_in.png';
import zoom_out from '../assets/zoom_out.png';
import changle_angle from '../assets/changle_angle.png';
import changle_angle_reverse from '../assets/changle_angle_reverse.png'
import picture_border_large from '../assets/picture_border_large.png';

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
        locationObj: {},
        hint1: false,
        hint2: false,
        hint3: false,
        fov: 80,
        heading: 70
    }

    componentDidMount = async () => {
        this.setState({ loading: true });

        const newLocation = await getNewLocation(this.state.locationIndex);
        
        this.setState(
            {
                image_url: newLocation.image_url,
                // if you hadn't changed the keys in state, you could have spread the response here
                mapLat: newLocation.latitude,
                mapLon: newLocation.longitude,
                loading: false,
                locationObj: newLocation,
                fov: 80,
                heading: 70
            }
        );
    }

    handleImageURL = () => {
        const { image_url, fov, heading } = this.state;

        this.setState({
            image_url: changeImageURL(image_url, fov, heading)
        });
    }

    // seems like these four methods do a lot of the same stuff, and could have been abstracted into a single function with more parameters
    handleFOVIncrease = async e => {
        const currentFov = this.state.fov;
        await this.setState({ fov: currentFov - 15 });
        this.handleImageURL();
    };

    handleFOVDecrease = async e => {
        const currentFov = this.state.fov;
        await this.setState({ fov: currentFov + 15 });
        this.handleImageURL();
    };

    handleViewChange = async e => {
        const currentHeading = this.state.heading;
        await this.setState({ heading: currentHeading + 30 });
        this.handleImageURL();
    };

    // no button for this currently, but figured I'd build the function while I was here
    handleOppositeViewChange = async e => {
        const currentHeading = this.state.heading;
        await this.setState({ heading: currentHeading - 30 });
        this.handleImageURL();
    }

    handleCurrentGuess = e => this.setState({ currentGuess: e.target.value });

    clearCurrentGuess = () => this.setState({ currentGuess: '' });

    handleSubmitGuess = e => {
        // we can probably do away with this 'guesses' array, we didn't end up doing anything with it
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

    // you were on the right track with this function-- you just needed to make anonymous functions in the onClick prop that identified the correct key
    // onClick={() => handleHintClick(hintKey) }
    handleHintClick = (target) => {
        this.setState({ target: !this.state[target] });
    }

    handleHintClick1 = e => {
        this.setState({hint1: !this.state.hint1})
     }

    handleHintClick2 = e => {
        this.setState({hint2: !this.state.hint2})
     }

    handleHintClick3 = e => {
        this.setState({hint3: !this.state.hint3})
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
            locationObj: newLocation,
            hint1: false,
            hint2: false,
            hint3: false,
            fov: 80,
            heading: 70
        });
    }

    render() {
        const { city, region, country } = this.state.locationObj;
        console.log(this.state.locationObj);
        return (
            <main className="gameMain">

                <div className="locationWrapper">
                     {/* might be better abstracted into <MapButtons /> with some props */}
                    <div className="mapControls">
                        <button 
                            className="mapButton"
                            onClick={this.handleFOVIncrease}
                            style={{ backgroundImage: `url(${zoom_in})` }}
                            ></button>
                        <button 
                            className="mapButton"
                            onClick={this.handleViewChange}
                            style={{ backgroundImage: `url(${changle_angle})` }}
                            ></button>
                                                <button 
                            className="mapButton"
                            onClick={this.handleOppositeViewChange}
                            style={{ backgroundImage: `url(${changle_angle_reverse})` }}
                            ></button>
                        <button 
                            className="mapButton" 
                            onClick={this.handleFOVDecrease} 
                            style={{ backgroundImage: `url(${zoom_out})` }}
                            ></button>
                    </div>

                    <div 
                        className="locationImageWrapper"
                        style={{ backgroundImage: `url(${picture_border_large})` }}>
                        {
                            this.state.loading
                            ? <Spinner />
                            : <img
                                className="mapLocation"
                                alt="map location"
                                src={this.state.image_url} />
                        }
                    </div> 

                    <div className="hintsWrapper">
                        {/* might be better as <HintList /> with some props */}
                        <h4 className="hintsH4">Sidequests:</h4>
                        {this.state.hint1 
                            ? <p className="hintsP">
                                The sun rises in this area at {this.state.locationObj.sunrise} and sets at {this.state.locationObj.sunset}</p> 
                            : <button 
                                className="hintsButton"
                                onClick={this.handleHintClick1}>Figure out how much daylight there is
                            </button>}
                        {this.state.hint2 
                            ? <p className="hintsP">The timezone here is {this.state.locationObj.time_zone} GMT</p> 
                            : <button 
                                className="hintsButton"
                                onClick={this.handleHintClick2}>Ask a stranger what timezone you're in
                            </button>}
                        {this.state.hint3 
                            ? <p className="hintsP">This symbol of the currency here is {this.state.locationObj.currency_symbol}</p> 
                            : <button 
                                className="hintsButton"
                                onClick={this.handleHintClick3}>Find out the local currency so you can buy a snack
                            </button>}  
                    </div>
                </div>
                {/* might be better abstracted into <LocationGuess /> with some props */}
                <div className="locationGuessWrapper">
                               
                    {(this.state.numberOfGuesses > 0 && !this.state.found)
                        && <div className="guessWrapper">
                            <input
                                className="guessInput"
                                value={this.state.currentGuess}
                                placeholder="Guess this location!"
                                onChange={this.handleCurrentGuess} />
                            <button 
                                className="guessButton"
                                onClick={this.handleSubmitGuess}>Guess!</button>
                            </div>
                    } 

                    {this.state.found && 
                    <p>You've found {city}, {region}, {country}!</p>}

                    {!this.state.found && this.state.numberOfGuesses === 0 && 
                    <p>How tragic! This place remains a mystery.</p>}

                     {/* might be better abstracted into <FeedbackOrGuess /> with some props */}
                    {!this.state.found && this.state.numberOfGuesses > 0
                        ? <div className="feedbackWrapper">
                            <h4>Guesses remaining: {this.state.numberOfGuesses}</h4>
                        </div>

                        : <div>
                            <button
                                className="guessButton"
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
