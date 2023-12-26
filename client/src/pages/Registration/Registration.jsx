import React, { useMemo, useState } from "react";
import s from "./registration.module.css";
import { AutoComplete, Button, Form, Input, Select, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { NavLink, json, useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
  const api = notification;
  const navigate = useNavigate();
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onSearch = (value) => console.log("search:", value);
  const [form] = Form.useForm();
  const openNotification = (message) => {
    api.open({
      message: `${message}`,
      duration: 3,
    });
  };
  const onFinish = async (values) => {
    console.log("Received values of form:");
    try {
      const { data } = await axios
        .post("http://localhost:5001/auth/registration", values)
        .then((res) => {
          console.log(res.data);
          openNotification(res.data.message);
          navigate("/auth/login");
        });
    } catch (error) {
      console.log(error.response.data.error);
      openNotification(error.response.data.error);
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
