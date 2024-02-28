import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Cookies from "js-cookie";
import axios from "axios";

import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Kanban from "./pages/Kanban/Kanban";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Loading from "./pages/Loading/";
import { useSelector, useDispatch } from "react-redux";
import { checkUser } from "./pages/Login/authSlice";

axios.defaults.baseURL = import.meta.env.VITE_APP_BE_BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get("jwt")}`;

// https://reactrouter.com/en/main/router-components/browser-router
const App = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("app route", user);
    // console.log(window.location.href);
    if (user.status === "idle") {
      dispatch(checkUser());
    }
  }, [user.status, dispatch]);

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
          element={
            user.status != "succeeded" ? (
              <Loading />
            ) : user.loggedIn ? (
              <Navigate to="/" />
            ) : (
              <Login />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

// https://reactrouter.com/en/main/components/outlet
const PrivateRoute = () => {
  const user = useSelector((state) => state.auth);
  console.log("Private route", user);
  const location = useLocation();

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   console.log("app route", user);
  //   // console.log(window.location.href);
  //   if (user.status === "idle") {
  //     dispatch(checkUser());
  //   }
  // }, [user.status, dispatch]);

  // console.log(location.pathname);

  // need to check if state is retrieved from server first
  // once succeeded, res will then be updated in redux state
  // check if user is logged in
  // ensures route is always authenticated by server
  return user.status != "succeeded" ? (
    <Loading />
  ) : user.loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  );
};

const AdminRoute = () => {
  const user = useSelector((state) => state.auth);
  const location = useLocation();

  // need to check if state is retrieved from server first
  // once succeeded, res will then be updated in redux state
  // check if user is logged in
  // ensures route is always authenticated by server
  return user.status != "succeeded" ? (
    <Loading />
  ) : user.loggedIn ? (
    <Outlet />
  ) : user.isAdmin ? (
    <Navigate to="" />
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  );
};

export default App;
