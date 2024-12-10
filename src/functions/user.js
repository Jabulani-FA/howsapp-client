import axios from "axios";

export const currentUser = async (token) => {
  return await axios.get(`http://localhost:8000/api/user`, {
    headers: {
      Authtoken: token,
    },
  });
};

export const createUser = async (user, token) => {
  return await axios.post(`http://localhost:8000/api/user`, user, {
    headers: {
      Authtoken: token,
    },
  });
};

export const fetchUsers = async (uid, token) => {
  return await axios.post(
    `http://localhost:8000/api/user/v1`,
    { uid },
    {
      headers: {
        Authtoken: token,
      },
    }
  );
};
export const userDetails = async (uid, token) => {
  return await axios.post(
    `http://localhost:8000/api/user/v2`,
    { uid },
    {
      headers: {
        Authtoken: token,
      },
    }
  );
};
