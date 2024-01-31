import { useReducer } from "react";

const reducer = (state, action) => {
  return state;
};

const contextProvider = () => {
  const [state, dispatch] = useReducer(reducer, {});
};
