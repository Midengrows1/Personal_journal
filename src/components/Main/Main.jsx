import clsx from "clsx";
import s from "./main.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
const Main = () => {
  return (
    <div className={clsx(s.main, "font-FiraSans")}>
      <h2 className={s.main_title}>Hello</h2>
      <div className={s.main_description}>
        <div className={s.main_description_top}>
          <div className={s.main_date_top}>
            <FontAwesomeIcon icon={faCalendarDays} size="xl"></FontAwesomeIcon>
            <span>Дата</span>
          </div>
          <div className={s.main_date_bottom}>
            <p>21.06.2022</p>
          </div>
          <div className={s.main_tag_top}>
            <FontAwesomeIcon icon={faFolder} size="xl"></FontAwesomeIcon>
            <span>Метка</span>
          </div>
          <div className={s.main_tag_bottom}>
            <p>Спорт</p>
          </div>
        </div>
        <div className={s.main_description_bottom}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            expedita possimus minima ut eaque, maiores mollitia soluta harum
            neque, voluptas delectus animi voluptatibus doloremque vel odio
            officia maxime! Voluptatibus, praesentium. Accusamus repellendus
            rerum dolorum neque esse distinctio vitae nam saepe quae hic dolores
            provident, aut natus, ullam facilis eius dolor. Debitis tenetur
            numquam, delectus expedita magni minima! Deserunt, porro culpa.
            Porro suscipit, tempore quas totam adipisci, voluptatem officia
            delectus saepe consequatur doloremque, repudiandae numquam
            recusandae eligendi? Atque, optio voluptate unde vitae, temporibus
            qui voluptas quaerat reprehenderit fugit culpa tempore autem!
            Delectus autem nisi natus! Voluptatem et tenetur ut modi recusandae?
            F
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Main;
