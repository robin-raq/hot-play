import React, { Component } from 'react'
import Message from './Message'
import MessageForm from './MessageForm'

export default class Chat extends Component {
    render() {
        const messages = this.props.channel.messages.map(message => <Message key = {message.content.id} text = {message.content.text} photo = {message.user.profile_picture} user = {message.user.username}/>)
        
        return (
            <div className= 'chat'>
                <h2>
                    {this.props.channel.name}
                </h2>
                {messages}
                <MessageForm />
            </div>
        )
    }
}
