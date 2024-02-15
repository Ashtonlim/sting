import { useEffect } from "react";
import LayoutOne from "/src/components/LayoutOne";

const Home = () => {
  useEffect(() => {
    console.log("this is home");
  });
  return (
    <LayoutOne>
      <div>
        <h1>Welcome to TMS</h1>
      </div>
    </LayoutOne>
  );
};

export default Home;
