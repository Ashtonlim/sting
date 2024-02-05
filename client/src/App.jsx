import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Kanban from "./pages/Kanban/Kanban";
import Login from "./pages/Login/Login";

axios.defaults.baseURL = import.meta.env.VITE_APP_BE_BASE_URL;
axios.defaults.withCredentials = true;

// https://reactrouter.com/en/main/router-components/browser-router
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route exact path="" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="kanban" element={<Kanban />} />
        </Route>

        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

const PrivateRoute = () => {
  // const loginState = useSelector((state) => state.auth.user);
  const hasJWT = Cookies.get("jwt");
  console.log("jwt", hasJWT);

  // jwt may not be legit but it should not matter as data cannot be accessed without one
  return hasJWT ? <Outlet /> : <Navigate to="login" />;
};

const AdminRoute = () => {
  const loginState = useSelector((state) => state.auth.user);

  return loginState ? <Outlet /> : <Navigate to="login" />;
};

export default App;
