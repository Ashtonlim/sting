import { useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";

import GC from "/src/context";
import LayoutOne from "/src/components/LayoutOne";

const Login = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(GC);

  console.log(state, "state");

  const onFinish = async (payload) => {
    // console.log(payload, "credentials");
    try {
      const res = await axios.post(`auth/login`, payload);

      console.log(res, "res.status");

      if (200 <= res.status && res.status < 300) {
        dispatch({ type: "LOGIN" });
        navigate("/");
        console.log("does it refresh? out");
        return res;
      }
    } catch (err) {
      if (400 <= err.status && err.status < 500) {
        console.log(err);
        message.error(err);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <LayoutOne>
      <div className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white">
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
                  <Button
                    className="w-full mt-2"
                    type="primary"
                    htmlType="submit"
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </LayoutOne>
  );
};

export default Login;
