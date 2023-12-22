import clsx from "clsx";
import s from "./main.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const Main = ({ match }) => {
  const dispatch = useDispatch();
  const { memoryId } = useParams();
  const stateDeleted = useSelector((state) => state.auth.deleted);
  // const stateMem = useSelector((state) => state.auth.mainMemory);
  const [mmryData, setmmryData] = useState([]);
  const [mmryObject, setmmryObject] = useState({});
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
      setmmryData(resData);
      setmmryObject(resData[resData.length - 1]);
    } catch (error) {
      console.log(`Ошибка при получении данных${error.message}`);
    }
  };
  useEffect(() => {
    getMemories();
  }, []);
  useEffect(() => {
    mmryData.forEach((item) => {
      if (item._id == memoryId) {
        setmmryObject(item);
      }
    });
    console.log(mmryData);
  }, [memoryId]);

  try {
    const { title, text, activity, date, image } = mmryObject;
    return (
      <div className={clsx(s.main, "font-FiraSans")}>
        <h2 className={s.main_title}>{title}</h2>
        <div className={s.main_description}>
          <div className={s.main_description_top}>
            <div className={s.main_date_top}>
              <FontAwesomeIcon
                icon={faCalendarDays}
                size="xl"
              ></FontAwesomeIcon>
              <span>Дата</span>
            </div>
            <div className={s.main_date_bottom}>
              <p>{date}</p>
            </div>
            <div className={s.main_tag_top}>
              <FontAwesomeIcon icon={faFolder} size="xl"></FontAwesomeIcon>
              <span>Метка</span>
            </div>
            <div className={s.main_tag_bottom}>
              <p>
                {activity.length > 1
                  ? activity.map((i) => {
                      return `#${i} `;
                    })
                  : activity[0]}
              </p>
            </div>
          </div>
          <div className={s.main_description_bottom}>
            <p>{text}</p>
            <div className={s.main_description_bottom_img}>
              <img src={`http://localhost:5001/${image}`} alt="image" />
            </div>
            {/* <div className={s.main_description_bottom_video}>
            <img src="" alt="" />
          </div> */}
          </div>
        </div>
        <div></div>
      </div>
    );
  } catch (error) {
    console.log(`ошибка при получении данных ${error.message}`);
  }
};

export default Main;
