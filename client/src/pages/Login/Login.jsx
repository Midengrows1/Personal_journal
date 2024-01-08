import react from "react";
import { useState, useEffect } from "react";
import s from "./login.module.css";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, Checkbox, notification, message } from "antd";
import { authUser } from "../../store/JournalSlice";
import { Link } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const api = notification;
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
  const openNotification = (message) => {
    api.open({
      message: `${message}`,
      duration: 3,
    });
  };
  const inputsArr = ["username", "password"];
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const FormData = async (e) => {
    e.preventDefault();
    console.log(formData);
    await axios
      .post(baseUrl + "/auth/login", formData)
      .then((res) => {
        localStorage.setItem("userToken", res.data.token);
        dispatch(authUser(res.data.token));
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.message);
        openNotification(err.response.data.error);
      });
    console.log(import.meta.env.VITE_BASE_URL);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getLS = localStorage.getItem("userToken");
  useEffect(() => {
    if (getLS) {
      dispatch(authUser(getLS));
      navigate("/home");
    }
  }, []);
  return (
    <div className={s.login}>
      <form className={s.login_form} onSubmit={FormData}>
        <motion.h1
          className={s.login_title}
          initial={"hidden"}
          animate={"visible"}
          transition={{
            delay: 0.1,
          }}
          variants={h1Variants}
        >
          Login
        </motion.h1>
        <AnimatePresence>
          <motion.input
            key={1}
            type="text"
            className={s.input_form}
            placeholder="Username"
            name="username"
            value={formData.login}
            onChange={handleChange}
            initial={"hidden"}
            animate={"visible"}
            variants={inpVariants}
            transition={{ delay: 0.4 }}
          />
          <motion.input
            key={2}
            type="password"
            name="password"
            className={s.input_form}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            initial={"hidden"}
            animate={"visible"}
            variants={inpVariants}
            transition={{ delay: 0.5 }}
          />
          <motion.div
            className={s.btn_form}
            key={3}
            initial={"hidden"}
            animate={"visible"}
            variants={inpVariants}
          >
            <motion.button type="submit">Login</motion.button>
            <Link to={"/forgot-password"} className={s.forgot_pass}>
              forgot password
            </Link>
          </motion.div>
        </AnimatePresence>
      </form>
    </div>
  );
};
export default Login;
