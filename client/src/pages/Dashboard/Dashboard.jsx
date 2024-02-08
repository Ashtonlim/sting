import { useState, useEffect } from "react";
import { Table, Switch, Input, Form, Select, Typography, message } from "antd";
import axios from "axios";

import TagGroup from "./TagGroup";

import CreateUserForm from "./CreateUserForm";
import LayoutOne from "/src/components/LayoutOne";

import "./dashboard.scss";
import CreateGroupForm from "./CreateGroupForm";

const Dashboard = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [options, setoptions] = useState([]);

  // console.log("dashboard - am i rerendering?");

  useEffect(() => {
    // get user data

    const init = async () => {
      const { data } = await axios.get("/user/allUsers");

      setData(
        data.map((user) => ({
          ...user,
          secGrp: user.secGrp?.split(","),
        }))
      );

      const groupnameList = (await axios.get("group/allGroups")).data.map(
        ({ groupname }) => ({
          label: groupname,
          value: groupname,
        })
      );

      console.log(groupnameList, "groupnameList");
      setoptions(groupnameList);
    };

    init();
  }, []);

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    // console.log(dataIndex, title, inputType);

    const inputMap = {
      password: {
        component: <Input.Password placeholder="input new password" />,
        rules: [
          { min: 3, max: 20 },
          {
            pattern: "^[a-zA-Z0-9]+$",
            message: "Only letters and numbers are allowed",
          },
        ],
      },
      email: {
        component: <Input />,
        rules: [
          {
            type: "email",
            message: "Please input a valid email!",
          },
        ],
      },
      isActive: {
        component: <Switch />,
        rules: [],
      },

      secGrp: {
        component: (
          <Select
            mode="multiple"
            placeholder="Please select"
            options={options}
          />
        ),
        rules: [],
      },
    };

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item name={dataIndex} rules={inputMap[dataIndex]["rules"]}>
            {inputMap[dataIndex]["component"]}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const isEditing = (record) => record.username === editingKey;
  const edit = (record) => {
    // set inital values in input after on click edit
    form.setFieldsValue({ ...record });
    setEditingKey(record.username);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = { ...(await form.validateFields()), username: key };

      const newData = [...data];
      console.log("row", row);
      if (key === "admin" && !row.secGrp.includes("admin")) {
        message.error(
          `User 'admin' can only change password and add or remove itself all groups except 'admin' group.`
        );
        setEditingKey("");
        return;
      }

      const index = newData.findIndex((item) => key === item.username);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });

        const res = await axios.post("/user/admin/updateUser", row);
        console.log("res from save", res);
        setData(newData);
      } else {
        newData.push(row);
      }
      setData(newData);
      setEditingKey("");
    } catch (errInfo) {
      message.error(errInfo.response.data);
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Password",
      dataIndex: "password",
      render: (_, { password }) => "********",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      editable: true,
    },
    {
      title: "secGrp",
      key: "secGrp",
      dataIndex: "secGrp",
      render: (_, { secGrp }) => <TagGroup groups={secGrp} />,
      editable: true,
    },
    {
      title: "Active Status",
      width: "10%",
      dataIndex: "isActive",
      render: (isActive) => <Switch value={isActive} />,
      editable: true,
    },
    {
      title: "Edit",
      dataIndex: "operation",
      width: "14%",
      render: (_, record) => {
        const editable = isEditing(record);
        // console.log("what is editable", editable);
        return editable ? (
          <span>
            <Typography.Link
              className="mr-3"
              onClick={() => save(record.username)}
            >
              Save
            </Typography.Link>
            <a onClick={cancel}>Cancel</a>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <LayoutOne>
      <CreateGroupForm />
      <CreateUserForm />
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
          rowKey="username"
        />
      </Form>
      {/* <Table columns={columns} dataSource={users} rowKey="username" /> */}
    </LayoutOne>
  );
};

export default Dashboard;
