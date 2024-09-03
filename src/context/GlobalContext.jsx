import { createContext, useContext, useState } from "react";


export const GlobalContext = createContext(null);



export default function GlobalProvider({ children }) {
    
    const [quarterFinal, setQuarterFinal] = useState({});
    const [rankings, setRankings] = useState({});

    return (
        <GlobalContext.Provider value={{ quarterFinal, setQuarterFinal, rankings, setRankings }}>
          {children}
        </GlobalContext.Provider>
      )

}

export function useGlobal() {
  const context = useContext(GlobalContext);
  // console.log(context);
  if (!context) {
      throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
}