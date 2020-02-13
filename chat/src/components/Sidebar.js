import React from 'react';
import Profile from './Profile';
import ChannelList from './ChannelList';
import AppChannels from './AppChannels';
import {Link} from 'react-router-dom';


class Sidebar extends React.Component{

    //function to logout on click
    handleClick = () => {
        localStorage.clear()
        window.location.reload();
    }
    
    render(){
        console.log("current user: ", this.props.user)
        return(
            
            <div className = 'sidebar'>
                <Link to= '/Login' refresh="true">
                    <button 
                        className="f6 link grow ttu db bg-black white logout" 
                        onClick={this.handleClick}
                    >
                        Logout
                    </button>
                    <br></br>
                    
                </Link>
                
                <h1>🔥HotPlay</h1> 
            

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
                    onJoinChannel = {this.props.onNewChannel}
                    channels = {this.props.channels}
                />

            </div>
        )
    }
}

export default Sidebar;




