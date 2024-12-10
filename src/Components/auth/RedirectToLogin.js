import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const RedirectToLogin = () => {
  const [count, setcount] = useState(7);
  const navigate = useNavigate()

  useEffect(() => {
    setInterval(() => {
        setcount(count-1)
    }, 1000);
    
    count===0 && navigate('/login')
    clearInterval(setInterval)
  }, [count, navigate])
  

  return (
    <div className="flex absolute inset-0 items-center justify-center">
      <p>Redirecting in {count} seconds </p>
    </div>
  );
};

export default RedirectToLogin;
