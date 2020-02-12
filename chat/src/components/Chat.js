import React, { Component } from 'react'
import Message from './Message'
import MessageForm from './MessageForm'
import Tachyons from 'tachyons'

export default class Chat extends Component {

    render() {
        const messages = this.props.channel.messages.map(message => <Message key = {message.id} text = {message.body} photo = {message.user.image_url} user = {message.user.username}/>)
        
        return (
            <div >
                <h1>
                    {this.props.channel.name}
                </h1>
            <div className= 'chat ba b--dashed bw3' >
                
                {messages}
                
            
            </div>
                <MessageForm  onNewMessage = {this.props.onNewMessage}/>
            </div>
        )
    }
}
