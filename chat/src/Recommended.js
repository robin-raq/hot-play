import React, { Component } from 'react'
//import MusicPlayer from 'react-responsive-music-player';
import SpotifyPlayer from 'react-spotify-player';
//import {playlist} from './data.js';

export default class Recommended extends Component {

    // //do a fetch to spotify api using Endpoint	https://api.spotify.com/v1/search and search uri in response. 

    render() {
        const size = {
            width: '100%',
            height: 300,
        };
          const view = 'list'; // or 'coverart'
          const theme = 'black'; // or 'white'
        return (
            <div className = "recommended">
                <h2>
                    {this.props.channel} Now Playing 
                    {/* <MusicPlayer playlist={playlist} /> */}
                    
                    <SpotifyPlayer
                    uri="spotify:album:22zpCX6Nb9ppOVklalvGec"
                            size={size}
                            view={view}
                            theme={theme}
/>
                </h2>
            
                
            </div>
        )
    }
}
