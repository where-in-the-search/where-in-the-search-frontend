import React, { Component } from 'react';
import './AboutPage.css';

export default class AboutPage extends Component {
    render() {
        return (

            <div>
                <section className="teamWrapper">
                    <h4>About the Team</h4>
                    <div>
                        <div>
                            <img alt="anthony" src="https://thumbs.dreamstime.com/b/world-earth-globe-pixel-art-eight-bit-retro-video-game-style-icon-world-earth-globe-eight-bit-pixel-art-game-icon-195967065.jpg" height="60" />
                            <p>Anthony...</p>
                            <p><a href='https://github.com/anthony-rosario/'>My GitHub</a></p>
                            <p><a href='https://www.linkedin.com/in/anthony-rosario/'>My LinkedIn</a></p>
                        </div>
                        <div>
                            <img alt="devon" src="https://thumbs.dreamstime.com/b/world-earth-globe-pixel-art-eight-bit-retro-video-game-style-icon-world-earth-globe-eight-bit-pixel-art-game-icon-195967065.jpg" height="60" />
                            <p>Devon...</p>
                            <p><a href='https://github.com/devon-wolf'>My GitHub</a></p>
                            <p><a href='https://www.linkedin.com/in/devon-wolfkiel/'>My LinkedIn</a></p>
                        </div>
                        <div>
                            <img alt="soraya" src="https://thumbs.dreamstime.com/b/world-earth-globe-pixel-art-eight-bit-retro-video-game-style-icon-world-earth-globe-eight-bit-pixel-art-game-icon-195967065.jpg" height="60" />
                            <p>Soraya...</p>
                            <p><a href='https://github.com/sorayabenson'>My GitHub</a></p>
                            <p><a href='https://www.linkedin.com/in/soraya-benson/'>My LinkedIn</a></p>
                        </div>
                        <div>
                            <img alt="sam" src="https://thumbs.dreamstime.com/b/world-earth-globe-pixel-art-eight-bit-retro-video-game-style-icon-world-earth-globe-eight-bit-pixel-art-game-icon-195967065.jpg" height="60" />
                            <p>My name is Sam and I'm a software engineer based in Portland, OR. I'm a topography enthusiast and have spent many hours exploring different corners of the world via map-apps. I'd love to visit Budapest or Tierra del Fuego in Argentina.</p>
                            <p><a href='https://github.com/sgerpdx'>My GitHub</a></p>
                            <p><a href='https://www.linkedin.com/in/sam-h-gerber/'>My LinkedIn</a></p>
                        </div>
                    </div>
                </section>
                <section className="dataWrapper">
                    <h4>About the Data</h4>
                    <p>Location images are from the <a href='https://developers.google.com/maps/documentation/streetview/overview'>Google Maps Street View Static</a> API.</p>

                    <p>All other location data is from the <a href='https://www.geodatasource.com/web-service'>GeoDataSource</a> API.</p>

                </section>
            </div>
        )
    }
}
