import { createContext, useReducer } from "react";

let initial_state = { loggedIn: false, isAdmin: false };

const stateResolver = (state, payload, key = "state") => {
  // console.log(`resolving state for: ${state}`);
  // add in payload
  try {
    const newState = {
      ...state,
      ...payload,
    };
    window.localStorage.setItem(key, JSON.stringify(newState));

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
      return stateResolver(state, { ...action.payload, loggedIn: true });
    }
    case "LOGOUT": {
      return stateResolver(state, {
        ...action.payload,
        loggedIn: false,
        isAdmin: false,
      });
    }
    case "CHECK_RIGHTS": {
      return stateResolver(state, { ...action.payload });
    }
    default:
      return state;
  }
};

const GC = createContext({});

// allows different component to access state held in a context
export const ContextProvider = ({ children }) => {
  const serializedState = window.localStorage.getItem("state");
  const [state, dispatch] = useReducer(
    reducer,
    serializedState ? JSON.parse(serializedState) : initial_state
  );
  // takes in state and dispatch as value.
  // Dispatch function can then be taken from the context and used to update state
  return <GC.Provider value={{ state, dispatch }}>{children}</GC.Provider>;
};

export default GC;
