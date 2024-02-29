import { Button, Form, Input, DatePicker, Select, Col, Row, App } from "antd";
import LayoutOne from "/src/components/LayoutOne";
import * as dayjs from "dayjs";
import { useEffect, useState } from "react";
import axios from "axios";
dayjs().format();

const { RangePicker } = DatePicker;

const CreateApplication = () => {
  const [permitOptions, setpermitOptions] = useState([]);
  const [form] = Form.useForm();
  var now = dayjs();
  console.log(now.format("YYYY-MM-DD"));

  useEffect(() => {
    const init = async () => {
      const groupnameList = (await axios.get("group/allGroups")).data.map(
        ({ groupname }) => ({
          label: groupname,
          value: groupname,
        })
      );

      setpermitOptions(groupnameList);
    };
    init();
  }, []);
  const onFinish = async (values) => {
    const App_startDate = dayjs(values.seDate[0]["$d"]).format("YYYY-MM-DD");
    const App_endDate = dayjs(values.seDate[1]["$d"]).format("YYYY-MM-DD");
    delete values["seDate"];

    const res = await axios.post("/application/create", {
      ...values,
      App_startDate,
      App_endDate,
    });
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
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row>
          <Col flex={3} className="mr-10">
            <Form.Item
              label="Application Acronym"
              name="App_Acronym"
              rules={[
                {
                  required: true,
                  message: "Please input the acronym for your App!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Application Description" name="App_Description">
              <Input.TextArea showCount />
            </Form.Item>

            <Form.Item
              label="Start and End Date"
              name="seDate"
              //   rules={[{ required: true, message: "Please input!" }]}
            >
              <RangePicker />
            </Form.Item>
          </Col>
          <Col flex={2}>
            <Form.Item label="Permit Create" name="App_permit_create">
              <Select
                placeholder="Search to Select"
                onChange={handleChange}
                options={permitOptions}
              />
            </Form.Item>
            <Form.Item label="Permit Open" name="App_permit_Open">
              <Select
                placeholder="Search to Select"
                onChange={handleChange}
                options={permitOptions}
              />
            </Form.Item>
            <Form.Item label="Permit Todo" name="App_permit_toDoList">
              <Select
                placeholder="Search to Select"
                onChange={handleChange}
                options={permitOptions}
              />
            </Form.Item>
            <Form.Item label="Permit Doing" name="App_permit_Doing">
              <Select
                placeholder="Search to Select"
                onChange={handleChange}
                options={permitOptions}
              />
            </Form.Item>
            <Form.Item label="Permit Done" name="App_permit_Done">
              <Select
                placeholder="Search to Select"
                onChange={handleChange}
                options={permitOptions}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </LayoutOne>
  );
};

export default CreateApplication;
