//imports
import React from 'react'
import Profile from './Profile'
import ChannelList from './ChannelList'


//building the component
class Sidebar extends React.Component{
    render(){
        return(
            <div className = 'sidebar'>
                <h2>
                    HotPlay!
                </h2>
                <Profile 
                    username = {this.props.user.username} imageUrl ={this.props.user.profile_picture}/>
                <ChannelList 
                    onNewChannel ={this.props.onNewChannel}
                    onChangeChannel = {this.props.onChangeChannel}channels = {this.props.channelNames}/>

            </div>
        )
    }
}

//exporting the component
export default Sidebar;




