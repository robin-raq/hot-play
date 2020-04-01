import React, { Component } from 'react'
import Message from './Message'
import MessageForm from './MessageForm'
import Tachyons from 'tachyons'
import ScrollToBottom from 'react-scroll-to-bottom'
import { animateScroll } from "react-scroll";


export default class Chat extends Component {

    componentDidMount() {
        this.scrollToBottom();
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    scrollToBottom() {
        animateScroll.scrollToBottom({
        containerId: "messageScroll"
        });
    }

    render() {
        const messages = this.props.channel.messages.map(message => <Message key = {message.id} text = {message.body} photo = {message.user.image_url} user = {message.user.username}/>)
        
        return (
            <div className = "chat-container">
                    <h2 className = "chat-title">
                        {this.props.channel.name}
                    </h2>
            <ScrollToBottom>
                    <div id = 'messageScroll' className= 'chat ba b--dashed bw3'>
                        {messages}
                    </div>
            </ScrollToBottom>
                <MessageForm  
                    onNewMessage = {this.props.onNewMessage}
                />
            </div>
        )
    }
}
