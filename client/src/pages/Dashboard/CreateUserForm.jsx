import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Input, Select, message, Card } from "antd";

const CreateUserForm = ({ tableData, setData }) => {
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
      const { data } = await axios.get("/user/allUsers");
      setData(
        data.map((user) => ({
          ...user,
          secGrp: user.secGrp?.split(","),
        }))
      );
    } catch (error) {
      message.error(error.response.data);
    }
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <Card title="Create a new user" size="small" className="w-full my-3">
      <Form
        wrapperCol={{ span: 24 }}
        // style={{ width: "100%", marginRight: 0 }}
        name="createUser"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="flex justify-between">
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
            <Input placeholder="Dev01" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },

              { min: 8, max: 10 },
              {
                pattern: "^(?=.*[a-zA-Z]).+$",
                message: "must have 1 alphabet",
              },
              {
                pattern: "\\d",
                message: "must have 1 number",
              },
              {
                pattern: "^(?=.*[^a-zA-Z0-9]).+$",
                message: "must have 1 special character",
              },
            ]}
          >
            <Input.Password placeholder="A secure password" />
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
            <Input placeholder="admin@st.com" />
          </Form.Item>

          <Form.Item label="Groups" name="groups">
            <Select
              style={{ minWidth: "200px" }}
              mode="multiple"
              placeholder="Please select"
              options={options}
            />
          </Form.Item>
          <div>
            <Form.Item>
              <Button className="w-28" type="primary" htmlType="submit">
                Create User
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </Card>
  );
};

export default CreateUserForm;
