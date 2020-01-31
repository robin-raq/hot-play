import React, { Component } from 'react';
import MusicPlayer from 'react-responsive-music-player';

class App extends Component {
    render() {
            return (
                <div>
                    <MusicPlayer playlist={playlist} />
                </div>
            );
        }
    }