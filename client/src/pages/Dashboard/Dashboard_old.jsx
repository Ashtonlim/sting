import { useState, useEffect } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Space, Table, Switch, Button, Input } from "antd";
import axios from "axios";

import TagGroup from "./TagGroup";

import LayoutOne from "/src/components/LayoutOne";

const onChange = (checked) => {
  console.log(`switch to ${checked}`);
  // do api call to change state
};

const columns = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Password",
    dataIndex: "password",
    key: "password",
    width: "20%",
    render: (text) => (
      <Input.Password
        value={text}
        placeholder="input password"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
      />
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "isActive",
    dataIndex: "isActive",
    key: "isActive",
    render: (bool) => <Switch onChange={onChange} />,
  },
  {
    title: "secGrp",
    key: "secGrp",
    dataIndex: "secGrp",
    render: (_, { secGrp }) => <TagGroup groups={secGrp.split(",") || []} />,
    width: "30%",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Edit {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const Dashboard = () => {
  const [users, setusers] = useState([]);
  useEffect(() => {
    // get user data

    const init = async () => {
      const { data } = await axios.get("/user/allUsers");
      console.log(data);
      setusers(data);
    };

    init();
  }, []);

  // const handleActiveSwitch = (checked) => {
  //   console.log('checked', checked)
  // }

  return (
    <LayoutOne>
      <Table columns={columns} dataSource={users} rowKey="username" />
    </LayoutOne>
  );
};

export default Dashboard;
