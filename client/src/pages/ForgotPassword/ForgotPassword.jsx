import react from "react";
import { Form, Input, Button } from "antd";
import s from "./forgotpassword.module.css";
import axios from "axios";
const onFinish = ({ user }) => {
  axios.post("http://localhost:5001/forgot-password", user).then((res) => {
    console.log(res.data);
  });
};

const ForgotPassword = () => {
  return (
    <div className={s.forgot_password}>
      <Form name="nest-messages" onFinish={onFinish} className={s.form_forgot}>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[
            {
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="dashed" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default ForgotPassword;
