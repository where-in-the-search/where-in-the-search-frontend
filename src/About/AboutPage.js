import React, { Component } from 'react';
import './AboutPage.css';

{/* <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */ }

export default class AboutPage extends Component {
    render() {
        return (

            <div>
                <section className="teamWrapper">
                    <h4>About the Team</h4>
                    <div>
                        <div>
                            <img alt="photo" src="https://thumbs.dreamstime.com/b/world-earth-globe-pixel-art-eight-bit-retro-video-game-style-icon-world-earth-globe-eight-bit-pixel-art-game-icon-195967065.jpg" height="60" />
                            <p>Anthony...</p>
                            <p>My GitHub</p>
                        </div>
                        <div>
                            <img alt="photo" src="https://thumbs.dreamstime.com/b/world-earth-globe-pixel-art-eight-bit-retro-video-game-style-icon-world-earth-globe-eight-bit-pixel-art-game-icon-195967065.jpg" height="60" />
                            <p>Devon...</p>
                            <p>My GitHub</p>
                        </div>
                        <div>
                            <img alt="photo" src="https://thumbs.dreamstime.com/b/world-earth-globe-pixel-art-eight-bit-retro-video-game-style-icon-world-earth-globe-eight-bit-pixel-art-game-icon-195967065.jpg" height="60" />
                            <p>Soraya...</p>
                            <p>My GitHub</p>
                        </div>
                        <div>
                            <img alt="photo" src="https://thumbs.dreamstime.com/b/world-earth-globe-pixel-art-eight-bit-retro-video-game-style-icon-world-earth-globe-eight-bit-pixel-art-game-icon-195967065.jpg" height="60" />
                            <p>My name is Sam and I'm a software engineer based in Portland, OR. I'm a topography enthusiast and have spent many hours exploring different corners of the world via map-apps. I'd love to visit Budapest or Tierra del Fuego in Argentina.</p>
                            <p><a href='https://github.com/sgerpdx'>My GitHub</a></p>
                        </div>
                    </div>
                </section>
                <section className="dataWrapper">
                    <h4>About the Data</h4>
                    <p>Location images are from the <a href='https://developers.google.com/maps/documentation/streetview/overview'>Google Maps Street View Static</a> API.</p>

                    <p>All other location data is from the <a href='https://www.geodatasource.com/web-service'>GeoDataSource</a> API.</p>

                    <p>Character images are from <a href='#'>[random online tool if that's the route we end up going, or whatever credit ends up being relevant]</a></p>

                    <p>[any design libraries/sources we end up using, such as for spinners and other such things] ... flaticon, etc</p>

                </section>
            </div>
        )
    }
}
