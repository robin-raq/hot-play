import React, { Component } from 'react'

export default class MessageForm extends Component {
    render() {
        return (
            <form>
            <input type="text"/>
            <input type="submit" value = "Say it!" />

            </form>
        )
    }
}
