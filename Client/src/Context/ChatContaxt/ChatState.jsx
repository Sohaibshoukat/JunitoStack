import React, { useState } from 'react';

// Remove the import for AlertContext
// import AlertContext from './AlertContext';

// Instead, you can directly import the AlertContext from the file where it is created and exported
import ChatContext from './ChatContext';

const ChatState = (props) => {
  const initialvalue = [];
  const [ChatsData, setChatsData] = useState(initialvalue)


  return (
    <ChatContext.Provider value={{ ChatsData, setChatsData }}>
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;
