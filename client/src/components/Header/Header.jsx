// import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Button, Tooltip, ConfigProvider } from "antd";
import s from "./header.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "../../store/JournalSlice";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
const Header = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const signOutBtn = () => {
    dispatch(signOut());
    navigate("/");
  };
  const getUserData = async () => {
    const token = localStorage.getItem("userToken");
    const axiosWithAuth = axios.create({
      headers: {
        Authorization: `${token}`,
      },
    });
    await axiosWithAuth
      .get("https://personal-journal-server.onrender.com/api/userInfo")
      .then((res) => {
        console.log(res.data.email);
        setEmail(res.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useMemo(() => {
    getUserData();
  }, []);

  return (
    <div className={s.app_top}>
      <Link to="/home">
        <h1 className="font-Smooch">Personal Journal</h1>
      </Link>
      <div className={s.account_container}>
        <div className={s.account}>
          <a href="#">{email}</a>
          <Avatar size={"large"} icon={<UserOutlined />} />
        </div>
        <div className={s.authorization}>
          <Tooltip placement="bottomLeft" title={"Sign out"}>
            <Button type="primary" danger onClick={() => signOutBtn()}>
              <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Header;
