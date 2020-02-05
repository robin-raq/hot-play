import React, { Component } from 'react'

export default class MessageForm extends Component {

    state = {
        message: ''
    }

    handleChange = (evt)=>{
        this.setState({
            [evt.target.name]: evt.target.value
        })

    }

    handleSubmit = (evt) =>{
        evt.preventDefault()
        this.props.onNewMessage(this.state.message)
        this.setState({message: ''})
    }
    render() {
        //console.log(this.state, "from messageForm")
        return (
            <form onSubmit ={this.handleSubmit}>
            <input onChange = {this.handleChange} type="text" placeholder ="send a message" name = "message" value = {this.state.message}/>
            <input type="submit" value = "Say it!" />

            </form>
        )
    }
}
