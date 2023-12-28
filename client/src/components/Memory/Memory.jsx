import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import s from "./memory.module.css";
import { Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { reverseDeleted } from "../../store/JournalSlice";
const Memory = ({ title, text, mmArr, id }) => {
  const deleted = useSelector((state) => state.auth.deleted);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  const axiosWithAuth = axios.create({
    headers: {
      Authorization: `${token}`,
    },
  });
  const removeMemory = async () => {
    try {
      await axiosWithAuth
        .delete(`https://personal-journal-server.onrender.com//delete/${id}`)
        .then((res) => {
          console.log(res.data.message);
        });
      dispatch(reverseDeleted());
    } catch (error) {
      console.log(`${error.message}`);
    }
  };

  return (
    <Link to={`/memories/${id}`} className={s.memory}>
      <div className={s.memory_top}>
        <h3 className={s.title}>{title}</h3>
        <Button type="primary" danger ghost onClick={() => removeMemory()}>
          <DeleteOutlined />
        </Button>
      </div>

      <Divider style={{ background: "black", margin: "5px 0" }} />
      <p className={s.description}>{text}</p>
    </Link>
  );
};

export default Memory;
