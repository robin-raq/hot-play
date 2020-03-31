import React, { Component } from 'react'
import Message from './Message'
import MessageForm from './MessageForm'
import Tachyons from 'tachyons'
import ScrollToBottom from 'react-scroll-to-bottom'

export default class Chat extends Component {

    render() {
        const messages = this.props.channel.messages.map(message => <Message key = {message.id} text = {message.body} photo = {message.user.image_url} user = {message.user.username}/>)
        
        return (
            <div className = "chat-container">
                    <h1>
                        {this.props.channel.name}
                    </h1>
            {/* <ScrollToBottom> */}
                    <div className= 'chat ba b--dashed bw3'>
                        {messages}
                    </div>
                <MessageForm  
                    onNewMessage = {this.props.onNewMessage}
                />
            {/* </ScrollToBottom> */}
            </div>
        )
    }
}
