import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import s from "./sidebar.module.css";
import clsx from "clsx";
import Memory from "../Memory";
const Sidebar = () => {
  return (
    <div className={clsx(s.sidebar)}>
      <button className={clsx(s.btn_side, "font-FiraSans")}>
        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>Новое воспоминание
      </button>
      <div className={s.memory_container}>
        <Memory></Memory>
      </div>
    </div>
  );
};

export default Sidebar;
