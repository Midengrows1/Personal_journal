import clsx from "clsx";
import s from "./main.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

const Main = ({ objectArr }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  try {
    const { title, text, activity, date, image } = objectArr;
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
              <img src={`${baseUrl}/${image}`} alt="image" />
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
