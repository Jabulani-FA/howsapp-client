import React, { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import hows from "../../asset/hows.png";
import {
  LoadingOutlined,
  EyeFilled,
  EyeInvisibleFilled,
} from "@ant-design/icons";
import { Button } from "antd";
import auth from "./config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { loggedIn } from "../../app/userReducer";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../../functions/user";

const EmailLogin = () => {
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.user, shallowEqual);
  const navigate = useNavigate();
  useEffect(() => {
    user && user.uid && isLoggedIn === "true" && navigate("/");
  }, [user, isLoggedIn, navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const handleSubmit = async () => {
    //
    setloading(true);
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credential);
      const user = credential.user;
      const token = await user.getIdToken(true);
      console.log(token);
      // console.log(token)
      // console.log(credential);
      const currentuser = currentUser(token);
      //
      // console.log(res.data)
      dispatch(loggedIn(credential.user));
      localStorage.setItem(
        "user",
        JSON.stringify({ user: credential.user, isLoggedIn: true })
      );
      setloading(false);
      navigate("/");
    } catch (err) {
      console.log(err.message);
      setloading(false);
    }
  };

  return (
    <div>
      <div>
        <motion.div className="mb-2 flex" variants={childVariants}>
          <input
            type="e-mail"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="w-80 h-7 pl-4 text-dark-200"
            placeholder="Enter Your Email"
            required
          />
        </motion.div>
        <motion.div className="mb-2 flex" variants={childVariants}>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-80 h-7 pl-4 text-dark-200"
            placeholder={`Enter Password`}
            required
          />
        </motion.div>
        <motion.div variants={childVariants}>
          <Button
            className="btn btn-raised w-full p-3 bg-light-200 border-none outline-none"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#E2B659";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#E2B659";
            }}
            onClick={handleSubmit}
          >
            {loading ? <LoadingOutlined /> : "Login"}
          </Button>
        </motion.div>
        <motion.div variants={childVariants}>
          <a
            className="text-dark-200 flex justify-end mr-2 mt-1"
            href="/signup"
          >
            No Account?
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default memo(EmailLogin);
