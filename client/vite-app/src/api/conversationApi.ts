import axios from "axios";

const url = "https://ameboo-be.onrender.com/api/v1/chat";
axios.defaults.withCredentials = true;

export const sendMessageApi = async ({ id, _id, message }: any) => {
  try {
    return await axios
      .post(
        `${url}/send-message/${id}`,
        { message, _id },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        return res;
      });
  } catch (error) {
    console.log(error);
  }
};

export const getMessageApi = async ({ id, _id }: any) => {
  try {
    const response = await axios.get(`${url}/get-message/${id}`, {
      params: { _id },
      withCredentials: true,
    });
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
