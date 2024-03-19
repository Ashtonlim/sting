import axios from "axios";
import { Button, Form, Input, Card, message } from "antd";

const CreateGroupForm = ({ setoptions }) => {
  const [form] = Form.useForm();
  const onFinish = async ({ groupname }) => {
    try {
      const res = await axios.post("group/createGroup", { groupname });
      if (res.status >= 200 && res.status < 300) {
        message.success(`Group '${groupname}' created successfully`);
      }

      const groupnameList = (await axios.get("group/allGroups")).data.map(
        ({ groupname }) => ({
          label: groupname,
          value: groupname,
        })
      );

      setoptions(groupnameList);
      form.resetFields();
    } catch (err) {
      console.log(err);
      if (err.response.data) {
        message.error(err.response.data);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card title="Create a new group" size="small" className="w-1/3 my-3 mr-5">
      <Form
        form={form}
        name="createGroup"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div>
          <Form.Item
            style={{ width: "100%", display: "block" }}
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
        </div>
        <div className="mt-3">
          <Form.Item className="float-right block">
            <Button className="w-28" type="primary" htmlType="submit">
              Create group
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
};

export default CreateGroupForm;
