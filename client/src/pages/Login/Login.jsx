import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Card, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import GC from "/src/context";
import LayoutOne from "/src/components/LayoutOne";

const Login = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(GC);

  console.log(state, "state");

  const onFinish = async (credentials) => {
    // console.log(payload, "credentials");
    try {
      const res = await axios.post(`auth/login`, credentials);
      console.log(res, "res.status");

      if (200 <= res.status && res.status < 300) {
        dispatch({ type: "LOGIN", payload: res.data });
        // message.success(`Welcome`)
        navigate(0);
        return res;
      }
    } catch (err) {
      if (err?.response?.data) {
        message.error(err?.response?.data);
      }
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
