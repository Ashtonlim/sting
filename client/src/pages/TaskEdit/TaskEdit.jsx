import axios from "axios";
import { useState, useEffect } from "react";
import LayoutOne from "/src/components/LayoutOne";
import { useParams } from "react-router-dom";

import { Button, Form, Input, DatePicker, Select, Col, Row } from "antd";

import * as dayjs from "dayjs";
dayjs().format();

const { RangePicker } = DatePicker;

const TaskEdit = () => {
  const [taskData, settaskData] = useState([]);
  const { taskId } = useParams();
  const [form] = Form.useForm();
  const [planOptions, setplanOptions] = useState(
    ["test1", "test2", "test3"].map(({ plan }) => ({
      label: plan,
      value: plan,
    }))
  );
  const [initFormVals, setinitFormVals] = useState({});

  useEffect(() => {
    const init = async () => {
      const { data } = await axios.get(`/apt/task/${taskId}`);
      settaskData(data);
    };
    init();
  }, []);

  const onFinish = async (values) => {};
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <LayoutOne>
      <div>TaskEdit</div>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Row>
          <Col className="mr-8 w-1/2">
            <Row>
              <Form.Item
                className="mr-8 w-2/5"
                label="Task Name"
                name="Task_name"
                rules={[
                  {
                    required: true,
                    message: "Please input the acronym for your App!",
                  },
                  { max: 20 },
                  {
                    pattern: "^[a-zA-Z0-9]+$",
                    message: "Only letters and numbers are allowed",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Start and End Date"
                name="seDate"
                rules={[{ required: true, message: "Dates are required" }]}
              >
                <RangePicker />
              </Form.Item>
            </Row>
            <Form.Item label="Application Description" name="App_Description">
              <Input.TextArea className="h-40" showCount />
            </Form.Item>
          </Col>
          <Form.Item label="Permit Todo" name="App_permit_toDoList">
            <Select
              placeholder="Give Todo Permission to Group"
              onChange={handleChange}
              options={planOptions}
            />
          </Form.Item>
        </Row>
        <Form.Item>
          <Button className="float-right" type="primary" htmlType="submit">
            Create Task
          </Button>
        </Form.Item>
      </Form>
    </LayoutOne>
  );
};

export default TaskEdit;
