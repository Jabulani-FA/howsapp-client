import React from "react";
import { Button } from 'antd'
import { signOut } from "firebase/auth";
import auth from './config/firebase'
import { useDispatch } from "react-redux";
import { loggedOut } from "../../app/userReducer";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleSignOut = () => {
        // 
        signOut(auth)
        .then(() => {
            dispatch(loggedOut())
            localStorage.setItem("user", JSON.stringify({user: null, isLoggedIn: false}));
            navigate('/login')
        })
        .catch((err) => {
            console.log(err.message)
        })
    }
  return (
    <div>
      <Button
        className="flex btn btn-raised bg-light-200 border-none outline-none"
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default SignOut;
