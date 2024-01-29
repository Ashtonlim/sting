import { Button, Checkbox, Form, Input } from "antd";
import Cookies from "js-cookie";
// import { login } from "/src/api/auth";
import api from "/src/api/const.js";

const onFinish = async (credentials) => {
  console.log("Success:", credentials);
  try {
    const res = await api.post(`auth/login`, credentials);
    Cookies.set("token", res.data.token);
  } catch (err) {
    console.log(err);
  }
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Login = () => {
  return (
    <div className="login">
      <h1>Login</h1>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
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
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
