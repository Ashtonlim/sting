import axios from "axios";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

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
    console.log("Success:", credentials);
    const res = await axios.post("auth/register", credentials);
    console.log(res);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
            style={{ minWidth: "120px" }}
            mode="multiple"
            placeholder="Please select"
            onChange={handleChange}
            options={options}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateUserForm;
