import React from 'react';
import './App.css'
import Sidebar from './Sidebar';
import Chat from './Chat'
import data from './data'
import Recommended from './Recommended'

class App extends React.Component{
  state = {
    initialData: data,
    channels: [],
    currentChannel: {
      messages: []
    },
    currentUser: {}
  }

  componentDidMount(){
    fetch("http://localhost:3000/current_user")
    .then(r => r.json())
    .then((currentUser) => {
      //console.log(currentUser)
      this.setState({currentUser: currentUser})
    })
    fetch("http://localhost:3000/channels")
    .then(r => r.json())
    .then((channels) => {
      //console.log(currentUser)
      this.setState({channels: channels, currentChannel: channels[1]})
    })

  }

  handleNewChannel = (channelName) =>{
  //console.log("i'm the new channel to be added", channelName)
    const newChannel = {
      name: `#${channelName}`,
      messages: []

    }
    fetch(`http://localhost:3000/channels`, {
      method:'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(
        newChannel
      )
    })
    .then(resp => resp.json())
    .then(newServerChannel => {
      this.setState({ 
      channels: [...this.state.channels, newServerChannel]})
    
    })

  }

  handleChangeChannel =(channelName) =>{
    //console.log(channelName)
    const selectedChannel = this.state.channels.find(channelObj => channelObj.name === channelName)
    this.setState({
      currentChannel: selectedChannel
    })

  }

  handleNewMessage =(messageText) =>{
    //console.log(messageText)
    const newMessage = {
      user: this.state.currentUser,
      content:{
        text: messageText
      }
    }

    const updatedChannel = {...this.state.currentChannel, messages: [...this.state.currentChannel.messages, newMessage] }

    fetch(`http://localhost:3000/channels/${updatedChannel.id}`, {
      method:'PATCH',
      headers: { 
        'Content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(updatedChannel)
      })
      .then(resp => resp.json())
      .then(updatedServerChannel => {
        //console.log(json_resp)
        const updatedChannels = this.state.channels.map(channel => {
          if (channel.name === updatedServerChannel.name){
            return updatedServerChannel
          } else {
            return channel
          }
        } )
    
        this.setState({
          currentChannel: updatedServerChannel,
          channels: updatedChannels
    
    
        })
      })


  }
  
  render(){
    const channelNames = this.state.channels.map(channelObj => channelObj.name)
    //condition render to setup login
    if(!this.state.currentUser.id){
      return <div>
      <h1>Please Log In</h1>
      <form>
        <input type = "text" placeholder = "name"/>
        <input type = "text" placeholder = "password"/>
        <input type = "submit" value ="login"/>
      </form>
      </div>
    }
    
    return (

      <div className = "container">
        
        <Sidebar
          onNewChannel = {this.handleNewChannel}

          onChangeChannel ={this.handleChangeChannel}
          user = {this.state.currentUser}
          channelNames = {channelNames}

            />
        <Chat 
          onNewMessage = {this.handleNewMessage}
          channel = {this.state.currentChannel}/>

        <Recommended channel = {this.state.currentChannel.name}/> 
        

        

      </div>
    );
  }
}

export default App;
