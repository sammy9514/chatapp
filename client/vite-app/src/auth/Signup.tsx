import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { signup } from "../hooks/authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state: any) => state.auth) || {};

  const schema = yup.object({
    name: yup.string().required("Name is required"),
    userName: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    gender: yup.string().required(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onHandleSubmit = handleSubmit((data: any) => {
    dispatch(signup(data))
      .then((res: any) => {
        if (res.payload !== undefined) {
          navigate("/");
        } else {
          navigate("/signup");
        }
      })
      .catch((error: any) => {
        console.error("Error during signup:", error);
        if (status === "failed") {
          // Assuming the API returns a message in the response body
          toast.error("error.response.data.message");
        } else {
          toast.error("An error occurred during signup. Please try again.");
        }
      });
  });

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-center items-center w-full h-screen">
        <div className="sm:w-[550px] sm:h-[460px] h-[470px] w-[380px] border-[2px] border-black rounded-[10px] py-4 px-6 ">
          <div className="font-bold text-[25px] mb-7 text-green-500 ">
            Signup
          </div>

          <form onSubmit={onHandleSubmit}>
            <div className="w-full h-[50px] border mb-5 rounded-md ">
              <input
                type="text"
                className="w-full h-full p-4 rounded-md"
                placeholder="name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-[13px] ">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="w-full h-[50px] border mb-5 rounded-md  ">
              <input
                type="text"
                className="w-full h-full p-4 rounded-md"
                placeholder="username"
                {...register("userName")}
              />
              {errors.userName && (
                <p className="text-red-500 text-[13px]">
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

            <div>Gender</div>
            <div className="flex gap-2">
              <div className="flex gap-2 ">
                male
                <input
                  type="radio"
                  id="m"
                  value="male"
                  {...register("gender")}
                />
              </div>
              <div className="flex gap-2 ">
                female
                <input
                  type="radio"
                  id="f"
                  value="female"
                  {...register("gender")}
                />
              </div>
              {errors.gender && (
                <p className="text-red-500text-[13px] ">
                  {errors.gender.message}
                </p>
              )}
            </div>
            <div className="flex w-full justify-center mt-7 flex-col ">
              {status === "loading" ? (
                <div className="btn btn-primary">
                  <button className="btn btn-primary loading loading-spinner load"></button>
                </div>
              ) : (
                <button
                  className="btn btn-primary hover:bg-green-500"
                  type="submit"
                >
                  Signup
                </button>
              )}
              <div>
                <p className="text-[13px] mt-2 flex justify-center">
                  got an account?
                  <a className="text-green-500 underline link " href="/login">
                    {" "}
                    login
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
