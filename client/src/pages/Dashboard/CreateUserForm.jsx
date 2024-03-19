import axios from "axios";
import { Button, Form, Input, Select, message, Card } from "antd";

const CreateUserForm = ({ options, setdata }) => {
  const [form] = Form.useForm();

  const onFinish = async (credentials) => {
    try {
      const res = await axios.post("auth/register", credentials);
      if (res.status >= 200 && res.status < 300) {
        message.success(`User '${credentials.username}' created successfully`);
      }
      const { data } = await axios.get("/user/allUsers");
      setdata(
        data.map((user) => ({
          ...user,
          secGrp: user.secGrp?.split(","),
        }))
      );
      form.resetFields();
    } catch (err) {
      console.log(err);
      message.error(err.response.data);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
  };

  return (
    <Card title="Create a new user" size="small" className="w-full my-3">
      <Form
        form={form}
        // wrapperCol={{ span: 24 }}
        // style={{ width: "100%", marginRight: 0 }}
        name="createUser"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="flex flex-row">
          <div className="mr-3">
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
                { min: 3, max: 20 },
                {
                  pattern: "^[a-zA-Z0-9]+$",
                  message: "Only letters and numbers are allowed",
                },
              ]}
            >
              <Input placeholder="Dev01" />
            </Form.Item>
          </div>

          <div className="mr-3">
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },

                // { min: 8, max: 10 },
                // {
                //   pattern: "^(?=.*[a-zA-Z]).+$",
                //   message: "must have 1 alphabet",
                // },
                // {
                //   pattern: "\\d",
                //   message: "must have 1 number",
                // },
                // {
                //   pattern: "^(?=.*[^a-zA-Z0-9]).+$",
                //   message: "must have 1 special character",
                // },
              ]}
            >
              <Input.Password placeholder="A secure password" />
            </Form.Item>
          </div>

          <div className="mr-3">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid email!",
                },
              ]}
            >
              <Input placeholder="admin@st.com" />
            </Form.Item>
          </div>

          <div>
            <Form.Item label="Groups" name="groups">
              <Select
                style={{ minWidth: "200px" }}
                mode="multiple"
                placeholder="Please select"
                options={options}
              />
            </Form.Item>
          </div>
        </div>
        <div className="floar-right my-5">
          <Form.Item>
            <Button className="w-28" type="primary" htmlType="submit">
              Create User
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
};

export default CreateUserForm;
