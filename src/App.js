import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./Components/auth/Login";
import LoginVerify from "./Components/auth/LoginVerify";
import Chat from "./Components/Chat";
import { MoonOutlined, BulbOutlined } from "@ant-design/icons";
import { light, dark } from "./app/themeReducer";
import EmailLogin from "./Components/auth/EmailLogin";
import { onAuthStateChanged } from "firebase/auth";
import { loggedIn } from "./app/userReducer";
import auth from "./Components/auth/config/firebase";
import React, { useEffect, memo } from "react";
import AuthCheck from "./Components/auth/AuthCheck";
import Profile from "./Components/user/Profile";
import Privacy from "./Components/user/Privacy";
import Policy from "./Components/user/Policy";
import SignUp from "./Components/auth/SignUp";

function App() {
  const { theme } = useSelector((state) => state.theme, shallowEqual);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const location = useLocation();

  const handleTheme = () => {
    //;
    // console.log(theme);
    if (theme === "light") {
      dispatch(dark("dark"));
      localStorage.setItem("theme", JSON.stringify({ theme: "dark" }));
    } else {
      dispatch(light("light"));
      localStorage.setItem("theme", JSON.stringify({ theme: "light" }));
    }
  };
  useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // console.log(user);
          dispatch(loggedIn(user));
          localStorage.setItem(
            "user",
            JSON.stringify({ user: user, isLoggedIn: true })
          );
          // navigate("/");
        }
      },
      []
    );
  });
  // [location.state, location.state.from, location.state.to, navigate]

  return (
    <div
      className={`relative bg-hero-image bg-no-repeat bg-cover w-full h-screen`}
    >
      <div
        className={`bg-light-100 ${
          theme && theme === "light"
            ? "text-dark-200 bg-opacity-70 h-screen"
            : "text-light-200 bg-opacity-10 h-screen"
        }`}
      >
        <div className="flex justify-end">
          <div className="flex mr-3 mt-1 align-items-center">
            <button type="text" onClick={() => handleTheme()}>
              {theme && theme === "light" ? (
                <>
                  <MoonOutlined style={{ fontSize: 20 }} /> To dark theme
                </>
              ) : (
                <>
                  <BulbOutlined style={{ fontSize: 20 }} /> To light theme
                </>
              )}
            </button>
          </div>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <AuthCheck>
                <Chat />
              </AuthCheck>
            }
          />
          <Route
            path="/user/profile"
            element={
              <AuthCheck>
                <Profile />
              </AuthCheck>
            }
          />
          <Route
            path="/user/privacy"
            element={
              <AuthCheck>
                <Privacy />
              </AuthCheck>
            }
          />
          <Route
            path="/user/policy"
            element={
              <AuthCheck>
                <Policy />
              </AuthCheck>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/login/verify" element={<LoginVerify />} />
          <Route path="/signup" element= {<SignUp/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default memo(App);
