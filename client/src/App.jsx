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

import GC from "./context";

axios.defaults.baseURL = import.meta.env.VITE_APP_BE_BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get("jwt")}`;

// https://reactrouter.com/en/main/router-components/browser-router
const App = () => {
  console.log("app route");
  const { state, dispatch } = useContext(GC);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post("auth/verifyAccessGrp");
        console.log(state);
        dispatch({ type: "FETCH_INITIAL_DATA", payload: data });
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    // if (Object.keys(state).length === 0) {
    //   fetchData();
    // }
    if (!state.loggedIn) {
      fetchData();
    }
    console.log(state, "in app");
  }, [state.loggedIn, dispatch]);

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
  // const navigate = useNavigate();
  useEffect(() => {
    const checkRights = async () => {
      try {
        const { status, data } = await axios.post("auth/verifyAccessGrp", {
          groupname: "admin",
        });

        // console.log("private route", data);

        dispatch({
          type: "CHECK_RIGHTS",
          payload: data,
        });
      } catch (err) {
        dispatch({ type: "LOGOUT" });
      }
    };
    checkRights();
  }, []);

  return state.loggedIn ? <Outlet /> : <Navigate to="login" />;
};

const AdminRoute = () => {
  // console.log("admin route");
  const { state, dispatch } = useContext(GC);
  // const navigate = useNavigate();

  useEffect(() => {
    const checkRights = async () => {
      try {
        const { status, data } = await axios.post("auth/verifyAccessGrp", {
          groupname: "admin",
        });

        // console.log("admin route", data);

        // let isAdmin = 200 <= status && status < 300 ? true : false;
        dispatch({
          type: "CHECK_RIGHTS",
          payload: data,
        });
      } catch (err) {
        dispatch({ type: "LOGOUT" });
        // navigate("/");
        // message.error(err);
      }
    };
    checkRights();
  }, []);

  return state.loggedIn && state.isAdmin ? <Outlet /> : <Navigate to="" />;
};

export default App;
