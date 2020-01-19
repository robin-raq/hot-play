import React, { Component } from 'react'

export default class ChannelList extends Component {
    state = {
        channels: this.props.channels
    }
    handleClick = (evt) => {
        //console.log(this)
        this.setState({
            channels:[ '#newclub' ,...this.state.channels]
        })
    }
    render() {
        const channelLis = this.state.channels.map(channelName => <li key = {channelName} >{channelName}</li>)
        return (
            <div>
                <h4 style = {{marginBottom: 5}}>
                    Channels
                </h4>
                <button onClick ={this.handleClick}>+</button>
                <ul>
                    {channelLis}
                </ul>
            </div>
        )
    }
}
