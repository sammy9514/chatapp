import { useEffect, useState } from "react";
import { getAllUsers } from "../hooks/Fetcher";

export const SearchUser = (search: any) => {
  const { data } = getAllUsers();

  const [filtered, setFiltered]: any = useState([]);

  useEffect(() => {
    const findUser = data?.filter((user: any) =>
      user.userName.toLowerCase().includes(search?.toLowerCase())
    );
    setFiltered(findUser);
  }, [data, search]);
  return { filtered };
};
