import axios from "axios";

export const login = async ({ email, password }) => {
  const response = await axios.post(
    `${import.meta.env.VITE_URL}/users/login`,
    { email, password },
    { withCredentials: true }
  );
  return response.data;
};

export const signup = async ({ email, password, username, fullName }) => {
  const response = await axios.post(
    `${import.meta.env.VITE_URL}/users/register`,
    { email, password, username, fullName },
    { withCredentials: true }
  );
  return response.data;
};
