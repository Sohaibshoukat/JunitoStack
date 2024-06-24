import React, { useState } from 'react';

import AlertContext from './AlertContext';

const AlertState = (props) => {
  const initialvalue = null;
  const [alert, setAlert] = useState(initialvalue);

  const showAlert = (message, type) => {
    console.log("Coming")
    setAlert({
      message: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
