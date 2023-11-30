import React from "react";
import clsx from "clsx";
import s from "./main.module.css";
const Main = () => {
  return (
    <div className={clsx(s.main, "font-FiraSans")}>
      <h2 className={s.main_title}>Hello</h2>
    </div>
  );
};

export default Main;
