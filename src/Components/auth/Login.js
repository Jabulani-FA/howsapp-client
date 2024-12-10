import React, { useState } from "react";
import hows from "../../asset/hows.png";
import { motion } from "framer-motion";
import { containerVariants, imageVariants, childVariants } from "../animation";
import EmailLogin from "./EmailLogin";
import LoginPhone from "./LoginPhone";

const Login = () => {
  const [loginType, setloginType] = useState("email");
    const handleClick = (e) => {
        // 
        if (loginType === e){
            return
        }
        else{
            setloginType(e)
        }
    }
  return (
    <div>
      <div>
        <div className="flex inset-0 absolute pt-40 justify-center h-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex w-full h-12">
                <div className={`h-full w-1/2 flex justify-center items-center rounded text-dark-200 ${loginType === "phone" &&"bg-light-200 "}`} onClick={() => handleClick("phone")}><p>Phone</p></div>
                <div className={`h-full w-1/2 flex justify-center items-center rounded ${loginType === "email" && "bg-dark-100 "} `} onClick={() => handleClick("email")}><p>E-mail</p></div>
            </div>
            <motion.div
              className="flex justify-center -mt-12 mb-12"
              variants={imageVariants}
            >
              <img src={hows} alt="logo" />
            </motion.div>
            <motion.div className="text-center mb-4" variants={childVariants}>
              <h2 className="text-dark-100 text-xl">Log Into Your Account! </h2>
            </motion.div>
            {loginType === "phone"? <LoginPhone/>: loginType==="email"? <EmailLogin/>: <LoginPhone/>}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
