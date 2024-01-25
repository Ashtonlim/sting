import LayoutOne from "/src/components/LayoutOne";
import LoginView from "./LoginView";
const Home = () => {
  const loggedIn = false;

  return (
    <LayoutOne>
      {loggedIn ? (
        <div>
          <h1>Home Page</h1>
        </div>
      ) : (
        <LoginView />
      )}
    </LayoutOne>
  );
};

export default Home;
