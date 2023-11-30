import { useState } from "react";
import clsx from "clsx";
import s from "./App.module.css";
import { Main, Sidebar } from "./components";
import { Header } from "antd/es/layout/layout";
function App() {
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
