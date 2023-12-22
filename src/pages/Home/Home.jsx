import s from "./home.module.css";
import { Main, Sidebar } from "../../components";
import { Header } from "../../components";
import { useState } from "react";
import Login from "../Login";
function App({}) {
  return (
    <div className={s.app}>
      <Header></Header>
      <div className={s.app_inner}>
        <Sidebar></Sidebar>
        <Main></Main>
      </div>
    </div>
  );
}

export default App;
