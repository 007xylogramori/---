import { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate, NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/authenticationServices";
const LoginPage = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { mutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Logged In Successfully");
      navigate("/");
    },
    onError: (data) => {
      toast.error(data.response.data.message);
    },
  });

  const handleLoginUser = async (e) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email || !password) {
      toast.error("Empty Fields !");
      return;
    }
    mutate({ email, password });
  };
  return (
    <div className="flex  items-center h-screen w-screen flex-col justify-center  p-2">
      <div className="p-4 lg:p-8 w-[290px] lg:w-[400px] border flex flex-col shadow-md  ">
        <div className="text-xl py-2 font-semibold ">SignIn</div>

        <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleLoginUser}
            className="space-y-2"
            action="#"
            method="POST"
          >
            <div>
              <label htmlFor="email" className="block text-sm/6  text-gray-900">
                Email address
              </label>
              <div className="">
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6  text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="">
                <input
                  ref={passwordRef}
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                disabled={isLoading}
                type="submit"
                className="flex w-full justify-center rounded-md mt-2 bg-indigo-600 px-3 py-1.5 text-sm/6  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? "Signing..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-2 text-center text-sm/6 text-gray-500">
            Not a member?
            <NavLink
              to="/auth/signup"
              className=" text-indigo-600 hover:text-indigo-500"
              end
            >
              {" "}
              SignUp Now
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
