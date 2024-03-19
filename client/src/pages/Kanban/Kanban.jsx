import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Row, Modal, Form, Input, DatePicker, Table } from "antd";
import { Link } from "react-router-dom";
import LayoutOne from "/src/components/LayoutOne";

import * as dayjs from "dayjs";
dayjs().format();

const { RangePicker } = DatePicker;

const taskStates = ["Open", "Todo", "Doing", "Done", "Closed"];

const Kanban = () => {
  const [open, setOpen] = useState(false);
  const [appData, setappData] = useState([]);
  const [form] = Form.useForm();
  const { appName } = useParams();
  const now = dayjs();

  useEffect(() => {
    const init = async () => {
      const { data } = await axios.get("/apt/allPlans");
      console.log(data);
      setappData(data);
    };
    init();
  }, []);

  const onFinish = async (values) => {
    console.log("Success:", values);
    const Plan_startDate = dayjs(values.seDate[0]["$d"]).format("YYYY-MM-DD");
    const Plan_endDate = dayjs(values.seDate[1]["$d"]).format("YYYY-MM-DD");
    delete values["seDate"];

    const res = await axios.post("/apt/createApp", {
      ...values,
      Plan_startDate,
      Plan_endDate,
      Plan_app_Acronym: appName,
    });
    console.log(res);
    console.log("Success:", values);
    // console.log("start and end:", Plan_startDate, Plan_endDate);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <LayoutOne width={24}>
      <div className="px-4">
        <Modal
          title="Plans"
          centered
          open={open}
          onOk={() => setOpen(false)}
          width={1000}
        >
          <Form
            className="my-4"
            form={form}
            name="createPlan"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="inline"
          >
            <Form.Item
              label="MVP name"
              name="Plan_MVP_name"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
                { max: 20 },
                {
                  pattern: "^[a-zA-Z0-9]+$",
                  message: "Only letters and numbers are allowed",
                },
              ]}
            >
              <Input placeholder="Dev01" />
            </Form.Item>

            <Form.Item
              label="Start and End Date"
              name="seDate"
              rules={[{ required: true, message: "Dates are required" }]}
            >
              <RangePicker />
            </Form.Item>

            <Form.Item>
              <Button className="w-28" type="primary" htmlType="submit">
                Create Plan
              </Button>
            </Form.Item>
          </Form>

          <Table columns={columns} dataSource={appData} />
        </Modal>
        <div className="mb-2 flex flex-row justify-between w-full">
          <span className="font-bold text-xl">
            {appName || "Missing App Name"}
          </span>
          <div>
            <Button
              onClick={() => setOpen(true)}
              type="primary"
              className="mr-2"
            >
              View Plans
            </Button>

            <Button type="primary" style={{ background: "green" }} className="">
              Create Task
            </Button>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          {taskStates.map((stateName) => (
            <div
              key={stateName}
              // className={`w-1/${taskStates.length}`}
              style={{ width: "19%" }}
            >
              <span className="">{stateName}</span>
              <div
                style={{ minHeight: "300px" }}
                className={`my-2 block max-w-sm p-6 bg-slate-100 border border-gray-200 rounded-lg shadow hover:bg-slate-200 `}
              >
                tasks
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutOne>
  );
};

const columns = [
  {
    title: "App Acronym (View Kanban)",
    dataIndex: "App_Acronym",
    key: "App_Acronym",
    render: (text) => text,
  },
  {
    title: "Start Date",
    dataIndex: "App_startDate",
    key: "App_startDate",
    render: (date) => dayjs(date).format("YYYY-MM-DD"),
  },
  {
    title: "End Date",
    dataIndex: "App_endDate",
    key: "App_endDate",
    render: (date) => dayjs(date).format("YYYY-MM-DD"),
  },
  {
    title: "Edit",
    dataIndex: "operation",
    render: (_, record) => (
      <Link to={`/edit-application/${record.App_Acronym}`}>
        <Button>View / Edit</Button>
      </Link>
    ),
  },
];

export default Kanban;
