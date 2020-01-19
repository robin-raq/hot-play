import React, { Component } from 'react'

export default class Profile extends Component {
    render() {
        return (
            <div className = "profile">
                <h2>
                    Current User:
                </h2>
                <h4>{this.props.username}</h4>
                <img className = "profile-photo" src={this.props.imageUrl} alt ="profile pic" />
                
            </div>
        )
    }
}
