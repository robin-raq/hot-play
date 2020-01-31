import React, { Component } from 'react'

export default class ChannelList extends Component {
    state = {
        //channels: this.props.channels,
        newChannelName: ''
    }
    handleClick = (evt) => {
        //console.log(this)
        // this.setState({
        //     channels:[ `#${this.state.newChannelName}`,...this.state.channels]
        // })
        this.props.onNewChannel(this.state.newChannelName)
    }

    handleChange =(evt) => {
        // console.log(evt.target.value)
        this.setState({
        [evt.target.name]: evt.target.value
    })

    }

    handleChannelClick = (evt) =>{
        this.props.onChangeChannel(evt.target.id)
    }

    render() {
        const channelLis = this.props.channels.map(channelName => (
            <li 
                onClick = {this.handleChannelClick} 
                id ={channelName} 
                key = {channelName} 
            >
                {channelName}
                    
            </li>
        ))
        
        return (
            <div>
                <h4 style = {{marginBottom: 5}}>
                    Channels
                </h4>
                <input value={this.state.newChannelName} onChange={this.handleChange}type="text" placeholder="add a channel" name = "newChannelName"/>

                <button onClick ={this.handleClick}>+</button>
                <ul>
                    {channelLis}
                </ul>
            </div>
        )
    }
}
