import React from "react";
import s from "./memory.module.css";
import { Divider } from "antd";
const Memory = () => {
  return (
    <div className={s.memory}>
      <h3 className={s.title}>Hello</h3>
      <Divider style={{ background: "white", margin: "5px 0" }} />
      <p className={s.description}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
        corporis velit maxime deleniti quos eum, earum, cumque eaque magni
        beatae deserunt dolor libero tempora vitae, ipsam error incidunt! Enim,
        odio.
      </p>
    </div>
  );
};

export default Memory;
