import axios from "axios";
import { Button, Form, Input, Card } from "antd";

const CreateGroupForm = () => {
  const onFinish = async ({ groupname }) => {
    const res = await axios.post("group/createGroup", { groupname });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card title="Create a new group" size="small" className="w-1/3 my-3 mr-5">
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
          <Input placeholder="admin" />
        </Form.Item>

        <Form.Item className="flex items-end justify-center ">
          <Button className="w-28" type="primary" htmlType="submit">
            Create group
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateGroupForm;
