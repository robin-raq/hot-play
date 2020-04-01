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
                {/* <h3 className = 'mt1 mb0  i fw1 f1' >
                    Current User:
                </h3> */}

                
                
                {/* <img className = "profile-photo" src={this.state.user.image_url} alt ="profile pic" /> */}
                {/* <h3 className= "f1">{this.state.user.username}</h3> */}


                <article class="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
                    <div class="tc">
                    <img src={this.state.user.image_url} class="br-100 h4 w4 dib ba b--black-05 pa2" title="Photo of a kitty staring at you"/>
                    <h1 class="f3 mb2">{this.state.user.username}</h1>
                    
  </div>
</article>

                
            </div>
        )
    }
}
