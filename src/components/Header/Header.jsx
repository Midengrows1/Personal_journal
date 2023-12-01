// import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";
import s from "./header.module.css";
// import clsx from "clsx";
const Header = () => {
  return (
    <div className={s.app_top}>
      <h1 className="font-Smooch">Personal Journal</h1>
      <div className={s.account_container}>
        <div className={s.account}>
          <a href="#">amirhello@gmail.com</a>
          <Avatar size={"large"} icon={<UserOutlined />} />
        </div>
        <Button type="primary" danger>
          <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>
        </Button>
      </div>
    </div>
  );
};

export default Header;
