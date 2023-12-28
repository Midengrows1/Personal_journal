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
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti,
          distinctio molestiae consectetur quaerat vitae dicta reiciendis ipsa,
          voluptatem aperiam quae assumenda ea consequatur deleniti libero
          maiores quibusdam excepturi enim voluptates! Quis recusandae, nulla
          error, ex incidunt, facilis dignissimos sint alias nostrum cupiditate
          aliquam vero provident consectetur porro architecto! Tempore harum
          soluta consequatur voluptates, tenetur impedit fuga excepturi at autem
          iusto. Unde fugit ullam facere, hic necessitatibus nesciunt explicabo
          dicta tenetur maxime aliquid maiores repudiandae voluptas corrupti
          praesentium esse quos neque assumenda distinctio dolorem molestiae
          alias repellat voluptatum. Sapiente, corporis ex.
        </p>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
                eveniet.
              </span>
            </div>
            <div>
              <img src="/taking-notes.png" alt="image" />
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
                eveniet.
              </span>
            </div>
            <div>
              <img src="/taking-notes.png" alt="image" />
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
                eveniet.
              </span>
            </div>
            <div>
              <img src="/taking-notes.png" alt="image" />
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
                eveniet.
              </span>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};
export default Defaultpage;
