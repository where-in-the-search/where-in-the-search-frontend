import React, { Component } from 'react';
import './AboutPage.css';
import github from '../assets/github.png';
import linkedin from '../assets/linkedin.png';
import farmer from '../assets/farmer.png';
import ex_librarian from '../assets/ex_librarian.png';
import smuggler from '../assets/smuggler.png';
import aviator from '../assets/aviator.png';

export default class AboutPage extends Component {
    render() {
        return (

            <main className="aboutMain">

                <h3 className="aboutH3">About the Team</h3>
                <section className="teamWrapper">

                    <div className="teamDiv">
                        <img
                            className="teamImage" 
                            alt="anthony" 
                            src={aviator} />
                        <h5 className="aboutH5">Anthony Rosario</h5>
                        <p className="teamP">about...</p>
                        <div className="socialLinkWrapper">
                            <a 
                                className="teamLink" 
                                href='https://github.com/anthony-rosario/'>
                                    <img alt="github logo" src={github} /></a>
                            <a 
                                className="teamLink" 
                                href='https://www.linkedin.com/in/anthony-rosario/'>
                                    <img alt="linkedin logo" src={linkedin} /></a>
                        </div>
                    </div>
                    
                    <div className="teamDiv">
                        <img
                            className="teamImage" 
                            alt="devon" 
                            src={smuggler} />
                        <h5 className="aboutH5">Devon Wolfkiel</h5>
                        <p className="teamP">about...</p>
                        <div className="socialLinkWrapper">
                            <a 
                                className="teamLink" 
                                href='https://github.com/devon-wolf'><img alt="github logo" src={github} /></a>
                            <a 
                                className="teamLink" 
                                href='https://www.linkedin.com/in/devon-wolfkiel/'>
                                    <img alt="linkedin logo" src={linkedin} /></a>
                        </div>
                    </div>

                    <div className="teamDiv">
                        <img
                            className="teamImage" 
                            alt="sam" 
                            src={ex_librarian} />
                        <h5 className="aboutH5">Sam Gerber</h5>
                        <p className="teamP">I'm a software engineer based in Portland, OR. I'm a topography enthusiast and have spent many hours exploring different corners of the world via map-apps. I'd love to visit Budapest or Tierra del Fuego in Argentina.</p>
                        <div className="socialLinkWrapper">
                            <a 
                                className="teamLink" 
                                href='https://github.com/sgerpdx'><img alt="github logo" src={github} /></a>
                            <a 
                                className="teamLink" 
                                href='https://www.linkedin.com/in/sam-h-gerber/'>
                                    <img alt="linkedin logo" src={linkedin} /></a>
                        </div>
                    </div>

                    <div className="teamDiv">
                        <img
                            className="teamImage" 
                            alt="soraya" 
                            src={farmer} />
                        
                        <h5 className="aboutH5">Soraya Benson</h5>
                        <p className="teamP">I'm a software developer in Portland, OR. I love that tech can take us accross the borders that our passports cannot. I dream of finally making it to Iran one day.</p>
                        <div className="socialLinkWrapper">
                            <a 
                                className="teamLink" 
                                href='https://github.com/sorayabenson'><img alt="github logo" src={github} /></a>
                            <a 
                                className="teamLink" 
                                href='https://www.linkedin.com/in/soraya-benson/'>
                                    <img alt="linkedin logo" src={linkedin} /></a>
                        </div>
                    </div>
                   
                </section>
                
                <section className="dataWrapper">
                    
                    <h4 className="aboutH4">About the Data</h4>
                    
                    <p className="aboutP">Location images are from the 
                        <a 
                            className="dataLink"
                            href='https://developers.google.com/maps/documentation/streetview/overview'> Google Maps Street View Static</a> API.</p>

                    <p className="aboutP">All other location data is from the 
                        <a 
                            className="dataLink"
                            href='https://www.geodatasource.com/web-service'> GeoDataSource</a> API.</p>

                </section>
            </main>
        )
    }
}
