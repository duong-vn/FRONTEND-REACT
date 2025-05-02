import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import User from "./components/User/User";
import ListQuiz from "./components/User/ListQuiz";
import Admin from "./components/Admin/Admin";
import Home from "./components/Home/Home";
import ManageUser from "./components/Admin/content/ManageUser";
import DashBoard from "./components/Admin/content/DashBoard";
import Login from "./components/Ath/Login";
import SignUp from "./components/Ath/SignUp";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Group from "./components/Admin/content/Group";
const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/users" element={<ListQuiz />} />
        </Route>

        <Route path="/admins" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manage-user" element={<ManageUser />}></Route>
          <Route path="manage-group" element={<Group />}></Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h2>Not Found 404</h2>} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default Layout;
