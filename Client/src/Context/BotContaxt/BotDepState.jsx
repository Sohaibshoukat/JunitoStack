import React, { useState } from 'react';

// Remove the import for AlertContext
// import AlertContext from './AlertContext';

// Instead, you can directly import the AlertContext from the file where it is created and exported
import BotDepContext from './BotDepContext';

const BotDepState = (props) => {
  const initialvalue = "HR";
  const [department, setdepartment] = useState(initialvalue);

  return (
    <BotDepContext.Provider value={{ department, setdepartment }}>
      {props.children}
    </BotDepContext.Provider>
  );
};

export default BotDepState;
