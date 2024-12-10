import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import RedirectToLogin from "./RedirectToLogin";

const AuthCheck = ({ children }) => {
  const { user, isLoggedIn } = useSelector((state) => state.user, shallowEqual);
  if (
    isLoggedIn === false ||
    !user.uid ||
    !user.stsTokenManager.accessToken
  ) {
    return <RedirectToLogin />;
  }
  return children;
};

export default AuthCheck;
