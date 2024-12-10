import React from "react";
import auth from "./config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  return (
    <div>
      <div className="flex inset-0 absolute justify-center items-center h-full">
        <div className="bg-light-200 md:w-2/5 w-2/3 h-4/5 text-dark-200 rounded">
          <div className="flex justify-center mt-2 mb-4">
            <p>Register Now</p>
            <hr className="bg-dark-200"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
