import React from 'react';
import './App.css'
import Sidebar from './Sidebar';
import Chat from './Chat'
import data from './data'
import Recommended from './Recommended'

class App extends React.Component{
  state = {
    initialData: data,
    channels: data.channels,
    currentChannel: data.channels[3]
  }

  handleNewChannel = (channelName) =>{
  //console.log("i'm the new channel to be added", channelName)
    const newChannel = {
      name: `#${channelName}`,
      messages: []

    }
    this.setState({ 
      channels: [...this.state.channels, newChannel]
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
      user: data.current_user,
      content:{
        text: messageText
      }
    }

    const updatedChannel = {...this.state.currentChannel, messages: [...this.state.currentChannel.messages, newMessage] }

    const updatedChannels = this.state.channels.map(channel => {
      if (channel.name === updatedChannel.name){
        return updatedChannel
      } else {
        return channel
      }
    } )

    this.setState({
      currentChannel: updatedChannel,
      channels: updatedChannels


    })

  }
  render(){
    const channelNames = this.state.channels.map(channelObj => channelObj.name)
    return (

      <div className = "container">
        
        <Sidebar
          onNewChannel = {this.handleNewChannel}

          onChangeChannel ={this.handleChangeChannel}
          user = {this.state.initialData.current_user}
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
