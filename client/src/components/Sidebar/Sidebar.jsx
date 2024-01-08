import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Badge, Input, Space } from "antd";
const { Search } = Input;
import s from "./sidebar.module.css";
import clsx from "clsx";
import Memory from "../Memory";
import axios from "axios";
import { useState, useEffect } from "react";
const Sidebar = ({ dataArr }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [searchArr, setsearchArr] = useState(dataArr);
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const onSearch = async (value, _e, info) => {
    const token = localStorage.getItem("userToken");
    // --------Добавляем в headers token-----
    const axiosWithAuth = axios.create({
      headers: {
        Authorization: `${token}`,
      },
    });
    const response = await axiosWithAuth.get(
      `${baseUrl}/memories?searchTerm=${value}`
    );
    if (searchArr.length == 0) {
      setsearchArr(dataArr);
    } else {
      setsearchArr(response.data);
    }
    console.log(response);
  };
  useEffect(() => {
    setsearchArr(dataArr);
  }, [dataArr]);
  console.log(searchArr);
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
      <Search
        placeholder="input search text"
        allowClear
        onSearch={onSearch}
        className={s.search_mmry}
        size="large"
      />
      <div className={s.memory_container}>
        <div className={s.mmrySearch}>
          <Badge
            className="site-badge-count-109"
            count={show ? dataArr.length : 0}
            style={{
              backgroundColor: "#4044ED",
            }}
          />
        </div>
        {searchArr.map((i) => {
          return (
            <Memory
              mmArr={dataArr}
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
