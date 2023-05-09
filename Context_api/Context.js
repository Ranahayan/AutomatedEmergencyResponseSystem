import React, { createContext, useState } from "react";
export const Data = createContext(null);
export const DataProvider = ({ children }) => {
  const [account, setAccount] = useState({ });
  return (
    <Data.Provider value={{ account, setAccount }}>{children}</Data.Provider>
  );
};

export default DataProvider;
