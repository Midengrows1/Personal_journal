import react from "react";
import { useState, useEffect } from "react";
import s from "./login.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Checkbox } from "antd";
import { authUser } from "../../store/JournalSlice";
import axios from "axios";
const Login = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  useEffect(() => {
    setClientReady(true);
  }, []);
  const onFinish = async (values) => {
    console.log("Finish:", values);
    try {
      axios.post(`http://localhost:5001/auth/login`, values).then((res) => {
        console.log(res.data);
        localStorage.setItem("userToken", res.data.token);
        dispatch(authUser(res.data.token));
        navigate("/");
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getLS = localStorage.getItem("userToken");
  useEffect(() => {
    if (getLS) {
      dispatch(authUser(getLS));
      navigate("/");
    }
  }, []);
  return (
    <div className={s.login}>
      <Form
        form={form}
        name="horizontal_login"
        layout="inline"
        onFinish={onFinish}
        className={s.login_form}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="E-mail"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !clientReady ||
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Log in
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
