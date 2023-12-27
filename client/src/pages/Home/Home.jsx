import s from "./home.module.css";
import { Main, Sidebar } from "../../components";
import { Header } from "../../components";
import { useState, useEffect, useMemo } from "react";
import Login from "../Login";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
function App({}) {
  const dispatch = useDispatch();
  const { memoryId } = useParams();
  const stateDeleted = useSelector((state) => state.auth.deleted);
  const [mmryData, setmmryData] = useState([]);
  const [mmryObject, setmmryObject] = useState({});
  // -----------------Делаем запрос на сервер----------
  const token = localStorage.getItem("userToken");
  // --------Добавляем в headers token-----
  const axiosWithAuth = axios.create({
    headers: {
      Authorization: `${token}`,
    },
  });
  const getMemories = async () => {
    try {
      const response = await axiosWithAuth.get("http://localhost:5001/home");
      const resData = response.data.memory;
      setmmryData(resData);
      setmmryObject(resData[resData.length - 1]);
    } catch (error) {
      console.log(`Ошибка при получении данных${error.message}`);
    }
  };
  // --------------Вызываем функцию запроса----------------------
  useEffect(() => {
    getMemories();
  }, []);
  // -----------добавляем в стэйт  выбранный объект---------
  useEffect(() => {
    mmryData.forEach((item) => {
      if (item._id == memoryId) {
        setmmryObject(item);
      }
    });
    console.log(mmryData);
  }, [memoryId]);
  useEffect(() => {
    getMemories();
  }, [stateDeleted]);
  console.log(stateDeleted);
  return (
    <div className={s.app}>
      <Header></Header>
      <div className={s.app_inner}>
        <Sidebar dataArr={mmryData}></Sidebar>
        <Main objectArr={mmryObject}></Main>
      </div>
    </div>
  );
}

export default App;
