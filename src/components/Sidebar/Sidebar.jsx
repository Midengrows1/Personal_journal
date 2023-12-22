import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "antd";
import s from "./sidebar.module.css";
import clsx from "clsx";
import Memory from "../Memory";
import axios from "axios";
import { useState, useEffect } from "react";
const Sidebar = ({ displayMemory }) => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const [mmryArr, setmmryArr] = useState([]);
  const token = localStorage.getItem("userToken");
  const axiosWithAuth = axios.create({
    headers: {
      Authorization: `${token}`,
    },
  });
  const getMemories = async () => {
    try {
      const response = await axiosWithAuth.get("http://localhost:5001/");
      const resData = response.data.memory;
      setmmryArr(resData);
    } catch (error) {
      console.log(`Ошибка при получении данных${error.message}`);
    }
  };
  useEffect(() => {
    getMemories();
  }, []);
  useEffect(() => {}, [mmryArr]);
  const showMemory = () => {
    alert(123);
    // console.log(mmryArr);
    // displayMemory(mmryArr);
  };
  return (
    <div className={clsx(s.sidebar)}>
      <button
        className={clsx(s.btn_side, "font-FiraSans")}
        onClick={() => {
          navigate("/create");
        }}
      >
        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>Новое воспоминание
      </button>
      <div className={s.memory_container}>
        <div className={s.mmrySearch}>
          <Badge
            className="site-badge-count-109"
            count={show ? mmryArr.length : 0}
            style={{
              backgroundColor: "#52c41a",
            }}
          />
        </div>
        {mmryArr.map((i) => {
          return (
            <Memory
              mmArr={mmryArr}
              title={i.title}
              text={i.text}
              key={i._id}
              id={i._id}
            ></Memory>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
