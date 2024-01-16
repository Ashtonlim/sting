import { useState } from "react";
import LayoutOne from "/src/components/LayoutOne";

import { Button } from "antd";

const Login = () => {
  const [loginstate, setloginState] = useState({ username: "", password: "" });

  const onChange = (e) => {
    // e.preventDefault();
    console.log(e.target.name, e.target.value);
    setloginState({ ...loginstate, [e.target.name]: e.target.value });
  };

  const handleOnClick = (e) => {
    console.log("submit button clicked");
    // send api
  };

  return (
    <LayoutOne>
      <div className="login">
        <h1>Login</h1>
        <form action="/auth" method="post">
          <label htmlFor="username" />
          <input
            type="text"
            name="username"
            placeholder="Username"
            id="username"
            value={loginstate.username}
            onChange={onChange}
            required
          />
          <label htmlFor="password" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            value={loginstate.password}
            onChange={onChange}
            required
          />
          <Button
            onClick={handleOnClick}
            type="primary"
            value="das"
            className="my-2 block"
          >
            Submit
          </Button>
        </form>
      </div>
    </LayoutOne>
  );
};

export default Login;
