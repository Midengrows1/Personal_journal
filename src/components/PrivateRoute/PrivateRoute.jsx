import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const isAuth = useSelector((state) => state.auth);
  const location = useLocation();
  console.log(isAuth.signState);
  return !!isAuth.signState === true ? (
    <Outlet />
  ) : (
    <Navigate to="/public" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
