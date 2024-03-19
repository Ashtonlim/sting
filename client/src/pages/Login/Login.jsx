import { Button, Form, Input, Card } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./authSlice.js";
import LayoutOne from "/src/components/LayoutOne";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const user = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    console.log("now in login, from:", from);
    if (user.loggedIn) {
      navigate(from);
    }
  }, []);

  const onFinish = async (credentials) => {
    try {
      await dispatch(login(credentials));
      // navigate(from);
    } catch (err) {
      console.log(err);
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
