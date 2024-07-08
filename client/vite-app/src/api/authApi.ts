import axios from "axios";

const url = "https://ameboo-be.onrender.com/api/v1";
axios.defaults.withCredentials = true;

export const signUpUser = async (body: any) => {
  try {
    return await axios.post(`${url}/signup`, body).then((res) => {
      console.log(res.data);

      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};
export const loginUser = async (body: any) => {
  try {
    return await axios
      .post(`${url}/login`, body, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
  } catch (error) {
    console.log(error);
  }
};
export const logoutUser = async () => {
  try {
    return await axios
      .post(`${url}/logout`, {}, { withCredentials: true })
      .then((res) => {
        console.log(res);
        return res;
      });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async () => {
  try {
    return await axios.get(`${url}/getUsers`).then((res) => {
      // console.log(res);
      return res;
    });
  } catch (error) {
    console.log(error);
  }
};
