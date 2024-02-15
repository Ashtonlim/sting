import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Input, Form, Button, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import LayoutOne from "/src/components/LayoutOne";

const Profile = () => {
  const [user, setUser] = useState({ username: "", email: "" });
  const [form] = Form.useForm();

  useEffect(() => {
    const init = async () => {
      const res = await axios.get("user/user");
      setUser(res.data);
    };

    init();
  }, []);

  const onFinish = async (payload) => {
    try {
      const res = await axios.post("user/updateUser", payload);

      if (200 <= res.status && res.status < 300) {
        if (payload.email) {
          setUser({ ...user, ...payload });
        }
        message.success("Credentials updated successfully!");
        form.resetFields();
      }
    } catch (err) {
      message.error(`Unable to update credentials!`);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <LayoutOne>
      <div className="flex flex-row w-full justify-evenly">
        <div className="text-left w-1/2">
          <Card className="" title={`Hello, ${user.username}`} bordered={false}>
            <div className="mb-5">
              <div className="text-lg underline underline-offset-8">
                Username
              </div>{" "}
              <div className="font-bold mt-1">{user.username}</div>
            </div>
            <div>
              <div className="text-lg underline underline-offset-8">Email</div>{" "}
              {typeof user.email === "string" && user.email ? (
                <div className="font-bold mt-1">{user.email}</div>
              ) : (
                <div className="italic mt-1">No email</div>
              )}
            </div>
          </Card>
        </div>
        <div className="text-left w-full ml-10">
          <Card title={`Update profile information`}>
            <Form
              form={form}
              name="edit-user"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="New Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email!",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Enter new email"
                />
              </Form.Item>
              <Form.Item
                label="New Password"
                name="password"
                rules={[
                  // { min: 8, max: 10 },
                  {
                    pattern: "^(?=.*[a-zA-Z]).+$",
                    message: "must have 1 alphabet",
                  },
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
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Enter new password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  className="mt-2 float-right"
                  type="primary"
                  htmlType="submit"
                >
                  Update
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </LayoutOne>
  );
};

export default Profile;
