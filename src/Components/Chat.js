import { shallowEqual, useSelector } from "react-redux";
import SignOut from "./auth/SignOut";
import React, { memo, useState, useEffect } from "react";
import {
  FormOutlined,
  ProfileFilled,
  SecurityScanOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { fetchUsers, userDetails } from "../functions/user";
import { useNavigate } from "react-router-dom";
import hows from "../asset/hows.png";

const Chat = () => {
  const { user } = useSelector((state) => state.user, shallowEqual);
  const { theme } = useSelector((state) => state.theme, shallowEqual);
  const [hover, sethover] = useState(false);
  const navigate = useNavigate();
  const [users, setusers] = useState([]);
  const [usersData, setusersData] = useState([]);
  const [searchValue, setsearchValue] = useState("");

  useEffect(() => {
    fetchUsers(user.uid, user.accessToken)
      .then((res) => {
        // console.log(res.data)
        setusers(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [user]);

  const items = [
    {
      label: "My Profile",
      key: "profile",
      icon: <UserOutlined />,
    },
    {
      label: "Privacy",
      key: "privacy",
      icon: <SecurityScanOutlined />,
    },
    {
      label: "Policy",
      key: "policy",
      icon: <FormOutlined />,
    },
  ];
  const onClick = (key) => {
    //
    console.log(`/user/${key}`);
    navigate(`/user/${key}`, { state: { to: `/user/${key}` } });
  };

  useEffect(() => {
    if (users.length > 0) {
      const fetchUserData = () => {
        users.map((contact) =>
          userDetails(contact.uid, user.accessToken)
            .then((res) => {
              const data = res.data;
              console.log(res.data);
              setusersData({ ...usersData, data });
            })
            .catch((err) => {
              console.log(err);
            })
        );
      };
      fetchUserData();
    }
  }, [users, user.accessToken]);

  const filtered = (search) => (user) =>
    user.toLowerCase().includes(search.toLowerCase());

  return (
    <div className="flex w-full h-full overflow-none">
      <div
        className={`${
          theme === "dark" ? "bg-dark-200" : "bg-light-200"
        } opacity-95 grow md:grow-0 md: w-1/4 -mt-7`}
      >
        <div className="flex justify-center mt-2 mb-4">
          <img src={hows} className="h-20" alt="logo" />
        </div>
        <div className="flex justify-between">
          <SignOut />
          <ProfileFilled
            onClick={() => sethover(!hover)}
            style={{
              fontSize: 32,
            }}
          />
        </div>
        <div className={`flex justify-end `}>
          {hover && (
            <div
              className={`${
                theme === "dark" ? "text-dark-200" : "text-light-200"
              }} m-5 text-start rounded-md`}
            >
              {items.map((item) => (
                <div
                  className="mb-1 cursor-pointer"
                  onClick={() => onClick(item.key)}
                >
                  {item.icon} {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <input
            type="text"
            name="search"
            value={searchValue}
            placeholder="Search Users"
            className="text-sm text-dark-200 border-b-2 font-bold p-1 mt-6 ml-2"
            onChange={(e) => setsearchValue(e.target.value)}
          />
        </div>
        <div>
          <p className="text-xl font-bold mt-4">Users</p>
          {users &&
            users.length > 0 &&
            users.map((contact, index) => (
              <>
                <p className="text-md font-medium">
                  {usersData.data && usersData.data.email.split("@")[0]}
                </p>
              </>
            ))}
          {/* {users &&
            users.length > 0 && usersData.length > 0 &&
            usersData.filter(filtered(searchValue)).map((u, index) => (
              <>
                <p className="text-md font-medium">
                  {JSON.stringify(u)}
                </p>
              </>
            ))} */}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default memo(Chat);
