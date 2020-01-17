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
                    Hello from Sidebar!
                </h2>
                <Profile/>
                <ChannelList/>

            </div>
        )
    }
}

//exporting the component
export default Sidebar;




