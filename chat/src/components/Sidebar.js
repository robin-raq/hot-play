//imports
import React from 'react';
import Profile from './Profile';
import ChannelList from './ChannelList';
import AppChannels from './AppChannels';
import {Link} from 'react-router-dom';


//building the component
class Sidebar extends React.Component{
    handleClick = () => {
        localStorage.clear()
        window.location.reload();
        // this.props.redirect('login')
      }
    
    render(){
        console.log(this.props.user.image_url)
        return(
            <div className = 'sidebar'>
            <Link to= '/Login' refresh="true">
                    
                <button className="f6 link  db" onClick={this.handleClick}>Logout</button>
            </Link>
                <h2>
                    HotPlay!
                </h2>
                <Profile 
                    username = {this.props.user.username} 
                    imageUrl ={this.props.user.image_url}
                    onNewLogin ={this.props.onNewLogin}
                    />

                <ChannelList 
                    onNewChannel ={this.props.onNewChannel}
                    onChangeChannel = {this.props.onChangeChannel} 
                    channels = {this.props.channels}
                    channelNames ={this.props.channelNames}
                    displayNewMessage = {this.props.displayNewMessage}
                    getVideo = {this.props.getVideo}
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




