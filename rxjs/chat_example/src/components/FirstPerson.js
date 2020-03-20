/*
In the next block, we’ll import our chatStore and 
use its initialState property as our default chatState value.

Then, in our useLayoutEffect() Hook, we’ll subscribe 
our setChatState function to our chat store 
using the chatStore.subscribe() method and, 
finally, use the chatStore.init() method 
to initialize our component’s chatState:
*/

import React, { useState, useLayoutEffect } from "react";
import chatStore from '../store/chat';

const FirstPerson = () => {
  const [chatState, setChatState] = useState(chatStore.initialState);

  // uselayouteffect: send data to our chatState BEFORE our component is rendered
  useLayoutEffect(() => {
    chatStore.subscribe(setChatState);
    chatStore.init();
  },[]);
  
  const onFormSubmit = e => {
    e.preventDefault();
    const messageObject = {
      person: 'first-person',
      text: e.target.elements.messageInput.value.trim(),
    };
    chatStore.sendMessage(messageObject); // add created message!
    document.getElementById('messageForm').reset();
  };
  
  return (
    <div className="container">
      <h2>Mycroft</h2>
      <div className="chat-box">
	{chatState.data.map(message => (
	  <div>
	    <p className={message.person}>{message.text}</p>
	    <div className="clear"></div>
	  </div>
	))}
      </div>
      <form id="messageForm" onSubmit={onFormSubmit}>
	<input
	  type="text"
	  id="messageInput"
	  name="messageInput"
	  placeholder="type here..."
	  required
	/>
	<button type="submit">Send</button> <br />
      </form>
      <button className="clear-button" onClick={() => chatStore.clearChat()}>
	Clear Chat
      </button>
    </div>
  );
}

export  default  FirstPerson;
