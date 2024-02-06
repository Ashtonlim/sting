import { useState, useEffect } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
  Space,
  Table,
  Switch,
  Button,
  Input,
  Form,
  InputNumber,
  Popconfirm,
  Typography,
} from "antd";
import axios from "axios";

import TagGroup from "./TagGroup";

import CreateUserForm from "./CreateUserForm";
import LayoutOne from "/src/components/LayoutOne";

import "./dashboard.scss";
import CreateGroup from "./CreateGroup";

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
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Dashboard = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    // get user data

    const init = async () => {
      const { data } = await axios.get("/user/allUsers");
      console.log(data);
      setData(data);
    };

    init();
  }, []);

  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    console.log("what is record", record);
    form.setFieldsValue({
      username: "",
      password: "",
      email: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      console.log("what is row", row);
      const newData = [...data];
      console.log("what is newData", newData);

      // findIndex returns index of first instance passing testing fn.
      // if no element passes, returns -1
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        //
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      width: "25%",
      editable: true,
    },
    {
      title: "Password",
      dataIndex: "password",
      width: "15%",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
      editable: true,
    },
    {
      title: "secGrp",
      key: "secGrp",
      dataIndex: "secGrp",
      editable: true,
      render: (_, { secGrp }) => <TagGroup groups={secGrp?.split(",")} />,
      width: "30%",
    },
    {
      title: "Active Status",
      dataIndex: "isActive",
      width: "20%",
      editable: true,
      render: (bool) => <Switch />,
    },
    {
      title: "Edit",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        console.log("what is editable", editable);
        return editable ? (
          <span>
            <Typography.Link
              className="block mr-3"
              onClick={() => save(record.key)}
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
    console.log(col);
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "username" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <LayoutOne>
      <CreateGroup />
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

// const columns = [
//   {
//     title: "Username",
//     dataIndex: "username",
//     key: "username",
//     render: (text) => <a>{text}</a>,
//   },
//   {
//     title: "Password",
//     dataIndex: "password",
//     key: "password",
//     width: "20%",
//     render: (text) => (
//       <Input.Password
//         value={text}
//         placeholder="input password"
//         iconRender={(visible) =>
//           visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
//         }
//       />
//     ),
//   },
//   {
//     title: "Email",
//     dataIndex: "email",
//     key: "email",
//   },
//   {
//     title: "isActive",
//     dataIndex: "isActive",
//     key: "isActive",
//     render: (bool) => <Switch onChange={onChange} />,
//   },
//   {
//     title: "secGrp",
//     key: "secGrp",
//     dataIndex: "secGrp",
//     render: (_, { secGrp }) => <TagGroup groups={secGrp.split(",") || []} />,
//     width: "30%",
//   },
//   {
//     title: "Action",
//     key: "action",
//     render: (_, record) => (
//       <Space size="middle">
//         <a>Edit {record.name}</a>
//         <a>Delete</a>
//       </Space>
//     ),
//   },
// ];
