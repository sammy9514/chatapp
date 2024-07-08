import { FC, PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useSelector((state: any) => state.auth);

  return <div>{user ? <div>{children}</div> : <Navigate to="/login" />}</div>;
};
