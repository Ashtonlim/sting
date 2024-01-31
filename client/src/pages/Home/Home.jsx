import LayoutOne from "/src/components/LayoutOne";
import LoginView from "./LoginView";
import HomeView from "./HomeView";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  // Review: It's usually better to use redirect in loaders and actions than this hook
  const nav = useNavigate();

  const loginState = useSelector((state) => state.auth.user);
  console.log("home loginState is now", loginState);

  return <LayoutOne>{loginState ? <HomeView /> : <LoginView />}</LayoutOne>;
};

export default Home;
