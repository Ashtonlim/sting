import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Input, DatePicker, Select, Col, Row } from "antd";

import LayoutOne from "/src/components/LayoutOne";

import * as dayjs from "dayjs";
dayjs().format();

const { RangePicker } = DatePicker;

const AppCreate = () => {
  const [permitOptions, setpermitOptions] = useState([]);
  const [form] = Form.useForm();
  const now = dayjs();
  console.log(now.format("YYYY-MM-DD"));

  useEffect(() => {
    const init = async () => {
      const { data } = await axios.get("group/allGroups");
      if (data) {
        console.log(data);
        const groupnameList = data?.map(({ groupname }) => ({
          label: groupname,
          value: groupname,
        }));

        setpermitOptions(groupnameList);
      }
    };
    init();
  }, []);
  const onFinish = async (values) => {
    // console.log(values);
    const App_startDate = dayjs(values.seDate[0]["$d"]).format("YYYY-MM-DD");
    const App_endDate = dayjs(values.seDate[1]["$d"]).format("YYYY-MM-DD");
    delete values["seDate"];

    const res = await axios.post("/apt/createApp", {
      ...values,
      App_startDate,
      App_endDate,
    });
    console.log(res);
    console.log("Success:", values);
    console.log("start and end:", App_startDate, App_endDate);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <LayoutOne>
      <h2>Create A New Application</h2>
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
                label="Application Acronym"
                name="App_Acronym"
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
          <Col flex={2} className="mr-8">
            <Form.Item label="Permit Create" name="App_permit_create">
              <Select
                placeholder="Give Create Permission to Group"
                onChange={handleChange}
                options={permitOptions}
              />
            </Form.Item>
            <Form.Item label="Permit Open" name="App_permit_Open">
              <Select
                placeholder="Give Open Permission to Group"
                onChange={handleChange}
                options={permitOptions}
              />
            </Form.Item>
            <Form.Item label="Permit Todo" name="App_permit_toDoList">
              <Select
                placeholder="Give Todo Permission to Group"
                onChange={handleChange}
                options={permitOptions}
              />
            </Form.Item>
          </Col>
          <Col flex={2}>
            <Form.Item label="Permit Doing" name="App_permit_Doing">
              <Select
                placeholder="Give Doing Permission to Group"
                onChange={handleChange}
                options={permitOptions}
              />
            </Form.Item>
            <Form.Item label="Permit Done" name="App_permit_Done">
              <Select
                placeholder="Give Done Permission to Group"
                onChange={handleChange}
                options={permitOptions}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button className="float-right" type="primary" htmlType="submit">
            Create Application
          </Button>
        </Form.Item>
      </Form>
    </LayoutOne>
  );
};

export default AppCreate;
