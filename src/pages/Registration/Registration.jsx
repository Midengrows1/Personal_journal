import React, { useState } from "react";
import s from "./registration.module.css";
import { AutoComplete, Button, Form, Input, Select } from "antd";
import { NavLink, json, useNavigate } from "react-router-dom";
import ajax from "ajax";
import axios from "axios";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const Registration = () => {
  const navigate = useNavigate();
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onSearch = (value) => console.log("search:", value);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log("Received values of form:");
    try {
      const { data } = await axios
        .post("http://localhost:5001/auth/registration", values)
        .then((res) => {
          console.log(res.data);
          navigate("/auth/login");
        });
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className={s.registration}>
      <Form
        className={s.registration_form}
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="firstname"
          label="Firstname"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="Lastname"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="default"
            htmlType="submit"
            className={s.registration_btn}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Registration;
