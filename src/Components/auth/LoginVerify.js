import React, { useState, useEffect } from "react";
import hows from "../../asset/hows.png";
import auth from "./config/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber, signInWithCredential, PhoneAuthProvider } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import CodeBox from "./LoginVerifyComponent/CodeBox";

const LoginVerify = () => {
  const location = useLocation();
  const initialState = {
    statusQuo: "",
    info: ""
  }
  const [mobileNo, setmobileNo] = useState("");
  const [loading, setloading] = useState(false)
  const [verificationId, setverificationId] = useState('123456')
  const [message, setmessage] = useState(initialState)
  const {statusQuo, info} = message
  const navigate = useNavigate()

  useEffect(() => {
    if(location.state && location.state.mobileNo){
        setmobileNo(location.state.mobileNo);
    }else{
        console.log('Permission not granted')
        navigate('/login')
    }
  }, [location.state, navigate]);

  // useEffect(() => {
  //   sendOtp()
  // }, [])
  
  // const sendOtp = async() => {
  //   setloading(true)
  //   setupRecaptcha()
  //   const appVerifier = window.recaptchaVerifier
  //   try{
  //     const confirmationResult = await signInWithPhoneNumber(auth, mobileNo, appVerifier)
  //     setverificationId(confirmationResult.verificationId)
  //     setmessage({...message, statusQuo: "success", info: "Otp sent to Number"})
  //     setloading(false)
  //   }
  //   catch(err){
  //     console.error("Error occured", err)
  //     setmessage({...message, statusQuo: "error", info: err})
  //     setloading(false)
  //   }
  // }

  const handleVerification = async(otp) => {
    console.log(otp)
    console.log(verificationId)
    const applicationVerifier = new RecaptchaVerifier(auth, "recaptcha-container")
    const provider = new PhoneAuthProvider(auth)
    const newVerifier = provider.verifyPhoneNumber(mobileNo, applicationVerifier)
    const credential = PhoneAuthProvider.credential(newVerifier, otp)
    try{
      const userCredential = await signInWithCredential(auth, credential);
      console.log(userCredential)
      navigate('/')
    }
    catch(err){
      // 
      console.error('Error occured : ->',err)
    }
  }


    // const setupRecaptcha = () => {
    //     window.recaptchaVerifier = new RecaptchaVerifier(
    //       auth,
    //       "recaptcha-container",
    //       {
    //         size: "invisible",
    //         callback: (response) => {
    //           console.log("reCAPTCHA verified");
    //         },
    //       },
    //     );
    //   };

  return (
    <div className="flex inset-0 absolute items-center justify-center h-full">
      <div>
        <div className="flex justify-center mb-5">
          <img src={hows} alt="logo" />
        </div>
        <div className="text-center mb-3">
          <h2>Enter Verification Code!</h2>
        </div>
        <div>
          <CodeBox loading={loading} handleVerification={handleVerification} />
        </div>
        <div>
          <p className={statusQuo ==="error"?`bg-danger`:`bg-success`}>{info}</p>
        </div>
        <div className="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default LoginVerify;
