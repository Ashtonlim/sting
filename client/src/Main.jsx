import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { store } from "./app/store.js";
import { Provider } from "react-redux";

// refer to vite.config.js for index.scss import
// import "antd/dist/antd.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
