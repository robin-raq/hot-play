import React from 'react';
// import {Switch, Route } from 'react-router-dom';
import './App.css';
// import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import data from './data';
import Recommended from './Recommended';
import LoginPage from './components/LoginPage'

class App extends React.Component{
  state = {
    initialData: data,
    channels: [],
    page:'profile',
    currentChannel: {
      messages: []
    },
    currentUser: {}
  }

  redirect = (page) =>{
    this.setState({
      page: page
    })

  }

  componentDidMount(){
    // fetch(`http://localhost:3000/users/${currentUser.id}`)
    // .then(r => r.json())
    // .then((currentUserObj) => {
    //   console.log(currentUserObj)
    //   this.setState({currentUser: currentUserObj})
    // })
    // fetch("http://localhost:3000/channels")
    // .then(r => r.json())
    // .then((channels) => {
    //   //console.log(currentUser)
    //   this.setState({channels: channels, currentChannel: channels[1]})
    // })

  }

  handleNewChannel = (channelName) =>{
  //console.log("i'm the new channel to be added", channelName)
    const newChannel = {
      name: `#${channelName}`,
      messages: [],
      user: this.state.currentUser


    }
    fetch(`http://localhost:3000/rooms`, {
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
      console.log(newServerChannel)
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

  handleNewLogin =(userObj) =>{
    //console.log(loginInfo.username, loginInfo.password)
    // this.setState({
    //   currentUser: userObj
    // })

    fetch(`http://localhost:3000/users/${userObj.id}`)
    .then(r => r.json())
    .then((currentUserObj) => {
      //console.log(currentUserObj)
      this.setState({
        currentUser: currentUserObj,
        channels: currentUserObj.rooms, currentChannel: currentUserObj.rooms[0]
      })
    })

  }
  
  render(){
    const channelNames = this.state.channels.map(channelObj => channelObj.name)
    //console.log(this.state.currentUser)
    
    //conditional render to setup login
    if(!this.state.currentUser.id){
      return (
      <LoginPage onNewLogin = {this.handleNewLogin}/>
      )}
      else{
    
            return (
              
              <React.Fragment>
              {/* <Navbar/> */}

              <div className = "container">
                <Sidebar
                  onNewChannel = {this.handleNewChannel}
                  onChangeChannel ={this.handleChangeChannel}
                  user = {this.state.currentUser} 
                  channelNames = {channelNames}/>
                <Chat channel = {this.state.currentChannel}/>
                <Recommended channel = {this.state.currentChannel.name}/> 
                
                
                {/* <Sidebar
                  onNewChannel = {this.handleNewChannel}

                  onChangeChannel ={this.handleChangeChannel}
                  user = {this.state.currentUser}
                  channelNames = {channelNames}

                    />
                <Chat 
                  onNewMessage = {this.handleNewMessage}
                  channel = {this.state.currentChannel}/>

                <Recommended channel = {this.state.currentChannel.name}/>  */}
                
                </div>
                </React.Fragment>
            );
          }
  }
}

export default App;
