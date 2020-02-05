// src/components/Cables.js
//handles a newly broadcasted message

import React, { Fragment } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';

const Cable = ({ channels, handleReceivedMessage }) => {
  //console.log(channels)
  return (
    <Fragment>
      {channels.map(channel => {
        return (
          <ActionCableConsumer
            key={channel.id}  
            // says which channel on backend to listen to
            channel={{ channel: 'MessagesChannel', room_id: channel.id }}
            //says what to do once you receive a response from that channel
            onReceived = {handleReceivedMessage}
          />
  
        );
      })}
    </Fragment>
  );
};

export default Cable;