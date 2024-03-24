import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

// it pass reducer, initialState,that i use  reducer, initialState.js its as component
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//use custom hook for update our state value becoz we dirctly use our useStateValue val for dispatch and use all child parameter inside it
export const useStateValue = () => useContext(StateContext);