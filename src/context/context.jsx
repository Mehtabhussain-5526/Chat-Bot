import React, { createContext, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [sharedVar, setSharedVar] = useState(null);
  return (
    <MyContext.Provider value={{ sharedVar, setSharedVar }}>
      {children}
    </MyContext.Provider>
  );
};
