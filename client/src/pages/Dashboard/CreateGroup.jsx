import axios from "axios";
import { Button, Form, Input } from "antd";

const CreateGroup = () => {
  const onFinish = async ({ groupname }) => {
    console.log("Success:", groupname);
    // const res = await axios.post("auth/register", {
    //   groupname,
    // });
    // console.log(res);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="inline"
    >
      <Form.Item
        label="Group Name"
        name="groupname"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create group
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateGroup;
