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
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkUser } from "./pages/Login/authSlice";
axios.defaults.baseURL = import.meta.env.VITE_APP_BE_BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get("jwt")}`;

// https://reactrouter.com/en/main/router-components/browser-router
const App = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log("app route");

  useEffect(() => {
    dispatch(checkUser());
  }, []);

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
          element={user.loggedIn ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
};

// https://reactrouter.com/en/main/components/outlet
const PrivateRoute = () => {
  const user = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(checkUser());
  // }, []);

  return user.loggedIn ? <Outlet /> : <Navigate to="login" />;
};

const AdminRoute = () => {
  const user = useSelector((state) => state.auth);
  // console.log("admin route");
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const checkRights = async () => {
  //     try {
  //       const { status, data } = await axios.post("auth/verifyAccessGrp", {
  //         groupname: "admin",
  //       });
  //       // console.log("admin route", data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   checkRights();
  // }, []);

  return user.loggedIn && user.isAdmin ? <Outlet /> : <Navigate to="" />;
};

export default App;
