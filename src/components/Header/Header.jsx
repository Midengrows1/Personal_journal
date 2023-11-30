import React from "react";
import { Avatar } from "antd";
import clsx from "clsx";
const Header = () => {
  return (
    <div className={clsx(s.app_top, "Smooch")}>
      <h1 className="font-Smooch">Personal Journal</h1>
    </div>
  );
};

export default Header;
