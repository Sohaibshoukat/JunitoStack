import React, { useEffect, useState } from 'react';

// Remove the import for AlertContext
// import AlertContext from './AlertContext';

// Instead, you can directly import the AlertContext from the file where it is created and exported
import HistoryContext from './HistoryContext';
import { BaseURL } from '../../Data/BaseURL';

const HistoryState = (props) => {
  const initialvalue = [];
  const [History, setHistory] = useState(initialvalue)


  const fetchHistory = async () => {
    try {
      const response = await fetch(`${BaseURL}/api/chat/chathistory`, {
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem('auth-token')
        }
      });
      const data = await response.json();
      if (data.success) {
        setHistory(data?.Chats);
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchHistory()
  }, [])

  return (
    <HistoryContext.Provider value={{ History, fetchHistory }}>
      {props.children}
    </HistoryContext.Provider>
  );
};

export default HistoryState;
