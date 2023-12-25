import { Routes, Route } from "react-router-dom";
import {
  Home,
  Auth,
  Login,
  Registration,
  CreateMemory,
  Defaultpage,
  NotFoundPage,
  Removal,
} from "./pages";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
function App() {
  return (
    <Routes>
      <Route path="/public" element={<Defaultpage></Defaultpage>}></Route>
      <Route element={<PrivateRoute></PrivateRoute>}>
        <Route path="/" index element={<Home></Home>}></Route>
      </Route>
      <Route path="/create" element={<CreateMemory></CreateMemory>}></Route>
      <Route path="/memories/:memoryId" element={<Home></Home>}></Route>
      <Route
        path="/auth/registration"
        element={<Registration></Registration>}
      ></Route>
      <Route path="/auth/login" element={<Login></Login>}></Route>
      <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
    </Routes>
  );
}

export default App;
