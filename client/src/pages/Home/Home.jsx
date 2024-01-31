import LayoutOne from "/src/components/LayoutOne";
import LoginView from "./LoginView";
import HomeView from "./HomeView";

import { useSelector } from "react-redux";

const Home = () => {
  const loginState = useSelector((state) => state.auth.user);
  console.log("home loginState is now", loginState);

  return <LayoutOne>{loginState ? <HomeView /> : <LoginView />}</LayoutOne>;
};

export default Home;
