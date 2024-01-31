import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Kanban from "./pages/Kanban/Kanban";

import { useSelector } from "react-redux";

// https://reactrouter.com/en/main/router-components/browser-router
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="register" element={<Register />} />
          <Route path="kanban" element={<Kanban />} />
        </Route>

        <Route exact path="" element={<Home />} />
        <Route path="login" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

const PrivateRoute = () => {
  const loginState = useSelector((state) => state.auth.user);
  // jwt may not be legit but it will not matter as data cannot be accessed without one
  return loginState ? <Outlet /> : <Navigate to="login" />;
};

export default App;
