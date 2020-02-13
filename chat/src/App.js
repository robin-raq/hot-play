import React from 'react';
import {Switch, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Recommended from './components/Recommended';
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'

//imports for youtube-api access
import searchYoutube from 'youtube-api-v3-search';
import REACT_APP_YOUTUBE_API_KEY from './config_keys'




class App extends React.Component{
  state = {
    appChannels:[],
    channels: [],
    currentChannel: {
      messages: []
    },
    currentUser: {},
    playlistId: 'PLuUrokoVSxlen92kBCj8pub7KkoMrqp3N',
    vidsArr: ['r_Q40kOt9X0', 'pwJXDrBik4I']
  }

  
  //when the app loads fetch rooms from the backend
  componentDidMount(){
    fetch(`http://localhost:3000/rooms`)
    .then(r => r.json())
    .then((roomsArr) => {
      // console.log(roomsArr)
      this.setState({appChannels: roomsArr})
    })
  }

   //write a function here to only return the rooms associated with the current user will need to call this function in handleNewLogin and 
  // filterChannels=(roomsArr, userRooms)=>{
  //   roomsArr.filter(room => !userRooms.includes(room))
  // }

  //this function updates state when a user logs in or signs up
  handleNewLogin =(userObj) =>{
    //console.log(userObj)
    fetch(`http://localhost:3000/users/${userObj.id}`)
    .then(r => r.json())
    .then((currentUserObj) => {
      console.log(currentUserObj)
      this.getPlaylist(currentUserObj.rooms[0].name)
      this.getVideo(currentUserObj.rooms[0].name)
      this.setState({
        currentUser: currentUserObj,
        channels: currentUserObj.rooms, 
        currentChannel: currentUserObj.rooms[0]
      })
    })
  }

  //this function queries the Youtube API and returns a playlistId based on the currentChannel's name
  getPlaylist =(newChannelName) =>{
    const API_KEY = REACT_APP_YOUTUBE_API_KEY
    const options = {
      q: `${newChannelName} music`,
      part:'id',
      type: 'playlist',
      order: 'viewCount',
      maxResults: 10
    }
    let result =  searchYoutube( API_KEY,options);
    result.then((respObj) => {

      console.log("# of playlists found", respObj.items.length)
      if(respObj.items.length === 0){
        alert('no playlist found')
        this.setState({
          playlistId: ' '
        })
      }
      else{
            const selector = Math.floor((Math.random() * respObj.items.length))
            this.setState({
              playlistId: respObj.items[selector].id.playlistId
            })
      }
    })
  }

  getVideo = (newChannelName) => {
    const API_KEY = REACT_APP_YOUTUBE_API_KEY
    const options = {
      q: `new ${newChannelName} tracks`,
      part:'id',
      type: 'video',
      maxResults: 2,
      order: 'relevance',
      videoDuration: 'short'
      }
    let result =  searchYoutube( API_KEY,options);
    result.then((respObj) => {
      console.log("# of videos found", respObj.items.length)
      if(respObj.items.length === 0){
        alert('no vidoes found')
        this.setState({
          vidsArr: []
        })
      }
      else{
            const videoIds = respObj.items.map(videoObj => videoObj.id.videoId)
            this.setState({
              vidsArr: videoIds
            })
      }



      //      console.log(respObj)
      // const selector = Math.floor((Math.random() * respObj.items.length))
      // this.setState({
      //   vidObjsArray: respObj.items,
      //   vidId: respObj.items[selector].id.videoId
      // })
    })
    
  }



  handleNewChannel = (channelName) =>{
    //console.log("i'm the new channel to be added", channelName)
    const newChannel = {
      name: `#${channelName}`,
      messages: [],
      user: this.state.currentUser
    }
    fetch(`http://localhost:3000/rooms`,{
      method:'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(
        newChannel
      )
    })
  }

  displayNewChannel =(channelObj) =>{
    //console.log(channelObj.room)

    //update the user who made channel channels
    if(this.state.currentUser.id === channelObj.user_id){
      this.setState({
        channels: [...this.state.channels, channelObj.room]
      })
    }

    //otherwise update all channels for other users
    else if(!this.state.appChannels.includes(channelObj)){
      this.setState({ 
        appChannels: [channelObj.room, ...this.state.appChannels]
      })
    }
  }

  handleChangeChannel =(channelId) =>{
    //console.log(channelId)
    //console.log(this.state.channels.filter(c => c.id == channelId ))
    const selectedChannel = this.state.channels.find(channelObj => channelObj.id == channelId)
    //console.log(selectedChannel)
    this.getPlaylist(selectedChannel.name)
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

  getNewMessages = (room_id) =>{
    fetch(`http://localhost:3000/rooms/${room_id}`)
    .then(r => r.json())
    .then((roomObj) => {
      console.log( roomObj)
      this.setState({currentChannel: roomObj})
    })
        
  }
  
  render(){
    console.log("vids from state: ", this.state.vidsArr)
    const channelNames = this.state.channels.map(channelObj => channelObj.name)
    
    // console.log(this.state.vidsArr)
    
    //conditional render for login/signup
    // if(!this.state.currentUser.id)
    
    if (!localStorage.token){
      return (
        <React.Fragment>
            <Switch>
              <Route exact path = "/Signup"  
                render={(props) => <SignupPage {...props} onNewSignup = {this.handleNewLogin}/>} />
              <Route  render={(props) => <LoginPage {...props} onNewLogin = {this.handleNewLogin} />} />
          </Switch>
        </React.Fragment>
    )}
    else{
      return(

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
            getVideo = {this.getVideo}
            getPlaylist = {this.getPlaylist}
            onNewLogin = {this.handleNewLogin}
          /> 

          <Chat 
            channel = {this.state.currentChannel}
            onNewMessage = {this.handleNewMessage}
          />

          <Recommended 
            channel = {this.state.currentChannel.name} 
            vidsArr = {this.state.vidsArr}
            playlistId= {this.state.playlistId}
          />        
        </div>
      );
    }
  }
}

export default App;
