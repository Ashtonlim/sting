import { useState, useEffect } from "react";
import LayoutOne from "/src/components/LayoutOne";
import LoginView from "./LoginView";
import HomeView from "./HomeView";

import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "/src/utils/auth";

const Home = () => {
  // Review: It's usually better to use redirect in loaders and actions than this hook
  const nav = useNavigate();
  const [loggedIn, setloggedIn] = useState(isLoggedIn());

  useEffect(() => {}, [loggedIn]);
  return (
    <LayoutOne>
      {loggedIn ? (
        <HomeView />
      ) : (
        <LoginView loggedIn={loggedIn} setloggedIn={setloggedIn} />
      )}
    </LayoutOne>
  );
};

export default Home;
