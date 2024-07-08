import useSWR from "swr";
import { getUser } from "../api/authApi";
import { getMessageApi } from "../api/conversationApi";

export const getAllUsers = () => {
  const { data } = useSWR("/api/v1/getUsers", () => {
    return getUser().then((res: any) => {
      return res.data;
    });
  });
  return { data };
};

export const getAllMessages: any = ({ id, _id }: any) => {
  const { data, error } = useSWR([id, _id], () =>
    getMessageApi({ id, _id }).then((res: any) => {
      return res?.data?.data;
    })
  );
  return { data, error };
};
