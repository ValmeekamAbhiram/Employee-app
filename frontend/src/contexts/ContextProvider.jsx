import { createContext, useState } from "react";

// create context
export const counterContextObj = createContext();

function ContextProvider({ children }) {
  const [counter, setCounter] = useState(10);

  const changeCounter = () => {
    setCounter(counter + 1);
  };

  return (
    <counterContextObj.Provider value={{ counter, changeCounter }}>
      {children}
    </counterContextObj.Provider>
  );
}

export default ContextProvider;