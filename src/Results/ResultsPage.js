import React, { Component } from 'react'
import { getLocationsFromLocalStorage, getSessionInfo, clearSession } from '../Utils/LocalStorage-Utils.js';
// import { postSession } from '../Utils/API-Utils.js';
import JournalItem from './JournalItem.js'

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

        /* commented out for possible use if we post to the DB */
        // const {
        //     name,
        //     character_id,
        //     locations,
        //     date
        // } = this.state;

        // const currentSession = {
        //     name,
        //     character_id,
        //     locations,
        //     date
        // }

        // await postSession(currentSession, this.props.user.token);
    }

    handleNewGame = e => {
        clearSession();
        this.props.history.push('/');
    }

    render() {

        return (

            <main>
                <div className="feedbackWrapper">
                    <h3>This is How You Did</h3>
                    <h4>{this.state.profession} {this.state.name}:</h4>
                    
                    <ul className="renderedLocations">
                    {this.state.locations.map(location => 

                        <li className="locationResults" key={location.city}>
                            <img
                            alt={location.city}
                            src={location.image_url} />
                            
                            <h3>{location.city}, {location.region}, {location.country}</h3>
                            
                            <p>{location.found
                                ? <span>You got your bearings, location identified!</span>
                                : <span>Still traveling... do you even know where you are right now?</span>}
                            </p>
                            
                            <p>{location.date}</p>
                        </li>
                    )}
                    </ul>

                    <button 
                    className="newGameBtn" 
                    onClick={this.handleNewGame}>
                        Keep Traveling
                    </button>

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
