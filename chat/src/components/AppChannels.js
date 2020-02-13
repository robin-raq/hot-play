import React, { Component } from 'react'
import { ActionCableConsumer} from 'react-actioncable-provider';
//import { API_ROOT } from '../constants';
// import uuid from 'uuid/v4'

export default class AppChannels extends Component {

    // state ={
    //     allChannels: []
    // }
    // //when the page loads fetch the channels from api and update state

    // componentDidMount = () => {
    //     fetch(`${API_ROOT}/rooms`)
    //     .then(res => res.json())
    //     .then(channelsArr => {  
    //         //console.log(channelsArr)
    //         this.setState({ 
    //             allChannels: channelsArr
    //         })
    //     });
        
    // };

    handleClick = channelObj => {
        console.log("you clicked on channel:", channelObj.name )
        // alert('please join channel to view')
        const nameNoHash = (channelObj.name).substring(1, channelObj.name.length)
        this.props.onJoinChannel(nameNoHash)
    };

    joinChannel =(channelObj) =>{
        // console.log("welcome to ", channelObj.name )
    }

    handleReceivedChannel = response => {
        console.log(response)
        this.props.displayNewChannel(response)
        //const { channel } = response.room;
        // this.setState({
        //     allChannels: [...this.state.channels, response.room]
        // });
    };

    render() {
        // console.log(this.props)
        let difference = this.props.allChannels.filter(x => !this.props.channels.includes(x))

        return (
            <div className = "appChannels">
                <ActionCableConsumer
                channel={{ channel: 'RoomsChannel' }}
                onReceived={this.handleReceivedChannel}
                />
                <h2>All Channels</h2>
                <ul className = "channelsList">{mapChannels(this.props.allChannels, this.handleClick)}</ul>
                {/* <ul className = "channelsList">{mapChannels(difference, this.handleClick)}</ul> */}
            </div>
        )
    }
}

//helpers

const mapChannels = (channels, handleClick) => {
    return channels.map(channel => {
        return (
            <div>
            <li 
                key={channel.id} 
                onClick={() => handleClick(channel)}>
                {channel.name} <button >join</button>
            </li>
            </div>
        )}
    )
}