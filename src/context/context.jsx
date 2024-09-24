import React, { createContext, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [sharedVar, setSharedVar] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [contextStateArray, setContextStateArray] = useState([]);
  return (
    <MyContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        sharedVar,
        setSharedVar,
        isCollapsed,
        setIsCollapsed,
        contextStateArray,
        setContextStateArray,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
