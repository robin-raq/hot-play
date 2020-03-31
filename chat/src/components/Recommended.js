import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Video from './Video'


export default class Recommended extends Component {

    render() {
        // console.log(" vids from recc:", this.props)
        const players = this.props.vidsArr.map(videoId => <div className='player-wrapper'><ReactPlayer 
            className='react-player' 
            url= {`https://www.youtube.com/watch?v=${videoId}`}
            playing = {false}   
            controls 
            width ={900} 
            height = {500} /></div>)
        return(
            <div className = "recommended">
                <h1 className= "mt2 mb0 f1 fw1 ttu tracked glow">
                    Hot Recs {this.props.channel} 
                </h1>

                <div className = "wrapper">
                    {players}
                </div>
                    
                <div className='player-wrapper'>
                    {/* <ReactPlayer 
                        className='react-player' 
                        url= {`https://www.youtube.com/playlist?list=${this.props.playlistId}`} 
                        playing = {false}   
                        controls 
                        width ={900} 
                        height = {500} /> */}
                </div>

            </div>   
        )
    }
}
