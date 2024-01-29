import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
// import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Kanban from "./pages/Kanban/Kanban";
import Cookies from "js-cookie";

// element={<Home />}

// https://reactrouter.com/en/main/router-components/browser-router
const App = () => {
  const token = Cookies.get("token");
  console.log("token", token);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route
          path="/register"
          element={token ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/kanban"
          element={token ? <Kanban /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
