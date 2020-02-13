import React, { Component } from 'react';
import ReactPlayer from 'react-player';

export default class Video extends Component {
    state = {
        vidsArr: []
    }

    
    render() {
        const videoIds = this.state.vidsArr.map(videoObj => videoObj.id.videoIds)
        // console.log("vids:", this.props)
        
        return (
            <div className = "player">
            
                {/* {players} */}
                
            </div>
        )
    }
}
