import React, { Component } from 'react';
import picture_border from '../assets/picture_border.png';

export default class ResultsWrapper extends Component {
    render() {
       
        const resultsWrapper= this.props.locations.map(location => 
            <li 
                className="locationResults" 
                key={location.city}>

                <div 
                    style={{ backgroundImage: `url(${picture_border})` }}
                    className="imageWrapper">
                    <img 
                    className="resultsImage"
                    alt={location.city} 
                    src={location.image_url}/>
                </div>

                <h4
                    className="resultsH4">
                        {location.city},  {location.region},  {location.country}</h4>

                <p
                    className="resultsP">{location.found
                ? <span className="resultsSpan">You got your bearings, location identified!</span>
                : <span className="resultsSpan">Still traveling, do you even know where you are right now?</span>}</p>

            </li>)

        return (
            <>
                {resultsWrapper}
            </>
        )
    }
}
