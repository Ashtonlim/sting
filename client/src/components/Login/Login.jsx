import { useState } from "react";
import LayoutOne from "../layouts/LayoutOne";

const Login = () => {
  const [loginstate, setloginState] = useState({ username: "", password: "" });

  const onChange = (e) => {
    // e.preventDefault();
    console.log(e.target.name, e.target.value);
    setloginState({ ...loginstate, [e.target.name]: e.target.value });
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
          <input type="submit" value="Login" />
        </form>
      </div>
    </LayoutOne>
  );
};

export default Login;
