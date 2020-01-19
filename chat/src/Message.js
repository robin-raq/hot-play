import React, { Component } from 'react'

export default class Message extends Component {
    render() {
        return (
            <div className = "message">
                <div>
                    <img width = {50} src={this.props.photo} alt = "user" />
                    <p className = "username">{this.props.user} </p>
                </div>
                    <p className ="text"> {this.props.text}</p>
                
            </div>
        )
    }
}
