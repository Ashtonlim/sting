import { createContext, useReducer } from "react";

// uses something similar to redux pattern.
// google redux for more info
const reducer = (state = {}, action) => {
  // console.log(state, action);
  switch (action.type) {
    case "LOGIN":
      return { ...state, ...action.payload, loggedIn: true };
    case "LOGOUT":
      return { ...state, ...action.payload, loggedIn: false };
    case "CHECK_RIGHTS":
      return { ...state, ...action.payload };
    case "FETCH_INITIAL_DATA":
      console.log("from fetch initial data", action.payload, {
        ...state,
        ...action.payload,
      });
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const GC = createContext({});

// allows different component to access state held in a context
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});
  // takes in state and dispatch as value.
  // Dispatch function can then be taken from the context and used to update state
  return <GC.Provider value={{ state, dispatch }}>{children}</GC.Provider>;
};

export default GC;
