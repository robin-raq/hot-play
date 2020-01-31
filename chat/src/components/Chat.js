import React, { Component } from 'react'
import Message from './Message'
import MessageForm from './MessageForm'

export default class Chat extends Component {
    render() {
        const messages = this.props.channel.messages.map(message => <Message key = {message.id} text = {message.body} photo = {message.user.image_url} user = {message.user.username}/>)
        
        return (
            <div className= 'chat'>
                <h2>
                    {this.props.channel.name}
                </h2>
                {messages}
                <MessageForm  onNewMessage = {this.props.onNewMessage}/>
            </div>
        )
    }
}
