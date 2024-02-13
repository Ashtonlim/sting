import axios from "axios";
import { Button, Form, Input } from "antd";

const CreateGroupForm = () => {
  const onFinish = async ({ groupname }) => {
    const res = await axios.post("group/createGroup", { groupname });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
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

        <Form.Item className="flex items-end justify-center ">
          <Button className="w-28" type="primary" htmlType="submit">
            Create group
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateGroupForm;
