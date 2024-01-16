import { useState } from "react";
import LayoutOne from "/src/components/LayoutOne";

const Register = () => {
  const [Registerstate, setRegisterState] = useState({
    username: "",
    password: "",
  });

  const onChange = (e) => {
    // e.preventDefault();
    console.log(e.target.name, e.target.value);
    setRegisterState({ ...Registerstate, [e.target.name]: e.target.value });
  };

  return (
    <LayoutOne>
      <div className="Register">
        <h1>Register</h1>
        <form action="/auth" method="post">
          <label htmlFor="username" />
          <input
            type="text"
            name="username"
            placeholder="Username"
            id="username"
            value={Registerstate.username}
            onChange={onChange}
            required
          />
          <label htmlFor="password" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            value={Registerstate.password}
            onChange={onChange}
            required
          />
          <input type="submit" value="Register" />
        </form>
      </div>
    </LayoutOne>
  );
};

export default Register;
