import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login } from "../hooks/authSlice";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state: any) => state.auth);

  const schema = yup.object({
    userName: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onHandleSubmit = handleSubmit((data) => {
    dispatch(login(data))
      .then((res: any) => {
        if (res.payload !== undefined) {
          navigate("/");
        } else {
          navigate("/login");
        }
      })
      .catch((error: any) => {
        console.error("Error during login:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          // Assuming the API returns a message in the response body
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred during login. Please try again.");
        }
      });
  });

  return (
    <div>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="sm:w-[550px] sm:h-[360px] h-[360px] w-[380px] border-[2px] border-black rounded-[10px] py-4 px-6 ">
          <div className="font-bold text-[25px] mb-7 text-green-500 ">
            Login
          </div>

          <form onSubmit={onHandleSubmit}>
            <div className="w-full h-[50px] border mb-5 rounded-md  ">
              <input
                type="text"
                className="w-full h-full p-4 rounded-md"
                placeholder="username"
                {...register("userName")}
              />
              {errors.userName && (
                <p className="text-red-500 text-[13px] ">
                  {errors.userName.message}
                </p>
              )}
            </div>
            <div className="w-full h-[50px] border mb-5 rounded-md ">
              <input
                type="text"
                className="w-full h-full p-4 rounded-md"
                placeholder="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-[13px]">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex w-full justify-center mt-7 flex-col ">
              {status === "loading" ? (
                <div className="btn btn-primary">
                  <button className=" loading loading-spinner load"></button>
                </div>
              ) : (
                <button
                  className="btn btn-primary hover:bg-green-500"
                  type="submit"
                >
                  Login
                </button>
              )}
              <div>
                <p className="text-[13px] mt-2 flex justify-center">
                  got an account?
                  <a className="text-green-500 underline link " href="/signup">
                    {" "}
                    signup
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
