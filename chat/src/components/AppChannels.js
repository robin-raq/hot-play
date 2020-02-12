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
        console.log("you clicked on channel:", channelObj.id )
        alert('please join channel to view')
    };

    handleReceivedChannel = response => {
        console.log(response)
        this.props.displayNewChannel(response)
        //const { channel } = response.room;
        // this.setState({
        //     allChannels: [...this.state.channels, response.room]
        // });
    };

    render() {
        console.log(this.props)
        return (
            <div>
                <ActionCableConsumer
                channel={{ channel: 'RoomsChannel' }}
                onReceived={this.handleReceivedChannel}
                />
                <h2>All Channels</h2>
                <ul>{mapChannels(this.props.allChannels, this.handleClick)}</ul>
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
                {channel.name} <button>join</button>
            </li>
            </div>
        )}
    )
}