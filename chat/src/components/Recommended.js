import React, { Component } from 'react'
// import SpotifyPlayer from 'react-spotify-player';
// import searchYoutube from 'youtube-api-v3-search';
import ReactPlayer from 'react-player'


export default class Recommended extends Component {
    // state={
    //     genre: ' grime ',
    //     vidId: 'RqQGUJK7Na4'
    // }
    
    // componentDidMount(){
        
    //     this.getVideo(this.props.channel)

    // }

    // getVideo = (newChannel) => {
    //     const API_KEY = 'AIzaSyCwXEvCptoanxzMfbZ4UOomHnqvZWusijc'
    //     const options = {
    //         q:this.props.channel,
    //         part:'snippet',
    //         type: video
    //       }
    //     let result =  searchYoutube( API_KEY,options);
    //     result.then((respObj) => {
    //            // console.log(respObj.items[0].id.videoId)

    //             this.setState({
    //                 vidId: respObj.items[2].id.videoId
    //             })
    //     })
    //     //console.log(result)
    // }

    render() {
        // const size = {
        //     width: '100%',
        //     height: 300,
        // };
        //   const view = 'list'; // or 'coverart'
        //   const theme = 'black'; // or 'white'

        return (
            
            <div className = "recommended">
                <h1 className= "mt2 mb0 f1 fw1 ttu tracked glow">
                    Hot Recs {this.props.channel} 
                </h1>
                    {/* <div className='player-wrapper'>
                        <ReactPlayer className='react-player' url= {`https://www.youtube.com/watch?v=${this.props.vidId}`} playing = {false}  controls width ={300} height = {200} />
                    </div> */}
                <div className='player-wrapper'>
                    <ReactPlayer className='react-player' url= {`https://www.youtube.com/playlist?list=${this.props.playlistId}`} playing = {false}   controls width ={900} height = {500} />
                </div>

                    


                    {/* <SpotifyPlayer
                    uri="spotify:album:22zpCX6Nb9ppOVklalvGec"
                            size={size}
                            view={view}
                            theme={theme}
                    />
                    <SpotifyPlayer
                    uri="spotify:album:15QCrOnubJ2AiL43z7stt0"
                            size={size}
                            view={view}
                            theme={theme}
                    /> */}
                
            
                
            </div>
            
        )
    }
}
