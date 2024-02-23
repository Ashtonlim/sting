import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Card, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { login, checkUser } from "./authSlice.js";
import LayoutOne from "/src/components/LayoutOne";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  console.log("login route");

  useEffect(() => {
    dispatch(checkUser());
    // const init = async () => {
    //   console.log(user.loggedIn, "in login");
    //   if (user.loggedIn === false) {
    //     const res = ;
    //     console.log(res, "in login");
    //     // navigate("/");
    //   }
    //   console.log(user, "in login");
    // };
    // init();
  }, []);

  const onFinish = async (credentials) => {
    const res = await dispatch(login(credentials));
    console.log(user.loggedIn, "in login onFinish");
    console.log(res, "in login onFinish");
    if (user.loggedIn) {
      message.success("Login successful");
      navigate("/");
    } else {
      message.error("Login failed");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <LayoutOne>
      <div className="w-full flex justify-center">
        <Card className="w-2/5">
          <h1 className="text-2xl font-bold leading-tight tracking-tight md:text-4xl">
            Login to TMS
          </h1>
          <Form
            name="userLogin"
            style={{ textColor: "white" }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Username"
              name="username"
              style={{ color: "white" }}
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button className="w-full mt-2" type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </LayoutOne>
  );
};

export default Login;
