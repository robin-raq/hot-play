import React from 'react';
import {Switch, Route } from 'react-router-dom';
import './App.css';
// import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';

import Recommended from './Recommended';
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'



//action cable imports
import { API_ROOT } from './constants';



class App extends React.Component{
  state = {
    appChannels:[],
    channels: [],
    page:'profile',
    currentChannel: {
      messages: []
    },
    currentUser: {}
  }

  

  componentDidMount(){

    fetch(`http://localhost:3000/rooms`)
    .then(r => r.json())
    .then((roomsArr) => {
      //console.log(roomsArr)
      this.setState({appChannels: roomsArr})
    })
    

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
    // // .then(resp => resp.json())
    // // .then(channelObj => {
    // //   console.log(channelObj)
    //     this.setState({ 
    //       //update all channels
    //       appChannels: [channelObj, ...this.state.appChannels],
    //       //update the users channels
    //       channels: [...this.state.channels, channelObj]})
    

    // // })

  }

  displayNewChannel =(channelObj) =>{

    //console.log(channelObj.room)

    //update the user who made channel channels
    if(this.state.currentUser.id === channelObj.user_id){

      this.setState({
      channels: [...this.state.channels, channelObj.room],
      appChannels: [channelObj.room, ...this.state.appChannels]
    })
  }else{


    this.setState({ 
      //update all channels
      appChannels: [channelObj.room, ...this.state.appChannels]
      })
    }
    

  }

  handleChangeChannel =(channelId) =>{
    //console.log(channelId)
    //console.log(this.state.channels.filter(c => c.id == channelId ))
    const selectedChannel = this.state.channels.find(channelObj => channelObj.id == channelId)
    //console.log(selectedChannel)
    this.setState({
      currentChannel: selectedChannel
    })

  }

  handleNewMessage =(messageText) =>{
    //console.log(messageText)
    const newMessage = {
      user: this.state.currentUser,
      message:{
        body: messageText
      }
    }

    const updatedChannel = {...this.state.currentChannel, messages: [...this.state.currentChannel.messages, newMessage] }

    const bodyOfFetch = {
      user_id: this.state.currentUser.id,
      body: messageText,
      room_id: updatedChannel.id
    }

    

    fetch(`http://localhost:3000/messages`, {
      method:'POST',
      headers: { 
        'Content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(bodyOfFetch)
      })
  }

  displayNewMessage = response => {
    console.log(response, "FROM LINE 168")
    const { message, room_id } = response;
    // // debugger
    const channels = [...this.state.channels];
    const channel = channels.find(  
      channel => channel.id === room_id
    );
    channel.messages = [...channel.messages, message];
    this.setState({ channels });
};

  handleNewLogin =(userObj) =>{

    fetch(`${API_ROOT}/users/${userObj.id}`)
    .then(r => r.json())
    .then((currentUserObj) => {
      //console.log(currentUserObj)
      this.setState({
        currentUser: currentUserObj,
        channels: currentUserObj.rooms, currentChannel: currentUserObj.rooms[0]
      })
    })

  }

  handleNewSignup =(userObj) =>{
    //console.log(userObj)
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
        <React.Fragment>
            <Switch>
        
              <Route exact path = "/Signup"  
                render={(props) => <SignupPage {...props} onNewSignup = {this.handleNewSignup}/>} />
              <Route render={(props) => <LoginPage {...props} onNewLogin = {this.handleNewLogin} />} />
          </Switch>
        </React.Fragment>
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
                  channelNames = {channelNames}
                  channels ={this.state.channels}
                  displayNewMessage = {this.displayNewMessage}
                  allChannels = {this.state.appChannels}
                  displayNewChannel = {this.displayNewChannel}

                  />

                

                <Chat 
                  channel = {this.state.currentChannel}
                  onNewMessage = {this.handleNewMessage}
                  
                  

                />
                <Recommended channel = {this.state.currentChannel.name}/> 
                
                </div>
                </React.Fragment>
            );
          }
  }
}

export default App;
