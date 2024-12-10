import React, { useCallback } from "react";
import { useState, useEffect, useRef } from "react";

const CodeBox = ({ loading, handleVerification }) => {
  const [box1, setbox1] = useState("");
  const [box2, setbox2] = useState("");
  const [box3, setbox3] = useState("");
  const [box4, setbox4] = useState("");
  const [box5, setbox5] = useState("");
  const [box6, setbox6] = useState("");
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);

  const handleChange = useCallback(
    (e) => {
      //   first
      if (/^\d*$/.test(e.target.value)) {
        setbox6(e.target.value);
        if (box6.length > 0) {
          try {
            console.log("third this");
            let verificationCode = "";
            verificationCode = box1 + box2 + box3 + box4 + box5 + box6;
            // logic to check verification code from portal
            console.log(verificationCode);
            handleVerification(verificationCode);
          } catch (err) {
            console.log("Error occured", err);
          }
        }
      }
    },
    [box1, box2, box3, box4, box5,box6, handleVerification]
  );

  useEffect(() => {
    if (ref1.current.disabled === false && box1 === "") {
      ref1.current.focus();
    } else if (ref2.current.disabled === false && box2 === "") {
      ref2.current.focus();
      ref1.current.disabled = false;
    } else if (ref3.current.disabled === false && box3 === "") {
      ref3.current.focus();
      ref1.current.disabled = true;
      ref2.current.disabled = false;
    } else if (ref4.current.disabled === false && box4 === "") {
      ref4.current.focus();
      ref2.current.disabled = true;
      ref3.current.disabled = false;
    } else if (ref5.current.disabled === false && box5 === "") {
      ref5.current.focus();
      ref3.current.disabled = true;
      ref4.current.disabled = false;
    } else if (ref6.current.disabled === false && box6 === "") {
      ref6.current.focus();
      ref4.current.disabled = true;
      ref5.current.disabled = false;
    }
  }, [ref1, ref2, ref3, ref4, ref5, ref6, box1, box2, box3, box4, box5, box6]);
  return (
    <div>
      <input
        type="text"
        name="box1"
        maxLength={1}
        value={box1}
        className="w-8 h-8 pl-3 mr-1 text-dark-200"
        onChange={(e) => {
          if (/^\d*$/.test(e.target.value)) {
            setbox1(e.target.value);
          }
        }}
        ref={ref1}
        disabled={loading}
      />{" "}
      - {"  "}
      <input
        type="text"
        name="box2"
        maxLength={1}
        className="w-8 h-8 pl-3 mr-1 text-dark-200"
        value={box2}
        onChange={(e) => {
          if (/^\d*$/.test(e.target.value)) {
            setbox2(e.target.value);
          }
        }}
        disabled={box1 === "" || loading}
        ref={ref2}
      />{" "}
      - {"  "}
      <input
        type="text"
        name="box3"
        maxLength={1}
        className="w-8 h-8 pl-3 mr-1 text-dark-200"
        value={box3}
        onChange={(e) => {
          if (/^\d*$/.test(e.target.value)) {
            setbox3(e.target.value);
          }
        }}
        disabled={box2 === "" || loading}
        ref={ref3}
      />{" "}
      - {"  "}
      <input
        type="text"
        name="box4"
        maxLength={1}
        className="w-8 h-8 pl-3 mr-1 text-dark-200"
        value={box4}
        onChange={(e) => {
          if (/^\d*$/.test(e.target.value)) {
            setbox4(e.target.value);
          }
        }}
        disabled={box3 === "" || loading}
        ref={ref4}
      />{" "}
      - {"  "}
      <input
        type="text"
        name="box5"
        maxLength={1}
        className="w-8 h-8 pl-3 mr-2 text-dark-200"
        value={box5}
        onChange={(e) => {
          if (/^\d*$/.test(e.target.value)) {
            setbox5(e.target.value);
          }
        }}
        disabled={box4 === "" || loading}
        ref={ref5}
      />{" "}
      - {"  "}
      <input
        type="text"
        name="box6"
        maxLength={1}
        className="w-8 h-8 pl-3 mr-2 text-dark-200"
        value={box6}
        onChange={(e) => handleChange(e)}
        disabled={box5 === "" || loading}
        ref={ref6}
      />
    </div>
  );
};

export default CodeBox;
