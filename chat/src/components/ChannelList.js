import React, { Component } from 'react'
//import { ActionCableConsumer } from 'react-actioncable-provider';
import Cable from './Cable';


export default class ChannelList extends Component {
    state = {
        newChannelName: '',
        //for action cable
        channels: [],
        currentChannel: null

    }
    
    handleClick = (evt) => {
        //console.log(this)
        // this.setState({
        //     channels:[ `#${this.state.newChannelName}`,...this.state.channels]
        // })
        
        this.props.onNewChannel(this.state.newChannelName)
        this.setState({
            newChannelName: ''
        })
    }

    handleChange =(evt) => {
        //console.log(evt.target)
        this.setState({
        [evt.target.name]: evt.target.value
    })

    }

    handleChannelClick = (evt) =>{
        // console.log(evt.target.value)
        this.props.onChangeChannel(evt.target.id)
        //this.props.getVideo(evt.target.value)
        this.setState({newChannelName: ''})
    }

    handleReceivedMessage = response => {
        // debugger
        console.log(response, "FROM HANDLE RECEIVED")
        this.props.displayNewMessage(response)
        // const { message, room_id } = response;
        // //console.log(room_id)
        // //console.log(this.props.channels)
        // // // debugger
        // const channels = [...this.props.channels];
        // const channelToUpdate = this.props.channels.find(  
        //     channelObj => channelObj.id == room_id
        // );

        //console.log(channelToUpdate)

        // channel.messages = [...channel.messages, message];
        // this.setState({ channels });
      };

    render() {
        //console.log(this.props)
        const channelLis = this.props.channels.map(channel => (

            <li 
                id ={channel.id} 
                onClick = {this.handleChannelClick} 
                key = {channel.id} 
            >  {channel.name} </li> 

        ))
        
        return (
            <div className="cl">
                
                <Cable 
                    channels={this.props.channels}
                    handleReceivedMessage={this.handleReceivedMessage}
                    />
                

                <h2 style = {{marginBottom: 5}}>
                    Your Channels
                </h2>

                {/* newChannelForm */}

                <input value={this.state.newChannelName} onChange={this.handleChange} type="text" placeholder="add a channel" name = "newChannelName"/>

                <button onClick ={this.handleClick}>+</button>
                
                <ul className ="channelsList">
                    {channelLis}
                </ul>
                    
            </div>
        )
    }
}
