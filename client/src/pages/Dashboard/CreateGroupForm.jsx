import axios from "axios";
import { Button, Form, Input } from "antd";

const CreateGroupForm = () => {
  const onFinish = async ({ groupname }) => {
    console.log("Success:", groupname);
    const res = await axios.post("group/createGroup", { groupname });
    console.log(groupname, res);
  };

  console.log("CreateGroupForm - am i rerendering?");

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="createGroup"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="inline"
    >
      <Form.Item
        label="Group Name"
        name="groupname"
        rules={[
          {
            required: true,
            message: "Group requires a name",
          },
          {
            pattern: "^[a-zA-Z0-9]+$",
            message: "Only letters and numbers are allowed",
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

export default CreateGroupForm;
