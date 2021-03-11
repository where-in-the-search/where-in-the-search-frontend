import React, { Component } from 'react'
import JournalItem from './JournalItem.js'

export default class ResultsPage extends Component {
    state = {

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
