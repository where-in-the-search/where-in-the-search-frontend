import React, { Component } from 'react';
import { getLocationsFromLocalStorage, getSessionInfo, clearSession } from '../Utils/LocalStorage-Utils.js';
import JournalItem from './JournalItem.js';
import './ResultsPage.css';


export default class ResultsPage extends Component {
    state = {
        locations: [],
        name: '',
        character_id: '',
        loading: false, 
        date: '', 
        profession: ''
    }

    componentDidMount = async () => {
        this.setState({ loading: true });

        const { name, character_id, date, profession } = getSessionInfo();

        this.setState({
            name: name,
            character_id: character_id,
            locations: getLocationsFromLocalStorage(),
            loading: false,
            date: date,
            profession: profession
        })
    }

    handleNewGame = e => {
        clearSession();
        console.log(localStorage.getItem('LOCATIONS'));
        this.props.history.push('/');
    }

    render() {

        return (

            <main className="resultsMain">
                <div className="feedbackWrapper">
                    <h3 className="resultsH3">Review your journey, {this.state.profession} {this.state.name}:</h3>
                    <ul className="locationsWrapper">
                    {this.state.locations.map(location => 
                        <li 
                            className="locationResults" 
                            key={location.city}>

                            <img 
                                className="resultsImage"
                                alt={location.city} 
                                src={location.image_url}/>

                            <h4
                                className="resultsH4">
                                    {location.city},  {location.region},  {location.country}</h4>

                            <p
                                className="resultsP">{location.found
                            ? <span className="resultsSpan">You got your bearings, location identified!</span>
                            : <span className="resultsSpan">Still travelling, do you even know where you are right now?</span>}</p>

                        </li>
                    )}
                    </ul>
                    <button className="newGameButton" onClick={this.handleNewGame}>keep travelling</button>
                </div>

                <div className="journalWrapper">
                    <ul>
                        <JournalItem />
                    </ul>
                </div>

            </main>
        )
    }
}
