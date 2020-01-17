import React, { Component } from 'react'
import Message from './Message'
import MessageForm from './MessageForm'

export default class Chat extends Component {
    render() {
        return (
            <div className= 'chat'>
                <h2>
                    Hello from Chat!
                </h2>
                <Message />
                <Message />
                <Message />
                <MessageForm />
            </div>
        )
    }
}
