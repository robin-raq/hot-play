//imports
import React from 'react'
import Profile from './Profile'
import ChannelList from './ChannelList'
import AppChannels from './AppChannels'


//building the component
class Sidebar extends React.Component{
    
    render(){
        console.log(this.props.user.image_url)
        return(
            <div className = 'sidebar'>
                <h2>
                    HotPlay!
                </h2>
                <Profile 
                    username = {this.props.user.username} imageUrl ={this.props.user.image_url}/>

                <ChannelList 
                    onNewChannel ={this.props.onNewChannel}
                    onChangeChannel = {this.props.onChangeChannel} 
                    channels = {this.props.channels}
                    channelNames ={this.props.channelNames}
                    displayNewMessage = {this.props.displayNewMessage}
                    />
                <AppChannels 
                    allChannels = {this.props.allChannels}
                    displayNewChannel = {this.props.displayNewChannel}
                />

            </div>
        )
    }
}

//exporting the component
export default Sidebar;




