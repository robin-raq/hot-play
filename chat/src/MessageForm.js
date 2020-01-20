import React, { Component } from 'react'

export default class MessageForm extends Component {

    state = {
        message: ''
    }

    handleChange = (evt)=>{
        //console.log(evt.target.value)
        this.setState({
            [evt.target.name]: evt.target.value
        })

    }

    handleSubmit = (evt) =>{
        evt.preventDefault()
        this.props.onNewMessage(this.state.message)
    }
    render() {
        return (
            <form onSubmit ={this.handleSubmit}>
            <input onChange = {this.handleChange} type="text" placeholder ="send a message" name = "message" value = {this.state.message}/>
            <input type="submit" value = "Say it!" />

            </form>
        )
    }
}
