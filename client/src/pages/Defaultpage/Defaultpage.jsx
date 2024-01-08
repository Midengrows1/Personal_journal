import react from "react";
import s from "./defaultpage.module.css";
import clsx from "clsx";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { Button, Flex } from "antd";
import { useEffect } from "react";
import { authUser } from "../../store/JournalSlice";
import { useDispatch } from "react-redux";
const Defaultpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getLS = localStorage.getItem("userToken");
  useEffect(() => {
    if (getLS) {
      dispatch(authUser(getLS));
      navigate("/home");
    }
  }, []);
  return (
    <div className={s.defaultpage}>
      <section className={s.defaultpage__inner}>
        <h1 className={clsx(s.title_text, "font-Smooch")}>Personal Journal</h1>
        <div className={s.main_text}>
          <p>
            Добро пожаловать в ваш личный журнал — ваше уютное место для
            самовыражения, рефлексии и саморазвития. Наш сайт предназначен для
            тех, кто ценит моменты, стремится к личному росту и ищет способы
            улучшить свою жизнь.
          </p>
          <p>
            Это ваш надежный спутник в путешествии по собственной жизни. Здесь
            вы можете освежить воспоминания, уловить эмоции и выразить свои
            мысли в письменной форме. Personal Journal — это цифровой аналог
            традиционного дневника, созданный с учетом современных потребностей.
          </p>
        </div>
        <div className={s.page_btn}>
          <Link to="/auth/registration" style={{ margin: 0, padding: 0 }}>
            <Button type="primary" ghost>
              Register
            </Button>
          </Link>
          <Link to="/auth/login">
            <Button ghost>Login</Button>
          </Link>
        </div>
        <section className={s.defaultpage__second}>
          <div className={s.page__benefits}>
            <div>
              <img src="/taking-notes.png" alt="image" />
              <span>
                Записывайте свои мысли, чувства и достижения. Personal Journal —
                это ваше личное пространство, где нет оценок и предрассудков.
              </span>
            </div>
            <div>
              <img src="/taking-notes.png" alt="image" />
              <span>
                Прикрепляйте изображения, создавайте галереи и делитесь
                визуальными воспоминаниями.
              </span>
            </div>
            <div>
              <img src="/taking-notes.png" alt="image" />
              <span>
                Определите свои цели, отслеживайте их выполнение и планируйте
                будущее.
              </span>
            </div>
            <div>
              <img src="/taking-notes.png" alt="image" />
              <span>
                Ваши записи остаются только вашими, благодаря нашим мерам
                безопасности и конфиденциальности.
              </span>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};
export default Defaultpage;
