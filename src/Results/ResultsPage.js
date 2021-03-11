import React, { Component } from 'react'
import { getLocationFromLocalStorage, getSessionInfo } from '../Utils/LocalStorage-Utils.js';
import JournalItem from './JournalItem.js'

export default class ResultsPage extends Component {
    state = {
        locations: [],
        name: '',
        character: '',
        loading: false
    }

    componentDidMount = async () => {
        this.setState({ loading: true });

        const locationsFound = getLocationFromLocalStorage();
        const sessionData = getSessionInfo();

        this.setState({
            name: sessionData.name,
            character: sessionData.character,
            locations: locationsFound,
            loading: false
        })
    }

    render() {


        return (

            <main>
                <div className="feedbackWrapper">
                    <h3>This is How You Did:</h3>
                    {/* this is our MVP results page */}

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
