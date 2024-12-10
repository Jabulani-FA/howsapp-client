import React from "react";
import countryCodes from "country-codes-list";
import { Button, Select } from "antd";
import { useState, useEffect } from "react";
import hows from "../../asset/hows.png";
import { motion } from "framer-motion";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { childVariants, containerVariants, imageVariants } from "../animation";

const LoginPhone = () => {
  const [countries, setcountries] = useState([]);
  const [phoneNo, setphoneNo] = useState("");
  const [selectValue, setselectValue] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const countryData = countryCodes.customList(
      "countryCode",
      "{countryNameEn}: +{countryCallingCode}"
    );
    setcountries(Object.entries(countryData));
  }, []);

  const handleSelect = (e) => {
    //
    setselectValue(e);
  };

  const { Option } = Select;

  const handleSubmit = () => {
    //
    if (phoneNo.length < 10) {
      return;
    } else {
      //
      setloading(true);
      let mobileNo = selectValue + phoneNo;
      navigate("/login/verify", { state: { mobileNo: mobileNo } });
    }
  };

  const handlePhoneChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setphoneNo(e.target.value);
    }
  };

  return (
    <div>
      <div>
        <motion.div className="mb-2 flex" variants={childVariants}>
          <Select
            style={{
              width: 160,
              marginRight: 5,
            }}
            showSearch
            className="pointer"
            placeholder="Select Your Country"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            onChange={(e) => handleSelect(e)}
          >
            {countries &&
              countries.map((country) => (
                <Option key={country[0]} value={country[1].split(": ")[1]}>
                  {country[1]}
                </Option>
              ))}
          </Select>

          <input
            type="text"
            name="phoneNo"
            value={phoneNo}
            onChange={(e) => handlePhoneChange(e)}
            min={10}
            maxLength={12}
            className="w-15 h-7 pl-4 text-dark-200"
            placeholder="7032958409"
            disabled={selectValue === ""}
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
            {loading ? <LoadingOutlined /> : "Verify Number"}
          </Button>
        </motion.div>
        <motion.div
          variants={childVariants}
          id="recaptcha-container"
        ></motion.div>
      </div>
      {/* {JSON.stringify(countries)} */}
    </div>
  );
};

export default LoginPhone;
