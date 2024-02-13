import axios from "axios";
import { Button, Form, Input, Select, message } from "antd";
import { useEffect, useState } from "react";

const CreateUserForm = () => {
  const [options, setoptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("group/allGroups");
      const groupnameList = data.map(({ groupname }) => ({
        label: groupname,
        value: groupname,
      }));
      setoptions(groupnameList);
    };
    fetchData();
  }, []);

  const onFinish = async (credentials) => {
    try {
      const res = await axios.post("auth/register", credentials);
      if (res.response.status >= 200 && res.response.status < 300) {
        message.success("User created successfully");
      }
    } catch (error) {
      message.error(error.response.data);
    }
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <div className="py-5">
      <Form
        name="createUser"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="inline"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
            { min: 3, max: 20 },
            {
              pattern: "^[a-zA-Z0-9]+$",
              message: "Only letters and numbers are allowed",
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

            // { min: 8, max: 10 },

            // {
            //   pattern: "^(?=.*[a-zA-Z]).+$",
            //   message: "must have 1 alphabet",
            // },
            // {
            //   pattern: "\\d",
            //   message: "must have 1 number",
            // },
            // {
            //   pattern: "^(?=.*[^a-zA-Z0-9]).+$",
            //   message: "must have 1 special character",
            // },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "Please enter a valid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Groups" name="groups">
          <Select
            style={{ minWidth: "200px" }}
            mode="multiple"
            placeholder="Please select"
            options={options}
          />
        </Form.Item>

        <Form.Item className="flex items-end justify-center">
          <Button className="w-28" type="primary" htmlType="submit">
            Create User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateUserForm;
