import React, { useMemo, useState } from "react";
import s from "./registration.module.css";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { AutoComplete, Button, Form, Input, Select, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { NavLink, json, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
const Registration = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    username: "",
  });
  const h1Variants = {
    hidden: {
      y: -50,
      opacity: 0,
    },
    visible: { y: 0, opacity: 1 },
  };
  const inpVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };
  const baseUrl = import.meta.env.VITE_BASE_URL;
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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onFinish = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const { data } = await axios
        .post(baseUrl + "/auth/registration", formData)
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
      <h1 className={s.form_registration_title}>Registration</h1>
      <form onSubmit={onFinish} className={s.form_registration}>
        <AnimatePresence>
          <motion.input
            key={1}
            type="email"
            placeholder="E-mail"
            name="email"
            onChange={handleChange}
            initial={"hidden"}
            animate={"visible"}
            variants={inpVariants}
            transition={{ delay: 0.2 }}
          />
          <motion.input
            key={2}
            type="text"
            placeholder="Firstname"
            name="firstname"
            onChange={handleChange}
            initial={"hidden"}
            animate={"visible"}
            variants={inpVariants}
            transition={{ delay: 0.3 }}
          />
          <motion.input
            key={3}
            type="text"
            placeholder="Lastname"
            name="lastname"
            onChange={handleChange}
            initial={"hidden"}
            animate={"visible"}
            variants={inpVariants}
            transition={{ delay: 0.4 }}
          />
          <motion.input
            key={4}
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            initial={"hidden"}
            animate={"visible"}
            variants={inpVariants}
            transition={{ delay: 0.5 }}
          />
          <motion.input
            key={5}
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            initial={"hidden"}
            animate={"visible"}
            variants={inpVariants}
            transition={{ delay: 0.6 }}
          />
          <motion.button
            key={6}
            initial={"hidden"}
            animate={"visible"}
            variants={inpVariants}
            type="submit"
          >
            Register
          </motion.button>
        </AnimatePresence>
      </form>
    </div>
  );
};
export default Registration;
