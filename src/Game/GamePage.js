import React, { Component } from 'react';
import './GamePage.css';
import { getNewLocation, checkGuess, changeMapZoom, changeMapAngle, changeImageURL } from '../Utils/Game-Utils.js'
import { putLocationInLocalStorage } from '../Utils/LocalStorage-Utils';
import '../App.css'

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
        divcontainer1: false,
        divcontainer2: false,
        divcontainer3: false,
        fov: 80,
        heading: 70
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
        changeImageURL(this.state.image_url);
        
    }



    handleFOVIncrease = (e) => {
        const currentFov = this.state.fov;
        this.setState({ fov: currentFov - 15 });
        const zoomImage = changeMapZoom(this.state.fov, this.state.mapLat, this.state.mapLon);
        this.setState({ image_url: zoomImage });
    };

    handleFOVDecrease = (e) => {
        const currentFov = this.state.fov;
        this.setState({ fov: currentFov + 15 });
        const zoomImage = changeMapZoom(this.state.fov, this.state.mapLat, this.state.mapLon);
        this.setState({ image_url: zoomImage });
    };

    handleViewChange = (e) => {
        const currentHeading = this.state.heading;
        this.setState({ heading: currentHeading + 60 });
        const rotatedImage = changeMapAngle(this.state.heading, this.state.mapLat, this.state.mapLon);
        this.setState({ image_url: rotatedImage });
    };


    handleCurrentGuess = (e) => this.setState({ currentGuess: e.target.value });

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


    handleHintClick1 = e => {
        this.setState({divcontainer1: !this.state.divcontainer1})
     }

    handleHintClick2 = e => {
        this.setState({divcontainer2: !this.state.divcontainer2})
     }

    handleHintClick3 = e => {
        this.setState({divcontainer3: !this.state.divcontainer3})
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
            divcontainer1: false,
            divcontainer2: false,
            divcontainer3: false
        })

    }

    render() {
        const { city, region, country } = this.state.locationObj;

        const hint1 = this.state.divcontainer1;
        const hint2 = this.state.divcontainer2;
        const hint3 = this.state.divcontainer3;
        return (
            <main className="gameMain">
                <div className="mapControls">
                    <button onClick={this.handleFOVIncrease}>Zoom In</button>
                    <button onClick={this.handleFOVDecrease}>Zoom Out</button>
                    <button onClick={this.handleViewChange}>Changle Angle</button>
                </div>
                <div className="locationWrapper">
                    <img
                        className="mapLocation"
                        alt="map location"
                        src={this.state.image_url} />


                    {this.state.divcontainer1 ? <p>The sun rises in this area at {this.state.locationObj.sunrise} and sets at {this.state.locationObj.sunset}</p> : <button onClick={this.handleHintClick1}>Hint 1
                        </button>}
                    {this.state.divcontainer2 ? <p>The timezone here is {this.state.locationObj.time_zone} GMT</p> : <button onClick={this.handleHintClick2}>Hint 2
                        </button>}
                    {this.state.divcontainer3 ? <p>This symbol of the currency here is {this.state.locationObj.currency_symbol}</p> : <button onClick={this.handleHintClick3}>Hint 3
                        </button>}
                     

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
