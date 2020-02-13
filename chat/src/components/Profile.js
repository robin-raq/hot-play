import React, { Component } from 'react'

export default class Profile extends Component {
    state = {
        user: {}
    }
    
    componentDidMount() {
        fetch('http://localhost:3000/profile',{
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(res => res.json())
        .then(user => {
            console.log(user)
            if (!user.errors){
                // localStorage.token = respObj.token
                this.setState({user: user})
                this.props.onNewLogin(user)
            }
            else {
                alert(user.errors)
            }
        })
      }
      
    render() {
        //console.log(this.state)
        return (
            <div className = "profile">
                <h2 className = 'mt2 mb0 baskerville i fw1 f1' >
                    Current User:
                </h2>
                
                <img className = "profile-photo" src={this.state.user.image_url} alt ="profile pic" />
                <h2 className= "f1">{this.state.user.username}</h2>
                
            </div>
        )
    }
}
