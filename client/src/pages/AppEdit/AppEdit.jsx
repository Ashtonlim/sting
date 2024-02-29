import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Input, DatePicker, Select, Col, Row } from "antd";
import { useParams } from "react-router-dom";

import LayoutOne from "/src/components/LayoutOne";
import Spinner from "/src/components/LayoutOne";

import * as dayjs from "dayjs";
dayjs().format();

const { RangePicker } = DatePicker;

const AppEdit = () => {
  const [permitOptions, setpermitOptions] = useState([]);
  const [initFormVals, setinitFormVals] = useState({});
  const [form] = Form.useForm();
  const { appName } = useParams();
  const now = dayjs();
  console.log(now.format("YYYY-MM-DD"));
  const dateFormat = "DD/MM/YYYY";
  useEffect(() => {
    console.log(appName);
    const init = async () => {
      try {
        const groupData = await axios.get("group/allGroups");
        if (groupData) {
          console.log(groupData);
          const groupnameList = groupData?.data?.map(({ groupname }) => ({
            label: groupname,
            value: groupname,
          }));

          setpermitOptions(groupnameList);
        }

        const appData = await axios.get(`apt/app/${appName}`);

        if (appData) {
          appData.data.seDate = [
            dayjs(appData.data.App_startDate),
            dayjs(appData.data.App_endDate),
          ];

          setinitFormVals({ ...appData.data });
        }
      } catch (err) {
        console.log(err);
      }
    };
    init();
  }, []);
  const onFinish = async (values) => {
    const App_startDate = dayjs(values.seDate[0]["$d"]).format("YYYY-MM-DD");
    const App_endDate = dayjs(values.seDate[1]["$d"]).format("YYYY-MM-DD");
    delete values["seDate"];

    const res = await axios.post(`/apt/editApp/${appName}`, {
      ...values,
      App_startDate,
      App_endDate,
    });
    console.log(res);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      {Object.keys(initFormVals).length === 0 &&
      initFormVals.constructor === Object ? (
        <Spinner />
      ) : (
        <LayoutOne>
          <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={initFormVals}
          >
            {/* {console.log(initFormVals)} */}
            <h1>{appName || "App Name Missing"}</h1>
            <Row>
              <Col flex={3} className="mr-10">
                <Form.Item
                  label="Application Description"
                  name="App_Description"
                >
                  <Input.TextArea showCount />
                </Form.Item>

                <Form.Item
                  label="Start and End Date"
                  name="seDate"
                  rules={[{ required: true, message: "Dates are required" }]}
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
                Edit
              </Button>
            </Form.Item>
          </Form>
        </LayoutOne>
      )}
    </>
  );
};

export default AppEdit;
