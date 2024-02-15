import { useContext, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Kanban from "./pages/Kanban/Kanban";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";

import GC from "./context";

axios.defaults.baseURL = import.meta.env.VITE_APP_BE_BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get("jwt")}`;

// https://reactrouter.com/en/main/router-components/browser-router
const App = () => {
  const { state, dispatch } = useContext(GC);
  // console.log("app", loggedIn);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route exact path="" element={<Home />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="kanban" element={<Kanban />} />
        </Route>
        <Route
          path="login"
          element={state.loggedIn ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
};

// https://reactrouter.com/en/main/components/outlet
const PrivateRoute = () => {
  const { state, dispatch } = useContext(GC);

  useEffect(() => {
    const checkRights = async () => {
      const res = await axios.post("auth/verifyAccessGrp", {
        groupname: "admin",
      });
      if (200 <= res.status && res.status < 300) {
        dispatch({ type: "CHECK_RIGHTS", payload: res.data });
      }
    };
    checkRights();
  }, []);

  return state.loggedIn ? <Outlet /> : <Navigate to="login" />;
};

const AdminRoute = () => {
  const { state, dispatch } = useContext(GC);
  useEffect(() => {
    const checkRights = async () => {
      const res = await axios.post("auth/verifyAccessGrp", {
        groupname: "admin",
      });
      if (200 <= res.status && res.status < 300) {
        dispatch({ type: "CHECK_RIGHTS", payload: res.data });
      }
    };
    checkRights();
  }, []);

  return state.loggedIn && state.isAdmin ? <Outlet /> : <Navigate to="" />;
};

export default App;
