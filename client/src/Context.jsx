import { createContext, useReducer } from "react";

const INITIAL_STATE = { loggedIn: false };

const loadState = (key = "state") => {
  try {
    const serializedState = window.localStorage.getItem(key);
    if (serializedState) {
      return JSON.parse(serializedState);
    }
    return INITIAL_STATE;
  } catch (err) {
    console.log(err);
    return INITIAL_STATE;
  }
};

const saveState = (state, key = "state") => {
  console.log("savingState");
  try {
    window.localStorage.setItem(key, JSON.stringify(state));
  } catch (err) {
    console.log(err);
  }
};

const stateResolver = (state, action) => {
  console.log(`resolving state for: ${state}`);
  // add in payload
  try {
    const newState = {
      ...state,
      ...action.payload,
    };
    saveState(newState);
    return newState;
  } catch (err) {
    console.log(`@context.js: ${err}`);
    return state;
  }
};

// uses something similar to redux pattern.
// google redux for more info
const reducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN": {
      const loginState = { ...state, ...action.payload, loggedIn: true };
      saveState(loginState);
      console.log("From reducers.js, LOG_IN");
      return loginState;
    }
    case "LOGOUT": {
      const logoutState = { ...state, loggedIn: false };
      saveState(logoutState);
      return logoutState;
    }
    case "POST_ON_STOCK":
      return stateResolver(state, action);
    default:
      return state;
  }
};

const GC = createContext({});

// allows different component to access state held in a context
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, loadState());
  // takes in state and dispatch as value.
  // Dispatch function can then be taken from the context and used to update state
  return <GC.Provider value={{ state, dispatch }}>{children}</GC.Provider>;
};

export default GC;
