import axios from "axios";

const url = "https://ameboo-be.onrender.com/api/v1";
axios.defaults.withCredentials = true;

export const signUpUser = async (body: any) => {
  try {
    return await axios.post(`${url}/signup`, body).then((res) => {
      return res.data;
    });
  } catch (error) {}
};
export const loginUser = async (body: any) => {
  try {
    return await axios
      .post(`${url}/login`, body, { withCredentials: true })
      .then((res) => {
        return res.data;
      });
  } catch (error) {}
};
export const logoutUser = async () => {
  try {
    return await axios
      .post(`${url}/logout`, {}, { withCredentials: true })
      .then((res) => {
        return res;
      });
  } catch (error) {}
};

export const getUser = async () => {
  try {
    return await axios.get(`${url}/getUsers`).then((res) => {
      return res;
    });
  } catch (error) {}
};
