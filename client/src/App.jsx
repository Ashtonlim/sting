import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";

import Cookies from "js-cookie";
import axios from "axios";

import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Kanban from "./pages/Kanban/Kanban";
import AppCreate from "./pages/AppCreate/AppCreate";
import AppEdit from "./pages/AppEdit/AppEdit";
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
    console.log("App route", user);
    const init = async () => {
      await dispatch(checkUser());
    };

    if (user.status === "idle") {
      // console.log("checkUser on idle - refreshed or typed in url");
      init();
    }
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
          <Route path="Create-application" element={<AppCreate />} />
          <Route path="Edit-application/:appName" element={<AppEdit />} />
          <Route path="Kanban/:appName" element={<Kanban />} />
        </Route>

        {/* <Route element={<OpenRoute />}>
          <Route path="login" element={<Login />} />
        </Route> */}

        <Route
          path="login"
          element={
            user.status === "idle" || user.status === "loading" ? (
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
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    console.log("Private route", user);
    const init = async () => {
      await dispatch(checkUser());
    };
    if (user.status === "succeeded") {
      // console.log("checkUser on success - user.status should be success in PR");
      init();
    }
  }, [dispatch]);

  // need to check if state is retrieved from server first
  // once succeeded, res will then be updated in redux state
  // check if user is logged in
  // ensures route is always authenticated by server
  return user.status === "idle" || user.status === "loading" ? (
    <Loading />
  ) : user.loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  );
};

const AdminRoute = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    console.log("Admin route", user);
    const init = async () => {
      await dispatch(checkUser());
    };
    if (user.status === "succeeded") {
      init();
    }
  }, [dispatch]);

  return user.status === "idle" || user.status === "loading" ? (
    <Loading />
  ) : user.loggedIn ? (
    user.isAdmin ? (
      <Outlet /> // if user is loggedin and admin, allow access
    ) : (
      <Navigate to="" /> // if user is loggedin but not an admin, redirect to home
    )
  ) : (
    <Navigate to="login" state={{ from: location }} replace /> //
  );
};

export default App;

// const OpenRoute = () => {
//   const user = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const location = useLocation();

//   useEffect(() => {
//     console.log("Open route", user, location);
//     const init = async () => {
//       await dispatch(checkUser());
//     };
//     init();
//   }, []);

//   return user.status != "succeeded" ? (
//     <Loading />
//   ) : user.loggedIn ? (
//     <Navigate to="/" />
//   ) : (
//     <Outlet />
//   );
// };
