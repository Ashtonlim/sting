import { useEffect, useState } from "react";
import { Card, Col, Row, Form, Button } from "antd";
import axios from "axios";

import LayoutOne from "/src/components/LayoutOne";
import FloatInput from "/src/pages/Profile/FloatInput";
import "./profile.scss";

const Profile = () => {
  const [user, setUser] = useState({ username: "", email: "" });
  useEffect(() => {
    const init = async () => {
      const res = await axios.get("user/user");
      console.log(res.data);
      setUser(res.data);
    };

    init();
  }, []);

  const onFinish = async (payload) => {
    try {
      await axios.post("user/updateUser", payload);
      console.log(payload);
    } catch (err) {
      // message.error(err);
      alert(err);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <LayoutOne>
      <div className="flex flex-row w-full">
        <div className="text-left w-2/6">
          <Card className="" title={`Hello, ${user.username}`} bordered={false}>
            <p>
              <div className="text-lg">Username</div>{" "}
              <span className="font-bold">{user.username}</span>
            </p>
            <p>
              <div className="text-lg">Email</div>{" "}
              <span className="font-bold">{user.email}</span>
            </p>
          </Card>
        </div>
        <div className="text-left w-5/12 ml-10">
          <Card title={`Update Profile Information`}>
            <Form
              name="edit-user"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              size="large"
              layout="vertical"
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Please enter a valid email!",
                  },
                ]}
              >
                <FloatInput
                  label="New email"
                  placeholder="New email here"
                  name="email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { min: 3, max: 20 },
                  {
                    pattern: "^[a-zA-Z0-9]+$",
                    message: "Only letters and numbers are allowed",
                  },
                ]}
              >
                <FloatInput
                  type="password"
                  label="New password"
                  placeholder="New password here"
                  name="password"
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
