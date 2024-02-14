import { useState, useEffect } from "react";
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

axios.defaults.baseURL = import.meta.env.VITE_APP_BE_BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get("jwt")}`;

// https://reactrouter.com/en/main/router-components/browser-router
const App = () => {
  const [loggedIn, setloggedIn] = useState(Cookies.get("jwt") ? true : false);

  // console.log("app", loggedIn);
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<AdminRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route> */}

        <Route element={<PrivateRoute />}>
          <Route exact path="" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="kanban" element={<Kanban />} />
        </Route>
        {console.log("keepNav")}
        <Route
          path="login"
          element={loggedIn ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
};

// https://reactrouter.com/en/main/components/outlet
const PrivateRoute = () => {
  // const loginState = useSelector((state) => state.auth.user);
  const hasJWT = Cookies.get("jwt");
  // console.log("jwt", hasJWT, <Outlet />);

  // jwt may not be legit but it should not matter as data cannot be accessed without one
  return hasJWT !== undefined ? <Outlet /> : <Navigate to="login" />;
};

// const AdminRoute = () => {
//   // const isAdmin = someFucntionTocheckIfUserIsAdmin();

//   return isAdmin ? <Outlet /> : <Navigate to="login" />;
// };

export default App;
