import React, { Component } from 'react';
import { getLocationsFromLocalStorage, getSessionInfo, clearSession } from '../Utils/LocalStorage-Utils.js';
import JournalItem from './JournalItem.js';
import Spinner from '../Components/Spinner.js';
import './ResultsPage.css';
import ResultsWrapper from './ResultsWrapper.js';


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

        // loving this destructure out of a function call!
        const { name, character_id, date, profession } = getSessionInfo();

        this.setState({
            name,
            character_id,
            locations: getLocationsFromLocalStorage(),
            loading: false,
            date,
            profession
        })
    }

    handleNewGame = e => {
        clearSession();
        console.log(localStorage.getItem('LOCATIONS'));
        this.props.history.push('/');
    }

    render() {

        const locations = this.state.locations;

        return (

            <main className="resultsMain">
                <div className="feedbackWrapper">
                    <h3 className="resultsH3">Review your journey, {this.state.profession} {this.state.name}:</h3>
                    
                    <ul className="locationsWrapper">
                    {
                        this.state.loading
                        ? <Spinner />
                        : <ResultsWrapper locations={locations}/>
                    }
                    </ul>
                    <button className="newGameButton" onClick={this.handleNewGame}>keep traveling</button>
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
