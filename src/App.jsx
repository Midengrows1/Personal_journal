import { useState } from "react";
import clsx from "clsx";
import s from "./App.module.css";
import { Main, Sidebar } from "./components";
function App() {
  return (
    <div className={s.app}>
      <div className={clsx(s.app_top, "Smooch")}>
        <h1 className="font-Smooch">Personal Journal</h1>
      </div>
      <div className={s.app_inner}>
        <Sidebar></Sidebar>
        <Main></Main>
      </div>
    </div>
  );
}

export default App;
