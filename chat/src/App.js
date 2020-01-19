import React from 'react';
import './App.css'
import Sidebar from './Sidebar';
import Chat from './Chat'
import Recommended from './Recommended'

class App extends React.Component{
  render(){
    const channelNames = this.props.initialData.channels.map(channelObj => channelObj.name)
    return (

      <div className = "container">
        <Sidebar 
            user = {this.props.initialData.current_user}
            channelNames = {channelNames}

            />
        <Chat channel = {this.props.initialData.channels[3]}/>
        {/* <Recommended/> */}

      </div>
    );
  }
}

export default App;
